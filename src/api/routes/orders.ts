import { createHash, createHmac, randomUUID } from 'node:crypto';
import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { calculateShipping } from './shipping';
import { getProductWeight } from '../lib/product-weight';
import { requireMember } from '../lib/member-session';

export const router = Router();

function getMidtransSnapUrl() {
  const baseUrl = process.env.NODE_ENV === 'production' ? process.env.MIDTRANS_URL_PRODUCTION : process.env.MIDTRANS_URL_SANDBOX;
  if (!baseUrl) throw new Error('Midtrans URL belum di-set');
  return `${baseUrl}/snap/v1/transactions`;
}

async function createXenditInvoice(params: {
  orderId: string;
  amount: number;
  email: string;
  description: string;
  successRedirectUrl: string;
  failureRedirectUrl: string;
}) {
  const secretKey = process.env.XENDIT_SECRET_KEY ?? '';
  if (!secretKey) throw new Error('XENDIT_SECRET_KEY belum di-set');

  const response = await fetch('https://api.xendit.co/v2/invoices', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${secretKey}:`).toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      external_id: `JAX-${params.orderId}-${randomUUID().slice(0, 8)}`,
      amount: params.amount,
      payer_email: params.email,
      description: params.description,
      success_redirect_url: params.successRedirectUrl,
      failure_redirect_url: params.failureRedirectUrl,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Xendit error: ${errorText}`);
  }

  return await response.json() as { id: string; invoice_url: string; external_id: string };
}

function splitName(fullName: string) {
  const cleaned = fullName.trim();
  if (!cleaned) return { first_name: 'Customer', last_name: '' };
  const [first, ...rest] = cleaned.split(/\s+/);
  return { first_name: first, last_name: rest.join(' ') };
}

function verifyMidtransSignature(params: {
  orderId: string;
  statusCode: string;
  grossAmount: string;
  signatureKey: string;
  serverKey: string;
}) {
  const raw = `${params.orderId}${params.statusCode}${params.grossAmount}${params.serverKey}`;
  const expected = createHash('sha512').update(raw).digest('hex');
  return expected === params.signatureKey;
}

function mapMidtransStatus(transactionStatus: string, fraudStatus?: string) {
  if (transactionStatus === 'capture') {
    return fraudStatus === 'challenge' ? 'challenge' : 'paid';
  }
  if (transactionStatus === 'settlement') return 'paid';
  if (transactionStatus === 'pending') return 'pending';
  if (transactionStatus === 'deny') return 'denied';
  if (transactionStatus === 'cancel') return 'cancelled';
  if (transactionStatus === 'expire') return 'expired';
  if (transactionStatus === 'failure') return 'failed';
  return 'pending';
}

function mapXenditStatus(status: string) {
  const normalized = status.toUpperCase();
  if (normalized === 'PAID' || normalized === 'SETTLED') return 'paid';
  if (normalized === 'EXPIRED') return 'expired';
  return 'pending';
}

function getWinpayApiBaseUrl() {
  return process.env.NODE_ENV === 'production'
    ? (process.env.WINPAY_API_BASE_URL_PRODUCTION ?? 'https://checkout.winpay.id')
    : (process.env.WINPAY_API_BASE_URL_SANDBOX ?? 'https://sandbox-checkout.winpay.id');
}

function jakartaTimestamp() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Jakarta', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
  }).formatToParts(new Date()).reduce<Record<string, string>>((result, part) => {
    result[part.type] = part.value;
    return result;
  }, {});
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}+07:00`;
}

async function createWinpayInvoice(params: {
  orderId: string;
  amount: number;
  customer: { name: string; email: string; phone: string };
  products: { name: string; qty: number; price: number }[];
  backUrl: string;
}) {
  const key = process.env.WINPAY_MERCHANT_KEY ?? '';
  const secret = process.env.WINPAY_SECRET_KEY ?? '';
  if (!key || !secret) throw new Error('WINPAY_MERCHANT_KEY atau WINPAY_SECRET_KEY belum di-set');
  const timestamp = jakartaTimestamp();
  const signature = createHmac('sha256', secret).update(timestamp).digest('hex');
  const response = await fetch(`${getWinpayApiBaseUrl()}/api/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Winpay-Timestamp': timestamp,
      'X-Winpay-Signature': signature,
      'X-Winpay-Key': key,
    },
    body: JSON.stringify({
      customer: params.customer,
      invoice: { ref: params.orderId, products: params.products },
      back_url: params.backUrl,
      interval: Number(process.env.WINPAY_INVOICE_INTERVAL_MINUTES ?? 120),
    }),
  });
  const payload = await response.json() as { responseMessage?: string; responseData?: { id?: string; ref?: string; redirect_url?: string } };
  if (!response.ok || !payload.responseData?.redirect_url) {
    throw new Error(`Winpay error: ${payload.responseMessage ?? `HTTP ${response.status}`}`);
  }
  return payload.responseData;
}

// Winpay Checkout Page callback: POST /api/orders/winpay/callback.
// Winpay's Checkout Page documentation requires the literal response "ACCEPTED".
router.post('/winpay/callback', async (req, res) => {
  const body = req.body as Record<string, unknown>;
  const invoice = (body.invoice ?? {}) as Record<string, unknown>;
  const orderReference = String(body.ref ?? invoice.ref ?? '').trim();
  const amount = Number(body.amount ?? 0);
  if (!orderReference || !Number.isFinite(amount)) return res.status(400).send('INVALID');
  const order = await prisma.order.findFirst({ where: { OR: [{ id: orderReference }, { paymentRef: orderReference }] } });
  if (!order || order.paymentProvider !== 'winpay' || order.totalAmount !== amount) return res.status(400).send('INVALID');
  if (order.paymentStatus !== 'paid') {
    await prisma.order.update({ where: { id: order.id }, data: { paymentStatus: 'paid' } });
  }
  return res.status(200).type('text/plain').send('ACCEPTED');
});

router.post('/checkout', async (req, res) => {
  const memberId = String(req.header('x-member-id') ?? '').trim();
  const items = Array.isArray(req.body?.items) ? req.body.items : [];
  const shipping = req.body?.shipping;
  const customer = req.body?.customer;
  if (items.length === 0 || !shipping) return res.status(400).json({ error: 'invalid checkout' });

  let member = memberId ? await prisma.member.findUnique({ where: { id: memberId } }) : null;
  if (memberId && !member) return res.status(401).json({ error: 'member invalid' });
  if (!member) {
    if (!customer || typeof customer.name !== 'string' || customer.name.trim().length < 2 || typeof customer.email !== 'string' || !/^\S+@\S+\.\S+$/.test(customer.email) || typeof customer.phoneWa !== 'string' || customer.phoneWa.trim().length < 6 || typeof customer.address !== 'string' || customer.address.trim().length < 5) return res.status(400).json({ error: 'Lengkapi nama, email, WhatsApp, dan alamat pengiriman' });
    const email = customer.email.trim().toLowerCase();
    member = await prisma.member.create({ data: { name: customer.name.trim().slice(0, 120), email: `${Date.now()}-${email}`, address: customer.address.trim().slice(0, 500), phoneWa: customer.phoneWa.trim().slice(0, 40), passwordHash: randomUUID(), referralCode: `GUEST${randomUUID().replaceAll('-', '').slice(0, 12).toUpperCase()}` } });
    // Keep the real guest email only for the payment invoice.
    (member as typeof member & { checkoutEmail?: string }).checkoutEmail = email;
  }
  const checkoutEmail = (member as typeof member & { checkoutEmail?: string }).checkoutEmail ?? member.email;

  const productIds = items.map((i: { productId: string }) => i.productId);
  const products = await prisma.product.findMany({ where: { id: { in: productIds }, deletedAt: null }, select: { id: true, name: true, sellPrice: true, detail: { where: { deletedAt: null }, select: { specs: true } } } });
  const map = new Map(products.map((p) => [p.id, p]));

  const normalized = items
    .map((i: { productId: string; qty: number }) => ({ productId: String(i.productId), qty: Math.max(1, Number(i.qty || 1)) }))
    .filter((i: { productId: string; qty: number }) => map.has(i.productId));

  if (!normalized.length) return res.status(400).json({ error: 'no valid items' });

  const subtotal = normalized.reduce((sum: number, i: { productId: string; qty: number }) => sum + (map.get(i.productId)?.sellPrice ?? 0) * i.qty, 0);
  // Harga produk sudah termasuk PPN.
  const ppnAmount = 0;
  const destinationId = Number(shipping.destinationId);
  const totalWeight = normalized.reduce((sum: number, item: { productId: string; qty: number }) => sum + getProductWeight(map.get(item.productId)?.detail?.specs).weightGrams * item.qty, 0);
  const shippingOptions = await calculateShipping(destinationId, totalWeight);
  const selectedShipping = shippingOptions.find((option) =>
    option.code === String(shipping.courierCode) && option.service === String(shipping.service)
  );
  if (!selectedShipping) return res.status(400).json({ error: 'Layanan pengiriman tidak valid atau sudah berubah' });
  const shippingAmount = selectedShipping.cost;
  const total = subtotal + shippingAmount;

  const order = await prisma.$transaction(async (tx) => {
    const created = await tx.order.create({
      data: {
        memberId: member.id, subtotalAmount: subtotal, ppnAmount, shippingAmount, totalAmount: total,
        shippingCourier: selectedShipping.code, shippingService: selectedShipping.service,
        shippingDestinationId: destinationId,
        shippingDestination: String(shipping.destinationLabel).slice(0, 300),
      },
    });

    for (const item of normalized) {
      const p = map.get(item.productId)!;
      await tx.orderItem.create({
        data: {
          orderId: created.id,
          productId: p.id,
          productName: p.name,
          unitPrice: p.sellPrice,
          quantity: item.qty,
          lineTotal: p.sellPrice * item.qty,
        },
      });
    }

    return created;
  });

  const publicBaseUrl = (process.env.PUBLIC_BASE_URL ?? '').replace(/\/$/, '');
  const appBaseUrl = publicBaseUrl || `${req.protocol}://${req.get('host')}`;

  if (process.env.WINPAY_ENABLED === 'true') {
    try {
      const paymentRef = order.id;
      const winpayProducts = normalized.map((item: { productId: string; qty: number }) => {
        const product = map.get(item.productId)!;
        return { name: product.name.slice(0, 120), qty: item.qty, price: product.sellPrice };
      });
      if (shippingAmount > 0) winpayProducts.push({ name: `Ongkos kirim ${selectedShipping.service}`.slice(0, 120), qty: 1, price: shippingAmount });
      const invoice = await createWinpayInvoice({
        orderId: paymentRef,
        amount: total,
        customer: { name: member.name, email: checkoutEmail, phone: member.phoneWa },
        products: winpayProducts,
        backUrl: `${appBaseUrl}/payment/result`,
      });
      await prisma.order.update({ where: { id: order.id }, data: { paymentRef, paymentProvider: 'winpay' } });
      return res.json({ orderId: order.id, paymentRef, snapToken: '', redirectUrl: invoice.redirect_url, paymentProvider: 'winpay', subtotal, ppnAmount, shippingAmount, grossAmount: total });
    } catch (error) {
      return res.status(502).json({ error: error instanceof Error ? error.message : 'Gagal membuat invoice Winpay' });
    }
  }

  if (process.env.XENDIT_SECRET_KEY) {
    try {
      const invoice = await createXenditInvoice({
        orderId: order.id,
        amount: total,
        email: checkoutEmail,
        description: `Pembayaran pesanan JaxLab ${order.id}`,
        successRedirectUrl: `${appBaseUrl}/payment/result`,
        failureRedirectUrl: `${appBaseUrl}/payment/error`,
      });

      await prisma.order.update({
        where: { id: order.id },
        data: { paymentRef: invoice.external_id, paymentProvider: 'xendit' },
      });

      return res.json({
        orderId: order.id,
        paymentRef: invoice.external_id,
        snapToken: '',
        redirectUrl: invoice.invoice_url,
        paymentProvider: 'xendit',
        subtotal,
        ppnAmount,
        shippingAmount,
        grossAmount: total,
      });
    } catch (error) {
      return res.status(502).json({ error: error instanceof Error ? error.message : 'Gagal membuat invoice Xendit' });
    }
  }

  // Retained as a fallback for existing Midtrans deployments.
  const serverKey = process.env.MIDTRANS_SERVER_KEY ?? '';
  if (!serverKey) return res.status(500).json({ error: 'XENDIT_SECRET_KEY belum di-set dan MIDTRANS_SERVER_KEY juga belum di-set' });

  const auth = Buffer.from(`${serverKey}:`).toString('base64');
  const externalOrderId = `JAX-${order.id}-${randomUUID().slice(0, 8)}`;
  const customerName = splitName(member.name);

  const snapRes = await fetch(getMidtransSnapUrl(), {
    method: 'POST',
    headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      transaction_details: { order_id: externalOrderId, gross_amount: total },
      credit_card: { secure: true },
      callbacks: {
        finish: `${appBaseUrl}/payment/result`,
        error: `${appBaseUrl}/payment/error`,
      },
      customer_details: {
        ...customerName,
        email: member.email,
        phone: member.phoneWa,
        shipping_address: { address: member.address },
      },
      item_details: [
        ...normalized.map((i: { productId: string; qty: number }) => {
          const p = map.get(i.productId)!;
          return { id: p.id, name: p.name.slice(0, 50), price: p.sellPrice, quantity: i.qty };
        }),
        { id: 'SHIPPING', name: `${selectedShipping.name} ${selectedShipping.service}`.slice(0, 50), price: shippingAmount, quantity: 1 },
      ],
    }),
  });

  if (!snapRes.ok) {
    const errText = await snapRes.text();
    return res.status(502).json({ error: `midtrans error: ${errText}` });
  }

  const snapJson = (await snapRes.json()) as { token: string; redirect_url?: string };
  await prisma.order.update({ where: { id: order.id }, data: { paymentRef: externalOrderId } });

  res.json({
    orderId: order.id,
    paymentRef: externalOrderId,
    snapToken: snapJson.token,
    redirectUrl: snapJson.redirect_url,
    paymentProvider: 'midtrans',
    subtotal,
    ppnAmount,
    shippingAmount,
    grossAmount: total,
  });
});

router.post('/payment-notification', async (req, res) => {
  const serverKey = process.env.MIDTRANS_SERVER_KEY ?? '';
  if (!serverKey) return res.status(500).json({ error: 'MIDTRANS_SERVER_KEY belum di-set' });

  const orderId = String(req.body?.order_id ?? '');
  const statusCode = String(req.body?.status_code ?? '');
  const grossAmount = String(req.body?.gross_amount ?? '');
  const signatureKey = String(req.body?.signature_key ?? '');
  const transactionStatus = String(req.body?.transaction_status ?? '').toLowerCase();
  const fraudStatus = req.body?.fraud_status ? String(req.body.fraud_status).toLowerCase() : undefined;

  if (!orderId || !statusCode || !grossAmount || !signatureKey || !transactionStatus) {
    return res.status(400).json({ error: 'invalid notification payload' });
  }

  const isValidSignature = verifyMidtransSignature({ orderId, statusCode, grossAmount, signatureKey, serverKey });
  if (!isValidSignature) return res.status(401).json({ error: 'invalid signature' });

  const nextStatus = mapMidtransStatus(transactionStatus, fraudStatus);
  await prisma.$transaction(async (tx) => {
    await tx.order.updateMany({ where: { paymentRef: orderId }, data: { paymentStatus: nextStatus } });
    const order = await tx.order.findFirst({ where: { paymentRef: orderId }, include: { member: { select: { referredById: true } } } });
    if (!order?.member.referredById) return;

    if (nextStatus === 'paid') {
      const setting = await tx.referralSetting.upsert({ where: { id: 1 }, update: {}, create: { id: 1, percentage: 5 } });
      const bonusAmount = Math.round(order.subtotalAmount * setting.percentage / 100);
      await tx.referralReward.upsert({
        where: { orderId: order.id },
        update: { status: 'earned' },
        create: { referrerId: order.member.referredById, orderId: order.id, percentageSnapshot: setting.percentage, baseAmount: order.subtotalAmount, bonusAmount, status: 'earned' },
      });
    } else if (['denied', 'cancelled', 'expired', 'failed'].includes(nextStatus)) {
      await tx.referralReward.updateMany({ where: { orderId: order.id }, data: { status: 'cancelled' } });
    }
  });

  return res.status(200).json({ ok: true });
});

// Xendit callback is kept separate from the existing Midtrans webhook.
router.post('/xendit-webhook', async (req, res) => {
  const callbackToken = process.env.XENDIT_CALLBACK_TOKEN ?? '';
  if (callbackToken && req.header('x-callback-token') !== callbackToken) {
    return res.status(401).json({ error: 'invalid callback token' });
  }

  const externalId = String(req.body?.external_id ?? '').trim();
  const status = String(req.body?.status ?? 'PENDING');
  if (!externalId) return res.status(400).json({ error: 'invalid Xendit payload' });

  const nextStatus = mapXenditStatus(status);
  await prisma.$transaction(async (tx) => {
    await tx.order.updateMany({ where: { paymentRef: externalId }, data: { paymentStatus: nextStatus } });
    const order = await tx.order.findFirst({ where: { paymentRef: externalId }, include: { member: { select: { referredById: true } } } });
    if (!order?.member.referredById) return;

    if (nextStatus === 'paid') {
      const setting = await tx.referralSetting.upsert({ where: { id: 1 }, update: {}, create: { id: 1, percentage: 5 } });
      const bonusAmount = Math.round(order.subtotalAmount * setting.percentage / 100);
      await tx.referralReward.upsert({
        where: { orderId: order.id },
        update: { status: 'earned' },
        create: { referrerId: order.member.referredById, orderId: order.id, percentageSnapshot: setting.percentage, baseAmount: order.subtotalAmount, bonusAmount, status: 'earned' },
      });
    } else if (nextStatus === 'expired') {
      await tx.referralReward.updateMany({ where: { orderId: order.id }, data: { status: 'cancelled' } });
    }
  });

  return res.status(200).json({ ok: true });
});

router.get('/history', requireMember, async (req, res) => {
  const memberId = String(req.header('x-member-id') ?? '').trim();
  if (!memberId) return res.status(400).json({ error: 'invalid member' });

  const member = await prisma.member.findUnique({ where: { id: memberId } });
  if (!member) return res.status(401).json({ error: 'member invalid' });

  const orders = await prisma.order.findMany({
    where: { memberId },
    orderBy: { createdAt: 'desc' },
    include: {
      items: true,
    },
  });

  return res.json({
    orders: orders.map((order) => ({
      id: order.id,
      subtotalAmount: order.subtotalAmount,
      ppnAmount: order.ppnAmount,
      totalAmount: order.totalAmount,
      paymentStatus: order.paymentStatus,
      paymentProvider: order.paymentProvider,
      paymentRef: order.paymentRef,
      createdAt: order.createdAt,
      items: order.items.map((item) => ({
        id: item.id,
        productId: item.productId,
        productName: item.productName,
        unitPrice: item.unitPrice,
        quantity: item.quantity,
        lineTotal: item.lineTotal,
      })),
    })),
  });
});
