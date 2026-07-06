import React from "react";
import "./Testimonials.css";
import { Star } from "lucide-react";
import { getTestimonials } from "../database/db";

const Testimonials: React.FC = () => {
  const testimonials = getTestimonials();

  return (
    <section className="testimonials" id="ulasan">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">✦ Cerita Nyata</span>
          <h2>
            Mereka Sudah Merasakannya, <span>Giliranmu</span>
          </h2>
          <p className="section-desc">
            "Saya menyukai pendekatan JaxLab yang berfokus pada edukasi dan
            perubahan gaya hidup, bukan sekadar mengejar angka di timbangan.
            Program seperti ini membantu peserta lebih memahami pentingnya
            kesehatan metabolik dan membangun kebiasaan yang lebih baik."
          </p>
        </div>

        <div className="testimonial-grid">
          {testimonials.slice(0, 4).map((item) => (
            <div key={item.id} className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < item.rating ? "#facc15" : "none"}
                    color="#facc15"
                  />
                ))}
              </div>

              <p className="testimonial-text">{item.quote}</p>

              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="author-info">
                  <h4>{item.name}</h4>
                  <span>{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
