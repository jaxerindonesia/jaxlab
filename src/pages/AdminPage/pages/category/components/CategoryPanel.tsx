import { Button } from '../../../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../components/ui/card';
import { Input } from '../../../../../components/ui/input';

type Props = {
  categories: string[];
  newCat: string;
  onNewCat: (v: string) => void;
  onAdd: () => void;
  onDelete: (name: string) => void;
  loadingAdd?: boolean;
  loadingDelete?: boolean;
};

export function CategoryPanel({ categories, newCat, onNewCat, onAdd, onDelete, loadingAdd = false, loadingDelete = false }: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between px-4 py-4 md:px-6">
        <CardTitle className="text-lg font-semibold leading-none tracking-tight">Kategori</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-3 flex gap-2">
          <Input value={newCat} disabled={loadingAdd || loadingDelete} onChange={(e) => onNewCat(e.target.value)} placeholder="Kategori baru" />
          <Button onClick={onAdd} disabled={loadingAdd || loadingDelete}>{loadingAdd ? 'Menambah...' : 'Tambah'}</Button>
        </div>
        {categories.map((c) => (
          <div key={c} className="flex justify-between py-2">
            <span>{c}</span>
            <Button variant="destructive" size="sm" onClick={() => onDelete(c)} disabled={loadingAdd || loadingDelete}>
              {loadingDelete ? 'Menghapus...' : 'Hapus'}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
