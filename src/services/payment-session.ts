import type { CheckoutResponseDto } from './models/CheckoutDto';

const KEY = 'jaxlab_payment_sessions';

export type PaymentSession = {
  orderId: string;
  paymentRef: string;
  snapToken: string;
  redirectUrl?: string;
  paymentProvider?: 'xendit' | 'midtrans';
  createdAt: string;
};

function readSessions(): Record<string, PaymentSession> {
  const raw = localStorage.getItem(KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Record<string, PaymentSession>;
  } catch {
    return {};
  }
}

function writeSessions(sessions: Record<string, PaymentSession>): void {
  localStorage.setItem(KEY, JSON.stringify(sessions));
}

export function savePaymentSession(response: CheckoutResponseDto): void {
  const sessions = readSessions();
  sessions[response.paymentRef] = {
    orderId: response.orderId,
    paymentRef: response.paymentRef,
    snapToken: response.snapToken,
    redirectUrl: response.redirectUrl,
    paymentProvider: response.paymentProvider,
    createdAt: new Date().toISOString(),
  };
  writeSessions(sessions);
}

export function getPaymentSession(paymentRef: string): PaymentSession | null {
  return readSessions()[paymentRef] ?? null;
}

export function clearPaymentSession(paymentRef: string): void {
  const sessions = readSessions();
  delete sessions[paymentRef];
  writeSessions(sessions);
}
