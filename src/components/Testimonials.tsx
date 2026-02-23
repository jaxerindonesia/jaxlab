import React from 'react';
import './Testimonials.css';
import { Star } from 'lucide-react';
import { getTestimonials } from '../database/db';

const Testimonials: React.FC = () => {
    // Dipanggil di DALAM komponen — DB sudah siap saat ini
    const testimonials = getTestimonials();

    return (
        <section className="testimonials">
            <div className="container">
                <div className="section-header text-center">
                    <span className="tag-pill">Cerita dari Mereka</span>
                    <h2>Pengalaman yang Dirasakan,<br />Bukan Sekadar Dikatakan</h2>
                    <p className="subtitle-text">
                        Berbagai cerita dari mereka yang menjadikan JaxLab bagian dari kebiasaan sehat sehari-hari.
                    </p>
                </div>

                <div className="testimonial-grid">
                    {testimonials.map((item) => (
                        <div key={item.id} className="testimonial-card">
                            <div className="card-image" style={{ backgroundImage: `url(${item.image})` }}></div>
                            <div className="card-content">
                                <div className="testimonial-stars">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} fill={i < item.rating ? '#FFC107' : 'none'} color="#FFC107" />
                                    ))}
                                </div>
                                <p className="quote">"{item.quote}"</p>
                                <h3>{item.name}</h3>
                                <div className="role">{item.role}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
