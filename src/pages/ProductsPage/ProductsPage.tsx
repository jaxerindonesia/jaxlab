import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { ArrowRight, Check } from 'lucide-react';
import { formatRupiah, getAllProducts, type ProductDto } from '../../services/service-api';

const ProductsPage: React.FC = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<ProductDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Semua');

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        getAllProducts()
            .then((p) => {
                if (!cancelled) {
                    setProducts(p);
                    setLoading(false);
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setProducts([]);
                    setLoading(false);
                }
            });
        return () => { cancelled = true; };
    }, []);

    // Extract unique categories
    const categories = ['Semua', ...Array.from(new Set(products.map(p => p.category)))];

    // Filter products
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              product.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'Semua' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="bg-[#0b0f0b] !text-white">
            <Header />

            <main className="relative bg-[#f9f5ec] pb-4 pt-32 !text-[#1a1a1a]">
                <div className="mx-auto max-w-[1490px] px-[25px]">
                    <div className="mb-12 mt-8 text-center">
                        <span className="mb-3 inline-flex text-[0.85rem] font-medium uppercase tracking-[1px] !text-[#4ade80]">✦ Katalog Lengkap</span>
                        <h2 className="mb-4 text-[2.5rem] font-bold leading-[1.2] !text-[#1a1a1a]">Keseluruhan Produk Kami</h2>
                        <p className="mx-auto max-w-[650px] text-[1.05rem] leading-[1.7] !text-[#555]">
                            Temukan semua produk alami berkualitas dari JaxLab yang dirancang khusus untuk mendukung kesehatan dan kesejahteraan Anda.
                        </p>
                    </div>

                    <div className="mx-auto mb-12 flex max-w-[1440px] flex-col items-center gap-6">
                        {/* Search Input */}
                        <div className="relative w-full max-w-[500px]">
                            <input
                                type="text"
                                placeholder="Cari produk JaxLab..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-[50px] border border-[#ddd] bg-white py-4 pl-6 pr-12 text-[0.95rem] outline-none"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20" height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#aaa"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="absolute right-5 top-1/2 -translate-y-1/2"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </div>

                        {/* Category Pills */}
                        <div className="flex flex-wrap justify-center gap-[0.8rem]">
                            {categories.map((cat, idx) => {
                                const isSelected = selectedCategory === cat;
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`cursor-pointer rounded-[50px] border px-[1.8rem] py-[0.6rem] text-[0.9rem] font-medium transition-all duration-200 ${isSelected ? 'border-[#1a4d2e] bg-[#1a4d2e] !text-white' : 'border-[#ddd] bg-[#f9f5ec] !text-[#555]'}`}
                                    >
                                        {cat === 'Semua' ? 'All' : cat}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {loading ? (
                        <div className="p-16 text-center">Memuat produk...</div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="p-16 text-center">Tidak ada produk yang sesuai dengan pencarian Anda.</div>
                    ) : (
                        <div className="mx-auto mb-[3.2rem] grid max-w-[1440px] grid-cols-2 gap-[1.7rem] max-[1180px]:max-w-[980px] max-[1180px]:grid-cols-1">
                            {filteredProducts.map((product) => {
                                const highlights =
                                    product.benefits?.length > 0
                                        ? product.benefits.slice(0, 2)
                                        : [product.subtitle, product.description].filter(Boolean).slice(0, 2);

                                return (
                                    <article key={product.id} className="grid min-h-[348px] grid-cols-[minmax(220px,0.72fr)_minmax(0,1fr)] overflow-hidden rounded-3xl border border-[rgba(6,59,24,0.12)] bg-[linear-gradient(135deg,#dff0d3_0%,#d0e9c0_100%)] shadow-[0_18px_44px_rgba(20,44,22,0.08)] max-[768px]:min-h-0 max-[768px]:grid-cols-1">
                                        <div className="relative flex items-center justify-center bg-[radial-gradient(circle_at_50%_56%,rgba(79,198,107,0.28),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.04))] px-6 py-8 after:absolute after:bottom-7 after:left-[16%] after:right-[16%] after:h-[18px] after:rounded-full after:bg-[rgba(6,59,24,0.12)] after:blur-[14px] max-[768px]:min-h-60">
                                            <img className="relative z-[1] max-h-[250px] !w-[min(100%,240px)] object-contain drop-shadow-[0_18px_22px_rgba(6,59,24,0.18)]" src={product.images[0]} alt={product.name} />
                                        </div>
                                        <div className="flex min-w-0 flex-col pb-[1.8rem] pl-8 pr-8 pt-8 max-[768px]:px-5 max-[768px]:pb-[1.45rem] max-[768px]:pt-[1.35rem]">
                                            <span className="mb-4 inline-flex min-h-[38px] w-fit items-center rounded-full border border-[rgba(6,59,24,0.18)] bg-white/25 px-4 py-[0.35rem] text-[0.82rem] font-extrabold !text-[#06451b]">{product.badge || product.category}</span>
                                            <h3 className="mb-[1.15rem] text-[clamp(1.6rem,2vw,2.15rem)] font-extrabold leading-[1.15] !text-[#061407]">{product.name}</h3>

                                            <ul className="mb-6 grid list-none gap-[0.85rem] p-0 text-[0.95rem] leading-[1.45] !text-[#233326]">
                                                {highlights.map((benefit) => (
                                                    <li className="grid grid-cols-[22px_minmax(0,1fr)] items-start gap-[0.6rem]" key={benefit}>
                                                        <Check className="mt-[0.08rem] text-[#06451b]" size={20} strokeWidth={2.4} />
                                                        <span>{benefit}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            <div className="mt-auto flex flex-wrap items-center gap-[0.9rem] max-[768px]:items-stretch">
                                                <button
                                                    className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full border border-[#063b18] bg-[#063b18] px-6 py-[0.9rem] text-[0.98rem] font-extrabold !text-white max-[768px]:w-full"
                                                    aria-label={`Beli ${product.name}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        navigate(`/products/${product.id}`);
                                                    }}
                                                >
                                                    Beli Sekarang
                                                    <span>·</span>
                                                    {formatRupiah(product.price)}
                                                </button>
                                                <button
                                                    className="inline-flex items-center gap-[0.45rem] bg-transparent py-1 text-[0.98rem] font-extrabold !text-[#06451b] underline underline-offset-[3px] max-[768px]:justify-center"
                                                    type="button"
                                                    onClick={() => navigate(`/products/${product.id}`)}
                                                >
                                                    Learn More
                                                    <ArrowRight size={15} />
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProductsPage;
