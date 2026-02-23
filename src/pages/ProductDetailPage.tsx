import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './ProductDetailPage.css';
import { Star, ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getProductById, formatRupiah } from '../database/db';

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    // Get product from database using ID from URL
    const productId = id ? parseInt(id, 10) : null;
    const product = productId ? getProductById(productId) : null;

    // If product not found, show error message
    if (!product) {
        return (
            <div className="product-detail-page">
                <Header />
                <main className="detail-main">
                    <div className="container detail-container">
                        <div style={{ textAlign: 'center', padding: '3rem' }}>
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
                    {/* Breadcrumbs */}
                    <div className="breadcrumbs">
                        <Link to="/">Home</Link> &gt;
                        <Link to="/products">Produk</Link> &gt;
                        <span>{product.name}</span>
                    </div>

                    <Link to="/products" className="back-link">
                        <ArrowLeft size={16} /> Kembali ke semua produk
                    </Link>

                    <div className="product-layout">
                        {/* Gallery */}
                        <div className="product-gallery">
                            <div className="thumbnail-list">
                                {product.images.map((img, index) => (
                                    <div
                                        key={index}
                                        className={`thumb-item ${selectedImage === index ? 'active' : ''}`}
                                        onMouseEnter={() => setSelectedImage(index)}
                                        onClick={() => setSelectedImage(index)}
                                    >
                                        <img src={img} alt={`Thumbnail ${index + 1}`} />
                                    </div>
                                ))}
                            </div>
                            <div className="main-image">
                                <img src={product.images[selectedImage]} alt={product.name} />
                                {product.badge && (
                                    <span className={`product-badge-detail badge-${product.badge.toLowerCase().replace(/\s/g, '-')}`}>
                                        {product.badge}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="product-details-info">
                            <span className="detail-category-tag">{product.category}</span>
                            <h1 className="product-title">{product.name}</h1>
                            <p className="product-subtitle">{product.subtitle}</p>

                            <div className="rating-row">
                                <div className="stars">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={18}
                                            fill={i < Math.floor(product.rating) ? '#FFC107' : 'none'}
                                            color="#FFC107"
                                        />
                                    ))}
                                </div>
                                <span className="review-count">{product.rating} ({product.reviewCount} ulasan)</span>
                            </div>

                            <div className="price-row">
                                <h2>{formatRupiah(product.price)}</h2>
                                {product.originalPrice && (
                                    <span className="original-price">{formatRupiah(product.originalPrice)}</span>
                                )}
                                {product.originalPrice && (
                                    <span className="discount-badge">
                                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                                    </span>
                                )}
                            </div>

                            <div className="stock-row">
                                <span style={{ color: 'black', fontWeight: 'bold' }}>Stok: </span>
                                <span
                                    className="stock-status"
                                    style={{
                                        color: product.stockStatus === 'Tersedia' ? 'green'
                                            : product.stockStatus === 'Terbatas' ? 'orange' : 'red'
                                    }}
                                >
                                    {product.stockStatus}
                                </span>
                            </div>

                            {/* Quantity Selector */}
                            <div className="quantity-row">
                                <span style={{ fontWeight: '600', marginRight: '1rem' }}>Jumlah:</span>
                                <div className="quantity-selector">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                                    <span>{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                                </div>
                            </div>

                            <div className="action-buttons">
                                <button className="btn-cart" style={{ backgroundColor: '#FF5722', color: 'white' }}>Tambah ke Keranjang</button>
                                <button className="btn-buy" style={{ backgroundColor: '#FFC107', color: '#333' }}>Beli Sekarang</button>
                            </div>

                            {/* Benefits */}
                            {product.benefits.length > 0 && (
                                <div className="benefits-list">
                                    <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Manfaat Utama:</p>
                                    <ul>
                                        {product.benefits.map((benefit, i) => (
                                            <li key={i}>✓ {benefit}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Description & Specs */}
                    <div className="product-description-block">
                        <div className="desc-section">
                            <h3>Deskripsi Produk</h3>
                            <p>{product.longDescription}</p>
                        </div>
                        <div className="specs-section">
                            <h3>Spesifikasi:</h3>
                            <ul className="specs-list">
                                {product.specs.map((spec, index) => (
                                    <li key={index}>
                                        • <strong style={{ paddingLeft: '5px' }}>{spec.label} : </strong> {spec.value}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProductDetailPage;
