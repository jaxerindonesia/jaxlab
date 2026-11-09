import express, { Router, type Request, type Response } from 'express';
import { parseJaxpayPayload, verifyJaxpaySignature } from '../lib/jaxpayWebhook';
import { applyJaxpayNotification } from '../services/jaxpayOrder';

const router = Router();

router.post('/callback', express.raw({ type: '*/*', limit: '1mb' }), async (req: Request, res: Response) => {
  const secret = process.env.JAXPAY_WEBHOOK_SECRET || '';
  if (!secret) {
    console.error('[jaxpay-callback] JAXPAY_WEBHOOK_SECRET belum diisi');
    return res.status(500).json({ success: false, error: 'server not configured' });
  }
  const rawBody = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : '';
  if (!verifyJaxpaySignature(rawBody, req.header('x-signature'), secret)) return res.status(401).json({ success: false, error: 'invalid signature' });
  let body: Record<string, unknown>;
  try { body = JSON.parse(rawBody); } catch { return res.status(400).json({ success: false, error: 'invalid json' }); }
  const notification = parseJaxpayPayload(body);
  if (!notification) return res.status(400).json({ success: false, error: 'invalid payload' });
  try {
    const { result } = await applyJaxpayNotification(notification);
    if (result === 'not_found') return res.status(404).json({ success: false, error: 'order not found' });
    if (result === 'amount_mismatch') return res.status(422).json({ success: false, error: 'amount mismatch' });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('[jaxpay-callback] error', error);
    return res.status(500).json({ success: false, error: 'internal error' });
  }
});

export default router;
