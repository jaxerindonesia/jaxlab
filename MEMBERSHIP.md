# Akun, affiliate, dan keranjang

Login dan registrasi member menghasilkan cookie HttpOnly dengan masa berlaku tetap 24 jam. Backend memeriksa sesi untuk keranjang, riwayat pesanan, referral, dan checkout; aktivitas tidak memperpanjang sesi. Browser juga mengeluarkan akun saat tenggat tercapai, termasuk saat tab aktif kembali. Login lama tanpa waktu kedaluwarsa perlu login ulang.

Registrasi menyediakan pilihan menjadi affiliate. Pilihan Ya mewajibkan 1–5 foto pendukung bebas berupa JPG, PNG, atau WebP, maksimal 2 MB per file. Backend memvalidasi tipe, signature, jumlah, dan ukuran. Foto disimpan dalam database dan tidak disertakan dalam respons login atau profil publik.

Keranjang member disimpan di database dan cache browser dengan kunci per ID akun. Ikon menjumlahkan quantity. Keranjang dimuat saat login, berpindah halaman, atau jendela kembali fokus. Perubahan yang gagal tersimpan tetap ditandai untuk sinkronisasi berikutnya. Keranjang tamu baru digabungkan setelah keranjang akun berhasil dimuat. Data lama dengan kunci global `jaxlab_cart` tidak otomatis diberikan ke akun mana pun karena pemiliknya tidak tercatat.

## Menjalankan perubahan

1. Install dependency dengan `npm ci`.
2. Jalankan `npx prisma migrate deploy` dan `npx prisma generate`. Hentikan API sementara jika Windows mengunci engine Prisma.
3. Jalankan `npm run build`, deploy `dist` dan source API, lalu restart API. Lokal: `npm run dev`.
4. Gunakan frontend dan API pada origin yang sama; teruskan `/api` melalui reverse proxy. `PUBLIC_BASE_URL` HTTPS mengaktifkan cookie Secure untuk server HTTPS.

Migrasi `20260909090000_member_sessions_affiliate_cart` bersifat tambahan: menambah kolom member dan tabel sesi. Tidak menghapus akun atau pesanan.

## Pengujian

- `npm run test:members`: menguji login, expiry, logout, affiliate, dan isolasi keranjang. Memakai database dari `.env`, membuat akun sementara `@example.invalid`, lalu menghapus hanya akun uji tersebut.
- `npm run test:browser`: jalankan saat website lokal tersedia di port 5173 dan Microsoft Edge terpasang. API login/keranjang dimock untuk uji UI tanpa memakai akun pelanggan. Menguji Sonner, upload, navigasi, pergantian akun, dan simulasi 24 jam.

Notifikasi login menggunakan komponen Sonner sesuai pola shadcn/ui: https://ui.shadcn.com/docs/components/radix/sonner
