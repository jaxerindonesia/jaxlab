import React, { useEffect, useState } from "react";

const statsData = [
  {
    value: 10000,
    suffix: "+",
    label: "FF72 set",
    subLabel: "Terjual di Indonesia",
  },
  {
    value: 98,
    suffix: "%",
    label: "Puas & repeat order",
    subLabel: "rata-rata per bulan",
  },
  {
    value: 100,
    suffix: "%",
    label: "Bahan Berkualitas",
    subLabel: "Aman untuk konsumsi harian",
  },
];

const marqueeItems = [
  "Fat Fasting 72 Jam",
  "EVOO Tinggi Polifenol",
  "International Certified",
  "Bahan Alami Premium",
  "Mendukung Metabolisme",
  "BPOM & Halal Indonesia",
];

const MarqueeStats: React.FC = () => {
  const [animatedValues, setAnimatedValues] = useState(() =>
    statsData.map(() => 0)
  );

  useEffect(() => {
    const duration = 3200;
    const startTime = performance.now();
    let frameId = 0;
    const easeOutQuart = (progress: number) => 1 - Math.pow(1 - progress, 4);

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = easeOutQuart(progress);

      setAnimatedValues(
        statsData.map((stat) => Math.round(stat.value * easedProgress))
      );

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, []);

  const formatValue = (value: number, suffix: string) =>
    `${value.toLocaleString("en-US")}${suffix}`;

  return (
    <section className="bg-[#0d1a0f] pb-0">
      <div className="flex overflow-hidden whitespace-nowrap border-b border-[rgba(74,222,128,0.18)] bg-[#063b18] py-4">
        <div className="inline-flex animate-[scrollLeft_30s_linear_infinite] items-center">
          {marqueeItems.map((item, index) => (
            <React.Fragment key={`original-${index}`}>
              <span className="whitespace-nowrap px-4 text-[0.95rem] font-bold uppercase tracking-[2px] !text-[#68dd7c]">{item}</span>
              <span className="px-4 text-base !text-[rgba(104,221,124,0.55)]">•</span>
            </React.Fragment>
          ))}
          {/* Duplicate for seamless scrolling */}
          {marqueeItems.map((item, index) => (
            <React.Fragment key={`duplicate-${index}`}>
              <span className="whitespace-nowrap px-4 text-[0.95rem] font-bold uppercase tracking-[2px] !text-[#68dd7c]">{item}</span>
              <span className="px-4 text-base !text-[rgba(104,221,124,0.55)]">•</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1260px] px-0 py-12 text-center max-[1024px]:py-16 max-[1024px]:pb-[4.4rem] max-[600px]:py-[3.4rem] max-[600px]:pb-[3.8rem]">
        <h4 className="mb-[3.35rem] text-[0.82rem] font-bold uppercase tracking-[6px] !text-[rgba(74,222,128,0.72)] max-[600px]:mb-[2.8rem] max-[600px]:leading-[1.6] max-[600px]:tracking-[3px]">ANGKA YANG BICARA SENDIRI</h4>

        <div className="grid grid-cols-3 items-start gap-x-[6.8rem] gap-y-12 max-[1024px]:grid-cols-2 max-[1024px]:gap-x-[2.4rem] max-[600px]:grid-cols-1 max-[600px]:gap-[2.2rem]">
          {statsData.map((stat, index) => (
            <div key={index} className="min-w-0 overflow-visible rounded-none !border-0 bg-transparent p-0">
              <h3 className="mb-[0.38rem] whitespace-nowrap font-[Georgia,'Times_New_Roman',serif] text-[clamp(3rem,2vw,2rem)] font-extrabold leading-[0.95] tracking-[0] !text-[#45bf62] max-[600px]:text-5xl">
                {formatValue(animatedValues[index], stat.suffix)}
              </h3>
              <p className="mb-[0.36rem] mt-4 text-[0.88rem] font-semibold leading-[1.2] !text-white">{stat.label}</p>
              <p className="m-0 text-[0.78rem] leading-[1.3] !text-[rgba(125,181,136,0.74)]">{stat.subLabel}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeStats;
