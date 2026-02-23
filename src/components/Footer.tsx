import React from 'react';
import './Footer.css';
import { Instagram, Facebook, Youtube, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCompanyInfo, getCategories } from '../database/db';

const Footer: React.FC = () => {
    // Dipanggil di DALAM komponen — DB sudah siap saat ini
    const companyInfo = getCompanyInfo();
    const categories = getCategories();

    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-brand">
                    <div className="logo">
                        <img src="/logo-jaxlab.png" alt="JaxLab Logo" />
                    </div>
                    <p className="footer-desc">{companyInfo.description}</p>
                    <div className="social-links">
                        <a href={companyInfo.socialMedia.instagram} target="_blank" rel="noreferrer" title="Instagram">
                            <Instagram size={20} />
                        </a>
                        <a href={companyInfo.socialMedia.facebook} target="_blank" rel="noreferrer" title="Facebook">
                            <Facebook size={20} />
                        </a>
                        <a href={companyInfo.socialMedia.youtube} target="_blank" rel="noreferrer" title="YouTube">
                            <Youtube size={20} />
                        </a>
                    </div>
                </div>

                <div className="footer-links">
                    <div className="link-column">
                        <h4>Jelajahi</h4>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">Tentang JaxLab</Link></li>
                            <li><Link to="/products">Produk Kami</Link></li>
                            <li><Link to="/contact">Kontak Kami</Link></li>
                        </ul>
                    </div>
                    <div className="link-column">
                        <h4>Kategori Produk</h4>
                        <ul>
                            {categories.map(cat => (
                                <li key={cat}>
                                    <Link to="/products">{cat}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="link-column">
                        <h4>Hubungi Kami</h4>
                        <ul className="contact-list">
                            <li>
                                <Phone size={14} />
                                <a href={`tel:${companyInfo.phone}`}>{companyInfo.phone}</a>
                            </li>
                            <li>
                                <Mail size={14} />
                                <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
                            </li>
                            <li>
                                <MapPin size={14} />
                                <span>{companyInfo.address}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>
                    &copy; {new Date().getFullYear()} {companyInfo.name}. All rights reserved. |{' '}
                    <a href="#">Privacy Policy</a> | <a href="#">Terms &amp; Conditions</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
