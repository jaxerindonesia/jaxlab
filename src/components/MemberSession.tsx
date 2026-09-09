import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AUTH_CHANGED_EVENT, getMember, watchSession } from '../services/auth';
import { syncCart } from '../services/cart';

export default function MemberSession() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => watchSession(() => toast.info('Sesi 24 jam telah berakhir. Silakan masuk kembali.')), []);
  useEffect(() => {
    const update = () => {
      if (!getMember() && (pathname === '/member' || pathname === '/orders/history')) navigate('/member/auth', { replace: true });
      void syncCart();
    };
    update();
    window.addEventListener(AUTH_CHANGED_EVENT, update);
    window.addEventListener('focus', update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener(AUTH_CHANGED_EVENT, update);
      window.removeEventListener('focus', update);
      window.removeEventListener('storage', update);
    };
  }, [navigate, pathname]);
  return null;
}
