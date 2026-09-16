import nodemailer from 'nodemailer';
import { emailConfiguration } from '../src/api/lib/account-email';

try {
  const config = emailConfiguration();
  const transport = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    requireTLS: true,
    auth: { user: config.user, pass: config.pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
    disableFileAccess: true,
    disableUrlAccess: true,
  });
  await transport.verify();
  console.log(`SMTP connection verified: ${config.host}:${config.port}`);
  await transport.close();
} catch (error) {
  console.error(error instanceof Error ? error.message : 'SMTP verification failed');
  process.exitCode = 1;
}