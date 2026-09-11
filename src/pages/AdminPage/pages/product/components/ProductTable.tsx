import { Badge } from '../../../../../components/ui/badge';
import { Button } from '../../../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../../components/ui/table';
import { ClipboardCheck, Pencil, Trash2 } from 'lucide-react';
import type { ProductDto } from '../../../../../services/service-api';

type Props = {
  products: ProductDto[];
  formatRupiah: (n: number) => string;
  onEdit: (p: ProductDto) => void;
  onStock: (p: ProductDto) => void;
  onDelete: (id: string) => void;
  deleting?: boolean;
};

export function ProductTable({ products, formatRupiah, onEdit, onStock, onDelete, deleting = false }: Props) {
  return (
    <Card className="overflow-hidden rounded-[22px] border-slate-800 bg-[#12152a] shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
      <CardHeader className="flex flex-row items-center justify-between px-4 py-4 md:px-6">
        <CardTitle className="text-lg font-semibold leading-none tracking-tight">Daftar Produk</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-3 md:hidden">
          {products.map((p) => (
            <div key={p.id} className="rounded-2xl border border-slate-800 bg-[#0f1430] p-3">
              <div className="flex items-start gap-3">
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-slate-700 bg-slate-900">
                  {p.images?.[0] ? <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" /> : null}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-base font-semibold text-slate-100">{p.name}</p>
                  <p className="text-sm text-slate-300">{p.category}</p>
                  <p className="mt-1 text-base font-medium">{formatRupiah(p.price)}</p>
                </div>
              </div>
              <div className="mt-3">
                <Badge className={`rounded-full px-3 py-1 text-xs font-semibold ${p.stockStatus === 'Tersedia' ? 'bg-emerald-900/30 text-emerald-300' : p.stockStatus === 'Terbatas' ? 'bg-amber-900/30 text-amber-300' : 'bg-rose-900/30 text-rose-300'}`}>
                  {p.stockStatus}
                </Badge>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <Button size="sm" className="h-9 w-full rounded-xl border border-slate-600 px-2" variant="outline" onClick={() => onStock(p)} disabled={deleting} aria-label={`Opname ${p.name}`} title="Opname">
                  <ClipboardCheck className="h-4 w-4" />
                </Button>
                <Button size="sm" className="h-9 w-full rounded-xl border border-indigo-500/40 bg-indigo-900/20 px-2 text-indigo-300 hover:bg-indigo-800/30" variant="secondary" onClick={() => onEdit(p)} disabled={deleting} aria-label={`Edit ${p.name}`} title="Edit">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button size="sm" className="h-9 w-full rounded-xl px-2" variant="destructive" onClick={() => onDelete(p.id)} disabled={deleting} aria-label={`Hapus ${p.name}`} title={deleting ? 'Menghapus...' : 'Hapus'}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden overflow-x-auto md:block">
        <Table className="min-w-[1080px] table-fixed">
          <TableHead>
            <TableRow>
              <TableHeader className="w-[10%] text-[12px]">Foto</TableHeader>
              <TableHeader className="w-[35%] text-[12px]">Nama</TableHeader>
              <TableHeader className="w-[15%] text-[12px]">Kategori</TableHeader>
              <TableHeader className="w-[12%] text-[12px]">Harga</TableHeader>
              <TableHeader className="w-[10%] text-[12px]">Stok</TableHeader>
              <TableHeader className="w-[18%] text-[12px]">Aksi</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id} className="hover:bg-slate-900/40">
                <TableCell>
                  <div className="h-16 w-16 overflow-hidden rounded-xl border border-slate-700 bg-slate-900">
                    {p.images?.[0] ? <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" /> : null}
                  </div>
                </TableCell>
                <TableCell className="py-5 font-semibold text-slate-100">{p.name}</TableCell>
                <TableCell className="py-5 text-slate-300">{p.category}</TableCell>
                <TableCell className="py-5 font-medium">{formatRupiah(p.price)}</TableCell>
                <TableCell>
                  <Badge className={`rounded-full px-3 py-1 text-xs font-semibold ${p.stockStatus === 'Tersedia' ? 'bg-emerald-900/30 text-emerald-300' : p.stockStatus === 'Terbatas' ? 'bg-amber-900/30 text-amber-300' : 'bg-rose-900/30 text-rose-300'}`}>
                    {p.stockStatus}
                  </Badge>
                </TableCell>
                <TableCell className="py-4">
                  <div className="grid grid-cols-3 gap-2">
                    <Button size="sm" className="h-10 w-full rounded-xl border border-slate-600" variant="outline" onClick={() => onStock(p)} disabled={deleting} aria-label={`Opname ${p.name}`} title="Opname">
                      <ClipboardCheck className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="h-10 w-full rounded-xl border border-indigo-500/40 bg-indigo-900/20 text-indigo-300 hover:bg-indigo-800/30" variant="secondary" onClick={() => onEdit(p)} disabled={deleting} aria-label={`Edit ${p.name}`} title="Edit">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="h-10 w-full rounded-xl" variant="destructive" onClick={() => onDelete(p.id)} disabled={deleting} aria-label={`Hapus ${p.name}`} title={deleting ? 'Menghapus...' : 'Hapus'}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </CardContent>
    </Card>
  );
}
