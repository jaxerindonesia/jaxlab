import React from "react";
import "./BundlingSection.css";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BundlingSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="bundling-section" id="bundling">
      <div className="fat-fasting-set-card">
        <div className="set-card-visual">
          <img
            src="/img/FF72-set.png"
            alt="Fat Fasting Set - Extra Virgin Olive Oil, Virgin Coconut Oil, Ketone Immuno"
          />
        </div>

        <div className="set-card-content">
          <h3>Bundling Fat Fasting Set</h3>
          <p>
            Dukung tubuh menjalani Fat Fasting dengan nutrisi pilihan untuk
            energi, fokus, dan metabolisme yang lebih seimbang.
          </p>
          <ul>
            {[
              "Mendukung proses fat fasting lebih optimal",
              "Membantu tubuh menggunakan lemak sebagai energi",
              "Menjaga fokus dan kejernihan mental",
              "Nutrisi premium untuk metabolisme seimbang",
              "Dipilih khusus untuk mendampingi tubuh selama fat fasting",
            ].map((benefit) => (
              <li key={benefit}>
                ✓<span>{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="set-card-price-row">
            <span className="set-card-price-old">Rp 2.200.000</span>
            <strong>Rp 1.927.000</strong>
          </div>

          <div className="set-card-actions">
            <button type="button" onClick={() => navigate("/products")}>
              Dapatkan Sekarang
            </button>
            <a href="#products">
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
