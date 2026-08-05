import React from "react";
import {
  Facebook,
  Instagram,
  MapPin,
  MessageCircle,
  Music2,
  Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";

const _companyInfo = {
  name: 'JaxLab',
  tagline: 'Reliable Product to Enhanced Wellness',
  description:
    'JaxLab adalah merek produk makanan sehat alami yang menghadirkan Bone Broth, minyak zaitun premium, dan produk multivitamin alami. Kami berkomitmen pada bahan minimal proses untuk mendukung gaya hidup sehat sejak dini.',
  email: 'hello@jaxlab.id',
  phone: '+62 812-3456-7890',
  whatsapp: '6281234567890',
  address: 'Jl. Cempaka Putih Tengah XVII No.F33, Jakarta Pusat, Indonesia',
  mapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.130847862578!2d110.3695!3d-7.7956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNDcnNDQuMiJTIDExMMKwMjInMTAuMiJF!5e0!3m2!1sen!2sid!4v1000000000000',
  socialMedia: {
    instagram: 'https://instagram.com/jaxlab.id',
    facebook: 'https://facebook.com/jaxlab.id',
    tiktok: 'https://tiktok.com/@jaxlab.id',
    youtube: 'https://youtube.com/@jaxlab',
  },
  workingHours: 'Senin – Jumat: 08.00 – 17.00 WIB',
};

const Footer: React.FC = () => {
  const companyInfo = _companyInfo;
  const socialLinks = {
    facebook: "https://www.facebook.com/profile.php?id=61590417866178",
    youtube: "https://www.youtube.com/@jaxlabindonesia",
    tiktok:
      "https://www.tiktok.com/@jaxlabindonesia?is_from_webapp=1&sender_device=pc",
    whatsapp:
      "https://chat.whatsapp.com/LJxucyPUtci4baRJX5WShx?s=sw&p=i&mlu=0",
  };
  const footerLinkClass = "text-[0.9rem] !text-white/60 transition-colors duration-300 hover:!text-[#4ade80]";
  const columnTitleClass = "mb-6 text-[1.05rem] font-semibold !text-white";
  const listClass = "space-y-4";

  return (
    <footer className="border-t border-[rgba(74,222,128,0.08)] bg-[#0e1e12] pb-8 pt-24 text-[0.9rem] !text-white max-[640px]:pb-6 max-[640px]:pt-16">
      <div className="mx-auto mb-16 flex max-w-[1200px] flex-wrap justify-between gap-12 px-6 max-[1024px]:flex-col">
        <div className="min-w-[280px] flex-[1_1_360px]">
          <div>
            <img className="mb-6 !h-auto max-h-10 !w-auto opacity-95 brightness-0 invert" src="/logo-jaxlab.png" alt="JaxLab Logo" />
          </div>
          <h3 className="mb-4 text-[1.4rem] leading-[1.25] !text-white">Reset Tubuh Kembali ke Fitrahnya</h3>
          <p className="mb-5 max-w-[430px] text-[0.9rem] leading-[1.7] !text-white/60">
            JaxLab menghadirkan nutrisi pendukung Fat Fasting untuk membantu
            menjaga kesehatan metabolik melalui produk berkualitas, edukasi, dan
            komunitas yang saling mendukung.
          </p>
          <div className="mb-6 flex max-w-[460px] items-start gap-[0.7rem] leading-[1.6] !text-white/60">
            <MapPin className="mt-[0.2rem] shrink-0 text-[#4ade80]" size={16} />
            <span>
              Jl. Cempaka Putih Tengah XVII No.F33, Cempaka Putih Timur, Kec.
              Cempaka Putih, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta
              10510
            </span>
          </div>
          <span className="mb-[0.85rem] block font-bold !text-white">Follow Us</span>
          <div className="flex gap-4 [&_a]:flex [&_a]:h-10 [&_a]:w-10 [&_a]:items-center [&_a]:justify-center [&_a]:rounded-full [&_a]:border [&_a]:border-[rgba(74,222,128,0.15)] [&_a]:bg-[rgba(74,222,128,0.1)] [&_a]:!text-[#4ade80] [&_a]:transition-all [&_a]:duration-300 [&_a:hover]:-translate-y-[3px] [&_a:hover]:bg-[#4ade80] [&_a:hover]:!text-[#0b0f0b]">
            <a
              href={companyInfo.socialMedia.instagram}
              target="_blank"
              rel="noreferrer"
              title="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href={socialLinks.tiktok}
              target="_blank"
              rel="noreferrer"
              title="TikTok"
            >
              <Music2 size={20} />
            </a>
            <a
              href={socialLinks.youtube}
              target="_blank"
              rel="noreferrer"
              title="YouTube"
            >
              <Youtube size={20} />
            </a>
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noreferrer"
              title="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noreferrer"
              title="WhatsApp"
            >
              <MessageCircle size={20} />
            </a>
          </div>
        </div>

        <div className="flex flex-[2_1_560px] flex-wrap justify-end gap-14 max-[1024px]:justify-start max-[1024px]:gap-12 max-[640px]:grid max-[640px]:grid-cols-1 max-[640px]:gap-8">
          <div>
            <h4 className={columnTitleClass}>Produk</h4>
            <ul className={listClass}>
              <li>
                <a className={footerLinkClass} href="#products">Extra Virgin Olive Oil</a>
              </li>
              <li>
                <a className={footerLinkClass} href="#products">Cocofenol</a>
              </li>
              <li>
                <a className={footerLinkClass} href="#products">Ketone Imuno</a>
              </li>
              <li>
                <a className={footerLinkClass} href="#products">Fat Fasting Bundle</a>
              </li>
              <li>
                <Link className={footerLinkClass} to="/products">Semua Produk</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className={columnTitleClass}>Perusahaan</h4>
            <ul className={listClass}>
              <li>
                <Link className={footerLinkClass} to="/about">Tentang JaxLab</Link>
              </li>
              <li>
                <a className={footerLinkClass} href="#gallery">Blog & Artikel</a>
              </li>
              <li>
                <a className={footerLinkClass} href="#hero">Karir</a>
              </li>
              <li>
                <Link className={footerLinkClass} to="/contact">Hubungi Kami</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className={columnTitleClass}>Bantuan</h4>
            <ul className={listClass}>
              <li>
                <a className={footerLinkClass} href="#kenapa">FAQ</a>
              </li>
              <li>
                <a className={footerLinkClass} href="#products">Cara Pemesanan</a>
              </li>
              <li>
                <a className={footerLinkClass} href="#products">Pengiriman</a>
              </li>
              <li>
                <a className={footerLinkClass} href="#hero">Kebijakan Privasi</a>
              </li>
              <li>
                <a className={footerLinkClass} href="#hero">Syarat & Ketentuan</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center border-t border-white/5 pt-8 text-center text-[0.85rem] !text-white/40">
        <p className="inline-flex flex-wrap items-center justify-center gap-4">&copy; 2026 JaxLab Indonesia. All Rights Reserved.</p>
        <span className="font-bold !text-[#4ade80]">💚 Bantu Tubuh Sehat Alami</span>
      </div>
    </footer>
  );
};

export default Footer;
