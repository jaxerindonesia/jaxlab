import React from 'react';
import { cn } from '../../lib/utils';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'destructive' | 'secondary';
  size?: 'default' | 'sm';
};

export function Button({ className, variant = 'default', size = 'default', ...props }: Props) {
  const base = 'inline-flex items-center justify-center rounded-md text-sm font-semibold transition disabled:opacity-50 disabled:pointer-events-none';
  const variants = {
    default: 'bg-indigo-500 text-white hover:bg-indigo-400',
    secondary: 'bg-slate-800 text-slate-100 hover:bg-slate-700',
    outline: 'border border-slate-600 text-slate-200 hover:bg-slate-800',
    destructive: 'border border-rose-500/40 bg-rose-900/30 text-rose-300 hover:bg-rose-800/40',
  } as const;
  const sizes = { default: 'h-10 px-4 py-2', sm: 'h-8 px-3' } as const;
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
