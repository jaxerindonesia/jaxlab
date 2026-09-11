import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_top_left,rgba(211,233,218,0.6),transparent_32%),linear-gradient(180deg,#f7f3ec_0%,#eee9e2_100%)]">
      <Header />
      <main className="flex-1 px-6 pb-16 pt-[7.5rem] max-[640px]:px-4 max-[640px]:pb-10 max-[640px]:pt-[6.5rem]">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-7">
            <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.12em] !text-[#4d7959]">Kontak JaxLab</p>
            <h1 className="m-0 text-[clamp(1.9rem,3.5vw,2.7rem)] font-black !text-[#193421]">Hubungi Kami</h1>
            <p className="mb-0 mt-2 max-w-[80ch] leading-relaxed !text-[#647068]">Tim kami siap membantu pertanyaan seputar produk, pembelian, dan layanan JaxLab.</p>
          </div>
          <div className="grid items-stretch gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[24px] border border-white/80 bg-white/95 p-7 shadow-[0_20px_55px_rgba(34,52,40,0.09)] max-[640px]:p-5">
            <div className="mb-7 flex items-start gap-4">
              <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e6f1ea] !text-[#14552e]"><Mail size={20} /></div>
              <div><h3 className="mb-1 mt-0 font-bold !text-[#23372a]">Email</h3><a className="break-all !text-[#59685e] hover:!text-[#14552e] hover:underline" href="mailto:itsupport@jaxergroup.com">itsupport@jaxergroup.com</a></div>
            </div>
            <div className="mb-7 flex items-start gap-4">
              <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e6f1ea] !text-[#14552e]"><Phone size={20} /></div>
              <div><h3 className="mb-1 mt-0 font-bold !text-[#23372a]">Telepon</h3><a className="!text-[#59685e] hover:!text-[#14552e] hover:underline" href="tel:+6281234567890">+62 812 3456 7890</a></div>
            </div>
            <div className="flex items-start gap-4">
              <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e6f1ea] !text-[#14552e]"><MapPin size={20} /></div>
              <div><h3 className="mb-1 mt-0 font-bold !text-[#23372a]">JaxLab Headquarter</h3><p className="m-0 leading-relaxed !text-[#59685e]">Jl. Cempaka Putih Tengah XVII No.F33,<br />Cemp. Putih, Kec. Cemp. Putih,<br />Jakarta Pusat, DKI Jakarta 10510</p></div>
            </div>
          </div>
          <div className="min-h-[430px] overflow-hidden rounded-[24px] border border-white/80 bg-white shadow-[0_20px_55px_rgba(34,52,40,0.09)] max-[640px]:min-h-[360px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4911.860623627319!2d106.86554557589075!3d-6.174102660503408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f53c7c13a50d%3A0x325b1492c9f2bda5!2sJaxer%20Indonesia!5e1!3m2!1sen!2sid!4v1772161218573!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 420, borderRadius: '2px' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="JaxLab Location"
            />
          </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
