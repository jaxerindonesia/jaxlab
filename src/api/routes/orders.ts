import { createHash, randomUUID } from 'node:crypto';
import { Router } from 'express';
import { prisma } from '../lib/prisma';

export const router = Router();

const PPN_RATE = 0.11;

function getMidtransSnapUrl() {
  const baseUrl = process.env.NODE_ENV === 'production' ? process.env.MIDTRANS_URL_PRODUCTION : process.env.MIDTRANS_URL_SANDBOX;
  if (!baseUrl) throw new Error('Midtrans URL belum di-set');
  return `${baseUrl}/snap/v1/transactions`;
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

router.post('/checkout', async (req, res) => {
  const memberId = String(req.header('x-member-id') ?? '').trim();
  const items = Array.isArray(req.body?.items) ? req.body.items : [];
  if (!memberId || items.length === 0) return res.status(400).json({ error: 'invalid checkout' });

  const member = await prisma.member.findUnique({ where: { id: memberId } });
  if (!member) return res.status(401).json({ error: 'member invalid' });

  const productIds = items.map((i: { productId: string }) => i.productId);
  const products = await prisma.product.findMany({ where: { id: { in: productIds }, deletedAt: null }, select: { id: true, name: true, sellPrice: true } });
  const map = new Map(products.map((p) => [p.id, p]));

  const normalized = items
    .map((i: { productId: string; qty: number }) => ({ productId: String(i.productId), qty: Math.max(1, Number(i.qty || 1)) }))
    .filter((i: { productId: string; qty: number }) => map.has(i.productId));

  if (!normalized.length) return res.status(400).json({ error: 'no valid items' });

  const subtotal = normalized.reduce((sum: number, i: { productId: string; qty: number }) => sum + (map.get(i.productId)?.sellPrice ?? 0) * i.qty, 0);
  const ppnAmount = Math.round(subtotal * PPN_RATE);
  const total = subtotal + ppnAmount;

  const order = await prisma.$transaction(async (tx) => {
    const created = await tx.order.create({
      data: { memberId: member.id, subtotalAmount: subtotal, ppnAmount, totalAmount: total },
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

  const serverKey = process.env.MIDTRANS_SERVER_KEY ?? '';
  if (!serverKey) return res.status(500).json({ error: 'MIDTRANS_SERVER_KEY belum di-set' });

  const auth = Buffer.from(`${serverKey}:`).toString('base64');
  const externalOrderId = `JAX-${order.id}-${randomUUID().slice(0, 8)}`;
  const customerName = splitName(member.name);
  const publicBaseUrl = (process.env.PUBLIC_BASE_URL ?? '').replace(/\/$/, '');
  const appBaseUrl = publicBaseUrl || `${req.protocol}://${req.get('host')}`;

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
        { id: 'PPN11', name: 'PPN 11%', price: ppnAmount, quantity: 1 },
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
    snapToken: snapJson.token,
    redirectUrl: snapJson.redirect_url,
    subtotal,
    ppnAmount,
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
  await prisma.order.updateMany({ where: { paymentRef: orderId }, data: { paymentStatus: nextStatus } });

  return res.status(200).json({ ok: true });
});

router.get('/history', async (req, res) => {
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
