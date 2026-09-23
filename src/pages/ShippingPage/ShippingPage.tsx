import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Truck, Info, ArrowRight } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const infoItems = [
  {
    icon: <Truck size={22} />,
    title: 'Layanan Pengiriman',
    content:
      'JaxLab menggunakan layanan pengiriman dari RajaOngkir yang mendukung berbagai kurir di Indonesia. Pilihan kurir dan layanan yang tersedia bergantung pada wilayah tujuan pengiriman Anda dan akan ditampilkan saat checkout.',
  },
  {
    icon: <MapPin size={22} />,
    title: 'Cakupan Wilayah',
    content:
      'Pengiriman tersedia ke berbagai wilayah di Indonesia. Untuk memastikan pengiriman ke lokasi Anda, masukkan alamat tujuan pada halaman checkout. Sistem akan secara otomatis menampilkan kurir dan layanan yang tersedia.',
  },
  {
    icon: <Info size={22} />,
    title: 'Biaya & Estimasi Pengiriman',
    content:
      'Biaya pengiriman dihitung berdasarkan berat produk, kurir yang dipilih, dan jarak ke alamat tujuan. Estimasi waktu pengiriman ditampilkan saat Anda memilih layanan kurir di halaman checkout. Informasi ini bersifat estimasi dari penyedia layanan kurir.',
  },
];

const faqShipping = [
  {
    q: 'Bagaimana cara mengetahui ongkos kirim ke alamat saya?',
    a: 'Masukkan alamat tujuan Anda di halaman checkout. Sistem akan menghitung dan menampilkan pilihan kurir beserta biaya dan estimasi pengiriman secara otomatis.',
  },
  {
    q: 'Apa yang harus dilakukan jika paket tidak tiba?',
    a: 'Segera hubungi kami melalui halaman Hubungi Kami dengan menyertakan nomor pesanan Anda. Tim kami akan membantu melakukan pengecekan status pengiriman.',
  },
  {
    q: 'Apakah ada minimum pembelian untuk pengiriman?',
    a: 'Tidak ada minimum pembelian khusus. Biaya dan ketersediaan layanan pengiriman bergantung pada kurir yang dipilih untuk rute dan berat yang sesuai.',
  },
  {
    q: 'Bagaimana jika produk diterima dalam kondisi rusak?',
    a: 'Dokumentasikan kondisi paket saat diterima dan segera hubungi kami. Pengajuan dapat dilakukan melalui halaman Hubungi Kami sesuai dengan Kebijakan Pengembalian Dana yang berlaku.',
  },
];

const ShippingPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#f9f5ec]">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0b0f0b] via-[#0e1e12] to-[#0b140d] pb-16 pt-32 max-[640px]:pb-12 max-[640px]:pt-28">
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em] text-[#4ade80]">
            Informasi Layanan
          </p>
          <h1 className="mb-4 text-[clamp(2rem,4vw,3rem)] font-black leading-[1.1] text-white">
            Informasi Pengiriman
          </h1>
          <p className="max-w-[560px] text-[1rem] leading-[1.75] text-white/60">
            Pelajari informasi seputar layanan pengiriman yang digunakan JaxLab, cakupan wilayah, dan cara menghitung ongkos kirim.
          </p>
        </div>
      </section>

      <main className="flex-1 pb-20 pt-12">
        <div className="mx-auto max-w-[860px] px-6">

          {/* Info Cards */}
          <div className="mb-12 flex flex-col gap-5">
            {infoItems.map((item) => (
              <div
                key={item.title}
                className="flex gap-5 rounded-2xl border border-[#e8e2da] bg-white p-6 shadow-[0_4px_16px_rgba(34,52,40,0.05)] max-[640px]:flex-col max-[640px]:gap-3 max-[640px]:p-5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e6f1ea] text-[#1a4d2e]">
                  {item.icon}
                </div>
                <div>
                  <h2 className="mb-2 text-[1rem] font-bold text-[#193421]">{item.title}</h2>
                  <p className="text-[0.875rem] leading-[1.75] text-[#647068]">{item.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          <div className="mb-12 rounded-2xl border border-[#d4edda] bg-[#f0fdf4] p-6 max-[640px]:p-5">
            <div className="flex gap-3">
              <Info size={18} className="mt-0.5 shrink-0 text-[#1a4d2e]" />
              <p className="text-[0.875rem] leading-[1.75] text-[#3a6047]">
                <strong>Catatan:</strong> Ketersediaan kurir dan layanan pengiriman dapat berbeda untuk setiap rute dan berat produk. Untuk informasi pengiriman yang paling akurat, lakukan pengecekan langsung saat proses checkout.
              </p>
            </div>
          </div>

          {/* FAQ Pengiriman */}
          <div className="mb-12">
            <h2 className="mb-6 text-[1.35rem] font-black text-[#193421]">
              Pertanyaan Seputar Pengiriman
            </h2>
            <div className="flex flex-col divide-y divide-[#e8e2da] overflow-hidden rounded-2xl border border-[#e8e2da] bg-white shadow-[0_4px_16px_rgba(34,52,40,0.05)]">
              {faqShipping.map((item) => (
                <div key={item.q} className="p-6 max-[640px]:p-5">
                  <h3 className="mb-2 text-[0.95rem] font-bold text-[#193421]">{item.q}</h3>
                  <p className="text-[0.875rem] leading-[1.7] text-[#647068]">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-2xl bg-gradient-to-br from-[#0e1e12] to-[#1a3a24] p-8 text-center max-[640px]:p-6">
            <h2 className="mb-3 text-[1.35rem] font-black text-white">Ada Pertanyaan Lain?</h2>
            <p className="mx-auto mb-6 max-w-[400px] text-[0.9rem] leading-[1.7] text-white/60">
              Tim JaxLab siap membantu Anda dengan informasi pengiriman dan pemesanan.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#4ade80] px-6 py-2.5 text-[0.9rem] font-bold text-[#0b0f0b] transition-all hover:-translate-y-px hover:bg-[#22c55e]"
              >
                Hubungi Kami <ArrowRight size={16} />
              </Link>
              <Link
                to="/how-to-order"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-2.5 text-[0.9rem] font-bold text-white transition-all hover:border-white/40 hover:bg-white/5"
              >
                Cara Pemesanan
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ShippingPage;
