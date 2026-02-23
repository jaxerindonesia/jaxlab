import React from 'react';
import './PartnerSection.css';
import { Leaf, Award, ShieldCheck, Heart } from 'lucide-react';
import { getFeatures, getStats, getCompanyInfo } from '../database/db';

const iconMap: Record<string, React.ReactNode> = {
    Leaf: <Leaf />,
    Award: <Award />,
    ShieldCheck: <ShieldCheck />,
    Heart: <Heart />,
};

const PartnerSection: React.FC = () => {
    // Dipanggil di DALAM komponen — DB sudah siap saat ini
    const features = getFeatures();
    const stats = getStats();
    const companyInfo = getCompanyInfo();

    return (
        <section className="partner-section">
            <div className="container">
                {/* Stats Row */}
                <div className="stats-row">
                    {stats.map((stat) => (
                        <div key={stat.id} className="stat-item">
                            <span className="stat-value">{stat.value}</span>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                    ))}
                </div>

                <div className="partner-content-wrapper">
                    <div className="partner-text">
                        <span className="subtitle">JaxLab Community Partner</span>
                        <h2>Bersama, Tumbuh<br />Sehat &amp; Berkelanjutan</h2>
                        <p>
                            Bersama JaxLab, membangun kemitraan yang berfokus pada
                            kualitas, kepercayaan, dan nilai jangka panjang.
                        </p>
                        <a
                            href={`https://wa.me/${companyInfo.whatsapp}?text=Halo%20JaxLab%2C%20saya%20ingin%20menjadi%20Healthy%20Partner`}
                            target="_blank"
                            rel="noreferrer"
                            className="join-partner-btn"
                        >
                            Join Healthy Partner
                        </a>
                    </div>
                    <div className="partner-image">
                        <img
                            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                            alt="JaxLab Partner"
                        />
                    </div>
                </div>

                <div className="features-grid">
                    {features.map((feature) => (
                        <div key={feature.id} className="feature-item">
                            <div className="icon-box">{iconMap[feature.icon] || <Leaf />}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnerSection;
