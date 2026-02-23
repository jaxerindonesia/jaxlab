import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductSection.css';
import { getFeaturedProducts, formatRupiah } from '../database/db';

const ProductSection: React.FC = () => {
    const navigate = useNavigate();
    // Dipanggil di DALAM komponen — DB sudah siap saat ini
    const products = getFeaturedProducts();

    return (
        <section className="product-section" id="products">
            <div className="container">
                <div className="section-header text-center">
                    <span className="tag-pill">Pilihan Alami untuk Sehari-hari</span>
                    <h2>Good Food Starts Here</h2>
                </div>

                <div className="product-grid">
                    {products.map((product) => (
                        <div key={product.id} className="product-card">
                            {product.badge && (
                                <span className={`product-badge badge-${product.badge.toLowerCase().replace(/\s/g, '-')}`}>
                                    {product.badge}
                                </span>
                            )}
                            <div className="product-image-wrapper">
                                <img src={product.images[0]} alt={product.name} />
                            </div>
                            <div className="product-info">
                                <span className="product-category-tag">{product.category}</span>
                                <h3>{product.name}</h3>
                                <p className="product-desc">{product.description}</p>
                                <p className="product-price">{formatRupiah(product.price)}</p>
                                <button
                                    className="details-btn-outlined"
                                    onClick={() => navigate(`/products/${product.id}`)}
                                >
                                    Lihat Detail
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="load-more-container text-center">
                    <button className="load-more-btn" onClick={() => navigate('/products')}>
                        Lihat Semua Produk
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProductSection;
