import React, { useEffect, useRef, useState } from "react";
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
      <section className="relative bg-[#001802] py-28 max-[768px]:pb-16 max-[768px]:pt-20" id="kenapa">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-2 items-center gap-[4.5rem] max-[1024px]:gap-12 max-[768px]:grid-cols-1 max-[768px]:gap-10">
            {/* LEFT: Image Mosaic */}
            <div ref={mosaicRef} className="flex flex-col gap-3">
              <div className="grid grid-cols-[0.75fr_1fr] items-stretch gap-3">
                <div
                  className={`group !aspect-[3/4] overflow-hidden rounded-r-[20px] shadow-[0_16px_40px_rgba(0,0,0,0.35)] transition-all duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${visibleMosaicItems >= 2 ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-[34px] scale-[0.96] opacity-0'}`}
                >
                  <img className="block !h-full !w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src="/img/Jaroliva.png"
                    alt="Gaya hidup sehat Fat Fasting"
                  />
                </div>
                <div
                  className={`group !aspect-[1/1.15] overflow-hidden rounded-[20px] shadow-[0_16px_40px_rgba(0,0,0,0.35)] transition-all duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${visibleMosaicItems >= 1 ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-[34px] scale-[0.96] opacity-0'}`}
                >
                  <img className="block !h-full !w-full object-cover transition-transform duration-500 group-hover:scale-105" src="/img/Jaroliva (4).png" alt="Bahan alami Jaxlab" />
                </div>
              </div>
              <div
                className={`group relative !aspect-[16/7] overflow-hidden rounded-[20px] border border-[rgba(74,222,128,0.1)] shadow-[0_16px_40px_rgba(0,0,0,0.35)] transition-all duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${visibleMosaicItems >= 3 ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-[34px] scale-[0.96] opacity-0'}`}
              >
                <img className="block !h-full !w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" src="/img/DSC03061.jpg" alt="Bahan Fat Fasting sehat" />
                <div className="absolute bottom-4 right-4 inline-flex items-center gap-[0.4rem] whitespace-nowrap rounded-full border border-[rgba(74,222,128,0.28)] bg-[rgba(8,16,10,0.78)] px-[0.9rem] py-[0.4rem] text-[0.77rem] font-bold tracking-[0.4px] !text-[#4ade80] backdrop-blur-[10px]">
                  <CheckCircle2 size={14} />
                  <span>Lemak Sehat Berkualitas</span>
                </div>
              </div>
            </div>

            {/* RIGHT: Text + Features */}
            <div className="flex flex-col font-['Inter',system-ui,sans-serif]">
              {/* Subtitle + Heading + Desc — reveal as a block */}
              <div
                ref={kenapaRef}
                className={`origin-left transition-all duration-[850ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${kenapaVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-9 scale-[0.96] opacity-0'}`}
              >
                <span className="mb-4 inline-flex text-[0.85rem] font-medium uppercase tracking-[1px] !text-[#4ade80]">✦ Kenapa Pilih Jaxlab?</span>

                <h2 className={`mb-6 font-['Playfair_Display',ui-serif,Georgia,serif] text-[2.65rem] font-extrabold leading-[1.08] !text-white max-[1024px]:text-[2.2rem] max-[768px]:text-[2rem] ${kenapaVisible ? 'animate-[kenapaHeadingPop_0.78s_cubic-bezier(0.22,1,0.36,1)_0.12s_both]' : ''}`}>
                  Temani Perjalanan{" "}
                  <span className="italic !text-[#4ade80]">Fat Fasting</span>{" "}
                  yang Lebih Optimal
                </h2>

                <div className="mb-7 flex flex-col gap-[0.85rem]">
                  <p className="text-[0.97rem] leading-[1.78] !text-[#e8e0d4] [&_strong]:font-bold [&_strong]:!text-[#4ade80]">
                    Fat Fasting adalah metode cara berpuasa selama{" "}
                    <strong>72 jam (3 hari)</strong> berturut-turut. Selama masa
                    puasa, yang diperbolehkan hanya mengonsumsi lemak sehat
                    tertentu, air putih, atau minuman nol kalori tanpa kafein.
                  </p>
                  <p className="text-[0.92rem] leading-[1.78] !text-[#e8e0d4]">
                    Metode ini dapat membantu orang dengan berbagai kondisi
                    kesehatan seperti kanker, penyakit ginjal kronis (CKD),
                    diabetes, obesitas, penyakit autoimun, tekanan darah tinggi,
                    dan masalah kesehatan lainnya. Produk Jaxlab membantu dalam
                    mengoptimalkan fat fasting 72 Jam, serta:
                  </p>
                </div>
              </div>

              <div className="mb-7 flex flex-col">
                {features.map((feature, index) => (
                  <div
                    key={feature.id}
                    className={`group flex items-start gap-4 border-b border-white/[0.06] py-[1.1rem] transition-all duration-500 first:border-t hover:pl-[0.35rem] ${visibleFeatures.has(feature.id) ? 'translate-x-0 opacity-100' : '-translate-x-[22px] opacity-0'}`}
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
                    <div className="mt-[0.05rem] flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[rgba(74,222,128,0.14)] bg-[rgba(74,222,128,0.08)] !text-[#4ade80] transition-all duration-300 group-hover:border-[rgba(74,222,128,0.35)] group-hover:bg-[rgba(74,222,128,0.15)]">{feature.icon}</div>
                    <div>
                      <h3 className="mb-1 text-[0.97rem] font-bold leading-[1.3] !text-white">{feature.title}</h3>
                      <p className="text-[0.84rem] leading-[1.65] !text-white/60">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                className={`inline-flex w-fit items-center gap-2 border-b border-[rgba(74,222,128,0.3)] pb-0.5 text-[0.93rem] font-bold !text-[#4ade80] transition-all duration-500 hover:gap-[0.8rem] hover:border-[#22c55e] hover:!text-[#22c55e] ${kenapaVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}
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
      <section className="relative border-t border-[rgba(74,222,128,0.08)] bg-[#f9f5ec] pb-28 pt-20 max-[768px]:pb-20 max-[768px]:pt-16" id="fat-fasting-protocol">
        <div className="mx-auto max-w-[1240px] px-6">
          {/* Header */}
          <div
            ref={protocolHeaderRef}
            className={`mb-16 text-center transition-all duration-[850ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none max-[768px]:mb-10 max-[768px]:text-left ${protocolHeaderVisible ? 'translate-y-0 opacity-100' : 'translate-y-[34px] opacity-0'}`}
          >
            <span className="inline-flex text-[0.85rem] font-medium uppercase tracking-[1px] !text-[#1a1a1a]">✦ Panduan Fat Fasting</span>
            <h2 className={`mt-[0.8rem] font-['Playfair_Display',ui-serif,Georgia,serif] text-[2.5rem] leading-[1.2] !text-[#1a1a1a] transition-transform duration-[850ms] max-[768px]:text-[1.75rem] ${protocolHeaderVisible ? 'translate-y-0' : 'translate-y-4'}`}>
              Ketahui Apa yang Dikonsumsi <em className="italic !text-[#063b18]">di Setiap Fase</em>
            </h2>
          </div>

          <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(500px,1.1fr)] items-start gap-14 !text-[#001f95] max-[1024px]:grid-cols-1 max-[1024px]:gap-12 max-[768px]:gap-[2.4rem]">
            <div className="flex flex-col gap-9">
              <div
                className="relative grid gap-[2.2rem] pl-8 before:absolute before:bottom-[0.7rem] before:left-[0.34rem] before:top-[0.7rem] before:w-[3px] before:rounded-full before:bg-[rgba(0,31,149,0.14)] after:absolute after:left-[0.34rem] after:top-[0.7rem] after:h-[var(--protocol-progress)] after:max-h-[calc(100%-1.4rem)] after:w-[3px] after:rounded-full after:bg-[linear-gradient(to_bottom,#4b5ddd,#001f95)] after:transition-[height] after:duration-150 max-[768px]:gap-[1.7rem] max-[768px]:pl-[1.4rem]"
                ref={protocolListRef}
                style={
                  {
                    "--protocol-progress": `${protocolProgress * 100}%`,
                  } as React.CSSProperties
                }
              >
                {timelineSteps.map((step, index) => (
                  <article
                    className={`relative grid grid-cols-[1.5rem_minmax(0,1fr)] gap-4 transition-all duration-700 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none max-[768px]:grid-cols-[1rem_minmax(0,1fr)] max-[768px]:gap-3 ${visibleSteps.has(step.id) ? 'translate-y-0 opacity-100' : 'translate-y-7 opacity-0'}`}
                    key={step.id}
                    data-step-id={step.id}
                    ref={(el) => {
                      stepRefs.current[index] = el;
                    }}
                    style={{ transitionDelay: `${index * 0.08}s` }}
                  >
                    <span className={`relative z-[2] mt-[0.55rem] h-3 w-3 rounded-[3px] border-[3px] border-[#001f95] bg-white shadow-[0_0_0_5px_#f9f5ec] transition-transform duration-400 ${visibleSteps.has(step.id) ? 'scale-100' : 'scale-50'}`} />
                    <div>
                      <div className="mb-[0.55rem] flex flex-wrap items-center gap-[0.8rem] max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-[0.45rem]">
                        <span className={`inline-flex min-h-[34px] items-center rounded-full bg-[#063b18] px-[0.85rem] py-[0.35rem] text-[0.9rem] font-extrabold !text-white transition-all delay-150 duration-500 ${visibleSteps.has(step.id) ? 'translate-x-0 opacity-100' : '-translate-x-[10px] opacity-0'}`}>{step.time}</span>
                        <span className={`inline-flex min-h-[34px] items-center rounded-full bg-black px-[0.85rem] py-[0.35rem] text-[0.9rem] font-extrabold !text-white transition-all delay-150 duration-500 ${visibleSteps.has(step.id) ? 'translate-x-0 opacity-100' : '-translate-x-[10px] opacity-0'}`}>{step.label}</span>
                        <h3 className="text-[clamp(1.02rem,1.5vw,1.25rem)] font-medium leading-[1.25] !text-[#063b18]">{step.title}</h3>
                      </div>
                      <ul className="ml-[1.15rem] text-[clamp(0.95rem,1.45vw,1.12rem)] leading-[1.35] !text-[#030303] [&_li+li]:mt-[0.35rem]">
                        {step.items.map((item, itemIndex) => (
                          <li className={`translate-y-2 opacity-0 transition-all duration-500 ${visibleSteps.has(step.id) ? '!translate-y-0 !opacity-100' : ''}`} style={{ transitionDelay: visibleSteps.has(step.id) ? `${0.2 + itemIndex * 0.08}s` : '0s' }} key={item}>{item}</li>
                        ))}
                      </ul>
                      {step.note && (
                        <p className="mt-[0.85rem] rounded-xl border border-[rgba(0,31,149,0.12)] bg-white px-[0.95rem] py-[0.8rem] text-[0.92rem] leading-[1.5] !text-[#030303] [&_strong]:font-extrabold">
                          <strong>Catatan:</strong> {step.note}
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>

              <div className="w-[min(100%,480px)] rounded-[18px] bg-white px-[1.1rem] py-4 !text-[#222] shadow-[0_14px_34px_rgba(0,31,149,0.08)]">
                <h3 className="mb-[0.35rem] font-['Playfair_Display',ui-serif,Georgia,serif] text-[1.15rem] !text-[#222]">Clinicians' Choice</h3>
                <p className="mb-[0.55rem] text-[0.9rem] leading-[1.5] !text-[#333]">
                  Panduan konsumsi yang dirancang untuk membantu Fat Fasting
                  terasa lebih terstruktur, praktis, dan mudah dijalankan.
                </p>
                <a className="font-semibold !text-[#001f95] underline underline-offset-[3px]" href="#products">Lihat produk pendukung</a>
              </div>
            </div>

            <div className="grid grid-cols-1 items-start justify-items-end max-[1024px]:mx-auto max-[1024px]:w-full max-[1024px]:max-w-[720px]">
              <div className="!aspect-[0.92/1] w-[min(100%,520px)] justify-self-end overflow-hidden rounded-[16px_16px_16px_58%] bg-[#d9dde8] max-[768px]:w-[min(90%,420px)] max-[768px]:justify-self-center max-[768px]:rounded-[14px_14px_14px_52%]">
                <img className="block !h-full !w-full object-cover"
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
