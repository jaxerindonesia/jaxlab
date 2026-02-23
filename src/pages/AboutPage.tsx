import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './AboutPage.css';
import { Leaf, RefreshCw, ShieldCheck } from 'lucide-react';

const AboutPage: React.FC = () => {
    return (
        <div className="about-page">
            <Header />

            {/* Hero Section */}
            <section className="about-hero">
                <div className="container hero-content-wrapper">
                    <div className="about-hero-text">
                        <span className="pill-tag">Cerita di Balik JaxLAB</span>
                        <h1>Untuk Anak,<br />Keluarga, dan Masa Depan</h1>
                        <p>
                            JaxLab menghadirkan makanan alami dan minim proses sebagai
                            bagian dari upaya sederhana mendukung hidup sehat sejak dini.
                        </p>
                        <div className="hero-buttons">
                            <button className="btn-white">Join Healthy Partner</button>
                            <button className="btn-outline">Pilih Produk JaxLab</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section (Who We Are) */}
            <section className="values-section">
                <div className="container values-container">
                    <div className="values-image">
                        {/* Placeholder for Asian couple in green suits */}
                        <img src="/img/founders.jpg" alt="JaxLab Founders" onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'} />
                    </div>
                    <div className="values-content">
                        <span className="pill-tag-light">Who We Are</span>
                        <h2>Tentang Nilai, Proses,<br />dan Kepercayaan</h2>
                        <p>
                            JaxLab adalah merek yang menjual produk makanan sehat alami, terutama Bone Broth
                            kaya kolagen, asam amino, dan mineral.
                        </p>
                        <p>
                            Kami menekankan penggunaan bahan alami dan makanan fitrah, bukan bahan kimia
                            buatan, untuk mendukung tubuh yang diciptakan secara alami.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission Section (Green Background) */}
            <section className="mission-section">
                <div className="container text-center">
                    <span className="small-subtitle">Visi & Misi JaxLab</span>
                    <h2>Nilai di Balik Setiap Produk</h2>

                    <div className="mission-grid">
                        <div className="mission-item">
                            <div className="icon-wrapper"><Leaf /></div>
                            <h3>Menghadirkan Makanan Alami</h3>
                            <p>Diproduksi dengan proses minimal dan bahan terpilih.</p>
                        </div>
                        <div className="mission-item">
                            <div className="icon-wrapper"><RefreshCw /></div>
                            <h3>Mendukung Kebiasaan Sehat</h3>
                            <p>Mendorong gaya hidup sehat sejak dini.</p>
                        </div>
                        <div className="mission-item">
                            <div className="icon-wrapper"><ShieldCheck /></div>
                            <h3>Berorientasi Jangka Panjang</h3>
                            <p>Menjaga kualitas melalui perbaikan berkelanjutan.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Commitment Section (Building) */}
            <section className="commitment-section">
                <div className="container commitment-container">
                    <div className="commitment-text">
                        <span className="pill-tag-light">Apa yang Kami Percaya</span>
                        <h2>Komitmen di Balik<br />Setiap Langkah</h2>
                        <p>
                            Kami percaya kesehatan lahir dari perhatian pada detail, proses yang jujur, dan
                            komitmen yang konsisten.
                        </p>
                    </div>
                    <div className="commitment-image">
                        {/* Placeholder for Building with Logo */}
                        <img src="/img/office_building.jpg" alt="JaxLab Office" onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'} />
                    </div>
                </div>
            </section>

            {/* CTA Bottom Section */}
            <section className="cta-bottom">
                <div className="container text-center">
                    <h2>Bersama JaxLab,<br />Bangun Hidup Sehat Alami</h2>
                    <button className="btn-white-pill">Join Healthy Partner</button>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AboutPage;
