import { useEffect, useId, useState } from 'react';
import { searchShippingDestinations, type ShippingDestination } from '../services/api/shipping';

type Props = {
  value: string;
  selected: boolean;
  onChange: (value: string) => void;
  onSelect: (destination: ShippingDestination) => void;
};

export default function ShippingDestinationSearch({ value, selected, onChange, onSelect }: Props) {
  const id = useId();
  const [page, setPage] = useState(0);
  const [retry, setRetry] = useState(0);
  const [result, setResult] = useState<{ key: string; options: ShippingDestination[]; error: string } | null>(null);
  const query = value.trim();
  const key = JSON.stringify([query, page, retry]);
  const enabled = !selected && query.length >= 3;
  const current = result?.key === key ? result : null;

  useEffect(() => {
    if (!enabled) return;
    let active = true;
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      searchShippingDestinations(query, page * 10, controller.signal).then(options => {
        if (active) setResult({ key, options, error: '' });
      }).catch((error: unknown) => {
        if (active && !controller.signal.aborted) setResult({ key, options: [], error: error instanceof Error ? error.message : 'Gagal mencari wilayah.' });
      });
    }, 300);
    return () => { active = false; controller.abort(); window.clearTimeout(timer); };
  }, [query, page, key, enabled]);

  return <div>
    <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-[#304337]">Cari wilayah pengiriman</label>
    <input id={id} value={value} autoComplete="off" placeholder="Kelurahan, kecamatan, kota, atau kode pos"
      aria-describedby={`${id}-help`} className="min-h-11 w-full rounded-xl border border-[#ceddd1] bg-white px-3 text-sm !text-[#25382b]"
      onChange={event => { setPage(0); setResult(null); onChange(event.target.value); }} />
    <p id={`${id}-help`} className="mt-2 text-xs !text-[#68736b]">Cari nama kelurahan/desa atau kode pos, lalu pilih wilayah yang sesuai. Isi jalan dan nomor rumah pada Detail Alamat.</p>
    {enabled && <div className="mt-2 rounded-xl border border-[#d9e6dc] bg-white p-2">
      {!current && <p role="status" className="text-xs">Mencari wilayah...</p>}
      {current?.error && <div role="alert" className="text-xs text-red-700">{current.error} <button type="button" onClick={() => setRetry(n => n + 1)}>Coba lagi</button></div>}
      {current && !current.error && <>
        <div className="max-h-56 overflow-y-auto">
          {current.options.map(location => <button key={location.id} type="button" onClick={() => onSelect(location)}
            className="block w-full rounded-lg px-3 py-2.5 text-left text-xs !text-[#31483a] hover:bg-[#edf6ef]">
            <strong className="block">{location.subdistrict_name || location.label}</strong>
            <span>{[location.district_name, location.city_name, location.province_name, location.zip_code].filter(Boolean).join(', ')}</span>
          </button>)}
        </div>
        {!current.options.length && <p role="status" className="text-xs">Wilayah tidak ditemukan. Coba nama kelurahan/desa atau kode pos yang lebih spesifik.</p>}
        <div className="mt-2 flex justify-between gap-3 text-xs font-bold">
          {page > 0 && <button type="button" onClick={() => setPage(n => n - 1)}>Hasil sebelumnya</button>}
          {current.options.length === 10 && <button type="button" onClick={() => setPage(n => n + 1)}>Hasil berikutnya</button>}
        </div>
      </>}
    </div>}
    {selected && <p role="status" className="mt-2 text-xs font-semibold text-[#14552e]">Wilayah dipilih: {value}</p>}
  </div>;
}
