import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Check,
  Copy,
  Gift,
  LogOut,
  Mail,
  MapPin,
  Phone,
  User,
  Users,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { clearMember, getMember, isMemberLoggedIn } from "../../services/auth";
import {
  formatRupiah,
  getReferralSummary,
  type ReferralSummary,
} from "../../services/service-api";

const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const member = getMember();
  const [referral, setReferral] = useState<ReferralSummary | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (member?.id)
      getReferralSummary(member.id)
        .then(setReferral)
        .catch(() => setReferral(null));
  }, [member?.id]);

  const copyReferralLink = async () => {
    if (!referral) return;
    await navigator.clipboard.writeText(
      `${window.location.origin}/member/auth?ref=${referral.referralCode}`,
    );
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  if (!isMemberLoggedIn() || !member) {
    return (
      <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_top_left,rgba(211,233,218,0.6),transparent_32%),linear-gradient(180deg,#f7f3ec_0%,#eee9e2_100%)]">
        <Header />
        <main className="flex-1 px-6 pb-16 pt-[7.5rem] max-[640px]:px-4 max-[640px]:pt-[6.5rem]">
          <div className="mx-auto max-w-[1180px]">
            <section className="rounded-2xl border border-[#e6dfd7] bg-white p-6 text-center shadow-[0_16px_40px_rgba(26,77,46,0.08)]">
              <h1 className="text-[var(--primary-green)]">
                Login dulu untuk lihat akun
              </h1>
              <p className="mt-2 text-[#5f645f]">
                Halaman profil hanya bisa dibuka oleh member yang sudah login.
              </p>
              <button
                className="mt-4 rounded-xl bg-[var(--primary-green)] px-6 py-3 font-bold text-white"
                onClick={() => navigate("/member")}
              >
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
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-bold !text-[#14552e] transition hover:!text-[#0d3f21] hover:underline"
            >
              <ArrowLeft size={16} /> Kembali ke beranda
            </Link>
            <button
              type="button"
              className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[#e8c9c5] bg-[#fff8f7] px-4 text-sm font-bold !text-[#a6372f] transition hover:border-[#dca9a4] hover:bg-[#fff0ee]"
              onClick={() => {
                clearMember();
                navigate("/");
              }}
            >
              <LogOut size={17} /> Keluar
            </button>
          </div>

          <section className="rounded-[24px] border border-white/80 bg-white/95 p-7 shadow-[0_20px_55px_rgba(34,52,40,0.09)] max-[640px]:p-5">
            <div className="mb-4">
              <span className="inline-flex rounded-full bg-[#e6f1ea] px-3 py-1 text-xs font-semibold text-[var(--primary-green)]">
                Profil Akun
              </span>
            </div>

            <div className="grid items-stretch gap-6 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="rounded-2xl bg-[linear-gradient(145deg,#f3f8f4,#edf3ee)] p-7">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary-green)] text-white">
                  <User size={28} />
                </div>
                <h2 className="text-2xl font-bold text-[#1d241d]">
                  {member.name}
                </h2>
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
                    <p className="font-medium text-[#1d241d]">
                      {member.phoneWa}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-[#e8eee7] bg-white px-4 py-3">
                  <MapPin
                    size={18}
                    className="mt-0.5 text-[var(--primary-green)]"
                  />
                  <div>
                    <p className="text-sm text-[#6d726b]">Alamat</p>
                    <p className="font-medium text-[#1d241d]">
                      {member.address}
                    </p>
                    {member.shippingDestination && (
                      <p className="mt-1 text-sm text-[#6d726b]">
                        {member.shippingDestination}
                      </p>
                    )}
                    {member.city && (
                      <p className="mt-1 text-xs font-semibold text-[#14552e]">
                        {member.city}, {member.province} · {member.postalCode}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="mt-6 overflow-hidden rounded-[24px] border border-white/80 bg-white/95 shadow-[0_20px_55px_rgba(34,52,40,0.09)]">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e8eee9] px-7 py-6 max-[640px]:px-5">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-[0.14em] !text-[#4f805e]">
                  Program Referral
                </span>
                <h2 className="mb-0 mt-1 text-2xl font-extrabold !text-[#193421]">
                  Ajak Teman, Dapatkan Bonus
                </h2>
                <p className="mb-0 mt-1 text-sm !text-[#68736b]">
                  Bonus {referral?.percentage ?? 0}% dari subtotal order
                  referral yang berhasil dibayar.
                </p>
              </div>
              <button
                type="button"
                onClick={() => void copyReferralLink()}
                disabled={!referral}
                className="inline-flex min-h-12 items-center gap-2 rounded-xl border-0 bg-[#14552e] px-5 font-bold text-white disabled:opacity-50"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}{" "}
                {copied ? "Link Tersalin" : "Salin Link Referral"}
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4 p-7 max-[760px]:grid-cols-1 max-[640px]:p-5">
              <div className="rounded-2xl bg-[#edf6ef] p-5">
                <Users className="mb-3 text-[#14552e]" size={23} />
                <p className="m-0 text-sm !text-[#68736b]">Teman Terdaftar</p>
                <strong className="mt-1 block text-3xl !text-[#193421]">
                  {referral?.registeredCount ?? 0}
                </strong>
              </div>
              <div className="rounded-2xl bg-[#edf6ef] p-5">
                <Check className="mb-3 text-[#14552e]" size={23} />
                <p className="m-0 text-sm !text-[#68736b]">Referral Berhasil</p>
                <strong className="mt-1 block text-3xl !text-[#193421]">
                  {referral?.successfulCount ?? 0}
                </strong>
              </div>
              <div className="rounded-2xl bg-[#fff7df] p-5">
                <Gift className="mb-3 text-[#a46b00]" size={23} />
                <p className="m-0 text-sm !text-[#75643f]">Bonus Terkumpul</p>
                <strong className="mt-1 block text-3xl !text-[#6b4c08]">
                  {formatRupiah(referral?.totalBonus ?? 0)}
                </strong>
              </div>
            </div>
            <div className="mx-7 mb-7 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-dashed border-[#b9d0bf] bg-[#f8fbf8] px-4 py-3 max-[640px]:mx-5 max-[640px]:mb-5">
              <span className="text-sm !text-[#68736b]">
                Kode referral kamu
              </span>
              <strong className="tracking-[0.18em] !text-[#14552e]">
                {referral?.referralCode ?? "Memuat..."}
              </strong>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccountPage;
