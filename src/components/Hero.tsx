import React from 'react';
import './Hero.css';
import { Search } from 'lucide-react';

const Hero: React.FC = () => {
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
                            <input type="text" placeholder="Cari produk JaxLab..." />
                        </div>
                        <button className="search-btn">Cari</button>
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
