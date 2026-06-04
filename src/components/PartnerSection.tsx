import React, { useEffect, useState } from 'react';
import { Leaf, Award, ShieldCheck, Heart } from 'lucide-react';
import { getFeatures, getStats, getCompanyInfo } from '../services/service-api';
import type { CompanyInfoDto, FeatureDto, StatDto } from '../services/service-api';

const iconMap: Record<string, React.ReactNode> = { Leaf: <Leaf />, Award: <Award />, ShieldCheck: <ShieldCheck />, Heart: <Heart /> };

const PartnerSection: React.FC = () => {
  const [features, setFeatures] = useState<FeatureDto[]>([]);
  const [stats, setStats] = useState<StatDto[]>([]);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfoDto | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getFeatures(), getStats(), getCompanyInfo()]).then(([f, s, c]) => {
      if (cancelled) return;
      setFeatures(f); setStats(s); setCompanyInfo(c);
    }).catch(() => {
      if (cancelled) return;
      setFeatures([]); setStats([]); setCompanyInfo(null);
    });
    return () => { cancelled = true; };
  }, []);

  if (!companyInfo) return null;

  return (
    <section className="bg-[#195a31] py-14 text-white">
      <div className="container">
        <div className="mb-16 grid gap-3 rounded-3xl bg-white/10 p-8 text-white sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => <div key={stat.id} className="text-center"><div className="text-3xl font-bold max-md:text-2xl">{stat.value}</div><div className="mt-2 text-xl font-semibold text-white/85 max-md:text-sm">{stat.label}</div></div>)}
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-sm font-semibold text-white/85">JaxLab Community Partner</span>
            <h2 className="mt-4 text-[3.1rem] font-bold leading-[1.12] max-lg:text-[3rem] max-md:text-[2.2rem]">Bersama, Tumbuh<br />Sehat & Berkelanjutan</h2>
            <p className="mt-6 max-w-[680px] text-[1.05rem] leading-[1.35] text-white/75 max-lg:text-[1.1rem]">Bersama JaxLab, membangun kemitraan yang berfokus pada kualitas, kepercayaan, dan nilai jangka panjang.</p>
            <a href={`https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent('Hai! Saya tertarik menjadi Healthy Partner di JaxLab. Boleh minta detail kerjasamanya?')}`} target="_blank" rel="noreferrer" className="mt-9 inline-block rounded-full bg-white px-10 py-3 text-xl font-semibold text-[#1a5a31] no-underline max-lg:text-base">Join Healthy Partner</a>
          </div>
          <div><img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="JaxLab Partner" className="h-[430px] w-full rounded-3xl object-cover max-md:h-[280px]" /></div>
        </div>

        <div className="mt-14 border-t border-white/15 pt-12" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.id} className="text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-white">{iconMap[feature.icon] || <Leaf />}</div>
              <h3 className="text-2xl font-semibold max-md:text-xl">{feature.title}</h3>
              <p className="mt-2 text-base text-white/75">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
