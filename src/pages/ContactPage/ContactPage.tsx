import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-[#efe9e3]">
      <Header />
      <main className="py-14">
        <div className="container grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-start gap-3"><div className="rounded-full bg-[#e6f1ea] p-2.5 text-[var(--primary-green)]"><Mail size={20} /></div><div><h3 className="font-semibold">Email</h3><p>itsupport@jaxergroup.com</p></div></div>
            <div className="mb-5 flex items-start gap-3"><div className="rounded-full bg-[#e6f1ea] p-2.5 text-[var(--primary-green)]"><Phone size={20} /></div><div><h3 className="font-semibold">Telepon</h3><p>+62 812 3456 7890</p></div></div>
            <div className="flex items-start gap-3"><div className="rounded-full bg-[#e6f1ea] p-2.5 text-[var(--primary-green)]"><MapPin size={20} /></div><div><h3 className="font-semibold">JaxerLab Headquarter</h3><p>Jl. Cempaka Putih Tengah XVII No.F33,<br />Cemp. Putih, Kec. Cemp. Putih,<br />Central Jakarta, DKI Jakarta 10510</p></div></div>
          </div>
          <div className="overflow-hidden rounded-2xl bg-white p-2 shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4911.860623627319!2d106.86554557589075!3d-6.174102660503408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f53c7c13a50d%3A0x325b1492c9f2bda5!2sJaxer%20Indonesia!5e1!3m2!1sen!2sid!4v1772161218573!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 420 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="JaxLab Location"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
