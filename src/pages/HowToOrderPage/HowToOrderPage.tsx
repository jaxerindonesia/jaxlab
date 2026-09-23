import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShoppingCart, CreditCard, Package, CheckCircle2, ArrowRight } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const steps = [
  {
    number: '01',
    icon: <ShoppingBag size={24} />,
    title: 'Pilih Produk',
    desc: 'Kunjungi halaman Produk dan temukan produk JaxLab yang sesuai dengan kebutuhan Anda. Klik produk untuk melihat detail, manfaat, dan informasi lengkapnya.',
    link: { to: '/products', label: 'Lihat Produk' },
  },
  {
    number: '02',
    icon: <ShoppingCart size={24} />,
    title: 'Tambahkan ke Keranjang',
    desc: 'Pilih jumlah yang diinginkan, lalu klik tombol "Tambah ke Keranjang". Anda bisa menambahkan beberapa produk sekaligus sebelum melanjutkan ke pembayaran.',
    link: null,
  },
  {
    number: '03',
    icon: <Package size={24} />,
    title: 'Isi Data Pengiriman',
    desc: 'Masukkan nama lengkap, nomor telepon, dan alamat pengiriman yang lengkap. Pilih kecamatan tujuan untuk menghitung ongkos kirim secara otomatis.',
    link: null,
  },
  {
    number: '04',
    icon: <CreditCard size={24} />,
    title: 'Pilih Kurir & Pembayaran',
    desc: 'Pilih layanan kurir yang tersedia untuk alamat tujuan Anda. Kemudian pilih metode pembayaran yang diinginkan dan selesaikan transaksi.',
    link: null,
  },
  {
    number: '05',
    icon: <CheckCircle2 size={24} />,
    title: 'Konfirmasi & Pengiriman',
    desc: 'Setelah pembayaran terkonfirmasi, pesanan Anda akan segera diproses dan dikirimkan. Riwayat pesanan dapat dilihat di halaman akun member Anda.',
    link: null,
  },
];

const tips = [
  'Daftar atau masuk sebagai member untuk mempercepat proses checkout dan melihat riwayat pesanan.',
  'Simpan bukti pembayaran sebagai referensi jika diperlukan untuk bantuan.',
  'Pastikan data alamat pengiriman lengkap dan benar untuk menghindari keterlambatan.',
  'Jika memiliki pertanyaan tentang produk sebelum memesan, hubungi kami melalui WhatsApp atau halaman Hubungi Kami.',
];

const HowToOrderPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#f9f5ec]">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0b0f0b] via-[#0e1e12] to-[#0b140d] pb-16 pt-32 max-[640px]:pb-12 max-[640px]:pt-28">
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em] text-[#4ade80]">
            Panduan Pembelian
          </p>
          <h1 className="mb-4 text-[clamp(2rem,4vw,3rem)] font-black leading-[1.1] text-white">
            Cara Pemesanan
          </h1>
          <p className="max-w-[560px] text-[1rem] leading-[1.75] text-white/60">
            Ikuti langkah-langkah mudah berikut untuk memesan produk JaxLab. Proses pemesanan dirancang sederhana agar Anda dapat berbelanja dengan nyaman.
          </p>
        </div>
      </section>

      <main className="flex-1 pb-20 pt-12">
        <div className="mx-auto max-w-[860px] px-6">

          {/* Steps */}
          <div className="mb-14">
            <p className="mb-2 text-[0.8rem] font-extrabold uppercase tracking-[0.14em] text-[#4d7959]">
              Langkah demi Langkah
            </p>
            <h2 className="mb-8 text-[1.6rem] font-black leading-[1.2] text-[#193421] max-[640px]:text-[1.4rem]">
              Alur Pemesanan
            </h2>

            <div className="relative flex flex-col gap-6">
              {/* Vertical line */}
              <div className="absolute left-[27px] top-12 h-[calc(100%-3.5rem)] w-0.5 bg-[#d4edda] max-[640px]:left-[23px]" aria-hidden="true" />

              {steps.map((step, index) => (
                <div key={step.number} className="relative flex gap-5 max-[640px]:gap-4">
                  {/* Step indicator */}
                  <div className="relative z-10 flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-[#1a4d2e] text-white shadow-[0_4px_14px_rgba(26,77,46,0.25)] max-[640px]:h-12 max-[640px]:w-12 max-[640px]:rounded-xl">
                    {step.icon}
                  </div>

                  {/* Content */}
                  <div
                    className={`flex-1 rounded-2xl border border-[#e8e2da] bg-white p-6 shadow-[0_4px_16px_rgba(34,52,40,0.05)] max-[640px]:p-5 ${index === steps.length - 1 ? 'border-[#4ade80]/30 bg-[#f0fdf4]' : ''}`}
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-[0.72rem] font-extrabold uppercase tracking-[0.1em] text-[#4ade80]">
                        Langkah {step.number}
                      </span>
                    </div>
                    <h3 className="mb-2 text-[1rem] font-bold text-[#193421]">{step.title}</h3>
                    <p className="text-[0.875rem] leading-[1.7] text-[#647068]">{step.desc}</p>
                    {step.link && (
                      <Link
                        to={step.link.to}
                        className="mt-3 inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-[#1a4d2e] transition-colors hover:text-[#4ade80]"
                      >
                        {step.link.label} <ArrowRight size={14} />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="mb-10 rounded-2xl border border-[#e8e2da] bg-white p-8 shadow-[0_4px_16px_rgba(34,52,40,0.05)] max-[640px]:p-6">
            <h2 className="mb-5 text-[1.1rem] font-bold text-[#193421]">💡 Tips Belanja</h2>
            <ul className="flex flex-col gap-3">
              {tips.map((tip) => (
                <li key={tip} className="flex gap-3 text-[0.875rem] leading-[1.65] text-[#647068]">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[#4ade80]" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="rounded-2xl bg-gradient-to-br from-[#0e1e12] to-[#1a3a24] p-8 text-center max-[640px]:p-6">
            <h2 className="mb-3 text-[1.35rem] font-black text-white">Siap Mulai Berbelanja?</h2>
            <p className="mx-auto mb-6 max-w-[420px] text-[0.9rem] leading-[1.7] text-white/60">
              Temukan produk JaxLab yang mendukung perjalanan Fat Fasting dan kesehatan metabolik Anda.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-full bg-[#4ade80] px-6 py-2.5 text-[0.9rem] font-bold text-[#0b0f0b] transition-all hover:-translate-y-px hover:bg-[#22c55e]"
              >
                Lihat Semua Produk <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-2.5 text-[0.9rem] font-bold text-white transition-all hover:border-white/40 hover:bg-white/5"
              >
                Butuh Bantuan?
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HowToOrderPage;
