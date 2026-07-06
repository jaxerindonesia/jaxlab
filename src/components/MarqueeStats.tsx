import React, { useEffect, useState } from "react";
import "./MarqueeStats.css";

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
    <section className="marquee-stats-section">
      <div className="scrolling-marquee">
        <div className="scrolling-marquee-content">
          {marqueeItems.map((item, index) => (
            <React.Fragment key={`original-${index}`}>
              <span className="marquee-item">{item}</span>
              <span className="marquee-dot">•</span>
            </React.Fragment>
          ))}
          {/* Duplicate for seamless scrolling */}
          {marqueeItems.map((item, index) => (
            <React.Fragment key={`duplicate-${index}`}>
              <span className="marquee-item">{item}</span>
              <span className="marquee-dot">•</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="proof-stats-container container">
        <h4 className="proof-stats-title">ANGKA YANG BICARA SENDIRI</h4>

        <div className="proof-stats-grid">
          {statsData.map((stat, index) => (
            <div key={index} className="proof-stat-item">
              <h3 className="proof-stat-value">
                {formatValue(animatedValues[index], stat.suffix)}
              </h3>
              <p className="proof-stat-label">{stat.label}</p>
              <p className="proof-stat-sublabel">{stat.subLabel}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeStats;
