import React from "react";
import "./Footer.css";
import {
  Facebook,
  Instagram,
  MapPin,
  MessageCircle,
  Music2,
  Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getCompanyInfo } from "../database/db";

const Footer: React.FC = () => {
  const companyInfo = getCompanyInfo();
  const socialLinks = {
    facebook: "https://www.facebook.com/profile.php?id=61590417866178",
    youtube: "https://www.youtube.com/@jaxlabindonesia",
    tiktok:
      "https://www.tiktok.com/@jaxlabindonesia?is_from_webapp=1&sender_device=pc",
    whatsapp:
      "https://chat.whatsapp.com/LJxucyPUtci4baRJX5WShx?s=sw&p=i&mlu=0",
  };

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <div className="logo">
            <img src="/logo-jaxlab.png" alt="JaxLab Logo" />
          </div>
          <h3>Reset Tubuh Kembali ke Fitrahnya</h3>
          <p className="footer-desc">
            JaxLab menghadirkan nutrisi pendukung Fat Fasting untuk membantu
            menjaga kesehatan metabolik melalui produk berkualitas, edukasi, dan
            komunitas yang saling mendukung.
          </p>
          <div className="footer-address">
            <MapPin size={16} />
            <span>
              Jl. Cempaka Putih Tengah XVII No.F33, Cempaka Putih Timur, Kec.
              Cempaka Putih, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta
              10510
            </span>
          </div>
          <span className="footer-follow-label">Follow Us</span>
          <div className="social-links">
            <a
              href={companyInfo.socialMedia.instagram}
              target="_blank"
              rel="noreferrer"
              title="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href={socialLinks.tiktok}
              target="_blank"
              rel="noreferrer"
              title="TikTok"
            >
              <Music2 size={20} />
            </a>
            <a
              href={socialLinks.youtube}
              target="_blank"
              rel="noreferrer"
              title="YouTube"
            >
              <Youtube size={20} />
            </a>
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noreferrer"
              title="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noreferrer"
              title="WhatsApp"
            >
              <MessageCircle size={20} />
            </a>
          </div>
        </div>

        <div className="footer-links">
          <div className="link-column">
            <h4>Produk</h4>
            <ul>
              <li>
                <a href="#products">Extra Virgin Olive Oil</a>
              </li>
              <li>
                <a href="#products">Cocofenol</a>
              </li>
              <li>
                <a href="#products">Ketone Imuno</a>
              </li>
              <li>
                <a href="#products">Fat Fasting Bundle</a>
              </li>
              <li>
                <Link to="/products">Semua Produk</Link>
              </li>
            </ul>
          </div>
          <div className="link-column">
            <h4>Perusahaan</h4>
            <ul>
              <li>
                <Link to="/about">Tentang JaxLab</Link>
              </li>
              <li>
                <a href="#gallery">Blog & Artikel</a>
              </li>
              <li>
                <a href="#hero">Karir</a>
              </li>
              <li>
                <Link to="/contact">Hubungi Kami</Link>
              </li>
            </ul>
          </div>
          <div className="link-column">
            <h4>Bantuan</h4>
            <ul>
              <li>
                <a href="#kenapa">FAQ</a>
              </li>
              <li>
                <a href="#products">Cara Pemesanan</a>
              </li>
              <li>
                <a href="#products">Pengiriman</a>
              </li>
              <li>
                <a href="#hero">Kebijakan Privasi</a>
              </li>
              <li>
                <a href="#hero">Syarat & Ketentuan</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className="footer-bottom"
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p>&copy; 2026 JaxLab Indonesia. All Rights Reserved.</p>
        <span>💚 Bantu Tubuh Sehat Alami</span>
      </div>
    </footer>
  );
};

export default Footer;
