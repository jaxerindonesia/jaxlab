import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './ProductDetailPage.css';
import { ArrowLeft, CheckCircle, Star } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { type Product, formatRupiah, getProductById } from '../database/db';

type DetailSection = 'highlight' | 'description' | 'benefits' | 'specs';

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [selectedImage, setSelectedImage] = useState(0);
    const [openSection, setOpenSection] = useState<DetailSection | null>('description');

    const [product, setProduct] = useState<Product | null>(null);
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
            <div className="product-detail-page">
                <Header />
                <main className="detail-main">
                    <div className="container detail-container">
                        <div className="detail-empty-state">
                            <h2>Produk tidak ditemukan</h2>
                            <p>Produk yang Anda cari tidak tersedia.</p>
                            <Link to="/products" className="back-link">
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
        <div className="product-detail-page">
            <Header />

            <main className="detail-main">
                <div className="container detail-container">
                    {loading && (
                        <div className="detail-empty-state">
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

                        return (
                            <>
                                <div className="detail-topline">
                                    <div className="breadcrumbs">
                                        <Link to="/">Home</Link>
                                        <span>/</span>
                                        <Link to="/products">Produk</Link>
                                        <span>/</span>
                                        <span>{p.name}</span>
                                    </div>
                                    <Link to="/products" className="back-link">
                                        <ArrowLeft size={14} /> Kembali ke semua produk
                                    </Link>
                                </div>

                                <div className="product-layout">
                                    <div className={`product-gallery ${p.images.length <= 1 ? 'product-gallery-single' : ''}`}>
                                        <div className="main-image">
                                            {selectedProductImage && <img src={selectedProductImage} alt={p.name} />}
                                            {p.badge && (
                                                <span className={`product-badge-detail badge-${p.badge.toLowerCase().replace(/\s/g, '-')}`}>
                                                    {p.badge}
                                                </span>
                                            )}
                                        </div>

                                        {p.images.length > 1 && (
                                            <div className="thumbnail-list" aria-label="Pilihan gambar produk">
                                                {p.images.map((image, index) => (
                                                    <button
                                                        key={`${image}-${index}`}
                                                        type="button"
                                                        className={`thumb-item ${selectedImage === index ? 'active' : ''}`}
                                                        onClick={() => setSelectedImage(index)}
                                                        aria-label={`Lihat gambar produk ${index + 1}`}
                                                    >
                                                        <img src={image} alt={`${p.name} ${index + 1}`} />
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="product-details-info">
                                        <span className="detail-category-tag">{p.category}</span>
                                        <h1 className="product-title">{p.name}</h1>
                                        {p.subtitle && <p className="product-subtitle">{p.subtitle}</p>}

                                        <div className="rating-row">
                                            <div className="stars" aria-label={`Rating ${p.rating} dari 5`}>
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={16}
                                                        fill={i < Math.floor(p.rating) ? '#FFC107' : 'none'}
                                                        color="#FFC107"
                                                    />
                                                ))}
                                            </div>
                                            <span className="review-count">
                                                {p.rating} ({p.reviewCount} ulasan)
                                            </span>
                                        </div>

                                        <div className="price-row">
                                            <h2>{formatRupiah(p.price)}</h2>
                                            {p.originalPrice && (
                                                <>
                                                    <span className="original-price">{formatRupiah(p.originalPrice)}</span>
                                                    <span className="discount-badge">
                                                        Hemat {discountPercentage}%
                                                    </span>
                                                </>
                                            )}
                                        </div>

                                        <div className="stock-row">
                                            <span className="stock-label">Stok:</span>
                                            <span
                                                className={`stock-status stock-status-${p.stockStatus.toLowerCase()}`}
                                            >
                                                {p.stockStatus}
                                            </span>
                                        </div>

                                        <div className="purchase-panel">
                                            <div className="purchase-card purchase-card-primary">
                                                <div>
                                                    <p className="purchase-label">Pilihan Pembelian</p>
                                                    <h3>Beli Sekarang</h3>
                                                    <span className="purchase-copy">
                                                        Produk original dengan pengiriman cepat dan dukungan customer service.
                                                    </span>
                                                </div>
                                                <div className="purchase-price-group">
                                                    <strong>{formatRupiah(p.price)}</strong>
                                                    {p.originalPrice && <span>{formatRupiah(p.originalPrice)}</span>}
                                                </div>
                                            </div>

                                            {p.marketplaceLinks && p.marketplaceLinks.length > 0 && (
                                                <div className="action-buttons">
                                                    {p.marketplaceLinks.map((btn, i) => (
                                                        <a
                                                            key={i}
                                                            href={btn.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className={`btn-buy ${i === 0 ? 'btn-buy-primary' : 'btn-buy-secondary'}`}
                                                        >
                                                            {btn.label}
                                                        </a>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="trust-points">
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

                                        <div className="detail-accordion">
                                            {p.benefits.length > 0 && (
                                                <div className={`accordion-item ${openSection === 'highlight' ? 'open' : ''}`}>
                                                    <button
                                                        type="button"
                                                        className="accordion-trigger"
                                                        onClick={() => toggleSection('highlight')}
                                                    >
                                                        <span>Highlight Produk</span>
                                                        <span className="accordion-icon" aria-hidden="true">+</span>
                                                    </button>
                                                    {openSection === 'highlight' && (
                                                        <div className="accordion-content">
                                                            <ul className="accordion-benefits accordion-highlight-list">
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

                                            <div className={`accordion-item ${openSection === 'description' ? 'open' : ''}`}>
                                                <button
                                                    type="button"
                                                    className="accordion-trigger"
                                                    onClick={() => toggleSection('description')}
                                                >
                                                    <span>Deskripsi</span>
                                                    <span className="accordion-icon" aria-hidden="true">+</span>
                                                </button>
                                                {openSection === 'description' && (
                                                    <div className="accordion-content">
                                                        <p>{p.longDescription}</p>
                                                    </div>
                                                )}
                                            </div>

                                            <div className={`accordion-item ${openSection === 'benefits' ? 'open' : ''}`}>
                                                <button
                                                    type="button"
                                                    className="accordion-trigger"
                                                    onClick={() => toggleSection('benefits')}
                                                >
                                                    <span>Manfaat</span>
                                                    <span className="accordion-icon" aria-hidden="true">+</span>
                                                </button>
                                                {openSection === 'benefits' && (
                                                    <div className="accordion-content">
                                                        <ul className="accordion-benefits">
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

                                            <div className={`accordion-item ${openSection === 'specs' ? 'open' : ''}`}>
                                                <button
                                                    type="button"
                                                    className="accordion-trigger"
                                                    onClick={() => toggleSection('specs')}
                                                >
                                                    <span>Spesifikasi</span>
                                                    <span className="accordion-icon" aria-hidden="true">+</span>
                                                </button>
                                                {openSection === 'specs' && (
                                                    <div className="accordion-content">
                                                        <ul className="specs-list">
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
