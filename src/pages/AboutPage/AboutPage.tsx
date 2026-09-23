import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Leaf, Heart, ShieldCheck, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const values = [
  {
    icon: <Leaf size={24} />,
    title: 'Bahan Alami Pilihan',
    desc: 'Setiap produk JaxLab dibuat dari bahan alami terpilih dengan proses minimal, sehingga nutrisi dan manfaat alami tetap terjaga dengan baik.',
  },
  {
    icon: <Heart size={24} />,
    title: 'Untuk Keluarga Indonesia',
    desc: 'Kami menghadirkan produk yang aman, terjangkau, dan menyehatkan untuk semua usia — mulai dari anak-anak, orang tua, hingga keluarga Anda.',
  },
  {
    icon: <ShieldCheck size={24} />,
    title: 'Standar Higienis & Teruji',
    desc: 'Proses produksi dilakukan dengan standar kebersihan tinggi dan pemantauan kualitas yang ketat untuk memberikan rasa aman di setiap kemasan.',
  },
];

const journey = [
  {
    year: 'Awal Misi',
    title: 'Mulai dari Kepedulian',
    text: 'JaxLab lahir dari keresahan akan sulitnya makanan sehat yang praktis, terjangkau, dan benar-benar alami untuk keluarga di Indonesia.',
  },
  {
    year: 'Riset & Pengembangan',
    title: 'Formula yang Diuji',
    text: 'Kami melakukan riset mendalam bersama praktisi kesehatan untuk menghadirkan formula produk yang tepat dan sesuai dengan kebutuhan nutrisi keluarga.',
  },
  {
    year: 'Hingga Saat Ini',
    title: 'Dipercaya Ribuan Keluarga',
    text: 'Produk JaxLab telah digunakan oleh ribuan keluarga di berbagai wilayah Indonesia sebagai pendukung gaya hidup sehat yang sederhana dan konsisten.',
  },
];

const AboutPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#f9f5ec]">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#14552e] via-[#193b24] to-[#0e2a1a] pb-20 pt-32 text-white max-[640px]:pb-16 max-[640px]:pt-28">
        <div className="pointer-events-none absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, #ffffff 0, transparent 40%), radial-gradient(circle at 80% 60%, #ffffff 0, transparent 35%)' }} />
        <div className="relative mx-auto max-w-[1200px] px-6">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#cfe9d6]">
            <Leaf size={14} /> Tentang JaxLab
          </span>
          <h1 className="max-w-[820px] text-[clamp(2.1rem,4.4vw,3.3rem)] font-black leading-[1.1] tracking-[-0.02em]">
            Pendukung Alami untuk <span className="text-[#b6e3c1]">Hidup Sehat Keluarga Anda</span>
          </h1>
          <p className="mt-5 max-w-[620px] text-[1.05rem] leading-[1.8] text-white/80">
            JaxLab adalah merek produk kesehatan dan nutrisi alami yang berfokus menyediakan solusi praktis untuk keluarga Indonesia.
            Mulai dari kebutuhan puasa sehat, detoks tubuh, hingga pendukung pemulihan harian — kami hadirkan dengan kualitas terbaik dan harga yang terjangkau.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/products"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-white px-7 text-[0.95rem] font-extrabold !text-[#14552e] no-underline shadow-[0_14px_30px_rgba(255,255,255,0.18)] transition hover:-translate-y-0.5 hover:bg-[#f4fbf6]"
            >
              Jelajahi Produk <ArrowRight size={18} />
            </Link>
            <a
              href="https://wa.me/628131536969?text=Halo%20JaxLab%2C%20saya%20ingin%20bertanya%20tentang%20produk%20dan%20kesehatan%20keluarga."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/30 bg-transparent px-7 text-[0.95rem] font-bold text-white no-underline transition hover:bg-white/10"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </section>

      {/* Value & Brief */}
      <section className="pb-20 pt-16 max-[640px]:pb-14">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_1.1fr]">
            <div>
              <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#e7f3e9] px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] !text-[#22663a]">
                <Users size={14} /> Siapa Kami
              </span>
              <h2 className="mb-4 text-[clamp(1.6rem,3vw,2.3rem)] font-black leading-[1.15] !text-[#193421]">
                Komitmen Kami untuk Setiap Keluarga
              </h2>
              <div className="space-y-4 text-[0.98rem] leading-[1.85] !text-[#374151]">
                <p>
                  JaxLab didirikan dengan satu tujuan sederhana: <span className="font-bold !text-[#244730]">menghadirkan produk sehat yang benar-benar bisa diandalkan keluarga.</span>
                  Kami paham bahwa di tengah kesibukan, kebutuhan akan nutrisi yang baik sering kali terabaikan.
                </p>
                <p>
                  Oleh karena itu, kami meracik setiap produk dengan prinsip <span className="font-semibold">alami, minim proses, dan tanpa bahan tambahan yang tidak perlu</span> —
                  sehingga Anda bisa fokus menjalani hari tanpa khawatir akan kualitas asupan keluarga.
                </p>
                <p>
                  Kami percaya kesehatan tidak harus rumit dan mahal. Cukup pilih produk yang tepat, jalankan konsisten, dan biarkan tubuh Anda merasakan manfaatnya.
                </p>
              </div>
            </div>
            <div className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-[0_24px_60px_rgba(34,52,40,0.1)] backdrop-blur max-[640px]:p-5">
              <div className="mb-5 flex items-center gap-3 border-b border-[#eaf0ec] pb-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#dff0e3] !text-[#14552e]">
                  <ShieldCheck size={22} />
                </span>
                <div>
                  <h3 className="m-0 text-[1.05rem] font-extrabold !text-[#193421]">
                    Kenapa Memilih JaxLab?
                  </h3>
                  <p className="m-0 text-[0.85rem] !text-[#475650]">
                    Keunggulan kami di setiap kemasan.
                  </p>
                </div>
              </div>
              <ul className="m-0 grid gap-3 p-0">
                {[
                  'Bahan baku terpilih, alami, dan diproses dengan higienis.',
                  'Formula didukung riset dan kolaborasi dengan praktisi kesehatan.',
                  'Cocok untuk puasa, diet sehat, pemulihan, dan kebutuhan harian.',
                  'Pelayanan cepat, pengiriman aman, dan respon via WhatsApp Admin.',
                  'Harga ramah kantong untuk kualitas premium keluarga.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 rounded-xl bg-[#f6faf7] p-3 text-[0.93rem] leading-[1.6] !text-[#2e4437]">
                    <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#14552e] text-[10px] font-black text-white">
                      {idx + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#1a4d2e] pb-20 pt-16 text-white max-[640px]:pb-14">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mx-auto mb-12 max-w-[680px] text-center">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-[#cfe9d6]">
              <Leaf size={14} /> Nilai Kami
            </span>
            <h2 className="text-[clamp(1.7rem,3.3vw,2.5rem)] font-black leading-[1.15]">
              Dasar Kami dalam Menghadirkan Produk
            </h2>
            <p className="mt-4 text-[0.98rem] leading-[1.8] text-white/80">
              Setiap keputusan produk dan layanan JaxLab selalu berlandaskan pada tiga nilai utama berikut.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {values.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col rounded-[22px] border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/[0.08]"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-[#cfe9d6]">
                  {item.icon}
                </div>
                <h3 className="mb-2 text-[1.1rem] font-extrabold !text-white">
                  {item.title}
                </h3>
                <p className="m-0 text-[0.93rem] leading-[1.8] text-white/80">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="pb-20 pt-16 max-[640px]:pb-14">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mb-10 flex flex-col items-start gap-3 md:items-center md:text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#fff4e0] px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] !text-[#825d1a]">
              Perjalanan JaxLab
            </span>
            <h2 className="text-[clamp(1.7rem,3.3vw,2.5rem)] font-black leading-[1.15] !text-[#193421]">
              Cerita di Balik JaxLab
            </h2>
            <p className="max-w-[620px] text-[0.98rem] leading-[1.8] !text-[#374151]">
              JaxLab terus belajar, berinovasi, dan mendengarkan masukan pelanggan untuk memberikan produk dan layanan terbaik bagi keluarga Indonesia.
            </p>
          </div>
          <div className="relative grid gap-6 md:grid-cols-3">
            {journey.map((step, idx) => (
              <div
                key={idx}
                className="relative rounded-[24px] border border-white/80 bg-white p-6 shadow-[0_22px_55px_rgba(34,52,40,0.08)] max-[640px]:p-5"
              >
                <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#e7f3e9] px-3 py-1 text-[0.75rem] font-extrabold uppercase tracking-[0.12em] !text-[#22663a]">
                  {idx === 0 ? '01' : idx === 1 ? '02' : '03'} · {step.year}
                </span>
                <h3 className="mb-2 text-[1.15rem] font-extrabold !text-[#193421]">
                  {step.title}
                </h3>
                <p className="m-0 text-[0.95rem] leading-[1.85] !text-[#374151]">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="mx-auto max-w-[1120px] px-6">
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#14552e] via-[#184828] to-[#0e2a1a] px-10 py-12 text-white shadow-[0_30px_70px_rgba(20,85,46,0.28)] max-[640px]:px-6 max-[640px]:py-10">
            <div className="pointer-events-none absolute inset-0 opacity-[0.12]" style={{ backgroundImage: 'radial-gradient(circle at 85% 20%, #ffffff 0, transparent 42%)' }} />
            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-[560px]">
                <h2 className="text-[clamp(1.6rem,3.1vw,2.3rem)] font-black leading-[1.2]">
                  Mulai Langkah Sehatmu <br className="max-[640px]:hidden" /> Bersama JaxLab Hari Ini
                </h2>
                <p className="mt-3 text-[0.98rem] leading-[1.8] text-white/80">
                  Temukan produk terbaik sesuai kebutuhan keluarga, atau konsultasikan pilihan Anda bersama Admin JaxLab via WhatsApp.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/products"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-white px-7 text-[0.95rem] font-extrabold !text-[#14552e] no-underline transition hover:-translate-y-0.5 hover:bg-[#f4fbf6]"
                >
                  Lihat Semua Produk <ArrowRight size={18} />
                </Link>
                <a
                  href="https://wa.me/628131536969?text=Halo%20Admin%20JaxLab%2C%20saya%20ingin%20konsultasi%20terlebih%20dahulu%20tentang%20produk%20JaxLab."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/30 bg-white/5 px-7 text-[0.95rem] font-bold text-white no-underline transition hover:bg-white/12"
                >
                  Konsultasi via WA
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
