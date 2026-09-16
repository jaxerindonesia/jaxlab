import { useState, type FormEvent } from 'react';
import ShippingDestinationSearch from '../../components/ShippingDestinationSearch';
import { updateProfile, type ProfileInput } from '../../services/api/members';
import type { MemberDto } from '../../services/models/MemberDto';

const inputClass = 'mt-1 w-full rounded-xl border border-[#ceddd1] bg-white px-3 py-3 text-sm !text-[#25382b]';

export default function ProfileEditor({ member, onSaved, onCancel }: {
  member: MemberDto; onSaved: (member: MemberDto, pendingEmail: string | null) => void; onCancel: () => void;
}) {
  const [form, setForm] = useState<ProfileInput>({ name: member.name, email: member.email, phoneWa: member.phoneWa, address: member.address,
    shippingDestinationId: member.shippingDestinationId, shippingDestination: member.shippingDestination,
    province: member.province, city: member.city, postalCode: member.postalCode, currentPassword: '' });
  const [query, setQuery] = useState(member.shippingDestination ?? '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const emailChanged = form.email.trim().toLowerCase() !== member.email;
  const save = async (event: FormEvent) => {
    event.preventDefault();
    if (saving) return;
    if (!form.shippingDestinationId) { setError('Pilih wilayah pengiriman dari hasil pencarian.'); return; }
    setSaving(true); setError('');
    try {
      const result = await updateProfile(form);
      onSaved(result.member, result.pendingEmail);
    } catch (error) { setError(error instanceof Error ? error.message : 'Profil gagal disimpan.'); }
    finally { setSaving(false); }
  };
  return <form onSubmit={save} className="mt-5 rounded-2xl border border-[#dce9df] bg-[#f5faf6] p-5">
    <h2 className="mb-4 text-xl font-bold !text-[#193421]">Edit Profil</h2>
    <fieldset disabled={saving} className="space-y-4">
      <label className="block text-sm font-semibold">Nama lengkap<input className={inputClass} value={form.name} required maxLength={150} onChange={e => setForm({ ...form, name: e.target.value })} /></label>
      <label className="block text-sm font-semibold">Email<input className={inputClass} type="email" value={form.email} required maxLength={254} onChange={e => setForm({ ...form, email: e.target.value })} /></label>
      {emailChanged && <div className="rounded-xl bg-white p-3">
        <p className="mb-3 text-sm">Tautan verifikasi akan dikirim ke email baru. Email login berubah setelah tautan tersebut dikonfirmasi.</p>
        <label className="block text-sm font-semibold">Password saat ini<input className={inputClass} type="password" autoComplete="current-password" required maxLength={128} value={form.currentPassword} onChange={e => setForm({ ...form, currentPassword: e.target.value })} /></label>
      </div>}
      <label className="block text-sm font-semibold">WhatsApp<input className={inputClass} type="tel" required maxLength={25} value={form.phoneWa} onChange={e => setForm({ ...form, phoneWa: e.target.value })} /></label>
      <ShippingDestinationSearch value={query} selected={Boolean(form.shippingDestinationId)}
        onChange={value => { setQuery(value); setForm({ ...form, shippingDestinationId: null, shippingDestination: '', province: '', city: '', postalCode: '' }); }}
        onSelect={location => { setQuery(location.label); setForm({ ...form, shippingDestinationId: location.id, shippingDestination: location.label, province: location.province_name, city: location.city_name, postalCode: location.zip_code }); }} />
      <label className="block text-sm font-semibold">Detail Alamat<textarea aria-label="Detail Alamat" className={inputClass} rows={3} required maxLength={1500} value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} /></label>
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      <div className="flex gap-3">
        <button type="submit" className="rounded-xl bg-[#14552e] px-5 py-3 font-bold text-white">{saving ? 'Menyimpan...' : 'Simpan Perubahan'}</button>
        <button type="button" onClick={onCancel} className="rounded-xl border border-[#ceddd1] px-5 py-3 font-bold">Batal</button>
      </div>
    </fieldset>
  </form>;
}
