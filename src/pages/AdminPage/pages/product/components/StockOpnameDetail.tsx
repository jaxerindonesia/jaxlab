import { Button } from '../../../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../components/ui/card';
import { Input } from '../../../../../components/ui/input';
import type { ProductDto } from '../../../../../services/service-api';

type Props = {
  product: ProductDto;
  qty: number;
  note: string;
  onQty: (n: number) => void;
  onNote: (s: string) => void;
  onIn: () => void;
  onOut: () => void;
  onBack: () => void;
  loading?: boolean;
};

export function StockOpnameDetail({ product, qty, note, onQty, onNote, onIn, onOut, onBack, loading = false }: Props) {
  const labelClass = 'block text-sm font-medium text-slate-200';
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between px-4 py-4 md:px-6">
        <CardTitle className="text-lg font-semibold leading-none tracking-tight">Stok Opname: {product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-md text-slate-300 mb-4">Stok saat ini: <strong>{product.currentStock}</strong> ({product.stockStatus})</p>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="space-y-2"><label className={labelClass}>Qty</label><Input className="text-sm" type="number" min={1} value={qty} disabled={loading} onChange={(e) => onQty(Number(e.target.value) || 1)} /></div>
          <div className="space-y-2"><label className={labelClass}>Catatan</label><Input className="text-sm" value={note} disabled={loading} onChange={(e) => onNote(e.target.value)} /></div>
        </div>
        <div className="flex gap-2 mt-6">
          <Button onClick={onIn} disabled={loading}>{loading ? 'Menyimpan...' : '+ Barang Masuk'}</Button>
          <Button variant="destructive" onClick={onOut} disabled={loading}>{loading ? 'Menyimpan...' : '- Barang Keluar'}</Button>
          <Button variant="outline" onClick={onBack} disabled={loading}>Batal</Button>
        </div>
      </CardContent>
    </Card>
  );
}
