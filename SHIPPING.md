# Pengiriman RajaOngkir

Konfigurasi dibaca oleh backend dari `.env` di direktori `jaxlab`. API key tidak boleh memakai prefix `VITE_`.

Variabel yang diperlukan: `RAJAONGKIR_API_KEY`, `RAJAONGKIR_BASE_URL`, `RAJAONGKIR_ORIGIN_ID`, `RAJAONGKIR_DEFAULT_WEIGHT_GRAMS`, dan `RAJAONGKIR_COURIERS`.

Origin dan tujuan memakai ID hasil `/destination/domestic-destination`, bukan ID kecamatan dari API district. Tarif diambil melalui POST `/calculate/domestic-cost`, header `key`, body form-urlencoded, dan berat dalam gram. Daftar kurir dipisahkan titik dua. Layanan yang ditampilkan mengikuti hasil API untuk rute dan berat yang dipilih; tidak semua kurir selalu tersedia.

Berat dihitung dari spesifikasi produk (prioritas: Berat pengiriman, Berat barang, Berat), dikalikan jumlah. Jika belum tersedia, gunakan berat default dari env per barang. Tarif diperiksa ulang sebelum pesanan dibuat.

## Lokal

Jalankan `npm run dev` dari direktori `jaxlab`. Restart proses setelah mengganti `.env`.

## Server

Deploy perubahan source dan hasil `npm run build`. Jalankan backend dengan `npm run start:api` dari direktori `jaxlab` melalui process manager yang digunakan server. Script ini membutuhkan dependency `tsx`. Pastikan `.env` server berisi konfigurasi yang benar, lalu restart proses backend. Environment yang disetel process manager memiliki prioritas terhadap nilai file `.env`; perbarui juga jika masih menyimpan nilai lama.

Web server harus menyajikan `dist` dan meneruskan `/api/` ke backend (default port 3001). Proxy Vite hanya berlaku untuk development. Timeout proxy harus mengakomodasi permintaan checkout (60 detik).

Verifikasi dengan mencari kelurahan/kode pos di checkout, memilih layanan, dan mengubah jumlah produk. Tarif harus dimuat ulang; kegagalan API harus menampilkan pesan dan pembayaran harus tetap terkunci tanpa layanan valid.

## Pengujian

`node --import tsx --test src/api/routes/shipping.test.ts`

Dokumentasi: https://rajaongkir.com/docs/shipping-cost/endpoint-rajaongkir-for-search-base/calculate-domestic-cost
