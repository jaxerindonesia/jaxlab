import { Button } from '../../../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../components/ui/card';
import { Input } from '../../../../../components/ui/input';
import { ChevronDown, Plus, Trash2 } from 'lucide-react';
import type { ProductDto } from '../../../../../services/service-api';

type Props = {
  editing: ProductDto | null;
  form: Omit<ProductDto, 'id'>;
  categories: string[];
  badges: string[];
  newCat: string;
  newBadge: string;
  onNewCat: (v: string) => void;
  onNewBadge: (v: string) => void;
  onAddCategory: () => void;
  onAddBadge: () => void;
  onDeleteCategory: (name: string) => void;
  onDeleteBadge: (name: string) => void;
  setField: <K extends keyof Omit<ProductDto, 'id'>>(key: K, value: Omit<ProductDto, 'id'>[K]) => void;
  onSave: () => void;
  onCancel: () => void;
  loading?: boolean;
};

export function ProductForm({ editing, form, categories, badges, newCat, newBadge, onNewCat, onNewBadge, onAddCategory, onAddBadge, onDeleteCategory, onDeleteBadge, setField, onSave, onCancel, loading = false }: Props) {
  const labelClass = 'block text-sm font-medium text-slate-200';
  const textareaClass = 'min-h-[110px] w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:cursor-not-allowed disabled:opacity-60 text-sm';
  const imageCardClass = 'relative aspect-square overflow-hidden rounded-xl border border-slate-700/80 bg-slate-900/60';

  const handleUploadImages = (files: FileList | null) => {
    if (!files?.length) return;
    const readers = Array.from(files).map(
      (file) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result ?? ''));
          reader.readAsDataURL(file);
        })
    );

    Promise.all(readers).then((uploaded) => {
      const valid = uploaded.filter(Boolean);
      if (!valid.length) return;
      const existing = form.images.filter((img) => img.trim() !== '');
      setField('images', [...existing, ...valid]);
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between px-4 py-4 md:px-6">
        <CardTitle className="text-lg font-semibold leading-none tracking-tight">{editing ? `Edit: ${editing.name}` : 'Tambah Produk'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="space-y-2"><label className={labelClass}>Nama Produk *</label><Input className="text-sm" disabled={loading} value={form.name} onChange={(e) => setField('name', e.target.value)} /></div>
          <div className="space-y-2">
            <label className={labelClass}>Kategori</label>
            <details className="group rounded-2xl border border-slate-700/70 bg-slate-900/40 p-3">
              <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl border border-slate-700/80 bg-slate-900/60 px-3 py-2.5 text-sm font-medium text-slate-200">
                {form.category || 'Pilih kategori'}
                <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                <div className="flex gap-2">
                  <Input
                    className="text-sm"
                    disabled={loading}
                    value={newCat}
                    onChange={(e) => onNewCat(e.target.value)}
                    placeholder="Tambah kategori baru"
                  />
                  <Button type="button" variant="secondary" disabled={loading} onClick={onAddCategory} aria-label="Tambah kategori">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="max-h-40 space-y-2 overflow-y-auto pr-1">
                  {categories.map((c) => (
                    <div
                      key={c}
                      className={`flex items-center justify-between rounded-xl border px-3 py-2 text-sm ${form.category === c
                          ? 'border-indigo-400/70 bg-indigo-500/20'
                          : 'border-slate-700/80 bg-slate-900/60'
                        }`}
                    >
                      <button
                        type="button"
                        className="min-w-0 flex-1 truncate text-left text-slate-200"
                        onClick={() => setField('category', c)}
                        disabled={loading}
                      >
                        {c}
                      </button>
                      <button
                        type="button"
                        className="ml-3 rounded-md p-1 text-rose-300 hover:bg-rose-500/20"
                        aria-label={`Hapus kategori ${c}`}
                        onClick={() => {
                          if (form.category === c) setField('category', '');
                          onDeleteCategory(c);
                        }}
                        disabled={loading}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </details>
          </div>
        </div>
        <div className="space-y-2"><label className={labelClass}>Subtitle</label><Input className="text-sm" disabled={loading} value={form.subtitle} onChange={(e) => setField('subtitle', e.target.value)} /></div>
        <div className="space-y-2"><label className={labelClass}>Deskripsi Singkat</label><textarea className={textareaClass} disabled={loading} rows={3} value={form.description} onChange={(e) => setField('description', e.target.value)} /></div>
        <div className="space-y-2"><label className={labelClass}>Deskripsi Lengkap</label><textarea className={textareaClass} disabled={loading} rows={4} value={form.longDescription} onChange={(e) => setField('longDescription', e.target.value)} /></div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="space-y-2"><label className={labelClass}>Harga (Rp) *</label><Input className="text-sm" disabled={loading} type="number" value={form.price} onChange={(e) => setField('price', Number(e.target.value))} /></div>
          <div className="space-y-2"><label className={labelClass}>Harga Asli (Rp)</label><Input className="text-sm" disabled={loading} type="number" value={form.originalPrice ?? ''} onChange={(e) => setField('originalPrice', e.target.value ? Number(e.target.value) : undefined)} /></div>
        </div>
        <div className="space-y-2">
          <div className="space-y-2">
            <label className={labelClass}>Badge</label>
            <details className="group rounded-2xl border border-slate-700/70 bg-slate-900/40 p-3">
              <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl border border-slate-700/80 bg-slate-900/60 px-3 py-2.5 text-sm font-medium text-slate-200">
                {form.badge || 'Pilih badge'}
                <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                <div className="flex gap-2">
                  <Input
                    className="text-sm"
                    disabled={loading}
                    value={newBadge}
                    onChange={(e) => onNewBadge(e.target.value)}
                    placeholder="Tambah badge baru"
                  />
                  <Button type="button" variant="secondary" disabled={loading} onClick={onAddBadge} aria-label="Tambah badge">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <button
                  type="button"
                  className={`w-full rounded-xl border px-3 py-2 text-left text-sm ${!form.badge ? 'border-indigo-400/70 bg-indigo-500/20 text-slate-100' : 'border-slate-700/80 bg-slate-900/60 text-slate-200'
                    }`}
                  onClick={() => setField('badge', undefined)}
                  disabled={loading}
                >
                  Tidak ada
                </button>
                <div className="max-h-40 space-y-2 overflow-y-auto pr-1">
                  {badges.map((b) => (
                    <div
                      key={b}
                      className={`flex items-center justify-between rounded-xl border px-3 py-2 text-sm ${form.badge === b
                          ? 'border-indigo-400/70 bg-indigo-500/20'
                          : 'border-slate-700/80 bg-slate-900/60'
                        }`}
                    >
                      <button
                        type="button"
                        className="min-w-0 flex-1 truncate text-left text-slate-200"
                        onClick={() => setField('badge', b)}
                        disabled={loading}
                      >
                        {b}
                      </button>
                      <button
                        type="button"
                        className="ml-3 rounded-md p-1 text-rose-300 hover:bg-rose-500/20"
                        aria-label={`Hapus badge ${b}`}
                        onClick={() => {
                          if (form.badge === b) setField('badge', undefined);
                          onDeleteBadge(b);
                        }}
                        disabled={loading}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </details>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="space-y-2"><label className={labelClass}>Rating (0–5)</label><Input disabled={loading} type="number" min={0} max={5} step={0.1} value={form.rating} onChange={(e) => setField('rating', Number(e.target.value))} /></div>
          <div className="space-y-2"><label className={labelClass}>Jumlah Ulasan</label><Input disabled={loading} type="number" min={0} value={form.reviewCount} onChange={(e) => setField('reviewCount', Number(e.target.value))} /></div>
        </div>
        <div className="space-y-3">
          <label className={labelClass}>Gambar (Upload File)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            disabled={loading}
            className="block w-full cursor-pointer rounded-xl border border-dashed border-slate-600 bg-slate-900/40 px-4 py-3 text-sm text-slate-300 file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-500/20 file:px-3 file:py-1.5 file:text-indigo-200 hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-60"
            onChange={(e) => {
              handleUploadImages(e.target.files);
              e.currentTarget.value = '';
            }}
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
            {form.images.filter((img) => img.trim() !== '').map((img, i) => (
              <div key={`${img}-${i}`} className={imageCardClass}>
                <img src={img} alt={`Preview ${i + 1}`} className="h-full w-full object-cover" />
                <button
                  type="button"
                  disabled={loading}
                  className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-lg border border-rose-300/50 bg-rose-500/10 text-lg leading-none text-rose-300 transition hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={() => {
                    const next = form.images.filter((_, idx) => idx !== i);
                    setField('images', next.length ? next : ['']);
                  }}
                  aria-label={`Hapus gambar ${i + 1}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <label className={labelClass}>Spesifikasi</label>
          {form.specs.map((s, i) => (
            <div key={i} className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_1fr_160px]">
              <Input className="text-sm" disabled={loading} value={s.label} placeholder="Label" onChange={(e) => {
                const next = form.specs.map((it, idx) => idx === i ? { ...it, label: e.target.value } : it);
                setField('specs', next);
              }} />
              <Input className="text-sm" disabled={loading} value={s.value} placeholder="Nilai" onChange={(e) => {
                const next = form.specs.map((it, idx) => idx === i ? { ...it, value: e.target.value } : it);
                setField('specs', next);
              }} />
              <Button variant="outline" disabled={loading} onClick={() => {
                const next = form.specs.filter((_, idx) => idx !== i);
                setField('specs', next.length ? next : [{ label: '', value: '' }]);
              }}>Hapus</Button>
            </div>
          ))}
          <Button className="w-full border border-emerald-500/30 bg-emerald-900/20 text-emerald-300 hover:bg-emerald-800/30" variant="secondary" disabled={loading} onClick={() => setField('specs', [...form.specs, { label: '', value: '' }])}>+ Tambah Spesifikasi</Button>
        </div>
        <div className="space-y-2">
          <label className={labelClass}>Manfaat</label>
          {form.benefits.map((b, i) => (
            <div key={i} className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_160px]">
              <Input className="text-sm" disabled={loading} value={b} onChange={(e) => {
                const next = [...form.benefits];
                next[i] = e.target.value;
                setField('benefits', next);
              }} />
              <Button variant="outline" disabled={loading} onClick={() => {
                const next = form.benefits.filter((_, idx) => idx !== i);
                setField('benefits', next.length ? next : ['']);
              }}>Hapus</Button>
            </div>
          ))}
          <Button className="w-full border border-emerald-500/30 bg-emerald-900/20 text-emerald-300 hover:bg-emerald-800/30" variant="secondary" disabled={loading} onClick={() => setField('benefits', [...form.benefits, ''])}>+ Tambah Manfaat</Button>
        </div>
        <div className="space-y-2">
          <label className={labelClass}>Marketplace Links</label>
          {form.marketplaceLinks.map((m, i) => (
            <div key={i} className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_1fr_160px]">
              <Input
                className="text-sm"
                disabled={loading}
                value={m.label}
                placeholder="Label tombol (Tokopedia, Shopee, dll)"
                onChange={(e) => {
                  const next = form.marketplaceLinks.map((it, idx) =>
                    idx === i ? { ...it, label: e.target.value } : it
                  );
                  setField('marketplaceLinks', next);
                }}
              />
              <Input
                className="text-sm"
                disabled={loading}
                value={m.url}
                placeholder="https://..."
                onChange={(e) => {
                  const next = form.marketplaceLinks.map((it, idx) =>
                    idx === i ? { ...it, url: e.target.value } : it
                  );
                  setField('marketplaceLinks', next);
                }}
              />
              <Button variant="outline"
                disabled={loading}
                onClick={() => {
                  const next = form.marketplaceLinks.filter((_, idx) => idx !== i);
                  setField('marketplaceLinks', next);
                }}
              >
                Hapus
              </Button>
            </div>
          ))}
          <Button className="w-full"
            variant="secondary"
            disabled={loading}
            onClick={() =>
              setField('marketplaceLinks', [...form.marketplaceLinks, { label: '', url: '' }])
            }
          >
            + Tambah Link Marketplace
          </Button>
        </div>
        <div className="flex gap-2">
          <Button onClick={onSave} disabled={loading}>{loading ? 'Menyimpan...' : 'Simpan'}</Button>
          <Button variant="outline" onClick={onCancel} disabled={loading}>Batal</Button>
        </div>
      </CardContent>
    </Card>
  );
}
