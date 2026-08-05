import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { ArrowLeft, CheckCircle, Star } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../../services/api/products';
import { formatRupiah, type ProductDto } from '../../services/service-api';

type DetailSection = 'highlight' | 'description' | 'benefits' | 'specs';

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [selectedImage, setSelectedImage] = useState(0);
    const [openSection, setOpenSection] = useState<DetailSection | null>('description');

    const [product, setProduct] = useState<ProductDto | null>(null);
    const [loadedId, setLoadedId] = useState<string | null>(null);
    const loading = Boolean(id) && loadedId !== id;

    useEffect(() => {
        let cancelled = false;
        if (!id) return () => { cancelled = true; };

        getProductById(id)
            .then((p) => {
                if (cancelled) return;
                setProduct(p);
                setLoadedId(id);
                setSelectedImage(0);
                setOpenSection('description');
            })
            .catch(() => {
                if (cancelled) return;
                setProduct(null);
                setLoadedId(id);
                setSelectedImage(0);
                setOpenSection('description');
            });

        return () => { cancelled = true; };
    }, [id]);

    if (id && !loading && !product) {
        return (
            <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_top_left,rgba(215,234,223,0.55),transparent_34%),linear-gradient(180deg,#f7f3ea_0%,#f9f6ef_100%)]">
                <Header />
                <main className="flex-1 pt-[6.3rem] font-['Inter',sans-serif] max-[768px]:pt-[5.7rem]">
                    <div className="mx-auto max-w-[1260px] px-6 pb-16 max-[768px]:px-[18px] max-[768px]:pb-12">
                        <div className="px-4 py-16 text-center">
                            <h2>Produk tidak ditemukan</h2>
                            <p>Produk yang Anda cari tidak tersedia.</p>
                            <Link to="/products" className="inline-flex items-center gap-[0.35rem] whitespace-nowrap text-[0.8rem] font-bold !text-[#14552e] hover:underline">
                                <ArrowLeft size={16} /> Kembali ke semua produk
                            </Link>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_top_left,rgba(215,234,223,0.55),transparent_34%),linear-gradient(180deg,#f7f3ea_0%,#f9f6ef_100%)]">
            <Header />

            <main className="flex-1 pt-[6.3rem] font-['Inter',sans-serif] max-[768px]:pt-[5.7rem]">
                <div className="mx-auto max-w-[1260px] px-6 pb-16 max-[768px]:px-[18px] max-[768px]:pb-12">
                    {loading && (
                        <div className="px-4 py-16 text-center">
                            <p>Memuat detail produk...</p>
                        </div>
                    )}

                    {!loading && product && (() => {
                        const p = product;
                        const selectedProductImage = p.images[selectedImage] ?? p.images[0];
                        const discountPercentage = p.originalPrice
                            ? Math.round((1 - p.price / p.originalPrice) * 100)
                            : 0;
                        const toggleSection = (section: DetailSection) => {
                            setOpenSection((current) => current === section ? null : section);
                        };
                        const accordionItemClass = 'border-b border-[rgba(21,24,18,0.12)]';
                        const accordionTriggerClass = 'flex w-full items-center justify-between gap-4 bg-transparent px-[0.1rem] py-[1.28rem] text-left text-[0.98rem] font-medium !text-[#242824]';
                        const accordionContentClass = 'px-[0.1rem] pb-[1.3rem] text-[0.88rem] leading-[1.8] !text-[#4f5751]';
                        const benefitListClass = 'm-0 list-none p-0 [&_li]:flex [&_li]:items-start [&_li]:gap-[0.6rem] [&_li]:border-t [&_li]:border-[rgba(20,85,46,0.08)] [&_li]:py-[0.65rem] [&_li]:!text-[#304035] [&_li:first-child]:border-t-0 [&_li:first-child]:pt-0 [&_svg]:mt-[0.15rem] [&_svg]:shrink-0 [&_svg]:text-[#3f9d56]';

                        return (
                            <>
                                <div className="mb-[1.4rem] flex items-start justify-between gap-4 max-[768px]:mb-[1.1rem] max-[768px]:flex-col">
                                    <div className="flex flex-wrap items-center gap-[0.4rem] text-[0.78rem] leading-[1.4] !text-[#7a807a] [&_a]:!text-[#5f675f] [&_a:hover]:!text-[#14552e] [&>span:last-child]:font-semibold [&>span:last-child]:!text-[#232823]">
                                        <Link to="/">Home</Link>
                                        <span>/</span>
                                        <Link to="/products">Produk</Link>
                                        <span>/</span>
                                        <span>{p.name}</span>
                                    </div>
                                    <Link to="/products" className="inline-flex items-center gap-[0.35rem] whitespace-nowrap text-[0.8rem] font-bold !text-[#14552e] hover:underline">
                                        <ArrowLeft size={14} /> Kembali ke semua produk
                                    </Link>
                                </div>

                                <div className="grid grid-cols-[minmax(0,1.25fr)_minmax(360px,0.9fr)] items-start gap-[3.4rem] max-[1100px]:grid-cols-1 max-[1100px]:gap-8">
                                    <div className="min-w-0">
                                        <div className="relative flex !aspect-[1/1.02] w-full items-center justify-center overflow-hidden rounded-[28px] border border-[rgba(28,35,29,0.08)] bg-[linear-gradient(180deg,#f8f8f5_0%,#f1ede4_100%)] p-[2.2rem] shadow-[0_24px_60px_rgba(36,46,39,0.08)] max-[768px]:!aspect-[4/4.5] max-[768px]:rounded-[22px] max-[768px]:p-[1.4rem]">
                                            {selectedProductImage && <img className="block !h-full !w-full object-contain object-center" src={selectedProductImage} alt={p.name} />}
                                            {p.badge && (
                                                <span className={`absolute left-[18px] top-[18px] z-[2] rounded-full px-[0.85rem] py-[0.38rem] text-[0.7rem] font-extrabold uppercase tracking-[0.05em] !text-white ${p.badge.toLowerCase() === 'new' ? 'bg-[#2196f3]' : p.badge.toLowerCase() === 'sale' ? 'bg-[#ff5722]' : 'bg-[#14552e]'}`}>
                                                    {p.badge}
                                                </span>
                                            )}
                                        </div>

                                        {p.images.length > 1 && (
                                            <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(88px,1fr))] gap-[0.8rem] max-[768px]:grid-cols-[repeat(4,minmax(72px,1fr))] max-[768px]:overflow-x-auto max-[768px]:pb-[0.2rem]" aria-label="Pilihan gambar produk">
                                                {p.images.map((image: any, index: number) => (
                                                    <button
                                                        key={`${image}-${index}`}
                                                        type="button"
                                                        className={`!aspect-square w-full overflow-hidden rounded-2xl border-[1.5px] bg-white/80 p-0 transition-all duration-200 hover:-translate-y-px hover:border-[#14552e] hover:shadow-[0_0_0_3px_rgba(20,85,46,0.12)] ${selectedImage === index ? 'border-[#14552e] shadow-[0_0_0_3px_rgba(20,85,46,0.12)]' : 'border-[rgba(28,35,29,0.12)]'}`}
                                                        onClick={() => setSelectedImage(index)}
                                                        aria-label={`Lihat gambar produk ${index + 1}`}
                                                    >
                                                        <img className="block !h-full !w-full object-cover" src={image} alt={`${p.name} ${index + 1}`} />
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="min-w-0 pt-4 max-[1100px]:pt-0">
                                        <span className="mb-[0.9rem] inline-flex min-h-9 items-center rounded-full border border-[rgba(20,85,46,0.22)] bg-white/70 px-4 py-[0.4rem] text-[0.74rem] font-extrabold uppercase tracking-[0.08em] !text-[#14552e]">{p.category}</span>
                                        <h1 className="mb-[0.35rem] text-[clamp(2rem,3vw,3.25rem)] font-extrabold leading-[1.05] !text-[#152018] max-[768px]:text-[2rem]">{p.name}</h1>
                                        {p.subtitle && <p className="mb-4 max-w-[52ch] text-[0.98rem] leading-[1.7] !text-[#637064]">{p.subtitle}</p>}

                                        <div className="mb-4 flex items-center gap-[0.6rem]">
                                            <div className="flex gap-[3px]" aria-label={`Rating ${p.rating} dari 5`}>
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={16}
                                                        fill={i < Math.floor(p.rating) ? '#FFC107' : 'none'}
                                                        color="#FFC107"
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-[0.86rem] font-semibold !text-[#14552e]">
                                                {p.rating} ({p.reviewCount} ulasan)
                                            </span>
                                        </div>

                                        <div className="mb-2 flex flex-wrap items-center gap-3">
                                            <h2 className="text-[clamp(1.8rem,2vw,2.4rem)] font-extrabold !text-[#121812]">{formatRupiah(p.price)}</h2>
                                            {p.originalPrice && (
                                                <>
                                                    <span className="text-base !text-[#8d958e] line-through">{formatRupiah(p.originalPrice)}</span>
                                                    <span className="rounded-full bg-[#e85937] px-[0.7rem] py-[0.28rem] text-[0.75rem] font-bold !text-white">
                                                        Hemat {discountPercentage}%
                                                    </span>
                                                </>
                                            )}
                                        </div>

                                        {/* <div className="stock-row">
                                            <span className="stock-label">Stok:</span>
                                            <span
                                                className={`stock-status stock-status-${p.stockStatus.toLowerCase()}`}
                                            >
                                                {p.stockStatus}
                                            </span>
                                        </div> */}

                                        <div className="mb-4 flex flex-col gap-4">
                                            <div className="flex items-start justify-between gap-4 rounded-3xl border border-[rgba(20,85,46,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.85),rgba(238,245,240,0.95))] px-5 pb-[1.15rem] pt-5 shadow-[0_16px_32px_rgba(29,39,31,0.05)] max-[768px]:flex-col">
                                                <div>
                                                    <p className="mb-[0.35rem] text-[0.76rem] font-extrabold uppercase tracking-[0.08em] !text-[#6b746d]">Pilihan Pembelian</p>
                                                    <h3 className="mb-[0.3rem] text-xl font-extrabold !text-[#152018]">Beli Sekarang</h3>
                                                    <span className="block max-w-[34ch] text-[0.86rem] leading-[1.6] !text-[#677268]">
                                                        Produk original dengan pengiriman cepat dan dukungan customer service.
                                                    </span>
                                                </div>
                                                <div className="shrink-0 text-right max-[768px]:text-left">
                                                    <strong className="block text-[1.45rem] leading-[1.1] !text-[#152018]">{formatRupiah(p.price)}</strong>
                                                    {p.originalPrice && <span className="text-[0.88rem] !text-[#8d958e] line-through">{formatRupiah(p.originalPrice)}</span>}
                                                </div>
                                            </div>

                                            {p.marketplaceLinks && p.marketplaceLinks.length > 0 && (
                                                <div className="grid grid-cols-2 gap-[0.8rem] max-[768px]:grid-cols-1">
                                                    {p.marketplaceLinks.map((btn, i) => (
                                                        <a
                                                            key={i}
                                                            href={btn.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className={`inline-flex min-h-[54px] items-center justify-center rounded-[18px] px-[1.2rem] py-[0.9rem] text-[0.9rem] font-extrabold transition-all duration-200 hover:-translate-y-px ${i === 0 ? 'bg-[#14552e] !text-white hover:bg-[#0f4625] hover:shadow-[0_16px_32px_rgba(20,85,46,0.18)]' : 'border border-[rgba(20,85,46,0.16)] bg-white/70 !text-[#14552e] hover:border-[#14552e] hover:shadow-[0_12px_28px_rgba(20,85,46,0.08)]'}`}
                                                        >
                                                            {btn.label}
                                                        </a>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="flex flex-wrap gap-x-4 gap-y-[0.8rem] px-[0.2rem] [&>div]:inline-flex [&>div]:items-center [&>div]:gap-[0.45rem] [&>div]:text-[0.8rem] [&>div]:font-semibold [&>div]:!text-[#405044] [&_svg]:text-[#3f9d56]">
                                                <div>
                                                    <CheckCircle size={16} />
                                                    <span>Original product</span>
                                                </div>
                                                <div>
                                                    <CheckCircle size={16} />
                                                    <span>Packaging aman</span>
                                                </div>
                                                <div>
                                                    <CheckCircle size={16} />
                                                    <span>Bisa konsultasi dulu</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex flex-col border-t border-[rgba(21,24,18,0.12)]">
                                            {p.benefits.length > 0 && (
                                                <div className={accordionItemClass}>
                                                    <button
                                                        type="button"
                                                        className={accordionTriggerClass}
                                                        onClick={() => toggleSection('highlight')}
                                                    >
                                                        <span>Highlight Produk</span>
                                                        <span className={`text-[2.15rem] font-light leading-none !text-[#2a2a2a] transition-transform duration-200 ${openSection === 'highlight' ? 'rotate-45' : ''}`} aria-hidden="true">+</span>
                                                    </button>
                                                    {openSection === 'highlight' && (
                                                        <div className={accordionContentClass}>
                                                            <ul className={`${benefitListClass} [&_li]:font-semibold`}>
                                                                {p.benefits.map((benefit, i) => (
                                                                    <li key={i}>
                                                                        <CheckCircle size={14} />
                                                                        <span>{benefit}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            <div className={accordionItemClass}>
                                                <button
                                                    type="button"
                                                    className={accordionTriggerClass}
                                                    onClick={() => toggleSection('description')}
                                                >
                                                    <span>Deskripsi</span>
                                                    <span className={`text-[2.15rem] font-light leading-none !text-[#2a2a2a] transition-transform duration-200 ${openSection === 'description' ? 'rotate-45' : ''}`} aria-hidden="true">+</span>
                                                </button>
                                                {openSection === 'description' && (
                                                    <div className={accordionContentClass}>
                                                        <p>{p.longDescription}</p>
                                                    </div>
                                                )}
                                            </div>

                                            <div className={accordionItemClass}>
                                                <button
                                                    type="button"
                                                    className={accordionTriggerClass}
                                                    onClick={() => toggleSection('benefits')}
                                                >
                                                    <span>Manfaat</span>
                                                    <span className={`text-[2.15rem] font-light leading-none !text-[#2a2a2a] transition-transform duration-200 ${openSection === 'benefits' ? 'rotate-45' : ''}`} aria-hidden="true">+</span>
                                                </button>
                                                {openSection === 'benefits' && (
                                                    <div className={accordionContentClass}>
                                                        <ul className={benefitListClass}>
                                                            {p.benefits.map((benefit, i) => (
                                                                <li key={i}>
                                                                    <CheckCircle size={14} />
                                                                    <span>{benefit}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>

                                            <div className={accordionItemClass}>
                                                <button
                                                    type="button"
                                                    className={accordionTriggerClass}
                                                    onClick={() => toggleSection('specs')}
                                                >
                                                    <span>Spesifikasi</span>
                                                    <span className={`text-[2.15rem] font-light leading-none !text-[#2a2a2a] transition-transform duration-200 ${openSection === 'specs' ? 'rotate-45' : ''}`} aria-hidden="true">+</span>
                                                </button>
                                                {openSection === 'specs' && (
                                                    <div className={accordionContentClass}>
                                                        <ul className="m-0 list-none p-0 [&_li]:flex [&_li]:items-start [&_li]:justify-between [&_li]:gap-4 [&_li]:border-t [&_li]:border-[rgba(20,85,46,0.08)] [&_li]:py-[0.65rem] [&_li:first-child]:border-t-0 [&_li:first-child]:pt-0 max-[768px]:[&_li]:flex-col max-[768px]:[&_li]:gap-[0.2rem] [&_strong]:font-extrabold [&_strong]:!text-[#152018] [&_span]:text-right [&_span]:!text-[#5d675f] max-[768px]:[&_span]:text-left">
                                                            {p.specs.map((spec, index) => (
                                                                <li key={index}>
                                                                    <strong>{spec.label}</strong>
                                                                    <span>{spec.value}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        );
                    })()}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProductDetailPage;
