# Konfigurasi Winpay

Branch ini sudah menyediakan endpoint notifikasi Winpay:

`POST https://jaxlabofficial.id/api/orders/winpay/callback`

Endpoint tersebut mencari order berdasarkan `order_id`, `external_id`, `referenceNo`, atau `trxId`, lalu memperbarui status order. Callback token opsional dapat diaktifkan melalui `WINPAY_CALLBACK_TOKEN`.

## Isi di server

Tambahkan nilai berikut ke `.env` server (jangan commit secret):

```env
WINPAY_ENABLED=false
WINPAY_API_BASE_URL_SANDBOX=https://sandbox-checkout.winpay.id
WINPAY_API_BASE_URL_PRODUCTION=https://checkout.winpay.id
WINPAY_MERCHANT_KEY=
WINPAY_SECRET_KEY=
WINPAY_INVOICE_INTERVAL_MINUTES=120
WINPAY_CALLBACK_URL=https://jaxlabofficial.id/api/orders/winpay/callback
```

`WINPAY_MERCHANT_KEY` dan `WINPAY_SECRET_KEY` diisi sesuai kredensial Winpay. Aplikasi memilih URL sandbox saat `NODE_ENV` bukan `production`, dan URL production saat `NODE_ENV=production`.

## Isi di dashboard Winpay

- **URL Callback (Notification):** `https://jaxlabofficial.id/api/orders/winpay/callback`
- **URL Logo:** URL HTTPS logo publik, misalnya `https://jaxlabofficial.id/logo.png`
- **Key / Secret Key:** salin dari Winpay ke `.env` server, bukan ke frontend atau Git.

Setelah menyimpan `.env`, restart API:

```bash
npm ci
npm run prisma:generate
npm run build
pm2 restart jaxlab-api --update-env
```

Saat `WINPAY_ENABLED=true`, checkout membuat invoice melalui `POST /api/create`, menandatangani timestamp dengan HMAC-SHA256, menyimpan referensi order, lalu mengembalikan `redirect_url` Checkout Page Winpay. Alur Midtrans/Xendit tetap menjadi fallback saat Winpay dimatikan.
