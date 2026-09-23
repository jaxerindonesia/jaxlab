import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Heart, Leaf, Users, TrendingUp } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const values = [
  {
    icon: <Leaf size={22} />,
    title: 'Produk Alami & Berkualitas',
    desc: 'Kami hanya menggunakan bahan alami dengan proses minimal untuk menghadirkan produk terbaik.',
  },
  {
    icon: <Heart size={22} />,
    title: 'Peduli Kesehatan Jangka Panjang',
    desc: 'Setiap keputusan bisnis kami berorientasi pada dampak positif kesehatan pengguna secara berkelanjutan.',
  },
  {
    icon: <Users size={22} />,
    title: 'Tim yang Kolaboratif',
    desc: 'Kami percaya pada lingkungan kerja yang saling mendukung, berinovasi bersama, dan tumbuh bersama.',
  },
  {
    icon: <TrendingUp size={22} />,
    title: 'Tumbuh Bersama JaxLab',
    desc: 'JaxLab terus berkembang dan membuka kesempatan bagi individu yang ingin berkontribusi nyata.',
  },
];

const CareersPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#f9f5ec]">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0b0f0b] via-[#0e1e12] to-[#0b140d] pb-16 pt-32 max-[640px]:pb-12 max-[640px]:pt-28">
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em] text-[#4ade80]">
            Bergabung dengan Kami
          </p>
          <h1 className="mb-4 text-[clamp(2rem,4vw,3rem)] font-black leading-[1.1] text-white">
            Karir di JaxLab
          </h1>
          <p className="max-w-[560px] text-[1rem] leading-[1.75] text-white/60">
            Jadilah bagian dari tim yang berdedikasi menghadirkan produk kesehatan alami dan mendukung gaya hidup sehat sejak dini.
          </p>
        </div>
      </section>

      <main className="flex-1 pb-20 pt-12">
        <div className="mx-auto max-w-[1000px] px-6">

          {/* Values */}
          <div className="mb-14">
            <p className="mb-2 text-[0.8rem] font-extrabold uppercase tracking-[0.14em] text-[#4d7959]">
              Mengapa JaxLab
            </p>
            <h2 className="mb-8 text-[1.75rem] font-black leading-[1.2] text-[#193421] max-[640px]:text-[1.5rem]">
              Nilai yang Kami Pegang Bersama
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="flex gap-4 rounded-2xl border border-[#e8e2da] bg-white p-6 shadow-[0_4px_16px_rgba(34,52,40,0.05)] transition-shadow hover:shadow-[0_8px_28px_rgba(34,52,40,0.1)]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e6f1ea] text-[#1a4d2e]">
                    {v.icon}
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold text-[#193421]">{v.title}</h3>
                    <p className="text-[0.875rem] leading-[1.65] text-[#647068]">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Open Positions */}
          <div className="mb-14">
            <p className="mb-2 text-[0.8rem] font-extrabold uppercase tracking-[0.14em] text-[#4d7959]">
              Posisi Tersedia
            </p>
            <h2 className="mb-6 text-[1.75rem] font-black leading-[1.2] text-[#193421] max-[640px]:text-[1.5rem]">
              Lowongan Saat Ini
            </h2>
            <div className="rounded-2xl border border-[#e8e2da] bg-white p-8 text-center shadow-[0_4px_16px_rgba(34,52,40,0.05)] max-[640px]:p-6">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#e6f1ea]">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="mb-3 text-[1.1rem] font-bold text-[#193421]">
                Posisi Akan Diperbarui Secara Berkala
              </h3>
              <p className="mx-auto max-w-[480px] text-[0.9rem] leading-[1.7] text-[#647068]">
                Saat ini belum ada lowongan yang dipublikasikan. JaxLab secara rutin memperbarui posisi yang tersedia sesuai kebutuhan tim. Pantau halaman ini atau kirimkan CV Anda agar kami dapat menghubungi Anda saat ada posisi yang sesuai.
              </p>
            </div>
          </div>

          {/* Send CV CTA */}
          <div className="rounded-2xl bg-gradient-to-br from-[#0e1e12] to-[#1a3a24] p-8 max-[640px]:p-6">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="mb-1 text-[0.8rem] font-extrabold uppercase tracking-[0.15em] text-[#4ade80]">
                  Kirim Lamaran
                </p>
                <h2 className="mb-2 text-[1.35rem] font-black text-white">
                  Tertarik Bergabung?
                </h2>
                <p className="max-w-[420px] text-[0.9rem] leading-[1.65] text-white/60">
                  Kirimkan CV dan surat lamaran Anda ke email kami. Cantumkan posisi yang diminati pada subjek email.
                </p>
                <p className="mt-3 text-[0.875rem] font-semibold text-[#4ade80]">
                  itsupport@jaxergroup.com
                </p>
              </div>
              <a
                href="mailto:itsupport@jaxergroup.com?subject=Lamaran Kerja JaxLab"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#4ade80] px-6 py-3 text-[0.9rem] font-bold text-[#0b0f0b] transition-all hover:-translate-y-px hover:bg-[#22c55e]"
              >
                <Mail size={16} />
                Kirim Lamaran
              </a>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-[0.875rem] text-[#8a9490]">
              Pertanyaan lain seputar karir?{' '}
              <Link to="/contact" className="font-semibold text-[#1a4d2e] underline underline-offset-2 hover:text-[#4ade80]">
                Hubungi kami
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CareersPage;
