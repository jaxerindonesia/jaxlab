import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Star, ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { type ProductDto, formatRupiah, getProductById } from '../../services/service-api';
import { addToCart } from '../../services/cart';
import { isMemberLoggedIn } from '../../services/auth';

const badgeClass = (badge: string) => badge === 'Best Seller' ? 'bg-[#4a7c59] text-white' : badge === 'New' ? 'bg-[#2196F3] text-white' : 'bg-[#FF5722] text-white';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState<ProductDto | null>(null);
  const [loadedId, setLoadedId] = useState<string | null>(null);
  const loading = Boolean(id) && loadedId !== id;

  useEffect(() => {
    let cancelled = false;
    if (!id) return () => { cancelled = true; };
    getProductById(id).then((p) => {
      if (cancelled) return;
      setProduct(p); setLoadedId(id); setSelectedImage(0);
    }).catch(() => {
      if (cancelled) return;
      setProduct(null); setLoadedId(id); setSelectedImage(0);
    });
    return () => { cancelled = true; };
  }, [id]);

  if (id && !loading && !product) {
    return <div className="bg-white"><Header /><main className="container py-12 text-center"><h2 className="text-2xl font-semibold">Produk tidak ditemukan</h2><p className="mt-2">Produk yang Anda cari tidak tersedia.</p><Link to="/products" className="mt-4 inline-flex items-center gap-2 px-4 py-2"><ArrowLeft size={16} /> Kembali ke semua produk</Link></main><Footer /></div>;
  }

  return (
    <div className="bg-white">
      <Header />
      <main className="py-8">
        <div className="container">
          {loading && <div className="py-12 text-center">Memuat detail produk...</div>}
          {!loading && product && (() => {
            const p = product;
            return <>
              <div className="mb-3 text-sm text-[#5f645f]"><Link to="/">Home</Link> &gt; <Link to="/products">Produk</Link> &gt; <span>{p.name}</span></div>
              <Link to="/products" className="mb-5 inline-flex items-center gap-2 bg-white py-2 text-sm text-[#4a7c59]"><ArrowLeft size={16} /> Kembali ke semua produk</Link>

              <div className="grid gap-10 lg:grid-cols-[1.45fr_1fr]">
                <div>
                  <div className="mb-4 flex gap-3 overflow-x-auto">
                    {p.images.map((img, index) => (
                      <button key={index} className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 ${selectedImage === index ? 'border-[var(--primary-green)]' : 'border-[#d6d6d6]'}`} onClick={() => setSelectedImage(index)}>
                        <img src={img} alt={`Thumbnail ${index + 1}`} className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                  <div className="relative overflow-hidden rounded-2xl border border-[#e2e2e2] bg-white">
                    <img src={p.images[selectedImage]} alt={p.name} className="h-[620px] w-full object-cover object-center" />
                    {p.badge && <span className={`absolute left-5 top-5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${badgeClass(p.badge)}`}>{p.badge}</span>}
                  </div>
                </div>

                <div className="pt-1">
                  <span className="mb-3 inline-block rounded-full bg-[#e2ece2] px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-[#4a7c59]">{p.category}</span>
                  <h1 className="text-3xl font-bold leading-[1.12] text-[#1a1f1b] max-xl:text-5xl max-lg:text-4xl">{p.name}</h1>
                  <p className="mt-2 text-[#5f645f]">{p.subtitle}</p>

                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={18} fill={i < Math.floor(p.rating) ? '#FFC107' : 'none'} color="#FFC107" />)}</div>
                    <span className="text-sm text-[#2b8a3e] underline">{p.rating} ({p.reviewCount} ulasan)</span>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <h2 className="text-3xl font-bold text-[#1b1f1c] max-xl:text-5xl">{formatRupiah(p.price)}</h2>
                    {p.originalPrice && <span className="text-lg text-[#999] line-through">{formatRupiah(p.originalPrice)}</span>}
                    {p.originalPrice && <span className="rounded-full bg-[#ffe9d9] px-2 py-1 text-xs font-bold text-[#c44f00]">-{Math.round((1 - p.price / p.originalPrice) * 100)}%</span>}
                  </div>

                  <div className="mt-3 text-sm"><span className="font-bold text-black">Stok: </span><span className={p.stockStatus === 'Tersedia' ? 'text-green-600' : p.stockStatus === 'Terbatas' ? 'text-orange-500' : 'text-red-600'}>{p.stockStatus}</span></div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {p.marketplaceLinks?.map((btn, i) => (
                      <a key={i} href={btn.url} target="_blank" rel="noopener noreferrer" className="flex min-w-[220px] items-center justify-center rounded-xl bg-[#1a5b34] px-8 py-4 text-md font-bold text-white no-underline max-xl:text-2xl">{btn.label}</a>
                    ))}
                    <button
                      className="rounded-xl bg-[#1a5b34] px-8 py-4 text-md font-bold text-white max-xl:text-2xl"
                      onClick={() => {
                        if (!isMemberLoggedIn()) { window.location.href = '/member/auth'; return; }
                        addToCart(p.id, 1);
                        window.location.href = '/cart';
                      }}
                    >
                      Beli di Website
                    </button>
                  </div>

                  {p.benefits.length > 0 && (
                    <div className="mt-6">
                      <p className="mb-2 font-semibold">Manfaat Utama:</p>
                      <ul className="space-y-1">{p.benefits.map((benefit, i) => <li key={i}>✓ {benefit}</li>)}</ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-10 border-t border-[#ececec] pt-8">
                <div className="grid gap-10 lg:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-2xl font-bold leading-tight text-[#1b1f1c] max-xl:text-3xl">Deskripsi Produk</h3>
                  <p className="text-[#5f645f]">{p.longDescription}</p>
                </div>
                <div>
                  <h3 className="mb-3 text-2xl font-bold leading-tight text-[#1b1f1c] max-xl:text-3xl">Spesifikasi Produk</h3>
                  <ul className="space-y-1">{p.specs.map((spec, index) => <li key={index}>• <strong>{spec.label}:</strong> {spec.value}</li>)}</ul>
                </div>
                </div>
              </div>
            </>;
          })()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
