import React from 'react';
import { ArrowLeft, Mail, MapPin, Phone, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getMember, isMemberLoggedIn } from '../../services/auth';

const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const member = getMember();

  if (!isMemberLoggedIn() || !member) {
    return (
      <div className="bg-[#efe9e3]">
        <Header />
        <main className="px-0 py-10">
          <div className="container">
            <section className="rounded-2xl border border-[#e6dfd7] bg-white p-6 text-center shadow-[0_16px_40px_rgba(26,77,46,0.08)]">
              <h1 className="text-[var(--primary-green)]">Login dulu untuk lihat akun</h1>
              <p className="mt-2 text-[#5f645f]">Halaman profil hanya bisa dibuka oleh member yang sudah login.</p>
              <button className="mt-4 rounded-xl bg-[var(--primary-green)] px-6 py-3 font-bold text-white" onClick={() => navigate('/member')}>
                Login / Register
              </button>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#efe9e3]">
      <Header />
      <main className="px-0 py-8">
        <div className="container">
          <Link to="/" className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--primary-green)]">
            <ArrowLeft size={16} /> Kembali ke beranda
          </Link>

          <section className="rounded-[18px] border border-[#e6dfd7] bg-white p-6 shadow-[0_16px_40px_rgba(26,77,46,0.08)]">
            <div className="mb-4">
              <span className="inline-flex rounded-full bg-[#e6f1ea] px-3 py-1 text-xs font-semibold text-[var(--primary-green)]">Profil Akun</span>
              <h1 className="mt-3 text-[var(--primary-green)]">Detail Member</h1>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
              <div className="rounded-2xl bg-[#f8faf7] p-6">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary-green)] text-white">
                  <User size={28} />
                </div>
                <h2 className="text-2xl font-bold text-[#1d241d]">{member.name}</h2>
                <p className="mt-1 text-[#6d726b]">{member.email}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 rounded-xl border border-[#e8eee7] bg-white px-4 py-3">
                  <Mail size={18} className="text-[var(--primary-green)]" />
                  <div>
                    <p className="text-sm text-[#6d726b]">Email</p>
                    <p className="font-medium text-[#1d241d]">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-[#e8eee7] bg-white px-4 py-3">
                  <Phone size={18} className="text-[var(--primary-green)]" />
                  <div>
                    <p className="text-sm text-[#6d726b]">WhatsApp</p>
                    <p className="font-medium text-[#1d241d]">{member.phoneWa}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-[#e8eee7] bg-white px-4 py-3">
                  <MapPin size={18} className="mt-0.5 text-[var(--primary-green)]" />
                  <div>
                    <p className="text-sm text-[#6d726b]">Alamat</p>
                    <p className="font-medium text-[#1d241d]">{member.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccountPage;
