import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface FaqItem {
  q: string;
  a: string;
}

interface FaqGroup {
  group: string;
  items: FaqItem[];
}

const faqData: FaqGroup[] = [
  {
    group: 'Tentang Fat Fasting',
    items: [
      {
        q: 'Apa itu Fat Fasting?',
        a: 'Fat Fasting adalah metode puasa selama 72 jam (3 hari) berturut-turut. Selama masa puasa, yang diperbolehkan hanya mengonsumsi lemak sehat tertentu, air putih, atau minuman nol kalori tanpa kafein. Tujuannya adalah membantu tubuh beralih menggunakan lemak sebagai sumber energi utama.',
      },
      {
        q: 'Siapa yang cocok menjalani Fat Fasting?',
        a: 'Fat Fasting dapat membantu orang dengan berbagai kondisi kesehatan seperti kanker, penyakit ginjal kronis (CKD), diabetes, obesitas, penyakit autoimun, dan tekanan darah tinggi. Namun, kami sangat menyarankan konsultasi dengan dokter atau tenaga medis sebelum memulai, terutama jika Anda memiliki kondisi kesehatan tertentu.',
      },
      {
        q: 'Apa yang boleh dikonsumsi saat Fat Fasting?',
        a: 'Selama Fat Fasting, Anda diperbolehkan mengonsumsi lemak sehat seperti Extra Virgin Olive Oil, Virgin Coconut Oil, Ketone Imuno, dan Vanilla Ghee. Untuk minuman, diperbolehkan air putih dan teh herbal tanpa kalori. Boleh juga menambahkan sedikit garam jika tekanan darah normal atau cenderung rendah.',
      },
      {
        q: 'Berapa lama durasi Fat Fasting?',
        a: 'Protokol standar Fat Fasting JaxLab berlangsung 72 jam (3 hari). Jadwal konsumsi lemak sehat dimulai pukul 08.00, kemudian 13.00 dan 18.30. Hidrasi dilakukan sepanjang hari.',
      },
      {
        q: 'Apakah Fat Fasting aman dilakukan sendiri?',
        a: 'Kami sangat menyarankan untuk memulai Fat Fasting dengan pendampingan, terutama untuk pertama kali. JaxLab memiliki komunitas dan akses tanya jawab dengan dokter untuk mendampingi perjalanan Anda. Bergabunglah dengan komunitas kami melalui WhatsApp yang tercantum di footer.',
      },
    ],
  },
  {
    group: 'Produk JaxLab',
    items: [
      {
        q: 'Apakah produk JaxLab sudah tersertifikasi Halal dan BPOM?',
        a: 'Ya, produk JaxLab telah memenuhi sertifikasi Halal dan BPOM Indonesia. Kami berkomitmen pada standar kualitas dan keamanan produk yang dapat dipercaya.',
      },
      {
        q: 'Apa perbedaan antara Cocofenol dan VCO biasa?',
        a: 'Cocofenol adalah Virgin Coconut Oil yang diproses secara minimal dengan kandungan polifenol tinggi. Polifenol berfungsi sebagai antioksidan alami yang membantu mendukung tubuh selama Fat Fasting. Berbeda dengan VCO biasa yang proses produksinya dapat mengurangi kandungan nutrisi aktif.',
      },
      {
        q: 'Apa itu Ketone Imuno dan bagaimana cara mengonsumsinya?',
        a: 'Ketone Imuno adalah suplemen berbasis keton dan bahan alami yang dirancang untuk mendukung sistem imun sekaligus membantu proses ketosis selama Fat Fasting. Konsumsi 1 sendok teh bersama lemak sehat lainnya sesuai jadwal protokol.',
      },
      {
        q: 'Apa isi Fat Fasting Bundle?',
        a: 'Fat Fasting Bundle adalah paket lengkap produk pendukung Fat Fasting yang dikurasi oleh JaxLab, mencakup Extra Virgin Olive Oil, Cocofenol, dan Ketone Imuno. Paket ini dirancang agar lebih praktis dan efisien dibandingkan membeli produk secara terpisah.',
      },
    ],
  },
  {
    group: 'Pemesanan & Pengiriman',
    items: [
      {
        q: 'Bagaimana cara memesan produk JaxLab?',
        a: 'Anda bisa memesan langsung melalui website ini: pilih produk di halaman Produk, tambahkan ke keranjang, lakukan checkout, pilih kurir dan metode pembayaran, lalu selesaikan pembayaran. Pesanan akan diproses setelah pembayaran terkonfirmasi.',
      },
      {
        q: 'Ke mana saja JaxLab bisa mengirimkan produk?',
        a: 'JaxLab menggunakan layanan pengiriman RajaOngkir yang mendukung berbagai wilayah di Indonesia. Cakupan wilayah dan ketersediaan kurir dapat dicek langsung saat checkout dengan memasukkan alamat tujuan pengiriman Anda.',
      },
      {
        q: 'Berapa lama estimasi pengiriman?',
        a: 'Estimasi waktu pengiriman bergantung pada kurir dan wilayah tujuan yang dipilih. Informasi ini akan ditampilkan saat Anda memilih layanan pengiriman di halaman checkout.',
      },
      {
        q: 'Apakah saya bisa melacak pesanan saya?',
        a: 'Setelah pesanan dikonfirmasi dan produk dikirim, Anda akan mendapatkan informasi resi pengiriman. Riwayat pesanan dapat dilihat di halaman akun member Anda.',
      },
    ],
  },
  {
    group: 'Akun & Pembayaran',
    items: [
      {
        q: 'Apakah saya perlu mendaftar untuk berbelanja?',
        a: 'Mendaftar akun member memungkinkan Anda melihat riwayat pesanan dan mempercepat proses checkout di pembelian berikutnya. Daftar gratis melalui halaman Masuk / Daftar di pojok kanan atas.',
      },
      {
        q: 'Metode pembayaran apa yang diterima?',
        a: 'JaxLab menerima berbagai metode pembayaran yang tersedia di halaman checkout. Metode yang tersedia dapat bervariasi. Semua transaksi diproses melalui gateway pembayaran yang aman.',
      },
      {
        q: 'Bagaimana jika saya ingin mengajukan pengembalian dana?',
        a: 'Silakan hubungi tim kami melalui halaman Hubungi Kami dengan menyertakan nama, email, nomor pesanan, dan penjelasan masalah. Tim kami akan merespons dan memproses pengajuan sesuai Kebijakan Pengembalian Dana yang berlaku.',
      },
    ],
  },
];

const FaqPage: React.FC = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggle = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f9f5ec]">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0b0f0b] via-[#0e1e12] to-[#0b140d] pb-16 pt-32 max-[640px]:pb-12 max-[640px]:pt-28">
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em] text-[#4ade80]">
            Pusat Bantuan
          </p>
          <h1 className="mb-4 text-[clamp(2rem,4vw,3rem)] font-black leading-[1.1] text-white">
            Pertanyaan yang Sering Diajukan
          </h1>
          <p className="max-w-[560px] text-[1rem] leading-[1.75] text-white/60">
            Temukan jawaban atas pertanyaan seputar Fat Fasting, produk JaxLab, pemesanan, dan layanan kami.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <main className="flex-1 pb-20 pt-10">
        <div className="mx-auto max-w-[860px] px-6">
          {faqData.map((section) => (
            <div key={section.group} className="mb-10">
              <h2 className="mb-4 text-[1.05rem] font-extrabold uppercase tracking-[0.1em] text-[#1a4d2e]">
                {section.group}
              </h2>
              <div className="flex flex-col divide-y divide-[#e8e2da] overflow-hidden rounded-2xl border border-[#e8e2da] bg-white shadow-[0_4px_20px_rgba(34,52,40,0.05)]">
                {section.items.map((item, idx) => {
                  const key = `${section.group}-${idx}`;
                  const isOpen = openItem === key;
                  return (
                    <div key={key}>
                      <button
                        type="button"
                        onClick={() => toggle(key)}
                        aria-expanded={isOpen}
                        className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-[#f3f8f4]"
                      >
                        <span className="text-[0.97rem] font-semibold leading-[1.4] text-[#193421]">
                          {item.q}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`mt-0.5 shrink-0 text-[#4ade80] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
                      >
                        <p className="px-6 pb-5 text-[0.92rem] leading-[1.75] text-[#647068]">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Still need help */}
          <div className="mt-6 rounded-2xl bg-gradient-to-br from-[#0e1e12] to-[#1a3a24] p-8 text-center max-[640px]:p-6">
            <p className="mb-2 text-[0.8rem] font-extrabold uppercase tracking-[0.15em] text-[#4ade80]">
              Masih Ada Pertanyaan?
            </p>
            <h2 className="mb-3 text-[1.4rem] font-black text-white">
              Tim Kami Siap Membantu
            </h2>
            <p className="mx-auto mb-6 max-w-[420px] text-[0.9rem] leading-[1.7] text-white/60">
              Tidak menemukan jawaban yang Anda cari? Hubungi kami langsung dan kami akan merespons secepatnya.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#4ade80] px-6 py-2.5 text-[0.9rem] font-bold text-[#0b0f0b] transition-all hover:-translate-y-px hover:bg-[#22c55e]"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FaqPage;
