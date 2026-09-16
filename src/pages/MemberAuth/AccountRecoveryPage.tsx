import { useEffect, useState, type FormEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { forgetMember } from '../../services/auth';
import { requestPasswordReset, resetPassword, verifyEmail } from '../../services/api/members';

export default function AccountRecoveryPage() {
  const { pathname } = useLocation();
  const mode = pathname.endsWith('verify-email') ? 'verify' : pathname.endsWith('reset-password') ? 'reset' : 'request';
  const [token] = useState(() => new URLSearchParams(window.location.hash.slice(1)).get('token') ?? '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    if (window.location.hash) window.history.replaceState(window.history.state, '', pathname);
  }, [pathname]);
  const invalidToken = mode !== 'request' && !/^[a-f0-9]{64}$/.test(token);
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (busy || invalidToken) return;
    setError('');
    if (mode === 'reset' && password !== confirmation) { setError('Konfirmasi password tidak sama.'); return; }
    setBusy(true);
    try {
      const result = mode === 'request' ? await requestPasswordReset(email) : mode === 'reset' ? await resetPassword(token, password) : await verifyEmail(token);
      if (mode !== 'request') forgetMember();
      setPassword(''); setConfirmation(''); setMessage(result.message);
    } catch (error) { setError(error instanceof Error ? error.message : 'Permintaan gagal. Silakan coba lagi.'); }
    finally { setBusy(false); }
  };
  const inputClass = 'mt-1 w-full rounded-xl border border-[#ceddd1] px-3 py-3 text-sm !text-[#25382b]';
  return <div className="flex min-h-screen flex-col bg-[#f7f3ec]">
    <Header />
    <main className="flex-1 px-5 pb-16 pt-32">
      <section className="mx-auto max-w-lg rounded-3xl bg-white p-7 shadow-lg">
        <h1 className="mb-3 text-2xl font-extrabold !text-[#193421]">{mode === 'request' ? 'Lupa Password' : mode === 'reset' ? 'Atur Password Baru' : 'Verifikasi Email Baru'}</h1>
        <p className="mb-5 text-sm !text-[#59685e]">{mode === 'request' ? 'Masukkan email akun Anda. Kami akan mengirim tautan verifikasi untuk mengatur ulang password.' : mode === 'reset' ? 'Buat password baru dengan 8–128 karakter.' : 'Konfirmasi untuk menggunakan email baru sebagai email login Anda.'}</p>
        {invalidToken ? <p role="alert" className="mb-4 text-red-700">Tautan tidak valid. Buka tautan terbaru dari email Anda.</p> : message ? <p role="status" className="mb-5 rounded-xl bg-[#edf6ef] p-4 text-[#14552e]">{message}</p> : <form onSubmit={submit}>
          <fieldset disabled={busy} className="space-y-4">
            {mode === 'request' && <label className="block text-sm font-semibold">Email akun<input className={inputClass} type="email" required maxLength={254} autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} /></label>}
            {mode === 'reset' && <>
              <label className="block text-sm font-semibold">Password baru<input className={inputClass} type="password" required minLength={8} maxLength={128} autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} /></label>
              <label className="block text-sm font-semibold">Konfirmasi password<input className={inputClass} type="password" required minLength={8} maxLength={128} autoComplete="new-password" value={confirmation} onChange={e => setConfirmation(e.target.value)} /></label>
            </>}
            {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
            <button type="submit" className="w-full rounded-xl bg-[#14552e] px-5 py-3 font-bold text-white">{busy ? 'Memproses...' : mode === 'request' ? 'Kirim Tautan Verifikasi' : mode === 'reset' ? 'Simpan Password Baru' : 'Verifikasi Email'}</button>
          </fieldset>
        </form>}
        <div className="mt-5 flex flex-wrap gap-4 text-sm font-bold text-[#14552e]">
          <Link to="/member/auth">Kembali ke Login</Link>
          {mode !== 'verify' && <Link to="/member/forgot-password" onClick={() => { setMessage(''); setError(''); }}>Minta Tautan Baru</Link>}
          {mode === 'verify' && <Link to="/member">Kembali ke Profil</Link>}
        </div>
      </section>
    </main>
    <Footer />
  </div>;
}
