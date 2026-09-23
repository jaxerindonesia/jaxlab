import Header from '../../components/Header';
import Footer from '../../components/Footer';

type Section = { title: string; body: string };

const content: Record<string, { title: string; intro: string; sections: Section[] }> = {
  terms: {
    title: 'Syarat & Ketentuan',
    intro: 'Halaman ini menjelaskan ketentuan umum penggunaan website dan pemesanan produk JaxLab.',
    sections: [
      ['Ketentuan penggunaan website', 'Dengan menggunakan website ini, Anda menyetujui ketentuan yang berlaku dan wajib memberikan informasi yang benar saat melakukan pemesanan.'],
      ['Informasi produk', 'Informasi, gambar, ketersediaan, dan deskripsi produk ditampilkan untuk membantu keputusan pembelian. Detail dapat berubah mengikuti pembaruan produk.'],
      ['Harga dan pembayaran', 'Harga ditampilkan dalam Rupiah (IDR). Pembayaran diproses melalui penyedia pembayaran yang tersedia pada halaman checkout. Pesanan diproses setelah pembayaran terkonfirmasi.'],
      ['Proses pemesanan', 'Pesanan dibuat setelah produk, jumlah, alamat, dan metode pengiriman diperiksa oleh pelanggan. Simpan bukti transaksi untuk keperluan bantuan.'],
      ['Pengiriman', 'Biaya dan estimasi pengiriman dihitung berdasarkan tujuan, berat, serta layanan kurir yang tersedia. Ketersediaan layanan dapat berbeda untuk setiap tujuan.'],
      ['Pembatalan', 'Permintaan pembatalan harus disampaikan melalui kontak bantuan secepatnya. Persetujuan bergantung pada status pemrosesan pesanan.'],
      ['Pengembalian dana', 'Ketentuan pengembalian dana dijelaskan pada halaman Kebijakan Pengembalian Dana.'],
      ['Tanggung jawab pengguna', 'Pengguna bertanggung jawab menjaga kebenaran data pemesanan dan keamanan akses akunnya.'],
      ['Perubahan ketentuan', 'JaxLab dapat memperbarui ketentuan ini ketika layanan atau proses bisnis berubah. Versi terbaru selalu ditampilkan di halaman ini.'],
      ['Kontak perusahaan', 'Untuk bantuan, hubungi JaxLab melalui halaman Hubungi Kami atau kanal kontak yang tercantum pada footer website.'],
    ].map(([title, body]) => ({ title, body })),
  },
  refund: {
    title: 'Kebijakan Pengembalian Dana',
    intro: 'Kebijakan ini menjelaskan informasi umum pengajuan pengembalian dana JaxLab. Detail yang belum ditetapkan akan dikonfirmasi saat permintaan diterima.',
    sections: [
      ['Kondisi pengajuan pengembalian dana', 'Pengajuan dapat disampaikan jika terdapat masalah pada pesanan atau pembayaran. Sertakan nomor pesanan dan penjelasan masalah agar dapat diverifikasi.'],
      ['Produk yang memenuhi atau tidak memenuhi syarat refund', 'Kelayakan refund ditentukan setelah pemeriksaan kondisi pesanan, bukti pembayaran, dan kronologi. Kriteria khusus produk dan pengecualian belum ditetapkan pada informasi publik yang tersedia; konfirmasi melalui kontak bantuan.'],
      ['Cara mengajukan refund', 'Hubungi JaxLab melalui halaman Hubungi Kami dengan mencantumkan nama, email, nomor pesanan, alasan pengajuan, dan bukti pendukung.'],
      ['Proses verifikasi refund', 'JaxLab akan meninjau informasi dan dapat meminta data tambahan sebelum keputusan dibuat.'],
      ['Metode pengembalian dana', 'Metode refund mengikuti metode pembayaran atau instruksi yang disepakati setelah verifikasi.'],
      ['Estimasi proses', 'Estimasi waktu pengembalian dana belum ditetapkan pada informasi publik yang tersedia. Silakan minta estimasi saat mengajukan refund.'],
      ['Kontak bantuan', 'Gunakan halaman Hubungi Kami untuk mengajukan pertanyaan atau permintaan refund.'],
    ].map(([title, body]) => ({ title, body })),
  },
  service: {
    title: 'Ketentuan Layanan',
    intro: 'Ketentuan ini mengatur ruang lingkup layanan JaxLab melalui website.',
    sections: [
      ['Ruang lingkup layanan', 'Website menyediakan informasi produk, akun member, keranjang, pemesanan, pembayaran, serta informasi pengiriman.'],
      ['Hak dan kewajiban pengguna', 'Pengguna berhak memperoleh informasi transaksi dan wajib memberikan data yang benar serta menggunakan layanan secara wajar.'],
      ['Pemesanan dan pembayaran', 'Pemesanan dilakukan melalui checkout. Harga menggunakan IDR dan pembayaran diselesaikan melalui penyedia pembayaran yang tersedia.'],
      ['Ketersediaan layanan dan produk', 'Ketersediaan produk, kurir, dan layanan dapat berubah tanpa pemberitahuan sebelumnya mengikuti kondisi operasional.'],
      ['Pembatasan penggunaan', 'Dilarang menggunakan website untuk tindakan melanggar hukum, mengganggu keamanan layanan, atau memberikan data palsu.'],
      ['Tanggung jawab', 'JaxLab berupaya menjaga informasi dan layanan tetap tersedia. Gangguan dari jaringan, kurir, atau penyedia pembayaran dapat memengaruhi proses transaksi.'],
      ['Perubahan layanan', 'JaxLab dapat memperbarui, menyesuaikan, atau menghentikan sebagian layanan dengan menampilkan informasi terbaru di website.'],
      ['Kontak', 'Pertanyaan layanan dapat disampaikan melalui halaman Hubungi Kami atau kontak pada footer.'],
    ].map(([title, body]) => ({ title, body })),
  },
};

export default function LegalPage({ kind }: { kind: keyof typeof content }) {
  const page = content[kind];
  return <div className="flex min-h-screen flex-col bg-[#f9f5ec]"><Header /><main className="flex-1 px-6 pb-16 pt-32 max-[640px]:px-4 max-[640px]:pt-28"><article className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-[0_20px_55px_rgba(34,52,40,0.09)] max-[640px]:p-5"><p className="mb-3 text-xs font-extrabold uppercase tracking-[0.12em] text-[#3f7651]">JaxLab Indonesia</p><h1 className="m-0 text-3xl font-black text-[#193421] max-[640px]:text-2xl">{page.title}</h1><p className="mt-4 leading-relaxed text-[#5f6b62]">{page.intro}</p><div className="mt-8 space-y-7">{page.sections.map((section) => <section key={section.title}><h2 className="mb-2 text-lg font-extrabold text-[#193421]">{section.title}</h2><p className="m-0 leading-7 text-[#536258]">{section.body}</p></section>)}</div></article></main><Footer /></div>;
}
