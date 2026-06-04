import React from 'react';
import { cn } from '../../lib/utils';

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'h-11 w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50',
        className
      )}
      {...props}
    />
  );
}
