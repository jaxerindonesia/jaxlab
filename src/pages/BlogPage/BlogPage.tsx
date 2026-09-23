import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { ArrowRight, Play, Clock, Tag } from 'lucide-react';

interface Article {
  id: number;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  type: string;
  youtubeId: string | null;
  youtubeTitle: string | null;
  youtubeUrl: string | null;
}

const articles: Article[] = [

  {
    id: 1,
    slug: 'apa-itu-fat-fasting',
    category: 'Fat Fasting',
    title: 'Apa Itu Fat Fasting? Panduan Lengkap untuk Pemula',
    excerpt:
      'Fat Fasting adalah metode puasa 72 jam di mana hanya lemak sehat tertentu yang dikonsumsi. Pelajari cara kerjanya, manfaatnya, dan siapa saja yang cocok menjalankannya.',
    readTime: '5 menit',
    type: 'article',
    youtubeId: 't1xx8JeVqJk',
    youtubeTitle: 'Fat Fasting bersama JaxLab',
    youtubeUrl: 'https://youtu.be/t1xx8JeVqJk',
  },
  {
    id: 2,
    slug: 'panduan-fat-fasting-72-jam',
    category: 'Panduan',
    title: 'Panduan Fat Fasting 72 Jam: Apa yang Dikonsumsi di Setiap Fase',
    excerpt:
      'Panduan lengkap jadwal konsumsi lemak sehat selama Fat Fasting 72 jam — dari pagi hingga malam, termasuk tips hidrasi dan elektrolit.',
    readTime: '7 menit',
    type: 'video',
    youtubeId: '7GHDGkkBW64',
    youtubeTitle: 'Panduan Fat Fasting JaxLab',
    youtubeUrl: 'https://youtu.be/7GHDGkkBW64',
  },
  {
    id: 3,
    slug: 'cerita-perjalanan-sehat-jaxlab',
    category: 'Inspirasi',
    title: 'Cerita Perjalanan Sehat Bersama JaxLab',
    excerpt:
      'Temukan cerita nyata dari komunitas JaxLab yang menjalani Fat Fasting dan merasakan perubahan metabolisme serta kualitas hidup mereka.',
    readTime: '4 menit',
    type: 'video',
    youtubeId: 'S-QpDZQsmdM',
    youtubeTitle: 'Cerita Perjalanan Sehat JaxLab',
    youtubeUrl: 'https://youtu.be/S-QpDZQsmdM',
  },
  {
    id: 4,
    slug: 'manfaat-extra-virgin-olive-oil',
    category: 'Nutrisi',
    title: 'Manfaat Extra Virgin Olive Oil untuk Mendukung Fat Fasting',
    excerpt:
      'Extra Virgin Olive Oil adalah sumber lemak sehat tak jenuh tunggal yang kaya antioksidan. Pelajari mengapa EVOO menjadi komponen utama dalam protokol Fat Fasting JaxLab.',
    readTime: '6 menit',
    type: 'article',
    youtubeId: null,
    youtubeTitle: null,
    youtubeUrl: null,
  },
  {
    id: 5,
    slug: 'mengenal-cocofenol',
    category: 'Produk',
    title: 'Mengenal Cocofenol: Virgin Coconut Oil dengan Kandungan Fenol Tinggi',
    excerpt:
      'Cocofenol hadir dari VCO berkualitas tinggi yang diproses secara minimal. Temukan mengapa kandungan polifenolnya mendukung perjalanan Fat Fasting Anda.',
    readTime: '5 menit',
    type: 'article',
    youtubeId: null,
    youtubeTitle: null,
    youtubeUrl: null,
  },
  {
    id: 6,
    slug: 'tips-hidrasi-saat-fat-fasting',
    category: 'Tips',
    title: 'Tips Menjaga Hidrasi dan Elektrolit Selama Fat Fasting',
    excerpt:
      'Hidrasi yang tepat adalah kunci keberhasilan Fat Fasting. Pelajari cara menjaga keseimbangan elektrolit, kapan harus minum, dan apa yang boleh dan tidak boleh dikonsumsi.',
    readTime: '4 menit',
    type: 'article',
    youtubeId: null,
    youtubeTitle: null,
    youtubeUrl: null,
  },
];

const categories = ['Semua', 'Fat Fasting', 'Panduan', 'Inspirasi', 'Nutrisi', 'Produk', 'Tips'];

const BlogPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Semua');

  const filtered =
    activeCategory === 'Semua'
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <div className="flex min-h-screen flex-col bg-[#f9f5ec]">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0b0f0b] via-[#0e1e12] to-[#0b140d] pb-16 pt-32 max-[640px]:pb-12 max-[640px]:pt-28">
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em] text-[#4ade80]">
            Edukasi &amp; Inspirasi
          </p>
          <h1 className="mb-4 text-[clamp(2rem,4vw,3rem)] font-black leading-[1.1] text-white">
            Blog &amp; Artikel JaxLab
          </h1>
          <p className="max-w-[600px] text-[1rem] leading-[1.75] text-white/60">
            Temukan panduan, tips, dan cerita inspiratif seputar Fat Fasting, nutrisi sehat, dan
            perjalanan menuju metabolisme yang lebih optimal.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <div className="sticky top-[60px] z-10 border-b border-[#e8e2da] bg-[#f9f5ec]/95 backdrop-blur-[10px]">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="flex gap-2 overflow-x-auto py-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'border-[#1a4d2e] bg-[#1a4d2e] text-white'
                    : 'border-[#d4cfc8] bg-white text-[#4d5c51] hover:border-[#1a4d2e] hover:text-[#1a4d2e]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <main className="flex-1 pb-20 pt-10">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article) => (
              <article
                key={article.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#e8e2da] bg-white shadow-[0_4px_20px_rgba(34,52,40,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(34,52,40,0.12)]"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-[#d9edcf]">
                  {article.youtubeId ? (
                    <>
                      <img
                        src={`https://img.youtube.com/vi/${article.youtubeId}/mqdefault.jpg`}
                        alt={article.youtubeTitle ?? article.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-200 group-hover:scale-110">
                          <Play size={20} className="ml-0.5 text-[#1a4d2e]" fill="#1a4d2e" />
                        </div>
                      </div>
                      <span className="absolute left-3 top-3 rounded-full bg-[#1a4d2e] px-2.5 py-0.5 text-[0.7rem] font-bold uppercase tracking-wide text-white">
                        Video
                      </span>
                    </>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#d9edcf] to-[#c8e6ba]">
                      <span className="text-[3rem] opacity-40">🌿</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#e6f1ea] px-2.5 py-0.5 text-[0.72rem] font-semibold text-[#1a4d2e]">
                      <Tag size={11} />
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-[0.72rem] text-[#8a9490]">
                      <Clock size={11} />
                      {article.readTime}
                    </span>
                  </div>
                  <h2 className="mb-2 line-clamp-2 text-[1rem] font-bold leading-[1.35] text-[#193421] group-hover:text-[#1a4d2e]">
                    {article.title}
                  </h2>
                  <p className="mb-4 line-clamp-3 flex-1 text-[0.875rem] leading-[1.65] text-[#647068]">
                    {article.excerpt}
                  </p>
                  {article.youtubeUrl ? (
                    <a
                      href={article.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-[#1a4d2e] transition-colors hover:text-[#4ade80]"
                    >
                      Tonton di YouTube <ArrowRight size={14} />
                    </a>
                  ) : (
                    <Link
                      to={`/blog/${article.slug}`}
                      className="inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-[#1a4d2e] transition-colors hover:text-[#4ade80]"
                    >
                      Baca Selengkapnya <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-20 text-center text-[#8a9490]">
              Belum ada artikel di kategori ini.
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 rounded-2xl bg-gradient-to-br from-[#0e1e12] to-[#1a3a24] p-8 text-center max-[640px]:p-6">
            <p className="mb-2 text-[0.8rem] font-extrabold uppercase tracking-[0.15em] text-[#4ade80]">
              Komunitas JaxLab
            </p>
            <h2 className="mb-3 text-[1.6rem] font-black text-white max-[640px]:text-[1.35rem]">
              Bergabung &amp; Mulai Perjalanan Sehat
            </h2>
            <p className="mx-auto mb-6 max-w-[480px] text-[0.9rem] leading-[1.7] text-white/60">
              Dapatkan panduan Fat Fasting, tips nutrisi, dan dukungan komunitas langsung dari JaxLab.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/fat-fasting"
                className="inline-flex items-center gap-2 rounded-full bg-[#4ade80] px-6 py-2.5 text-[0.9rem] font-bold text-[#0b0f0b] transition-all hover:-translate-y-px hover:bg-[#22c55e]"
              >
                Pelajari Fat Fasting <ArrowRight size={16} />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-2.5 text-[0.9rem] font-bold text-white transition-all hover:border-white/40 hover:bg-white/5"
              >
                Lihat Produk
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
