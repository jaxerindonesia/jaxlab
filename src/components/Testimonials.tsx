import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { getTestimonials, type TestimonialDto } from '../services/service-api';

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<TestimonialDto[]>([]);

  useEffect(() => {
    let cancelled = false;
    getTestimonials().then((rows) => !cancelled && setTestimonials(rows)).catch(() => !cancelled && setTestimonials([]));
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="bg-[#d7d2ce] py-20">
      <div className="container">
        <div className="mb-8 text-center">
          <span className="inline-flex rounded-full px-3 py-1 text-xs font-semibold text-[#2f2f2f]">Cerita dari Mereka</span>
          <h2 className="mt-3 text-4xl font-bold text-[#2f2f2f]">Pengalaman yang Dirasakan,<br />Bukan Sekadar Dikatakan</h2>
          <p className="mx-auto mt-2 max-w-[620px] text-[#666]">Berbagai cerita dari mereka yang menjadikan JaxLab bagian dari kebiasaan sehat sehari-hari.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.id} className="relative overflow-hidden rounded-[26px] bg-cover bg-center shadow-sm min-h-[560px]" style={{ backgroundImage: `url(${item.image})` }}>
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-[linear-gradient(140deg,rgba(16,87,46,0.9),rgba(20,98,56,0.82))] p-6 text-white backdrop-blur-[1px]">
                <div className="mb-2 flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < item.rating ? '#FFC107' : 'none'} color="#FFC107" />)}</div>
                <p className="text-[0.9rem] italic leading-relaxed text-white/95">"{item.quote}"</p>
                <h3 className="mt-4 text-lg font-semibold">{item.name}</h3>
                <div className="text-sm uppercase tracking-wide text-white/85">{item.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
