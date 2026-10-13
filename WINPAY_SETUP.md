# Konfigurasi Winpay

Branch ini sudah menyediakan endpoint notifikasi Winpay:

`POST https://jaxlabofficial.id/api/orders/winpay/callback`

Endpoint tersebut mencari order berdasarkan `order_id`, `external_id`, `referenceNo`, atau `trxId`, lalu memperbarui status order. Callback token opsional dapat diaktifkan melalui `WINPAY_CALLBACK_TOKEN`.

## Isi di server

Tambahkan nilai berikut ke `.env` server (jangan commit secret):

```env
WINPAY_ENABLED=false
WINPAY_API_BASE_URL=
WINPAY_MERCHANT_KEY=
WINPAY_SECRET_KEY=
WINPAY_CALLBACK_TOKEN=
WINPAY_CALLBACK_URL=https://jaxlabofficial.id/api/orders/winpay/callback
```

`WINPAY_API_BASE_URL`, `WINPAY_MERCHANT_KEY`, dan `WINPAY_SECRET_KEY` diisi sesuai mode dan kredensial yang diberikan Winpay. Nilai `WINPAY_CALLBACK_TOKEN` hanya diisi jika dashboard Winpay mendukung header token bersama; header yang diterima aplikasi adalah `X-Callback-Token` atau `X-Winpay-Token`.

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

Integrasi pembuatan transaksi Winpay belum diaktifkan otomatis karena endpoint pembayaran, format signature, dan field wajib berbeda menurut produk Winpay yang diaktifkan di akun merchant. Callback sudah aman ditambahkan dan tidak mengubah alur Midtrans/Xendit yang ada. Setelah Winpay memberikan spesifikasi API produk yang dipakai, fungsi pembuatan transaksi dapat dihubungkan ke checkout menggunakan variabel di atas.
