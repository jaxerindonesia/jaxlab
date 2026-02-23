import React, { useState } from 'react';
import './Header.css';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

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
        <header className="header">
            <div className="container header-container">
                <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    <img src="/logo-jaxlab.png" alt="JAXLAB Logo" />
                </div>
                <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                    <a onClick={() => handleNavigation('/')} style={{ cursor: 'pointer' }}>Home</a>
                    <a onClick={() => handleNavigation('/products')} style={{ cursor: 'pointer' }}>Produk Kami</a>
                    <a onClick={() => handleNavigation('/about')} style={{ cursor: 'pointer' }}>Tentang JaxLab</a>
                    {/* Updated Link */}
                    <a onClick={() => handleNavigation('/contact')} style={{ cursor: 'pointer' }}>Hubungi Kami</a>
                    <div className="mobile-only" style={{ marginTop: '20px' }}>
                        <button className="join-btn">Join Healthy Partner</button>
                    </div>
                    <button onClick={() => setIsMenuOpen(false)} className="close-menu"><X /></button>
                </nav>
                <div className="header-actions">
                    <button className="join-btn desktop-only">Join Healthy Partner</button>
                    <button className="menu-btn" onClick={() => setIsMenuOpen(true)}>
                        <Menu color="white" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
