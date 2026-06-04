import React from 'react';
import { cn } from '../../lib/utils';

export const Table = ({ className, ...props }: React.TableHTMLAttributes<HTMLTableElement>) => (
  <table className={cn('w-full border-collapse', className)} {...props} />
);
export const TableHead = (props: React.HTMLAttributes<HTMLTableSectionElement>) => <thead {...props} />;
export const TableBody = (props: React.HTMLAttributes<HTMLTableSectionElement>) => <tbody {...props} />;
export const TableRow = (props: React.HTMLAttributes<HTMLTableRowElement>) => <tr {...props} />;
export const TableCell = ({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className={cn('border-b border-slate-800 px-3 py-3 text-slate-100', className)} {...props} />
);
export const TableHeader = ({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th className={cn('border-b border-slate-800 px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400', className)} {...props} />
);
