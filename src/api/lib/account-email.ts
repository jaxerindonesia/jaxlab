import nodemailer from 'nodemailer';

export function emailConfiguration() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const from = process.env.SMTP_FROM;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const base = new URL(process.env.PUBLIC_BASE_URL || 'http://invalid');
  if (!host || !user || !pass || ['app-password', 'password-atau-app-password'].includes(pass.trim().toLowerCase()) || !from || !Number.isInteger(port) || port < 1 || port > 65535 ||
    (base.protocol !== 'https:' && !(base.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(base.hostname)))) {
    throw new Error('Layanan email belum dikonfigurasi. Silakan hubungi admin.');
  }
  return { host, user, pass, from, port, base };
}

export async function sendAccountEmail(to: string, token: string, purpose: 'reset_password' | 'change_email') {
  const config = emailConfiguration();
  const transport = nodemailer.createTransport({
    host: config.host, port: config.port, secure: config.port === 465,
    requireTLS: true,
    auth: { user: config.user, pass: config.pass },
    connectionTimeout: 10_000, greetingTimeout: 10_000, socketTimeout: 15_000,
    disableFileAccess: true, disableUrlAccess: true,
  });
  const url = new URL(purpose === 'reset_password' ? '/member/reset-password' : '/member/verify-email', config.base);
  // Fragment tokens are not sent to the web server or in HTTP referrers.
  url.hash = new URLSearchParams({ token }).toString();
  const title = purpose === 'reset_password' ? 'Atur ulang password Jaxlab' : 'Verifikasi email baru Jaxlab';
  await transport.sendMail({
    from: config.from, to: { address: to, name: '' }, subject: title,
    text: `${title}\n\nBuka tautan berikut untuk melanjutkan:\n${url.href}\n\nTautan berlaku 15 menit dan hanya dapat digunakan sekali.\nJika Anda tidak meminta perubahan ini, abaikan email ini.\n\nJaxlab Indonesia`,
  });
}
