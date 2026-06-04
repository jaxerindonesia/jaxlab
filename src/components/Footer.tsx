import React, { useEffect, useState } from 'react';
import { Instagram, Facebook, Youtube, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCompanyInfo, getCategories } from '../services/service-api';
import type { CompanyInfoDto } from '../services/service-api';

const Footer: React.FC = () => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfoDto | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getCompanyInfo(), getCategories()]).then(([info, cats]) => {
      if (cancelled) return;
      setCompanyInfo(info); setCategories(cats);
    }).catch(() => {
      if (cancelled) return;
      setCompanyInfo(null); setCategories([]);
    });
    return () => { cancelled = true; };
  }, []);

  if (!companyInfo) return null;

  return (
    <footer className="bg-[#1a5a31] pt-20 text-white">
      <div className="container grid gap-12 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <img src="/logo-jaxlab.png" alt="JaxLab Logo" className="h-10 w-auto" />
          <p className="mt-5 max-w-[430px] text-[0.9rem] leading-6 text-white/80">{companyInfo.description}</p>
          <div className="mt-6 flex gap-4">
            <a href={companyInfo.socialMedia.instagram} target="_blank" rel="noreferrer" className="rounded-full border border-white/30 p-3 hover:bg-white hover:text-[#143a26]"><Instagram size={20} /></a>
            <a href={companyInfo.socialMedia.facebook} target="_blank" rel="noreferrer" className="rounded-full border border-white/30 p-3 hover:bg-white hover:text-[#143a26]"><Facebook size={20} /></a>
            <a href={companyInfo.socialMedia.youtube} target="_blank" rel="noreferrer" className="rounded-full border border-white/30 p-3 hover:bg-white hover:text-[#143a26]"><Youtube size={20} /></a>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h4 className="mb-4 text-xl font-semibold">Jelajahi</h4>
            <ul className="space-y-3 text-[0.9rem] text-white/80">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">Tentang JaxLab</Link></li>
              <li><Link to="/products">Produk Kami</Link></li>
              <li><Link to="/contact">Kontak Kami</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xl font-semibold">Kategori Produk</h4>
            <ul className="space-y-3 text-[0.9rem] text-white/80">{categories.map((cat) => <li key={cat}><Link to="/products">{cat}</Link></li>)}</ul>
          </div>
          <div>
            <h4 className="mb-4 text-xl font-semibold">Hubungi Kami</h4>
            <ul className="space-y-3 text-[0.9rem] text-white/80">
              <li className="flex items-start gap-2"><Phone size={16} className="mt-1" /><a href={`tel:${companyInfo.phone}`}>{companyInfo.phone}</a></li>
              <li className="flex items-start gap-2"><Mail size={16} className="mt-1" /><a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a></li>
              <li className="flex items-start gap-2"><MapPin size={16} className="mt-1" /><span>{companyInfo.address}</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-14 border-t border-white/15 py-6 text-center text-[0.8rem] text-white/70">
        &copy; {new Date().getFullYear()} {companyInfo.name}. All rights reserved. | <a href="#" className="hover:text-white">Privacy Policy</a> | <a href="#" className="hover:text-white">Terms &amp; Conditions</a>
      </div>
    </footer>
  );
};

export default Footer;
