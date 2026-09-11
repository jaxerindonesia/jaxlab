import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../../components/ui/button';
import { Input } from '../../../../../components/ui/input';

type Props = {
  pw: string;
  pwError: string;
  onChangePw: (v: string) => void;
  onLogin: () => void;
  loading?: boolean;
};

export function AdminLogin({ pw, pwError, onChangePw, onLogin, loading = false }: Props) {
  const navigate = useNavigate();
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0c0e1a] p-4" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950/70 p-8">
        <div onClick={() => navigate('/admin')} className="cursor-pointer mb-6 flex items-center justify-center">
          <img src="/logo-jaxlab.png" alt="JAXLAB Logo" className="h-8 w-auto" />
        </div>
        {pwError && <p className="mb-3 rounded-md border border-rose-500/30 bg-rose-900/20 px-3 py-2 text-sm text-rose-300">{pwError}</p>}
        <Input
          type="password"
          placeholder="Masukkan password admin"
          value={pw}
          onChange={(e) => onChangePw(e.target.value)}
          disabled={loading}
          onKeyDown={(e) => e.key === 'Enter' && onLogin()}
        />
        <Button className="mt-3 w-full" onClick={onLogin} disabled={loading}>{loading ? 'Memproses...' : 'Masuk'}</Button>
      </div>
    </div>
  );
}
