import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BundlingSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#f9f5ec] pb-6 max-[960px]:pb-4" id="bundling">
      <div className="relative mx-auto mt-12 grid max-w-[80%] grid-cols-[minmax(0,1.02fr)_minmax(420px,0.9fr)] items-center gap-10 overflow-hidden rounded-[28px] bg-[#001802] p-11 !text-white max-[1200px]:max-w-[calc(100%-2.5rem)] max-[1200px]:grid-cols-[minmax(0,1fr)_minmax(380px,0.92fr)] max-[1200px]:gap-8 max-[1200px]:p-9 max-[960px]:mt-8 max-[960px]:max-w-[calc(100%-2rem)] max-[960px]:grid-cols-1 max-[960px]:p-6">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="relative z-[1] grid justify-items-center overflow-hidden rounded-[28px]">
          <img
            className="block !h-auto !w-4/5 object-cover object-center max-[960px]:max-h-[520px] max-[960px]:object-contain"
            src="/public/img/set.png"
            alt="Fat Fasting Set - Extra Virgin Olive Oil, Virgin Coconut Oil, Ketone Immuno"
          />
        </div>

        <div className="relative z-[1] font-['Inter',system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif]">
          <span className="mb-3 inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.22em] !text-[#d6b875]">
            <span className="h-px w-8 bg-[#d6b875]" />
            Pilihan lengkap untuk fat fasting
          </span>
          <h3 className="mb-[0.85rem] max-w-[620px] font-['Playfair_Display',ui-serif,Georgia,Cambria,'Times_New_Roman',Times,serif] text-5xl font-black leading-[1.05] !text-white max-[960px]:text-[clamp(2.1rem,7vw,3rem)]">
            Bundling <span className="italic !text-[#d6b875]">Fat Fasting</span> Set
          </h3>
          <p className="mb-[1.35rem] max-w-[640px] text-lg leading-[1.6] !text-white/80">
            Dukung tubuh menjalani <strong className="font-semibold !text-white">Fat Fasting</strong> dengan nutrisi pilihan untuk
            <span className="!text-white"> energi, fokus, dan metabolisme</span> yang lebih seimbang.
          </p>
          <ul className="mb-8 grid list-none gap-[0.65rem] p-0">
            {[
              "Mendukung proses fat fasting lebih optimal",
              "Membantu tubuh menggunakan lemak sebagai energi",
              "Menjaga fokus dan kejernihan mental",
              "Nutrisi premium untuk metabolisme seimbang",
              "Dipilih khusus untuk mendampingi tubuh selama fat fasting",
            ].map((benefit) => (
              <li className="grid grid-cols-[22px_minmax(0,1fr)] items-start gap-[0.65rem] leading-[1.35] !text-white/90" key={benefit}>
                <span className="!text-white">✓</span><span>{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="mb-[1.6rem] flex flex-wrap items-baseline gap-[1.6rem]">
            <span className="text-[clamp(1.2rem,2vw,1.65rem)] !text-white/55 line-through decoration-[#ff5c70] decoration-[3px]">Rp 3.200.000</span>
            <strong className="text-[2.2rem] font-black leading-none !text-white">Rp 2.970.000</strong>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <button className="min-h-[58px] rounded-full bg-white px-[2.4rem] py-[0.95rem] font-['Inter',system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif] text-base font-black uppercase !text-[#0f0f0f] shadow-[0_12px_30px_rgba(0,0,0,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(0,0,0,0.18)]" type="button" onClick={() => navigate("/products")}>
              Dapatkan Sekarang
            </button>
            <a className="inline-flex items-center gap-[0.35rem] text-[0.98rem] !text-white/80 underline underline-offset-[3px]" href="#products">
              Certificate of Analysis
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BundlingSection;
