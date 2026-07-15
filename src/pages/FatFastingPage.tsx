import React, { useEffect, useRef } from "react";
import Header from "../components/Header";
import "./FatFastingPage.css";

/* ── Intersection-observer hook: hidden → visible on scroll ── */
function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Mark element so CSS hides it initially
    el.classList.add("ff-reveal");
    if (delay) el.style.transitionDelay = `${delay}ms`;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

/* ── Icon helpers (inline SVG) ── */
const IconFlame = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2c0 0-5 5-5 10a5 5 0 0 0 10 0C17 7 12 2 12 2Z" />
    <path d="M12 14c0 0-2 2-2 3.5a2 2 0 0 0 4 0C14 16 12 14 12 14Z" />
  </svg>
);

const IconDroplets = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05Z" />
    <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
  </svg>
);

const IconBolt = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IconApple = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
    <path d="M10 2c1 .5 2 2 2 5" />
  </svg>
);

const IconActivity = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const IconScale = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="M7 21h10" />
    <path d="M12 3v18" />
    <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
  </svg>
);

const IconRefresh = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M8 16H3v5" />
  </svg>
);

const IconMapPin = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconAward = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

const IconFlask = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 3h6l1 9H8L9 3Z" />
    <path d="M6.8 21a2 2 0 0 0 3.4-1.2L10 15H8l-.2 4.8A2 2 0 0 0 6.8 21Z" />
    <path d="M17.2 21a2 2 0 0 1-3.4-1.2L14 15h2l.2 4.8A2 2 0 0 1 17.2 21Z" />
    <path d="M8 15a3 3 0 0 1 8 0" />
  </svg>
);

const IconShield = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const IconCheck = () => (
  <svg
    viewBox="0 0 24 24"
    width="14"
    height="14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconWarning = () => <span style={{ fontSize: "1.1rem" }}>⚠️</span>;

const IconChevronDown = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const IconWhatsapp = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

/* ─────────────── PAGE COMPONENT ─────────────── */
const FatFastingPage: React.FC = () => {
  // Section reveal refs
  const r1 = useReveal();
  const r2 = useReveal();
  const r4 = useReveal();
  const r5 = useReveal();
  const r6 = useReveal();
  const r7 = useReveal();

  const waLink = `https://wa.me/6281234567890?text=${encodeURIComponent("Hai! Saya ingin mulai program Fat Fasting bersama JaxLab. Bisa info lebih lanjut?")}`;

  return (
    <div className="ff-page">
      <Header />

      {/* ═══ HERO ═══ */}
      <section className="ff-hero">
        {/* Video Background */}
        <video
          className="ff-hero-video"
          src="/video/20606527-uhd_3840_2160_24fps.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Dark overlay so text stays readable */}
        <div className="ff-hero-overlay" />

        <div className="ff-container ff-hero-content">
          <div className="ff-hero-badge">
            <IconDroplets />
            Fat Fasting By JaxLab
          </div>
          <h1 className="ff-hero-title ff-fade-up">
            Kembali ke Cara Alami <br />
            Tubuh <span style={{ color: "#4fc66b" }}>Menghasilkan Energi</span>
          </h1>
          <p className="ff-hero-sub ff-fade-up ff-fade-up-d1">
            Fat Fasting adalah pendekatan nutrisi yang membantu tubuh
            beradaptasi menggunakan lemak sebagai sumber energi utama, dipadukan
            dengan Extra Virgin Olive Oil premium dari Tunisia.
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="ff-hero-cta ff-fade-up ff-fade-up-d2"
          >
            <IconWhatsapp />
            Mulai Sekarang
          </a>
        </div>
        <div className="ff-hero-scroll">
          <IconChevronDown />
        </div>
      </section>

      {/* ═══ SECTION 1: Apa Itu Fat Fasting ═══ */}
      <section className="ff-section ff-section-center">
        <div className="ff-container">
          <div ref={r1}>
            <span className="ff-badge">PENDEKATAN</span>
            <h2 className="ff-heading ff-heading-lg">Apa Itu Fat Fasting?</h2>
          </div>

          <div
            className="ff-grid-2"
            style={{ maxWidth: "840px", margin: "0 auto" }}
          >
            <div ref={useReveal(0)} className="ff-card ff-card-teal">
              <div className="ff-card-icon ff-card-icon-amber">
                <IconFlame />
              </div>
              <div className="ff-card-title">Karbohidrat</div>
              <div className="ff-card-body">
                Sumber energi utama yang paling sering digunakan dalam pola
                makan modern
              </div>
            </div>
            <div ref={useReveal(120)} className="ff-card ff-card-teal">
              <div className="ff-card-icon">
                <IconDroplets />
              </div>
              <div className="ff-card-title">Lemak</div>
              <div className="ff-card-body">
                Cadangan energi yang jarang dimanfaatkan secara optimal oleh
                tubuh
              </div>
            </div>
          </div>

          <div ref={useReveal(0)}>
            <p className="ff-concept-para">
              Dalam pola makan modern, tubuh terus mengandalkan karbohidrat dan
              jarang diberi kesempatan untuk memanfaatkan cadangan lemak. Fat
              Fasting membantu tubuh beradaptasi menggunakan lemak sebagai
              sumber energi utama.
            </p>

            <div className="ff-concept-note">
              <strong>
                Program ini dilakukan dengan pendampingan sehingga peserta
                memahami setiap tahap yang dijalani secara aman dan terarah.
              </strong>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2: Mengapa Fat Fasting ═══ */}
      <section className="ff-section-alt ff-section-center">
        <div className="ff-container">
          <div ref={r2}>
            <span className="ff-badge">MANFAAT</span>
            <h2 className="ff-heading ff-heading-lg">Mengapa Fat Fasting?</h2>
            <p className="ff-body ff-body-center">
              Saat tubuh mulai menggunakan lemak sebagai energi, banyak orang
              merasakan perubahan positif.
            </p>
          </div>

          <div className="ff-grid-3">
            {[
              {
                icon: <IconBolt />,
                title: "Energi yang lebih stabil",
                desc: "Tidak lagi bergantung pada lonjakan gula darah",
              },
              {
                icon: <IconApple />,
                title: "Rasa lapar lebih terkontrol",
                desc: "Tubuh belajar menggunakan cadangan energi",
              },
              {
                icon: <IconActivity />,
                title: "Kadar gula darah tetap stabil*",
                desc: "Fluktuasi minimal sepanjang hari",
              },
              {
                icon: <IconScale />,
                title: "Pengelolaan berat badan*",
                desc: "Mendukung komposisi tubuh yang lebih sehat",
              },
              {
                icon: <IconRefresh />,
                title: "Fleksibilitas metabolik",
                desc: "Tubuh mampu beralih antar sumber energi",
              },
            ].map((item, i) => (
              <div key={i} ref={useReveal(i * 100)} className="ff-card">
                <div className="ff-card-icon">{item.icon}</div>
                <div className="ff-card-title">{item.title}</div>
                <div className="ff-card-body">{item.desc}</div>
              </div>
            ))}
          </div>

          <p className="ff-disclaimer">
            *Hasil dapat berbeda pada setiap individu
          </p>
        </div>
      </section>

      {/* ═══ SECTION 3: Siapa yang Cocok ═══ */}
      <section className="ff-section ff-section-center">
        <div className="ff-container">
          <div ref={r4}>
            <span className="ff-badge">UNTUK SIAPA</span>
            <h2 className="ff-heading ff-heading-lg">Siapa yang Cocok?</h2>
            <p className="ff-body ff-body-center">
              Program ini dapat menjadi pilihan bagi Anda yang ingin:
            </p>
          </div>

          <div className="ff-checklist">
            {[
              "Memulai gaya hidup sehat",
              "Mengurangi konsumsi gula dan makanan ultra-proses",
              "Mengelola berat badan",
              "Belajar memahami metabolisme tubuh",
              "Memulai pola hidup rendah karbohidrat",
            ].map((item, i) => (
              <div key={i} ref={useReveal(i * 80)} className="ff-check-item">
                <div className="ff-check-icon">
                  <IconCheck />
                </div>
                {item}
              </div>
            ))}
          </div>

          <div ref={useReveal(0)} className="ff-warning-box">
            <span className="ff-warning-icon">
              <IconWarning />
            </span>
            <span>
              Program ini tidak ditujukan bagi semua orang. Ibu hamil, ibu
              menyusui, anak-anak, atau individu dengan kondisi medis tertentu
              sebaiknya berkonsultasi dengan tenaga kesehatan terlebih dahulu.
            </span>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4: Mengapa EVOO ═══ */}
      <section className="ff-section-alt">
        <div className="ff-container-wide">
          <div style={{ textAlign: "center", marginBottom: 56 }} ref={r5}>
            <span className="ff-badge">SUMBER LEMAK</span>
            <h2
              className="ff-heading ff-heading-lg"
              style={{ margin: "0 auto 12px" }}
            >
              Mengapa Extra Virgin Olive Oil?
            </h2>
            <p className="ff-quote-italic">
              "Lemak yang Berkualitas Menentukan Hasil"
            </p>
          </div>

          <div className="ff-two-col">
            <div>
              <img
                src="/img/JarolivaOrganic_1.png"
                alt="Extra Virgin Olive Oil JaxLab"
                className="ff-image-rounded"
              />
            </div>
            <div>
              <p className="ff-body" style={{ marginBottom: 16 }}>
                Fat Fasting bukan sekadar mengurangi makan. Tubuh tetap
                membutuhkan sumber lemak yang berkualitas sebagai bahan bakar.
              </p>
              <p className="ff-body" style={{ marginBottom: 20 }}>
                Karena itulah JaxLab memilih{" "}
                <strong>Extra Virgin Olive Oil</strong> sebagai sumber lemak
                utama selama program.
              </p>
              <div className="ff-evoo-note">
                Extra Virgin Olive Oil mengandung{" "}
                <strong>lemak tak jenuh tunggal (monounsaturated fat)</strong>{" "}
                dan berbagai senyawa alami seperti{" "}
                <a href="#polyphenol">polifenol</a> yang menjadi ciri khas
                minyak zaitun berkualitas tinggi.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5: Mengapa EVOO JaxLab ═══ */}
      <section className="ff-section-white">
        <div className="ff-container-wide">
          <div style={{ textAlign: "center", marginBottom: 40 }} ref={r6}>
            <span className="ff-badge">ASAL</span>
            <h2
              className="ff-heading ff-heading-lg"
              style={{ margin: "0 auto" }}
            >
              Mengapa EVOO JaxLab?
            </h2>
          </div>

          <div style={{ position: "relative", marginBottom: 32 }}>
            <video
              src="/video/tunisiavid.mp4"
              aria-label="Olive groves Tunisia"
              className="ff-image-banner"
              autoPlay
              loop
              muted
            />
            <div className="ff-banner-caption">
              <small>Olive Groves</small>
              <strong>Tunisia</strong>
            </div>
          </div>

          <div className="ff-grid-2">
            {[
              {
                icon: <IconMapPin />,
                title: "Dari Tunisia",
                desc: "Berasal langsung dari Tunisia, salah satu negara penghasil minyak zaitun berkualitas di dunia.",
              },
              {
                icon: <IconAward />,
                title: "High Polyphenol",
                desc: "Kandungan polifenol tinggi yang membedakan minyak zaitun kami dari yang lain.",
              },
              {
                icon: <IconFlask />,
                title: "Teruji Lab",
                desc: "Setiap batch memiliki sertifikat uji laboratorium sehingga kandungan polifenolnya dapat diverifikasi.",
              },
              {
                icon: <IconShield />,
                title: "Kualitas Terverifikasi",
                desc: "Kualitas tidak cukup hanya diklaim, tetapi juga harus dapat dibuktikan.",
              },
            ].map((item, i) => (
              <div key={i} ref={useReveal(i * 100)} className="ff-card">
                <div className="ff-card-icon">{item.icon}</div>
                <div className="ff-card-title">{item.title}</div>
                <div className="ff-card-body">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 6: Apa Itu Polifenol ═══ */}
      <section className="ff-section-alt" id="polyphenol">
        <div className="ff-container-wide">
          <div className="ff-two-col-reverse">
            <div ref={r7}>
              <span className="ff-badge">SENYAWA ALAMI</span>
              <h2 className="ff-heading ff-heading-md">Apa Itu Polifenol?</h2>
              <p className="ff-body" style={{ marginBottom: 14 }}>
                Polifenol merupakan senyawa alami yang terdapat pada buah
                zaitun.
              </p>
              <p className="ff-body" style={{ marginBottom: 14 }}>
                Semakin tinggi kandungan polifenol, semakin tinggi pula karakter{" "}
                <strong>rasa pahit</strong> dan{" "}
                <strong>sensasi pedas ringan (peppery finish)</strong> yang
                menjadi ciri khas EVOO berkualitas tinggi.
              </p>
              <p className="ff-body" style={{ marginBottom: 16 }}>
                Kandungan polifenol dapat berbeda pada setiap panen karena
                dipengaruhi oleh varietas zaitun, waktu panen, dan proses
                produksi.
              </p>
              <div className="ff-tags">
                {["Varietas Zaitun", "Waktu Panen", "Proses Produksi"].map(
                  (t) => (
                    <span key={t} className="ff-tag">
                      {t}
                    </span>
                  ),
                )}
              </div>
            </div>
            <div>
              <img
                src="/img/polifenol.jpeg"
                alt="Pohon zaitun Tunisia"
                className="ff-image-rounded"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 7: Transparansi Kualitas ═══ */}
      <section className="ff-section">
        <div className="ff-container-wide">
          <div className="ff-two-col">
            <div>
              <span className="ff-badge">SERTIFIKASI</span>
              <h2 className="ff-heading ff-heading-md">
                Transparansi Kualitas
              </h2>
              <p className="ff-body" style={{ marginBottom: 28 }}>
                Kami menyertakan sertifikat analisis laboratorium untuk setiap
                batch produk. Anda dapat melihat:
              </p>

              <div className="ff-grid-2" style={{ marginBottom: 20 }}>
                {[
                  {
                    icon: <IconDroplets />,
                    label: "Kandungan Polifenol",
                    value: "867 mg/Kg",
                  },
                  { icon: <IconActivity />, label: "Acidity", value: "Rendah" },
                  {
                    icon: <IconRefresh />,
                    label: "Peroxide Value",
                    value: "Optimal",
                  },
                  {
                    icon: <IconAward />,
                    label: "Kualitas EVOO",
                    value: "Terverifikasi",
                  },
                ].map((m, i) => (
                  <div key={i} className="ff-metric-card">
                    <div className="ff-metric-icon">{m.icon}</div>
                    <div className="ff-metric-label">{m.label}</div>
                    <div className="ff-metric-value">{m.value}</div>
                  </div>
                ))}
              </div>

              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="ff-btn-primary"
              >
                <span>↗</span> Lihat Sertifikat
              </a>
            </div>
            <div>
              <img
                src="/img/sertif terroliva.png"
                alt="Sertifikat kualitas JaxLab"
                className="ff-image-rounded"
                style={{ aspectRatio: "3/4" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER minimal ═══ */}
      <footer className="ff-footer">
        <div className="ff-footer-logo">
          <img src="/logo-jaxlab.png" alt="JaxLab" style={{ height: 24 }} />
        </div>
        <p className="ff-footer-sub">
          Fat Fasting with Premium Extra Virgin Olive Oil from Tunisia.
        </p>
        <p className="ff-footer-copy">
          © {new Date().getFullYear()} JaxLab. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default FatFastingPage;
