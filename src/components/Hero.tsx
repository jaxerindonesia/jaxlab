import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    const trimmed = searchTerm.trim();
    navigate(trimmed ? `/products?search=${encodeURIComponent(trimmed)}` : '/products');
  };

  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-[#184f2f] pb-12 text-white lg:items-center lg:pb-0">
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(circle at 30% 50%, #1f6a3a 0%, #14542f 45%, #113d26 100%)' }}
      />
      <div className="absolute inset-0 hidden lg:block">
        <img
          src="/img/Jaroliva.png"
          alt="Olive Oil Bottle"
          className="h-full w-full object-contain object-right-bottom"
          style={{ maskImage: 'linear-gradient(to right, transparent 36%, rgba(0,0,0,0.28) 48%, rgba(0,0,0,0.62) 60%, rgba(0,0,0,0.9) 70%, rgba(0,0,0,1) 78%)', WebkitMaskImage: 'linear-gradient(to right, transparent 36%, rgba(0,0,0,0.28) 48%, rgba(0,0,0,0.62) 60%, rgba(0,0,0,0.9) 70%, rgba(0,0,0,1) 78%)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(17,61,38,0.9) 0%, rgba(17,61,38,0.78) 38%, rgba(17,61,38,0.42) 52%, rgba(17,61,38,0.12) 62%, transparent 72%)' }}
        />
        <div
          className="pointer-events-none absolute left-0 top-0 h-full w-[58%]"
          style={{
            background: 'rgba(21,95,53,0.13)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          }}
        />
        <div
          className="pointer-events-none absolute top-0 h-full w-[30%]"
          style={{
            left: '48.5%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(to right, rgba(21,95,53,0.48) 0%, rgba(21,95,53,0.28) 42%, rgba(21,95,53,0.1) 72%, transparent 100%)',
            filter: 'blur(26px)',
          }}
        />
      </div>
      <div className="absolute inset-0 bg-cover bg-center opacity-45 saturate-125 brightness-50 lg:hidden" style={{ backgroundImage: 'url(/img/Jaroliva.png)' }} />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(to right, #184f2f 0%, transparent 45%), linear-gradient(to bottom, #184f2f 0%, transparent 20%), linear-gradient(to top, #123722 0%, transparent 20%)' }}
      />
      <div className="container relative z-10 flex w-full items-center justify-between gap-8 max-lg:flex-col max-lg:items-start max-lg:justify-end">
        <div className="max-w-[620px] text-left lg:ml-[60px]">
          <span className="mb-5 inline-block rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-sm backdrop-blur">Kualitas Alami yang Terpercaya</span>
          <h1 className="mb-5 text-5xl font-bold leading-tight max-lg:text-4xl max-md:text-3xl">Reliable Product to<br />Enhanced Wellness</h1>
          <p className="mb-8 max-w-[480px] text-[1rem] opacity-90">Produk multivitamin alami dan minim proses, dibuat untuk menjaga kualitas nutrisi tanpa bahan tambahan buatan.</p>
          <div className="flex max-w-[480px] items-center gap-2 rounded-full bg-white px-4 py-2 text-[#333] shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
            <Search size={20} className="text-[#888]" />
            <input
              type="text"
              placeholder="Cari produk JaxLab..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 border-0 bg-transparent text-sm outline-none"
            />
            <button onClick={handleSearch} className="rounded-full bg-[var(--primary-green)] px-6 py-2 text-sm font-semibold text-white hover:bg-[var(--secondary-green)]">Cari</button>
          </div>
        </div>

        <div className="relative hidden h-screen flex-1 items-center justify-end lg:flex">
          <div className="h-full w-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
