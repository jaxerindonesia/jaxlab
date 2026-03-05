import React, { useState } from 'react';
import './Hero.css';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        const trimmed = searchTerm.trim();
        if (trimmed) {
            navigate(`/products?search=${encodeURIComponent(trimmed)}`);
        } else {
            navigate('/products');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <section className="hero">
            {/* Background image for mobile (hidden on desktop via CSS) */}
            <div className="hero-bg-mobile" style={{ backgroundImage: 'url(/img/Jaroliva.png)' }}></div>

            <div className="container hero-container">
                <div className="hero-content" style={{ marginLeft: '250px' }}>
                    <span className="tag">Kualitas Alami yang Terpercaya</span>
                    <h1>Reliable Product to<br />Enhanced Wellness</h1>
                    <p>
                        Produk multivitamin alami dan minim proses, dibuat untuk menjaga
                        kualitas nutrisi tanpa bahan tambahan buatan.
                    </p>

                    <div className="search-bar">
                        <div className="search-input-wrapper">
                            <Search className="search-icon" size={20} />
                            <input
                                type="text"
                                placeholder="Cari produk JaxLab..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <button className="search-btn" onClick={handleSearch}>Cari</button>
                    </div>
                </div>

                <div className="hero-image">
                    <img
                        src="/img/Jaroliva.png"
                        alt="Olive Oil Bottle"
                        className="product-image"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
