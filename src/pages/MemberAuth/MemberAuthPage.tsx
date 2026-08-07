import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { TagPill } from '../../components/ui/site';
import { setMember } from '../../services/auth';
import { loginMember, registerMember } from '../../services/service-api';

export default function MemberAuthPage() {
  const nav = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [form, setForm] = useState({ name: '', email: '', address: '', phoneWa: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    setLoading(true);
    setError('');
    try {
      const member = mode === 'login'
        ? await loginMember({ email: form.email, password: form.password })
        : await registerMember(form);
      setMember(member);
      nav('/products');
    } catch (e) {
      setError((e as Error).message || 'Gagal memproses permintaan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_top_left,rgba(211,233,218,0.6),transparent_32%),linear-gradient(180deg,#f7f3ec_0%,#eee9e2_100%)]">
      <Header />
      <main className="flex flex-1 items-start px-6 pb-16 pt-[7.5rem] max-md:px-4 max-md:pb-10 max-md:pt-[6.5rem]">
        <div className="mx-auto w-full max-w-[820px]">
          <section className="rounded-[24px] border border-white/80 bg-white/95 p-8 shadow-[0_20px_55px_rgba(34,52,40,0.09)] max-md:rounded-2xl max-md:p-5">
            <div>
              <TagPill className="bg-[#e7f3e9] text-[0.8rem] font-bold tracking-[0.03em] !text-[#246038]">Membership JaxLab</TagPill>
              <h1 className="my-2.5 text-[2rem] font-extrabold !text-[#14552e] max-md:text-2xl">{mode === 'login' ? 'Masuk Untuk Belanja' : 'Daftar Membership'}</h1>
              <p className="m-0 leading-relaxed !text-[#5f6b62]">
                Checkout di website hanya memproses harga produk + PPN. Ongkir akan dikonfirmasi admin via WhatsApp.
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2 rounded-2xl bg-[#f6f3ee] p-1.5" role="tablist" aria-label="Mode Login Register">
              <button className={`h-[42px] rounded-xl border-0 font-bold ${mode === 'login' ? 'bg-[var(--primary-green)] text-white' : 'bg-transparent text-[#617066]'}`} onClick={() => setMode('login')} type="button">Login</button>
              <button className={`h-[42px] rounded-xl border-0 font-bold ${mode === 'register' ? 'bg-[var(--primary-green)] text-white' : 'bg-transparent text-[#617066]'}`} onClick={() => setMode('register')} type="button">Register</button>
            </div>

            <div className="mt-5 grid gap-3.5">
              {mode === 'register' && (
                <label>
                  <span className="mb-1.5 block text-[0.92rem] font-semibold text-[#304337]">Nama Lengkap</span>
                  <input className="w-full rounded-xl border border-[#d6dfd5] bg-[#fcfdfc] px-3.5 py-3 text-[0.95rem] outline-none focus:border-[var(--secondary-green)] focus:shadow-[0_0_0_3px_rgba(79,121,66,0.15)]" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nama lengkap" />
                </label>
              )}

              <label>
                <span className="mb-1.5 block text-[0.92rem] font-semibold text-[#304337]">Email</span>
                <input className="w-full rounded-xl border border-[#d6dfd5] bg-[#fcfdfc] px-3.5 py-3 text-[0.95rem] outline-none focus:border-[var(--secondary-green)] focus:shadow-[0_0_0_3px_rgba(79,121,66,0.15)]" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="nama@email.com" />
              </label>

              {mode === 'register' && (
                <label>
                  <span className="mb-1.5 block text-[0.92rem] font-semibold text-[#304337]">Alamat Pengiriman</span>
                  <textarea className="w-full rounded-xl border border-[#d6dfd5] bg-[#fcfdfc] px-3.5 py-3 text-[0.95rem] outline-none focus:border-[var(--secondary-green)] focus:shadow-[0_0_0_3px_rgba(79,121,66,0.15)]" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Alamat lengkap" rows={3} />
                </label>
              )}

              {mode === 'register' && (
                <label>
                  <span className="mb-1.5 block text-[0.92rem] font-semibold text-[#304337]">No. WhatsApp</span>
                  <input className="w-full rounded-xl border border-[#d6dfd5] bg-[#fcfdfc] px-3.5 py-3 text-[0.95rem] outline-none focus:border-[var(--secondary-green)] focus:shadow-[0_0_0_3px_rgba(79,121,66,0.15)]" value={form.phoneWa} onChange={(e) => setForm({ ...form, phoneWa: e.target.value })} placeholder="08xxxxxxxxxx" />
                </label>
              )}

              <label>
                <span className="mb-1.5 block text-[0.92rem] font-semibold text-[#304337]">Password</span>
                <input className="w-full rounded-xl border border-[#d6dfd5] bg-[#fcfdfc] px-3.5 py-3 text-[0.95rem] outline-none focus:border-[var(--secondary-green)] focus:shadow-[0_0_0_3px_rgba(79,121,66,0.15)]" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Minimal 6 karakter" />
              </label>
            </div>

            {error ? <p className="mt-3.5 text-[0.92rem] text-[#b42318]">{error}</p> : null}

            <button className="mt-5 h-12 w-full rounded-xl border-0 bg-[var(--primary-green)] text-[0.98rem] font-bold text-white disabled:cursor-not-allowed disabled:opacity-60" onClick={submit} disabled={loading} type="button">
              {loading ? 'Memproses...' : mode === 'login' ? 'Masuk Sekarang' : 'Daftar Sekarang'}
            </button>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
