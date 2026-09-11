import type { CSSProperties } from 'react';

export type ToastState = {
  message: string;
  type: 'success' | 'error';
} | null;

export function AdminToast({ toast }: { toast: ToastState }) {
  if (!toast) return null;

  const style: CSSProperties = {
    position: 'fixed',
    right: 16,
    bottom: 16,
    zIndex: 9999,
    padding: '10px 14px',
    borderRadius: 10,
    border: '1px solid',
    color: toast.type === 'success' ? '#86efac' : '#fca5a5',
    background: toast.type === 'success' ? 'rgba(22,101,52,.2)' : 'rgba(127,29,29,.25)',
    borderColor: toast.type === 'success' ? 'rgba(74,222,128,.35)' : 'rgba(252,165,165,.35)',
    fontSize: 13,
    fontWeight: 600,
  };

  return <div style={style}>{toast.message}</div>;
}
