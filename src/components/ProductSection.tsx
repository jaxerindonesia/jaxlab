import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductSection.css";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { type Product, getFeaturedProducts } from "../database/db";

const ProductSection: React.FC = () => {
  const navigate = useNavigate();
  const productTrackRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const scrollProducts = (direction: "prev" | "next") => {
    const track = productTrackRef.current;
    if (!track) return;

    const productCards = track.querySelectorAll<HTMLElement>(".product-card");
    const targetLeft =
      direction === "next" && productCards[2] ? productCards[2].offsetLeft : 0;

    track.scrollTo({
      left: targetLeft,
      behavior: "smooth",
    });
  };

  const certifiedLogos = [
    {
      src: "/img/product-certified/Usda logo.png",
      alt: "USDA Organic",
    },
    {
      src: "/img/product-certified/Malaysia halal.png",
      alt: "Halal Malaysia",
    },
    {
      src: "/img/product-certified/Logo halal tunisia.png",
      alt: "Halal Tunisia",
    },
    {
      src: "/img/product-certified/Halal_Indonesia.png",
      alt: "Halal Indonesia",
    },
    {
      src: "/img/product-certified/Ecocert.png",
      alt: "Ecocert",
    },
    {
      src: "/img/product-certified/BADAN_POM.png",
      alt: "Badan POM",
    },
  ];

  useEffect(() => {
    let cancelled = false;
    getFeaturedProducts()
      .then((p) => {
        if (!cancelled) setProducts(p);
      })
      .catch(() => {
        if (!cancelled) setProducts([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const track = productTrackRef.current;
    if (!track || products.length === 0) return;

    const frameId = requestAnimationFrame(() => {
      track.scrollTo({ left: 0, behavior: "auto" });
    });

    return () => cancelAnimationFrame(frameId);
  }, [products]);

  return (
    <>
      <section className="product-section" id="products">
        <div className="container">
          <div className="product-video-wrap">
            <video
              className="product-intro-video"
              autoPlay
              controls
              loop
              muted
              playsInline
              preload="metadata"
              poster="/img/DSC03061-web.jpg"
              aria-label="Video pengantar Fat Fasting JaxLab"
            >
              <source src="/video/35422496.mp4" type="video/mp4" />
              Browser Anda tidak mendukung pemutar video.
            </video>
          </div>

          <div
            className="section-header product-section-header"
            style={{ alignItems: "center" }}
          >
            <ScrollReveal
              className="product-header-reveal product-section-heading"
              delay={80}
            >
              <span className="section-subtitle">Fat Fasting Essentials</span>
              <h2>
                <span className="product-heading-green">Nutrisi</span>
                <span className="product-heading-line">
                  Pendukung <em>Fat Fasting</em>
                </span>
              </h2>
            </ScrollReveal>
            <ScrollReveal
              className="product-header-reveal product-section-desc-reveal"
              delay={220}
            >
              <p className="section-desc">
                Produk yang dirancang untuk menemani setiap fase Fat Fasting
                Protocol agar lebih mudah, nyaman, dan optimal.
              </p>
            </ScrollReveal>
          </div>

          <div className="product-carousel">
            <div className="product-grid" ref={productTrackRef}>
              {products.slice(0, 3).map((product) => {
                const highlights =
                  product.benefits?.length > 0
                    ? product.benefits.slice(0, 2)
                    : [product.subtitle, product.description]
                        .filter(Boolean)
                        .slice(0, 2);

                return (
                  <article key={product.id} className="product-card">
                    <div className="product-image-wrapper">
                      <img src={product.images[0]} alt={product.name} />
                    </div>
                    <div className="product-info">
                      <span className="product-category-tag">
                        {product.badge || product.category}
                      </span>
                      <h3>{product.name}</h3>

                      <ul className="product-benefits">
                        {highlights.map((benefit) => (
                          <li key={benefit}>
                            <Check size={20} strokeWidth={2.4} />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="product-card-footer">
                        <button
                          className="buy-btn-solid"
                          aria-label={`Beli ${product.name}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/products/${product.id}`);
                          }}
                        >
                          Beli Sekarang
                        </button>
                        <button
                          className="learn-more-link"
                          type="button"
                          onClick={() => navigate(`/products/${product.id}`)}
                        >
                          Learn More
                          <ArrowRight size={15} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
              <article
                className="product-more-card product-carousel-more"
                onClick={() => navigate("/products")}
              >
                <span className="product-more-kicker">Produk Lainnya</span>
                <h3>Temukan rangkaian JaxLab lainnya</h3>
                <p>
                  Jelajahi pilihan produk pendukung Fat Fasting dan kebutuhan
                  nutrisi harian Anda.
                </p>
                <button type="button">
                  Lihat Semua Produk
                  <ArrowRight size={16} />
                </button>
              </article>
            </div>

            <div
              className="product-carousel-controls"
              aria-label="Navigasi produk"
            >
              <button
                type="button"
                className="product-carousel-btn"
                aria-label="Geser produk sebelumnya"
                onClick={() => scrollProducts("prev")}
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                className="product-carousel-btn"
                aria-label="Geser produk berikutnya"
                onClick={() => scrollProducts("next")}
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <span
        className="section-subtitle"
        style={{
          alignSelf: "center",
          color: "black",
          fontSize: "larger",
          fontWeight: "bold",
        }}
      >
        Trusted & Certified
      </span>
      <section
        className="product-certified-marquee"
        aria-label="Sertifikasi produk JaxLab"
      >
        <div className="product-certified-track">
          {Array.from({ length: 5 }).map((_, groupIndex) =>
            certifiedLogos.map((item, index) => (
              <React.Fragment key={`${groupIndex}-${item.alt}-${index}`}>
                <span className="product-certified-logo">
                  <img src={item.src} alt={item.alt} loading="lazy" />
                </span>
                <span className="marquee-dot">•</span>
              </React.Fragment>
            )),
          )}
        </div>
      </section>
    </>
  );
};

export default ProductSection;
