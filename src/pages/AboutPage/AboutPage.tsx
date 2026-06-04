import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Leaf, RefreshCw, ShieldCheck } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#efe9e3]">
      <Header />

      <section className="bg-gradient-to-br from-[#1f4d2b] to-[#133b27] py-20 text-white">
        <div className="container">
          <span className="inline-flex rounded-full border border-white/30 bg-white/15 px-4 py-1 text-sm">Cerita di Balik JaxLAB</span>
          <h1 className="mt-4 text-5xl font-bold leading-tight max-md:text-4xl">Untuk Anak,<br />Keluarga, dan Masa Depan</h1>
          <p className="mt-4 max-w-[620px] text-white/90">JaxLab menghadirkan makanan alami dan minim proses sebagai bagian dari upaya sederhana mendukung hidup sehat sejak dini.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`https://wa.me/6281234567890?text=${encodeURIComponent('Hai! Saya tertarik menjadi Healthy Partner di JaxLab. Boleh minta detail kerjasamanya?')}`} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-6 py-2.5 font-semibold text-[var(--primary-green)] no-underline">Join Healthy Partner</a>
            <button className="rounded-full border border-white px-6 py-2.5 font-semibold">Pilih Produk JaxLab</button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container grid items-center gap-10 lg:grid-cols-2">
          <img src="/img/founders.jpg" alt="JaxLab Founders" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'; }} className="h-[360px] w-full rounded-2xl object-cover" />
          <div>
            <span className="inline-flex rounded-full bg-[#e6f1ea] px-3 py-1 text-xs font-semibold text-[var(--primary-green)]">Who We Are</span>
            <h2 className="mt-3 text-4xl font-bold text-[var(--primary-green)]">Tentang Nilai, Proses,<br />dan Kepercayaan</h2>
            <p className="mt-3 text-[#5f645f]">JaxLab adalah merek yang menjual produk makanan sehat alami, terutama Bone Broth kaya kolagen, asam amino, dan mineral.</p>
            <p className="mt-2 text-[#5f645f]">Kami menekankan penggunaan bahan alami dan makanan fitrah, bukan bahan kimia buatan, untuk mendukung tubuh yang diciptakan secara alami.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#1a4d2e] py-20 text-white">
        <div className="container text-center">
          <span className="text-sm uppercase tracking-wide text-white/80">Visi & Misi JaxLab</span>
          <h2 className="mt-2 text-4xl font-bold">Nilai di Balik Setiap Produk</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-white/10 p-6"><div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/20"><Leaf /></div><h3 className="font-semibold">Menghadirkan Makanan Alami</h3><p className="mt-2 text-white/85">Diproduksi dengan proses minimal dan bahan terpilih.</p></div>
            <div className="rounded-xl bg-white/10 p-6"><div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/20"><RefreshCw /></div><h3 className="font-semibold">Mendukung Kebiasaan Sehat</h3><p className="mt-2 text-white/85">Mendorong gaya hidup sehat sejak dini.</p></div>
            <div className="rounded-xl bg-white/10 p-6"><div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/20"><ShieldCheck /></div><h3 className="font-semibold">Berorientasi Jangka Panjang</h3><p className="mt-2 text-white/85">Menjaga kualitas melalui perbaikan berkelanjutan.</p></div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-flex rounded-full bg-[#e6f1ea] px-3 py-1 text-xs font-semibold text-[var(--primary-green)]">Apa yang Kami Percaya</span>
            <h2 className="mt-3 text-4xl font-bold text-[var(--primary-green)]">Komitmen di Balik<br />Setiap Langkah</h2>
            <p className="mt-3 text-[#5f645f]">Kami percaya kesehatan lahir dari perhatian pada detail, proses yang jujur, dan komitmen yang konsisten.</p>
          </div>
          <img src="/img/office_building.jpg" alt="JaxLab Office" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'; }} className="h-[340px] w-full rounded-2xl object-cover" />
        </div>
      </section>

      <section className="bg-[#1a4d2e] py-16 text-center text-white">
        <div className="container">
          <h2 className="text-4xl font-bold">Bersama JaxLab,<br />Bangun Hidup Sehat Alami</h2>
          <a href={`https://wa.me/6281234567890?text=${encodeURIComponent('Hai! Saya tertarik menjadi Healthy Partner di JaxLab. Boleh minta detail kerjasamanya?')}`} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block rounded-full bg-white px-6 py-2.5 font-semibold text-[var(--primary-green)] no-underline">Join Healthy Partner</a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
