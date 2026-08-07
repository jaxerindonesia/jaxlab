import React, { useEffect, useRef } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

/* ── Intersection-observer hook: hidden → visible on scroll ── */
function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("opacity-0", "translate-y-7", "transition-all", "duration-[600ms]");
    if (delay) el.style.transitionDelay = `${delay}ms`;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove("opacity-0", "translate-y-7");
          el.classList.add("opacity-100", "translate-y-0");
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
  const container = "mx-auto max-w-[880px] px-6 text-center";
  const containerWide = "mx-auto max-w-[1100px] px-6";
  const section = "bg-[#f9f5ec] py-[100px] max-[720px]:py-[72px]";
  const sectionDark = "bg-[#001802] py-[100px] !text-white max-[720px]:py-[72px]";
  const sectionWhite = "bg-white py-[100px] max-[720px]:py-[72px]";
  const badge = "mb-[14px] inline-block text-[0.7rem] font-semibold uppercase tracking-[0.12em] !text-[#2d8c6e]";
  const headingLg = "mb-6 font-['Playfair_Display',Georgia,serif] text-[clamp(2rem,5vw,3rem)] font-bold leading-[1.15] !text-[#161616]";
  const headingMd = "mb-6 font-['Playfair_Display',Georgia,serif] text-[clamp(1.6rem,4vw,2.4rem)] font-bold leading-[1.15] !text-[#161616]";
  const body = "text-base leading-[1.75] !text-[#475569]";
  const bodyCenter = `${body} mx-auto mb-10 max-w-[560px] text-center`;
  const grid2 = "grid grid-cols-2 gap-5 max-[720px]:grid-cols-1";
  const grid3 = "grid grid-cols-3 gap-5 max-[720px]:grid-cols-1";
  const card = "rounded-2xl border border-[#e2e8f0] bg-white px-6 py-7 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]";
  const cardDark = "rounded-2xl border border-white/10 bg-white/[0.06] px-6 py-7 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]";
  const cardIcon = "mb-4 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#d1fae5] text-[1.2rem] !text-[#2d8c6e]";
  const cardTitle = "mb-2 text-base font-semibold !text-[#0f172a]";
  const cardBody = "text-[0.9rem] leading-[1.65] !text-[#475569]";
  const twoCol = "grid grid-cols-2 items-center gap-14 max-[720px]:grid-cols-1 max-[720px]:gap-8";
  const imageRounded = "block !aspect-[4/3] !w-full rounded-[18px] object-cover";

  return (
    <div className="min-h-screen bg-[#f0f4f3] font-['Inter',-apple-system,BlinkMacSystemFont,sans-serif] !text-[#0f172a]">
      <Header />

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-[#0a2a2a] px-6 pb-20 pt-[120px] text-center !text-white max-[720px]:pb-16 max-[720px]:pt-[100px]">
        {/* Video Background */}
        <video
          className="absolute inset-0 z-0 !h-full !w-full object-cover"
          src="/video/20606527-uhd_3840_2160_24fps.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 z-[1] bg-[rgba(5,30,30,0.62)]" />

        <div className="relative z-[2] mx-auto max-w-[880px] px-6 text-center">
          <div className="mb-7 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[0.82rem] font-medium !text-white/90 [&_svg]:!h-[14px] [&_svg]:!w-[14px] [&_svg]:opacity-80">
            <IconDroplets />
            Fat Fasting By JaxLab
          </div>
          <h1 className="mx-auto mb-5 animate-[ffFadeUp_0.55s_ease_both] font-['Playfair_Display',Georgia,serif] text-[clamp(2.2rem,6vw,3.8rem)] font-extrabold leading-[1.12] !text-white">
            Kembali ke Cara Alami <br />
            Tubuh <span style={{ color: "#4fc66b" }}>Menghasilkan Energi</span>
          </h1>
          <p className="mx-auto mb-10 animate-[ffFadeUp_0.55s_ease_0.08s_both] text-[1.05rem] leading-[1.7] !text-white/75">
            Fat Fasting adalah pendekatan nutrisi yang membantu tubuh
            beradaptasi menggunakan lemak sebagai sumber energi utama, dipadukan
            dengan Extra Virgin Olive Oil premium dari Tunisia.
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex animate-[ffFadeUp_0.55s_ease_0.16s_both] items-center gap-2 rounded-full bg-[#10b981] px-8 py-[14px] text-base font-semibold !text-white shadow-[0_4px_20px_rgba(16,185,129,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#059669] hover:shadow-[0_8px_28px_rgba(16,185,129,0.4)]"
          >
            <IconWhatsapp />
            Mulai Sekarang
          </a>
        </div>
        <div className="absolute bottom-6 left-1/2 z-[2] animate-[ffBounce_2s_infinite] !text-white/40">
          <IconChevronDown />
        </div>
      </section>

      {/* ═══ SECTION 1: Apa Itu Fat Fasting ═══ */}
      <section className={section}>
        <div className={container}>
          <div ref={r1}>
            <span className={badge}>PENDEKATAN</span>
            <h2 className={headingLg}>Apa Itu Fat Fasting?</h2>
          </div>

          <div
            className={grid2}
            style={{ maxWidth: "840px", margin: "0 auto" }}
          >
            <div ref={useReveal(0)} className={`${card} border-[#c5e0de] bg-[#edf5f4]`}>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#fef3c7] text-[1.2rem] !text-[#d97706]">
                <IconFlame />
              </div>
              <div className={cardTitle}>Karbohidrat</div>
              <div className={cardBody}>
                Sumber energi utama yang paling sering digunakan dalam pola
                makan modern
              </div>
            </div>
            <div ref={useReveal(120)} className={`${card} border-[#c5e0de] bg-[#edf5f4]`}>
              <div className={cardIcon}>
                <IconDroplets />
              </div>
              <div className={cardTitle}>Lemak</div>
              <div className={cardBody}>
                Cadangan energi yang jarang dimanfaatkan secara optimal oleh
                tubuh
              </div>
            </div>
          </div>

          <div ref={useReveal(0)}>
            <p className="mx-auto mt-7 max-w-[640px] text-center text-[0.95rem] leading-[1.8] !text-[#475569]">
              Dalam pola makan modern, tubuh terus mengandalkan karbohidrat dan
              jarang diberi kesempatan untuk memanfaatkan cadangan lemak. Fat
              Fasting membantu tubuh beradaptasi menggunakan lemak sebagai
              sumber energi utama.
            </p>

            <div className="mx-auto mt-6 max-w-[640px] rounded-xl border border-[#c5e0de] bg-[#edf5f4] px-6 py-[18px] text-center text-[0.95rem] leading-[1.7] !text-[#0f172a]">
              <strong>
                Program ini dilakukan dengan pendampingan sehingga peserta
                memahami setiap tahap yang dijalani secara aman dan terarah.
              </strong>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2: Mengapa Fat Fasting ═══ */}
      <section className={sectionDark}>
        <div className={container}>
          <div ref={r2}>
            <span className={badge}>MANFAAT</span>
            <h2 className={`${headingLg} !text-white`}>Mengapa Fat Fasting?</h2>
            <p className={`${bodyCenter} !text-white`}>
              Saat tubuh mulai menggunakan lemak sebagai energi, banyak orang
              merasakan perubahan positif.
            </p>
          </div>

          <div className={grid3}>
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
              <div key={i} ref={useReveal(i * 100)} className={cardDark}>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[10px] bg-white/10 text-[1.2rem] !text-[#5ee9b5]">{item.icon}</div>
                <div className={`${cardTitle} !text-white`}>{item.title}</div>
                <div className={`${cardBody} !text-white/80`}>{item.desc}</div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-[0.8rem] !text-[#94a3b8]">
            *Hasil dapat berbeda pada setiap individu
          </p>
        </div>
      </section>

      {/* ═══ SECTION 3: Siapa yang Cocok ═══ */}
      <section className={section}>
        <div className={container}>
          <div ref={r4}>
            <span className={badge}>UNTUK SIAPA</span>
            <h2 className={headingLg}>Siapa yang Cocok?</h2>
            <p className={bodyCenter}>
              Program ini dapat menjadi pilihan bagi Anda yang ingin:
            </p>
          </div>

          <div className="mx-auto flex max-w-[600px] flex-col gap-3">
            {[
              "Memulai gaya hidup sehat",
              "Mengurangi konsumsi gula dan makanan ultra-proses",
              "Mengelola berat badan",
              "Belajar memahami metabolisme tubuh",
              "Memulai pola hidup rendah karbohidrat",
            ].map((item, i) => (
              <div key={i} ref={useReveal(i * 80)} className="flex items-center gap-4 rounded-xl border border-[#e2e8f0] bg-white px-5 py-4 text-[0.95rem] font-medium !text-[#0f172a]">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#d1fae5] text-[0.85rem] !text-[#2d8c6e]">
                  <IconCheck />
                </div>
                {item}
              </div>
            ))}
          </div>

          <div ref={useReveal(0)} className="mx-auto mt-7 flex max-w-[600px] items-start gap-[14px] rounded-xl border border-[#fcd34d] bg-[#fffbeb] px-5 py-[18px] text-[0.88rem] leading-[1.65] !text-[#92400e]">
            <span className="mt-px shrink-0 text-[1.1rem]">
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
      <section className={sectionDark}>
        <div className={containerWide}>
          <div style={{ textAlign: "center", marginBottom: 56 }} ref={r5}>
            <span className={badge}>SUMBER LEMAK</span>
            <h2
              className={`${headingLg} !text-white`}
              style={{ margin: "0 auto 12px" }}
            >
              Mengapa Extra Virgin Olive Oil?
            </h2>
            <p className="mb-7 font-['Playfair_Display',serif] text-[1.1rem] italic !text-white">
              "Lemak yang Berkualitas Menentukan Hasil"
            </p>
          </div>

          <div className={twoCol}>
            <div>
              <img
                src="/img/JarolivaOrganic_1.png"
                alt="Extra Virgin Olive Oil JaxLab"
                className={imageRounded}
              />
            </div>
            <div>
              <p className={`${body} mb-4 !text-white`}>
                Fat Fasting bukan sekadar mengurangi makan. Tubuh tetap
                membutuhkan sumber lemak yang berkualitas sebagai bahan bakar.
              </p>
              <p className={`${body} mb-5 !text-white`}>
                Karena itulah JaxLab memilih{" "}
                <strong>Extra Virgin Olive Oil</strong> sebagai sumber lemak
                utama selama program.
              </p>
              <div className="mt-5 rounded-xl border border-white/15 bg-white/[0.08] px-5 py-[18px] text-[0.9rem] leading-[1.7] !text-white/90 [&_a]:font-medium [&_a]:!text-white [&_strong]:!text-white">
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
      <section className={sectionWhite}>
        <div className={containerWide}>
          <div style={{ textAlign: "center", marginBottom: 40 }} ref={r6}>
            <span className={badge}>ASAL</span>
            <h2
              className={headingLg}
              style={{ margin: "0 auto" }}
            >
              Mengapa EVOO JaxLab?
            </h2>
          </div>

          <div style={{ position: "relative", marginBottom: 32 }}>
            <video
              src="/video/tunisiavid.mp4"
              aria-label="Olive groves Tunisia"
              className="mb-7 block !aspect-[21/9] !w-full rounded-[18px] object-cover max-[720px]:!aspect-video"
              autoPlay
              loop
              muted
            />
            <div className="absolute bottom-5 left-6 !text-white [&_small]:block [&_small]:text-[0.7rem] [&_small]:font-medium [&_small]:uppercase [&_small]:tracking-[0.1em] [&_small]:opacity-80 [&_strong]:mt-0.5 [&_strong]:block [&_strong]:font-['Playfair_Display',serif] [&_strong]:text-[1.6rem] [&_strong]:font-bold [&_strong]:leading-none">
              <small>Olive Groves</small>
              <strong>Tunisia</strong>
            </div>
          </div>

          <div className={grid2}>
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
              <div key={i} ref={useReveal(i * 100)} className={card}>
                <div className={cardIcon}>{item.icon}</div>
                <div className={cardTitle}>{item.title}</div>
                <div className={cardBody}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 6: Apa Itu Polifenol ═══ */}
      <section className={sectionDark} id="polyphenol">
        <div className={containerWide}>
          <div className={twoCol}>
            <div ref={r7}>
              <span className={badge}>SENYAWA ALAMI</span>
              <h2 className={`${headingMd} !text-white`}>Apa Itu Polifenol?</h2>
              <p className={`${body} mb-[14px] !text-white`}>
                Polifenol merupakan senyawa alami yang terdapat pada buah
                zaitun.
              </p>
              <p className={`${body} mb-[14px] !text-white`}>
                Semakin tinggi kandungan polifenol, semakin tinggi pula karakter{" "}
                <strong>rasa pahit</strong> dan{" "}
                <strong>sensasi pedas ringan (peppery finish)</strong> yang
                menjadi ciri khas EVOO berkualitas tinggi.
              </p>
              <p className={`${body} mb-4 !text-white`}>
                Kandungan polifenol dapat berbeda pada setiap panen karena
                dipengaruhi oleh varietas zaitun, waktu panen, dan proses
                produksi.
              </p>
              <div className="mt-5 flex flex-wrap gap-[10px]">
                {["Varietas Zaitun", "Waktu Panen", "Proses Produksi"].map(
                  (t) => (
                    <span key={t} className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[0.85rem] font-medium !text-white">
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
                className={`${imageRounded} max-[720px]:order-first`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 7: Transparansi Kualitas ═══ */}
      <section className={section}>
        <div className={containerWide}>
          <div className={twoCol}>
            <div>
              <span className={badge}>SERTIFIKASI</span>
              <h2 className={headingMd}>
                Transparansi Kualitas
              </h2>
              <p className={`${body} mb-7`}>
                Kami menyertakan sertifikat analisis laboratorium untuk setiap
                batch produk. Anda dapat melihat:
              </p>

              <div className={`${grid2} mb-5`}>
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
                  <div key={i} className="rounded-xl border border-[#e2e8f0] bg-white p-5">
                    <div className="mb-[10px] text-[1.1rem] !text-[#2d8c6e]">{m.icon}</div>
                    <div className="mb-1 text-[0.85rem] !text-[#475569]">{m.label}</div>
                    <div className="text-[0.95rem] font-semibold !text-[#2d8c6e]">{m.value}</div>
                  </div>
                ))}
              </div>

              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#10b981] px-7 py-[13px] text-[0.95rem] font-semibold !text-white shadow-[0_4px_16px_rgba(16,185,129,0.3)] transition-all duration-200 hover:-translate-y-px hover:bg-[#059669]"
              >
                <span>↗</span> Lihat Sertifikat
              </a>
            </div>
            <div>
              <img
                src="/img/sertif terroliva.png"
                alt="Sertifikat kualitas JaxLab"
                className="block !aspect-[3/4] !w-full rounded-[18px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FatFastingPage;
