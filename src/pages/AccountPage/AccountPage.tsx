import React from 'react';
import { ArrowLeft, LogOut, Mail, MapPin, Phone, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { clearMember, getMember, isMemberLoggedIn } from '../../services/auth';

const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const member = getMember();

  if (!isMemberLoggedIn() || !member) {
    return (
      <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_top_left,rgba(211,233,218,0.6),transparent_32%),linear-gradient(180deg,#f7f3ec_0%,#eee9e2_100%)]">
        <Header />
        <main className="flex-1 px-6 pb-16 pt-[7.5rem] max-[640px]:px-4 max-[640px]:pt-[6.5rem]">
          <div className="mx-auto max-w-[1180px]">
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
    <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_top_left,rgba(211,233,218,0.6),transparent_32%),linear-gradient(180deg,#f7f3ec_0%,#eee9e2_100%)]">
      <Header />
      <main className="flex-1 px-6 pb-16 pt-[7.5rem] max-[640px]:px-4 max-[640px]:pb-10 max-[640px]:pt-[6.5rem]">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-5 flex items-center justify-between gap-4">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold !text-[#14552e] transition hover:!text-[#0d3f21] hover:underline">
              <ArrowLeft size={16} /> Kembali ke beranda
            </Link>
            <button
              type="button"
              className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[#e8c9c5] bg-[#fff8f7] px-4 text-sm font-bold !text-[#a6372f] transition hover:border-[#dca9a4] hover:bg-[#fff0ee]"
              onClick={() => {
                clearMember();
                navigate('/');
              }}
            >
              <LogOut size={17} /> Keluar
            </button>
          </div>

          <section className="rounded-[24px] border border-white/80 bg-white/95 p-7 shadow-[0_20px_55px_rgba(34,52,40,0.09)] max-[640px]:p-5">
            <div className="mb-4">
              <span className="inline-flex rounded-full bg-[#e6f1ea] px-3 py-1 text-xs font-semibold text-[var(--primary-green)]">Profil Akun</span>
              <h1 className="mt-3 text-[var(--primary-green)]">Detail Member</h1>
            </div>

            <div className="grid items-stretch gap-6 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="rounded-2xl bg-[linear-gradient(145deg,#f3f8f4,#edf3ee)] p-7">
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
