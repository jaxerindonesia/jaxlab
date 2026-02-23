import React, { useState } from 'react';
import '../components/ProductSection.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts, getCategories, formatRupiah } from '../database/db';

const ProductsPage: React.FC = () => {
    const navigate = useNavigate();

    // Dipanggil di DALAM komponen — DB sudah siap saat ini
    const allProducts = getAllProducts();
    const dbCategories = getCategories();
    const productCategories = ['All', ...dbCategories];

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const filteredProducts = allProducts.filter(product => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleCategoryChange = (cat: string) => {
        setSelectedCategory(cat);
        setCurrentPage(1);
    };

    return (
        <div className="products-page">
            <Header />
            <main style={{ paddingTop: '2rem' }}>
                <section className="product-section">
                    <div className="container">
                        <div className="section-header text-center">
                            <span className="tag-pill">Produk Alami JaxLab</span>
                            <h2 className="title-green">Good Food Starts Here</h2>
                            <p className="subtitle">Pilihan produk alami untuk mendukung gaya hidup sehat Anda.</p>
                        </div>

                        {/* Search Bar */}
                        <div className="search-filter-container">
                            <div className="search-input-box">
                                <input
                                    type="text"
                                    placeholder="Cari produk JaxLab..."
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                />
                                <Search className="search-icon-input" size={18} />
                            </div>

                            <div className="filter-pills">
                                {productCategories.map((category) => (
                                    <button
                                        key={category}
                                        className={`filter-pill ${selectedCategory === category ? 'active' : ''}`}
                                        onClick={() => handleCategoryChange(category)}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <p style={{ textAlign: 'center', color: '#666', marginBottom: '1rem', fontSize: '0.9rem' }}>
                            Menampilkan <strong>{filteredProducts.length}</strong> produk
                            {selectedCategory !== 'All' && ` dalam kategori "${selectedCategory}"`}
                            {searchTerm && ` untuk "${searchTerm}"`}
                        </p>

                        <div className="product-grid">
                            {paginatedProducts.length > 0 ? paginatedProducts.map((product) => (
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
                                        <div className="price-group">
                                            <p className="product-price">{formatRupiah(product.price)}</p>
                                            {product.originalPrice && (
                                                <p className="product-price-original">{formatRupiah(product.originalPrice)}</p>
                                            )}
                                        </div>
                                        <div className="stock-indicator" data-status={product.stockStatus}>
                                            {product.stockStatus}
                                        </div>
                                        <button
                                            className="details-btn-outlined"
                                            onClick={() => navigate(`/products/${product.id}`)}
                                        >
                                            Lihat Detail
                                        </button>
                                    </div>
                                </div>
                            )) : (
                                <div className="no-results">
                                    <p>Produk tidak ditemukan. Coba kata kunci lain.</p>
                                </div>
                            )}
                        </div>

                        {totalPages > 1 && (
                            <div className="pagination-container text-center">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        className={`page-btn ${currentPage === page ? 'active' : ''}`}
                                        onClick={() => setCurrentPage(page)}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default ProductsPage;
