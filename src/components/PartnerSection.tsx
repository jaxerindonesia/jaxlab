import React, { useEffect, useRef, useState } from "react";
import "./PartnerSection.css";
import {
  Flame,
  Zap,
  Droplet,
  Leaf,
  ArrowRight,
  CheckCircle2,
  Droplets,
  Waves,
} from "lucide-react";

const features = [
  {
    id: 1,
    icon: <Flame size={20} />,
    title: "Mendukung Fat Burning",
    description:
      "Nutrisi yang dipilih untuk mendukung tubuh menggunakan lemak sebagai sumber energi selama menjalani Fat Fasting.",
  },
  {
    id: 2,
    icon: <Zap size={20} />,
    title: "Energi Lebih Stabil",
    description:
      "Membantu menjaga energi tetap optimal sepanjang hari tanpa bergantung pada konsumsi gula berlebih.",
  },
  {
    id: 3,
    icon: <Droplet size={20} />,
    title: "Lemak Sehat Berkualitas",
    description:
      "Menggunakan sumber lemak berkualitas seperti Extra Virgin Olive Oil, Virgin Coconut Oil, Vanilla Ghee, dan MCT sebagai bagian dari gaya hidup sehat.",
  },
  {
    id: 4,
    icon: <Leaf size={20} />,
    title: "Healthy Lifestyle",
    description:
      "Fat Fasting bukan sekadar pola makan, tetapi langkah membangun metabolisme yang lebih sehat dan kebiasaan hidup yang lebih baik.",
  },
];

interface TimelineStep {
  id: number;
  time: string;
  label: string;
  title: string;
  icon: React.ReactNode;
  type: "nutrition" | "hydration";
  items: string[];
  note?: string;
}

const timelineSteps: TimelineStep[] = [
  {
    id: 1,
    time: "08.00",
    label: "Saat Perut Kosong",
    title: "Konsumsi Lemak Sehat",
    icon: <Flame size={20} />,
    type: "nutrition",
    items: [
      "1 sendok makan Olive Oil",
      "1 sendok makan Virgin Coconut Oil",
      "1 sendok teh Ketone Immuno",
      "4 semprotan Max C8 Oil atau 1 sendok makan Vanilla Ghee",
    ],
  },
  {
    id: 2,
    time: "08.00 • 14.00 • 22.00",
    label: "Sepanjang Hari",
    title: "Hidrasi & Elektrolit",
    icon: <Waves size={20} />,
    type: "hydration",
    items: [
      "Boleh minum air putih atau teh herbal tanpa kalori",
      "Boleh ditambahkan sedikit garam",
    ],
    note: "Garam bersifat opsional, digunakan bila tekanan darah normal atau cenderung rendah.",
  },
  {
    id: 3,
    time: "13.00 & 18.30",
    label: "Saat Perut Kosong",
    title: "Konsumsi Lemak Sehat",
    icon: <Droplets size={20} />,
    type: "nutrition",
    items: [
      "1 sendok makan Olive Oil",
      "1 sendok makan Virgin Coconut Oil",
      "1 sendok teh Ketone Immuno",
      "4 semprotan C8 Oil atau 1 sendok makan Vanilla Ghee",
    ],
  },
];

const PartnerSection: React.FC = () => {
  // Scroll reveal for kenapa-content items
  const [kenapaVisible, setKenapaVisible] = useState(false);
  const kenapaRef = useRef<HTMLDivElement | null>(null);
  const mosaicRef = useRef<HTMLDivElement | null>(null);
  const [visibleMosaicItems, setVisibleMosaicItems] = useState(0);
  const [visibleFeatures, setVisibleFeatures] = useState<Set<number>>(
    new Set(),
  );
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const protocolListRef = useRef<HTMLDivElement>(null);
  const [protocolProgress, setProtocolProgress] = useState(0);
  const protocolHeaderRef = useRef<HTMLDivElement | null>(null);
  const [protocolHeaderVisible, setProtocolHeaderVisible] = useState(false);

  // NEW: state untuk track step mana yang sudah masuk viewport (animasi muncul)
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const updateProgress = () => {
      if (!protocolListRef.current) return;

      const rect = protocolListRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const start = viewportHeight * 0.78;
      const end = viewportHeight * 0.24;
      const travel = rect.height + start - end;
      const scrolled = start - rect.top;

      setProtocolProgress(Math.min(Math.max(scrolled / travel, 0), 1));
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  // IntersectionObserver -> tiap .protocol-step muncul/hilang saat scroll (bolak-balik)
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setVisibleSteps(new Set(timelineSteps.map((step) => step.id)));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = Number(entry.target.getAttribute("data-step-id"));
          setVisibleSteps((prev) => {
            const next = new Set(prev);
            if (entry.isIntersecting) {
              next.add(id);
            } else {
              next.delete(id);
            }
            return next;
          });
        });
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    stepRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Scroll reveal: protocol header title block (bolak-balik)
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setProtocolHeaderVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setProtocolHeaderVisible(entry.isIntersecting);
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
    );

    if (protocolHeaderRef.current) observer.observe(protocolHeaderRef.current);
    return () => observer.disconnect();
  }, []);

  // Scroll reveal: kenapa-content heading block (bolak-balik)
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setKenapaVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setKenapaVisible(entry.isIntersecting);
      },
      { threshold: 0.35, rootMargin: "0px 0px -32% 0px" },
    );
    if (kenapaRef.current) observer.observe(kenapaRef.current);
    return () => observer.disconnect();
  }, []);

  // Scroll reveal: image mosaic kiri muncul satu per satu mengikuti posisi scroll
  useEffect(() => {
    const updateMosaicReveal = () => {
      if (!mosaicRef.current) return;

      const rect = mosaicRef.current.getBoundingClientRect();
      const firstTrigger = window.innerHeight * 0.45;
      const stepDistance = Math.max(140, rect.height * 0.28);
      const distance = firstTrigger - rect.top;
      const nextVisibleCount =
        distance < 0 ? 0 : Math.min(3, Math.floor(distance / stepDistance) + 1);

      setVisibleMosaicItems(nextVisibleCount);
    };

    window.addEventListener("scroll", updateMosaicReveal, { passive: true });
    window.addEventListener("resize", updateMosaicReveal);
    updateMosaicReveal();

    return () => {
      window.removeEventListener("scroll", updateMosaicReveal);
      window.removeEventListener("resize", updateMosaicReveal);
    };
  }, []);

  // Scroll reveal: tiap feature-row muncul satu per satu (bolak-balik)
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setVisibleFeatures(new Set(features.map((f) => f.id)));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = Number(entry.target.getAttribute("data-feature-id"));
          setVisibleFeatures((prev) => {
            const next = new Set(prev);
            if (entry.isIntersecting) {
              next.add(id);
            } else {
              next.delete(id);
            }
            return next;
          });
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -5% 0px" },
    );
    featureRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="kenapa-section" id="kenapa">
        <div className="container">
          <div className="kenapa-grid">
            {/* LEFT: Image Mosaic */}
            <div ref={mosaicRef} className="kenapa-mosaic">
              <div className="mosaic-top">
                <div
                  className={`mosaic-top-left mosaic-reveal-item${
                    visibleMosaicItems >= 1 ? " is-visible" : ""
                  }`}
                >
                  <img src="/img/zaitun.jpg" alt="Bahan alami Jaxlab" />
                </div>
                <div
                  className={`mosaic-top-right mosaic-reveal-item${
                    visibleMosaicItems >= 2 ? " is-visible" : ""
                  }`}
                >
                  <img
                    src="/img/Jaroliva.png"
                    alt="Gaya hidup sehat Fat Fasting"
                  />
                </div>
              </div>
              <div
                className={`mosaic-bottom mosaic-reveal-item${
                  visibleMosaicItems >= 3 ? " is-visible" : ""
                }`}
              >
                <img src="/img/DSC03061.jpg" alt="Bahan Fat Fasting sehat" />
                <div className="mosaic-badge">
                  <CheckCircle2 size={14} />
                  <span>Lemak Sehat Berkualitas</span>
                </div>
              </div>
            </div>

            {/* RIGHT: Text + Features */}
            <div className="kenapa-content">
              {/* Subtitle + Heading + Desc — reveal as a block */}
              <div
                ref={kenapaRef}
                className={`kenapa-reveal-block${kenapaVisible ? " is-visible" : ""}`}
              >
                <span className="section-subtitle">✦ Kenapa Pilih Jaxlab?</span>

                <h2 className="kenapa-heading">
                  Temani Perjalanan{" "}
                  <span className="kenapa-heading-accent">Fat Fasting</span>{" "}
                  yang Lebih Optimal
                </h2>

                <div className="kenapa-desc-block">
                  <p className="kenapa-desc-lead">
                    Fat Fasting adalah metode cara berpuasa selama{" "}
                    <strong>72 jam (3 hari)</strong> berturut-turut. Selama masa
                    puasa, yang diperbolehkan hanya mengonsumsi lemak sehat
                    tertentu, air putih, atau minuman nol kalori tanpa kafein.
                  </p>
                  <p className="kenapa-desc-body">
                    Metode ini dapat membantu orang dengan berbagai kondisi
                    kesehatan seperti kanker, penyakit ginjal kronis (CKD),
                    diabetes, obesitas, penyakit autoimun, tekanan darah tinggi,
                    dan masalah kesehatan lainnya. Produk Jaxlab membantu dalam
                    mengoptimalkan fat fasting 72 Jam, serta:
                  </p>
                </div>
              </div>

              <div className="features-list">
                {features.map((feature, index) => (
                  <div
                    key={feature.id}
                    className={`feature-row${visibleFeatures.has(feature.id) ? " is-visible" : ""}`}
                    data-feature-id={feature.id}
                    ref={(el) => {
                      featureRefs.current[index] = el;
                    }}
                    style={{
                      transitionDelay: visibleFeatures.has(feature.id)
                        ? `${index * 0.22}s`
                        : "0s",
                    }}
                  >
                    <div className="feature-row-icon">{feature.icon}</div>
                    <div className="feature-row-content">
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                className={`kenapa-learn-link${kenapaVisible ? " is-visible" : ""}`}
                href="#fat-fasting-protocol"
                style={{ transitionDelay: kenapaVisible ? "0.5s" : "0s" }}
              >
                Lebih lanjut tentang fat fasting
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PROTOCOL TIMELINE SECTION */}
      <section className="protocol-section" id="fat-fasting-protocol">
        <div className="container">
          {/* Header */}
          <div
            ref={protocolHeaderRef}
            className={`protocol-section-header protocol-header-reveal${
              protocolHeaderVisible ? " is-visible" : ""
            }`}
          >
            <span className="section-subtitle">✦ Panduan Fat Fasting</span>
            <h2 className="protocol-section-title">
              Ketahui Apa yang Dikonsumsi <em>di Setiap Fase</em>
            </h2>
          </div>

          <div className="protocol-showcase">
            <div className="protocol-copy">
              <div
                className="protocol-list"
                ref={protocolListRef}
                style={
                  {
                    "--protocol-progress": `${protocolProgress * 100}%`,
                  } as React.CSSProperties
                }
              >
                {timelineSteps.map((step, index) => (
                  <article
                    className={`protocol-step${
                      visibleSteps.has(step.id) ? " is-visible" : ""
                    }`}
                    key={step.id}
                    data-step-id={step.id}
                    ref={(el) => {
                      stepRefs.current[index] = el;
                    }}
                    style={{ transitionDelay: `${index * 0.08}s` }}
                  >
                    <span className="protocol-step-marker" />
                    <div className="protocol-step-body">
                      <div className="protocol-step-heading">
                        <span className="protocol-time-chip">{step.time}</span>
                        <span>{step.label}</span>
                        <h3>{step.title}</h3>
                      </div>
                      <ul>
                        {step.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                      {step.note && (
                        <p className="protocol-note">
                          <strong>Catatan:</strong> {step.note}
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>

              <div className="protocol-choice-card">
                <h3>Clinicians' Choice</h3>
                <p>
                  Panduan konsumsi yang dirancang untuk membantu Fat Fasting
                  terasa lebih terstruktur, praktis, dan mudah dijalankan.
                </p>
                <a href="#products">Lihat produk pendukung</a>
              </div>
            </div>

            <div className="protocol-visual">
              <div className="protocol-image-main">
                <img
                  src="/img/Jaroliva.png"
                  alt="Pendampingan Fat Fasting JaxLab"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PartnerSection;
