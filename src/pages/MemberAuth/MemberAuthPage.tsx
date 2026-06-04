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
    <div className="bg-[#efe9e3]">
      <Header />
      <main className="px-0 py-10 max-md:py-6">
        <div className="container">
          <section className="mx-auto max-w-[760px] rounded-[20px] border border-[#e6dfd7] bg-white p-8 shadow-[0_16px_40px_rgba(26,77,46,0.08)] max-md:rounded-2xl max-md:p-5">
            <div>
              <TagPill className="text-[0.8rem] font-bold tracking-[0.03em]">Membership JaxLab</TagPill>
              <h1 className="my-2.5 text-[2rem] text-[var(--primary-green)] max-md:text-2xl">{mode === 'login' ? 'Masuk Untuk Belanja' : 'Daftar Membership'}</h1>
              <p className="m-0 text-[#5f645f]">
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
