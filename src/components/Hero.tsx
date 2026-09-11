import React, { useMemo } from "react";
import "./Hero.css";
import {
  ArrowRight,
  Circle,
  BadgeCheck,
  MessageCircle,
  ShieldCheck,
  Leaf,
} from "lucide-react";

const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  // Generate floating particles sekali aja
  const particles = useMemo(() => {
    return Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // posisi horizontal (%)
      size: 2 + Math.random() * 4, // ukuran titik (2px - 6px)
      delay: Math.random() * 8, // delay biar ga muncul bareng
      duration: 6 + Math.random() * 6, // durasi naik (6s - 12s)
      drift: (Math.random() - 0.5) * 60, // seberapa jauh geser horizontal (-30px s/d 30px)
      opacity: 0.2 + Math.random() * 0.5,
    }));
  }, []);

  return (
    <section className="hero" id="hero">
      {/* Subtle background decorations */}
      <div className="hero-bg-glow hero-bg-glow--1"></div>
      <div className="hero-bg-glow hero-bg-glow--2"></div>

      {/* Floating particles layer */}
      <div className="hero-particles" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className="particle"
            style={
              {
                left: `${p.left}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                opacity: p.opacity,
                "--drift": `${p.drift}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="container hero-container">
        <div className="hero-content">
          <span className="hero-badge">
            <Leaf size={14} />
            Mulai Fat Fasting dengan Protokol yang Tepat
          </span>

          <h1 className="hero-heading">
            <span className="hero-heading__line">Saatnya</span>
            <span className="hero-heading__line">
              <span className="font-serif-italic hero-heading--accent">
                Tubuhmu
              </span>
            </span>
            <span className="hero-heading__line">kembali ke Fitrahnya</span>
          </h1>

          <p className="hero-desc">
            Fat Fasting 72 Jam membantu tubuh kembali menggunakan lemak sebagai sumber energi alami, didukung rangkaian nutrisi dari JaxLab.
          </p>

          <div className="hero-buttons">
            <a
              className="btn-primary-green"
              href="https://whatsapp.com/channel/0029Vb7r5yR002TD2W3JqD3y"
              target="_blank"
              rel="noreferrer"
            >
              Bergabung Komunitas Jaxlab
              <ArrowRight size={18} />
            </a>
            <button
              className="btn-outlined"
              onClick={() => scrollToSection("kenapa")}
            >
              Pelajari Protokol
            </button>
          </div>

          <div className="hero-trust-badges">
            <div className="trust-item">
              <MessageCircle size={16} />
              <span>Akses Tanya Jawab dengan Dokter</span>
            </div>
            <div className="trust-item">
              <BadgeCheck size={16} />
              <span>Produk Halal & BPOM Indonesia</span>
            </div>
            <div className="trust-item">
              <ShieldCheck size={16} />
              <span>Bergabung dengan Komunitas JaxLab</span>
            </div>
          </div>
        </div>

        <div className="hero-image-container">
          <div className="hero-image-wrapper">
            <img
              src="/img/Jaroliva.png"
              alt="Produk Jaroliva"
              className="hero-main-image"
            />
            {/* Floating card overlay */}
            <div className="hero-floating-card">
              <div className="floating-card-icon">
                <Circle size={18} fill="currentColor" />
              </div>
              <div className="floating-card-text">
                <strong>Fat Fasting 72 Jam</strong>
                <span>Dukungan nutrisi, edukasi, dan komunitas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
