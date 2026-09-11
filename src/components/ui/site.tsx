import React from 'react';
import { cn } from '../../lib/utils';

type TagPillProps = React.HTMLAttributes<HTMLSpanElement>;

export function TagPill({ className, ...props }: TagPillProps) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700',
        className,
      )}
      {...props}
    />
  );
}

type PrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function PrimaryButton({ className, ...props }: PrimaryButtonProps) {
  return (
    <button
      className={cn(
        'rounded-full bg-brand-700 px-6 py-2.5 font-semibold text-white transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-60',
        className,
      )}
      {...props}
    />
  );
}
