import React, { useMemo } from "react";
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
    <section className="relative min-h-screen overflow-hidden bg-[linear-gradient(135deg,#546d57_0%,#016738_40%,#0d1a0f_100%)] pb-20 pt-[140px] max-[1024px]:min-h-0 max-[1024px]:pb-[60px] max-[1024px]:pt-[120px] max-[600px]:pb-[50px] max-[600px]:pt-[100px]" id="hero">
      {/* Subtle background decorations */}
      <div className="pointer-events-none absolute -left-[100px] -top-[100px] h-[500px] w-[500px] rounded-full bg-[rgba(34,197,94,0.06)] blur-[120px]"></div>
      <div className="pointer-events-none absolute -bottom-[50px] right-[10%] h-[400px] w-[400px] rounded-full bg-[rgba(34,197,94,0.04)] blur-[120px]"></div>

      {/* Floating particles layer */}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden motion-reduce:hidden" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute -bottom-5 rounded-full bg-[radial-gradient(circle,rgba(190,240,200,0.9)_0%,rgba(120,200,140,0.4)_60%,rgba(120,200,140,0)_100%)] [animation-name:particleFloat] [animation-timing-function:ease-in-out] [animation-iteration-count:infinite] [will-change:transform,opacity] max-[600px]:[&:nth-child(n+20)]:hidden"
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

      <div className="relative z-[2] mx-auto flex max-w-[1480px] items-center justify-between gap-[92px] px-6 max-[1024px]:max-w-[1200px] max-[1024px]:flex-col max-[1024px]:gap-10">
        <div className="max-w-[660px] flex-1 max-[1024px]:max-w-full max-[1024px]:text-center">
          <span className="mb-6 inline-flex animate-[fadeInUp_0.6s_ease] items-center gap-2 rounded-full border border-[rgba(74,222,128,0.2)] bg-[rgba(74,222,128,0.1)] px-[1.2rem] py-[0.4rem] text-[0.78rem] font-semibold uppercase tracking-[1px] !text-[#4ade80]">
            <Leaf size={14} />
            Mulai Fat Fasting dengan Protokol yang Tepat
          </span>

          <h1 className="mb-[1.65rem] animate-[fadeInUp_0.6s_ease_0.1s_both] font-['Playfair_Display',ui-serif,Georgia,Cambria,'Times_New_Roman',Times,serif] text-[5rem] font-extrabold leading-[0.96] tracking-[0] !text-[#f9f5ec] max-[1024px]:text-[3.6rem] max-[600px]:text-[2.75rem]">
            <span className="block">Saatnya</span>
            <span className="block">
              <span className="inline-block font-['Playfair_Display',serif] text-[0.9em] font-bold italic !text-[#4fc66b]">
                Tubuhmu
              </span>
            </span>
            <span className="block">kembali ke Fitrahnya</span>
          </h1>

          <p className="mb-8 max-w-[500px] animate-[fadeInUp_0.6s_ease_0.2s_both] font-['Inter',system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif] text-[1.08rem] leading-[1.7] !text-[rgba(232,224,212,0.82)] max-[1024px]:mx-auto max-[600px]:text-[0.95rem]">
            Fat Fasting 72 Jam membantu tubuh kembali menggunakan lemak sebagai sumber energi alami, didukung rangkaian nutrisi dari JaxLab.
          </p>

          <div className="mb-10 flex animate-[fadeInUp_0.6s_ease_0.3s_both] flex-wrap gap-4 max-[1024px]:justify-center max-[600px]:flex-col max-[600px]:items-center">
            <a
              className="inline-flex items-center gap-2 rounded-full bg-[#4ade80] px-[1.8rem] py-3 text-[0.95rem] font-semibold !text-[#0b0f0b] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#22c55e] hover:shadow-[0_8px_25px_rgba(74,222,128,0.25)]"
              href="https://whatsapp.com/channel/0029Vb7r5yR002TD2W3JqD3y"
              target="_blank"
              rel="noreferrer"
            >
              Bergabung Komunitas Jaxlab
              <ArrowRight size={18} />
            </a>
            <button
              className="inline-flex items-center gap-2 rounded-full !border !border-[rgba(74,222,128,0.3)] bg-transparent px-[1.8rem] py-3 text-[0.95rem] font-medium !text-[#d4c9b0] transition-all duration-300 hover:!border-[#4ade80] hover:bg-[rgba(74,222,128,0.05)] hover:!text-[#4ade80]"
              onClick={() => scrollToSection("kenapa")}
            >
              Pelajari Protokol
            </button>
          </div>

          <div className="flex animate-[fadeInUp_0.6s_ease_0.4s_both] flex-wrap gap-3 max-[1024px]:justify-center max-[600px]:gap-4">
            <div className="flex items-center gap-1.5 text-[0.82rem] font-normal !text-white/40 after:ml-3 after:content-['•'] after:!text-white/35 [&_svg]:text-[#4ade80] [&_svg]:opacity-70">
              <MessageCircle size={16} />
              <span>Akses Tanya Jawab dengan Dokter</span>
            </div>
            <div className="flex items-center gap-1.5 text-[0.82rem] font-normal !text-white/40 after:ml-3 after:content-['•'] after:!text-white/35 [&_svg]:text-[#4ade80] [&_svg]:opacity-70">
              <BadgeCheck size={16} />
              <span>Produk Halal & BPOM Indonesia</span>
            </div>
            <div className="flex items-center gap-1.5 text-[0.82rem] font-normal !text-white/40 [&_svg]:text-[#4ade80] [&_svg]:opacity-70">
              <ShieldCheck size={16} />
              <span>Bergabung dengan Komunitas JaxLab</span>
            </div>
          </div>
        </div>

        <div className="flex max-w-[720px] flex-[1.15] animate-[fadeInUp_0.8s_ease_0.2s_both] justify-end max-[1024px]:max-w-[500px] max-[1024px]:justify-center">
          <div className="relative w-full">
            <img
              src="/img/Jaroliva.png"
              alt="Produk Jaroliva"
              className="!h-[680px] !w-full rounded-3xl object-cover shadow-[0_30px_60px_rgba(0,0,0,0.3)] max-[1024px]:!h-[520px] max-[600px]:!h-[420px]"
            />
            {/* Floating card overlay */}
            <div className="absolute bottom-[30px] left-[-20px] right-[30px] flex animate-[float_4s_ease-in-out_infinite] items-center gap-3 rounded-2xl border border-[rgba(74,222,128,0.15)] bg-[rgba(20,31,22,0.85)] px-[1.2rem] py-4 backdrop-blur-[20px] max-[600px]:bottom-5 max-[600px]:left-[10px] max-[600px]:right-[10px]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[rgba(74,222,128,0.15)] text-[#4ade80]">
                <Circle size={18} fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <strong className="text-[0.88rem] font-semibold !text-white">Fat Fasting 72 Jam</strong>
                <span className="text-xs !text-white/60">Dukungan nutrisi, edukasi, dan komunitas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
