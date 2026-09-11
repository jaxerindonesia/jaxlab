import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../components/ProductSection.css'; // Reusing the product card styles
import { ArrowRight, Check } from 'lucide-react';
import { type Product, formatRupiah, getAllProducts } from '../database/db';

const ProductsPage: React.FC = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
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
        <div className="products-page">
            <Header />
            
            <main className="product-section">
                <div className="container">
                    <div className="section-header text-center" style={{ marginTop: '2rem' }}>
                        <span className="section-subtitle">✦ Katalog Lengkap</span>
                        <h2>Keseluruhan Produk Kami</h2>
                        <p className="section-desc">
                            Temukan semua produk alami berkualitas dari JaxLab yang dirancang khusus untuk mendukung kesehatan dan kesejahteraan Anda.
                        </p>
                    </div>

                    <div className="search-filter-container products-toolbar" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
                        {/* Search Input */}
                        <div className="products-search" style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
                            <input 
                                type="text" 
                                placeholder="Cari produk JaxLab..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ 
                                    width: '100%', 
                                    padding: '1rem 1.5rem', 
                                    paddingRight: '3rem',
                                    borderRadius: '50px', 
                                    border: '1px solid #ddd', 
                                    outline: 'none',
                                    fontSize: '0.95rem'
                                }}
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
                                style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)' }}
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </div>

                        {/* Category Pills */}
                        <div className="category-pills products-category-pills" style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {categories.map((cat, idx) => {
                                const isSelected = selectedCategory === cat;
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedCategory(cat)}
                                        style={{
                                            padding: '0.6rem 1.8rem',
                                            borderRadius: '50px',
                                            border: isSelected ? '1px solid #1a4d2e' : '1px solid #ddd',
                                            backgroundColor: isSelected ? '#1a4d2e' : '#f9f5ec',
                                            color: isSelected ? '#fff' : '#555',
                                            fontWeight: '500',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            fontSize: '0.9rem'
                                        }}
                                    >
                                        {cat === 'Semua' ? 'All' : cat}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center" style={{ padding: '4rem' }}>Memuat produk...</div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="text-center" style={{ padding: '4rem' }}>Tidak ada produk yang sesuai dengan pencarian Anda.</div>
                    ) : (
                        <div className="products-catalog-grid">
                            {filteredProducts.map((product) => {
                                const highlights =
                                    product.benefits?.length > 0
                                        ? product.benefits.slice(0, 2)
                                        : [product.subtitle, product.description].filter(Boolean).slice(0, 2);

                                return (
                                    <article key={product.id} className="catalog-product-card">
                                        <div className="catalog-product-image">
                                            <img src={product.images[0]} alt={product.name} />
                                        </div>
                                        <div className="catalog-product-body">
                                            <span className="catalog-product-tag">{product.badge || product.category}</span>
                                            <h3>{product.name}</h3>

                                            <ul className="catalog-product-benefits">
                                                {highlights.map((benefit) => (
                                                    <li key={benefit}>
                                                        <Check size={20} strokeWidth={2.4} />
                                                        <span>{benefit}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            <div className="catalog-product-footer">
                                                <button
                                                    className="catalog-buy-btn"
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
                                                    className="catalog-learn-more"
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
