import React, { useState, useEffect, useRef } from "react";
import "./MediaSection.css";
import { ArrowRight } from "lucide-react";

const galleryImages = [
  {
    src: "/img/DSC03038-web.jpg",
    alt: "Galeri foto JaxLab 1",
  },
  {
    src: "/img/DSC02982-web.jpg",
    alt: "Galeri foto JaxLab 2",
  },
  {
    src: "/img/DSC03061-web.jpg",
    alt: "Galeri foto JaxLab 3",
  },
  {
    src: "/img/DSC02984.jpg",
    alt: "Galeri foto JaxLab 4",
  },
  {
    src: "/img/HAN02200.jpg",
    alt: "Galeri foto JaxLab 5",
  },
  {
    src: "/img/HAN03450.jpg",
    alt: "Galeri foto JaxLab 6",
  },
  {
    src: "/img/IMG_4856.jpg",
    alt: "Galeri foto JaxLab 7",
  },
];

const videos = [
  {
    id: "t1xx8JeVqJk",
    title: "Fat Fasting bersama JaxLab",
    url: "https://youtu.be/t1xx8JeVqJk?si=QInFBy9FVjrK4TnL",
  },
  {
    id: "7GHDGkkBW64",
    title: "Panduan Fat Fasting JaxLab",
    url: "https://youtu.be/7GHDGkkBW64?si=rhAFaE1NyvW9E1aH",
  },
  {
    id: "S-QpDZQsmdM",
    title: "Cerita Perjalanan Sehat JaxLab",
    url: "https://youtu.be/S-QpDZQsmdM?si=j9WuSvY_xJwX64cB",
  },
];

const MediaSection: React.FC = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [activeVideo, setActiveVideo] = useState(0);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const [ctaVisible, setCtaVisible] = useState(false);
  const previousImage =
    (activeImage - 1 + galleryImages.length) % galleryImages.length;
  const nextImage = (activeImage + 1) % galleryImages.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((current) => (current + 1) % galleryImages.length);
    }, 5500); // ganti foto setiap 5.5 detik
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setCtaVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setCtaVisible(entry.isIntersecting);
      },
      { threshold: 0.26, rootMargin: "0px 0px -18% 0px" },
    );

    if (ctaRef.current) observer.observe(ctaRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="media-section" id="gallery">
      <div className="media-light-band">
        <div
          className="container"
          style={{
            maxWidth: "100vw",
            background: "#d9edcf",
            padding: "4rem 24px",
          }}
        >
          <div className="photo-gallery-header">
            <h2>Life at JaxLab</h2>
            <p>
              Lebih dari sekadar produk, Jaxlab adalah perjalanan yang dibangun
              oleh orang-orang dengan visi yang sama. Temukan cerita, aktivitas,
              dan momen di balik layar yang menjadi bagian dari setiap langkah
              kami.
            </p>
          </div>

          <div className="photo-gallery">
            <div className="photo-gallery-main" aria-live="polite">
              {galleryImages.map((image, index) => {
                const slideState =
                  index === activeImage
                    ? "active"
                    : index === previousImage
                      ? "prev"
                      : index === nextImage
                        ? "next"
                        : "hidden";

                return (
                  <button
                    key={image.src}
                    className={`photo-gallery-slide ${slideState}`}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={`Tampilkan foto ${index + 1}`}
                    aria-hidden={slideState === "hidden"}
                    tabIndex={slideState === "hidden" ? -1 : 0}
                  >
                    <img src={image.src} alt={image.alt} />
                  </button>
                );
              })}
            </div>

            <div
              className="photo-gallery-thumbs"
              aria-label="Pilihan foto galeri"
            >
              {galleryImages.map((image, index) => (
                <button
                  key={image.src}
                  className={`photo-thumb ${activeImage === index ? "active" : ""}`}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`Tampilkan foto ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="video-gallery-header">
            <h2>Discover More with Jaxlab</h2>
            <p>
              Jelajahi konten yang membantu Anda memahami kesehatan dengan lebih
              sederhana, ilmiah, dan mudah diterapkan dalam kehidupan
              sehari-hari.
            </p>
          </div>

          <div className="featured-video-shell">
            <div className="featured-video-card">
              <iframe
                src={`https://www.youtube.com/embed/${videos[activeVideo].id}`}
                title={videos[activeVideo].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="featured-video-thumbs" aria-label="Pilihan video">
              {videos.map((video, index) => (
                <button
                  key={video.id}
                  type="button"
                  className={`featured-video-thumb${activeVideo === index ? " active" : ""}`}
                  onClick={() => setActiveVideo(index)}
                  aria-label={`Tampilkan video ${video.title}`}
                >
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                    alt={video.title}
                  />
                </button>
              ))}
            </div>
          </div>

          <div
            ref={ctaRef}
            className={`media-cta${ctaVisible ? " is-visible" : ""}`}
          >
            <span className="media-cta-kicker">
              MULAI RESET TUBUHMU HARI INI
            </span>
            <h2>
              <span className="media-cta-title-line">Kembalikan Tubuh ke</span>{" "}
              <span className="media-cta-title-accent">Fitrahnya</span>
            </h2>
            <strong className="media-cta-lead">
              Mulai dari Metabolisme yang Lebih Sehat
            </strong>
            <p>
              Fat Fasting 72 Jam bersama JaxLab membantu mendukung tubuh kembali
              menggunakan lemak sebagai sumber energi alami, didampingi nutrisi
              premium dan komunitas yang siap menemani perjalanan sehatmu.
            </p>
            <div className="media-cta-actions">
              <a className="media-cta-primary" href="#products">
                Mulai Fat Fasting
                <ArrowRight size={18} />
              </a>
              <a className="media-cta-secondary" href="#kenapa">
                Pelajari Protokol
              </a>
            </div>
            <div className="media-cta-trust">
              <span>Akses Tanya Jawab dengan Dokter</span>
              <span>Produk Halal & BPOM Indonesia</span>
              <span>Bergabung dengan Komunitas JaxLab</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaSection;
