import React, { useState, useEffect } from 'react';
import './Header.css';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavigation = (target: string) => {
        setIsMenuOpen(false);
        if (target.startsWith('#')) {
            if (location.pathname !== '/') {
                navigate('/');
                setTimeout(() => {
                    const element = document.getElementById(target.substring(1));
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                }, 500);
            } else {
                const element = document.getElementById(target.substring(1));
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        } else {
            navigate(target);
        }
    };

    return (
        <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
            <div className="container header-container">
                <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    <img src="/logo-jaxlab.png" alt="JAXLAB Logo" />
                </div>
                <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                    <a onClick={() => handleNavigation('/products')} style={{ cursor: 'pointer' }}>Produk</a>
                    <a onClick={() => handleNavigation('/fat-fasting')} style={{ cursor: 'pointer' }}>Fat Fasting</a>
                    {/* <a onClick={() => handleNavigation('#blog')} style={{ cursor: 'pointer' }}>Blog</a>
                    <a onClick={() => handleNavigation('#faq')} style={{ cursor: 'pointer' }}>FAQ</a> */}
                    <div className="mobile-only" style={{ marginTop: '20px' }}>
                        <a
                            href={`https://wa.me/6281234567890?text=${encodeURIComponent('Hai! Saya tertarik dengan produk JaxLab. Bisa info lebih lanjut?')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="header-cta-btn"
                        >
                            Beli Sekarang
                        </a>
                    </div>
                    <button onClick={() => setIsMenuOpen(false)} className="close-menu"><X /></button>
                </nav>
                <div className="header-actions">
                    <a
                        href={`https://wa.me/6281234567890?text=${encodeURIComponent('Hai! Saya tertarik dengan produk JaxLab. Bisa info lebih lanjut?')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="header-cta-btn desktop-only"
                    >
                        Beli Sekarang
                    </a>
                    <button className="menu-btn" onClick={() => setIsMenuOpen(true)}>
                        <Menu color="white" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
