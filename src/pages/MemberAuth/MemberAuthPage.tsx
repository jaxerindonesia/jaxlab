import { useEffect, useState } from "react";
import { Eye, EyeOff, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { TagPill } from "../../components/ui/site";
import { setMember } from "../../services/auth";
import { toast } from "sonner";
import { claimGuestCart } from '../../services/cart';
import {
  loginMember,
  registerMember,
  searchShippingDestinations,
  type ShippingDestination,
} from "../../services/service-api";

export default function MemberAuthPage() {
  const nav = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phoneWa: "",
    password: "",
    isAffiliate: false,
    affiliatePhotos: [] as string[],
    shippingDestinationId: 0,
    shippingDestination: "",
    province: "",
    city: "",
    postalCode: "",
    referredByCode:
      new URLSearchParams(window.location.search).get("ref")?.toUpperCase() ??
      "",
  });
  const [locationQuery, setLocationQuery] = useState("");
  const [locationOptions, setLocationOptions] = useState<ShippingDestination[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (
      mode !== "register" ||
      form.shippingDestinationId ||
      locationQuery.trim().length < 3
    ) {
      setLocationOptions([]);
      return;
    }
    const timer = window.setTimeout(() => {
      searchShippingDestinations(locationQuery.trim())
        .then(setLocationOptions)
        .catch(() => setLocationOptions([]));
    }, 350);
    return () => window.clearTimeout(timer);
  }, [locationQuery, form.shippingDestinationId, mode]);

  const selectLocation = (location: ShippingDestination) => {
    setForm((current) => ({
      ...current,
      shippingDestinationId: location.id,
      shippingDestination: location.label,
      province: location.province_name,
      city: location.city_name,
      postalCode: location.zip_code,
    }));
    setLocationQuery(location.label);
    setLocationOptions([]);
  };

  const submit = async () => {
    if (loading || uploading) return;
    if (!form.email.trim() || !form.password) { toast.error("Masukkan email dan password."); return; }
    if (mode === 'register' && form.isAffiliate && !form.affiliatePhotos.length) { toast.error('Unggah minimal satu foto pendukung affiliate.'); return; }
    setLoading(true);
    try {
      const member =
        mode === "login"
          ? await loginMember({ email: form.email, password: form.password })
          : await registerMember(form);
      setMember(member);
      await claimGuestCart();
      toast.success(mode === 'login' ? 'Berhasil masuk.' : 'Akun berhasil didaftarkan.');
      nav("/products");
    } catch (e) {
      const message = (e as Error).message;
      toast.error(
        message === "Failed to fetch"
          ? "Tidak dapat terhubung ke server. Pastikan layanan API sedang berjalan."
          : message || "Gagal memproses permintaan",
      );
    } finally {
      setLoading(false);
    }
  };

  const uploadPhotos = async (files: FileList | null) => {
    if (!files) return;
    const chosen = Array.from(files);
    if (chosen.length + form.affiliatePhotos.length > 5) { toast.error('Maksimal 5 foto pendukung.'); return; }
    if (chosen.some((file) => !['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 2 * 1024 * 1024)) {
      toast.error('Gunakan foto JPG, PNG, atau WebP, maksimal 2 MB per file.'); return;
    }
    setUploading(true);
    try {
      const photos = await Promise.all(chosen.map((file) => new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(new Error('Foto gagal dibaca. Silakan coba lagi.'));
        reader.readAsDataURL(file);
      })));
      setForm((current) => ({ ...current, affiliatePhotos: [...current.affiliatePhotos, ...photos] }));
    } catch (error) { toast.error((error as Error).message); }
    finally { setUploading(false); }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_top_left,rgba(211,233,218,0.6),transparent_32%),linear-gradient(180deg,#f7f3ec_0%,#eee9e2_100%)]">
      <Header />
      <main className="flex flex-1 items-start px-6 pb-16 pt-[7.5rem] max-md:px-4 max-md:pb-10 max-md:pt-[6.5rem]">
        <div className="mx-auto w-full max-w-[820px]">
          <section className="rounded-[24px] border border-white/80 bg-white/95 p-8 shadow-[0_20px_55px_rgba(34,52,40,0.09)] max-md:rounded-2xl max-md:p-5">
            <div>
              <TagPill className="bg-[#e7f3e9] text-[0.8rem] font-bold tracking-[0.03em] !text-[#246038]">
                Membership JaxLab
              </TagPill>
              <h1 className="my-2.5 text-[2rem] font-extrabold !text-[#14552e] max-md:text-2xl">
                {mode === "login" ? "Masuk Untuk Belanja" : "Daftar Membership"}
              </h1>
              <p className="m-0 leading-relaxed !text-[#5f6b62]">
                Daftar sekali dengan wilayah pengiriman yang tepat agar pilihan
                ongkir langsung tersedia saat checkout.
              </p>
            </div>

            <div
              className="mt-5 grid grid-cols-2 gap-2 rounded-2xl bg-[#f6f3ee] p-1.5"
              role="tablist"
              aria-label="Mode Login Register"
            >
              <button
                className={`h-[42px] rounded-xl border-0 font-bold ${mode === "login" ? "bg-[var(--primary-green)] text-white" : "bg-transparent text-[#617066]"}`}
                onClick={() => setMode("login")}
                type="button"
              >
                Login
              </button>
              <button
                className={`h-[42px] rounded-xl border-0 font-bold ${mode === "register" ? "bg-[var(--primary-green)] text-white" : "bg-transparent text-[#617066]"}`}
                onClick={() => setMode("register")}
                type="button"
              >
                Register
              </button>
            </div>

            <div className="mt-5 grid gap-3.5">
              {mode === "register" && (
                <label>
                  <span className="mb-1.5 block text-[0.92rem] font-semibold text-[#304337]">
                    Nama Lengkap
                  </span>
                  <input
                    className="w-full rounded-xl border border-[#d6dfd5] bg-[#fcfdfc] px-3.5 py-3 text-[0.95rem] !text-[#1d2e22] caret-[#14552e] outline-none placeholder:!text-[#9aa49c] focus:border-[var(--secondary-green)] focus:shadow-[0_0_0_3px_rgba(79,121,66,0.15)]"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Nama lengkap"
                  />
                </label>
              )}

              {mode === "register" && (
                <label>
                  <span className="mb-1.5 block text-[0.92rem] font-semibold text-[#304337]">
                    Kode Referral{" "}
                    <span className="font-normal text-[#7b867e]">
                      (opsional)
                    </span>
                  </span>
                  <input
                    className="w-full rounded-xl border border-[#d6dfd5] bg-[#fcfdfc] px-3.5 py-3 uppercase text-[0.95rem] !text-[#1d2e22] outline-none focus:border-[var(--secondary-green)]"
                    value={form.referredByCode}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        referredByCode: event.target.value.toUpperCase(),
                      })
                    }
                    placeholder="Contoh: A1B2C3D4E5"
                  />
                </label>
              )}

              <label>
                <span className="mb-1.5 block text-[0.92rem] font-semibold text-[#304337]">
                  Email
                </span>
                <input
                  className="w-full rounded-xl border border-[#d6dfd5] bg-[#fcfdfc] px-3.5 py-3 text-[0.95rem] !text-[#1d2e22] caret-[#14552e] outline-none placeholder:!text-[#9aa49c] focus:border-[var(--secondary-green)] focus:shadow-[0_0_0_3px_rgba(79,121,66,0.15)]"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="nama@email.com"
                />
              </label>

              {mode === "register" && (
                <div className="rounded-2xl border border-[#dce9df] bg-[#f5faf6] p-4">
                  <label className="relative block">
                    <span className="mb-1.5 flex items-center gap-2 text-[0.92rem] font-semibold text-[#304337]">
                      <MapPin size={17} /> Cari Wilayah Pengiriman
                    </span>
                    <input
                      className="w-full rounded-xl border border-[#d6dfd5] bg-white px-3.5 py-3 text-[0.95rem] !text-[#1d2e22] outline-none focus:border-[var(--secondary-green)]"
                      value={locationQuery}
                      onChange={(event) => {
                        setLocationQuery(event.target.value);
                        setForm({
                          ...form,
                          shippingDestinationId: 0,
                          shippingDestination: "",
                          province: "",
                          city: "",
                          postalCode: "",
                        });
                      }}
                      placeholder="Kelurahan, kecamatan, kota, atau kode pos"
                      autoComplete="off"
                    />
                    {locationOptions.length > 0 && (
                      <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-56 overflow-y-auto rounded-xl border border-[#d9e6dc] bg-white p-1 shadow-xl">
                        {locationOptions.map((location) => (
                          <button
                            key={location.id}
                            type="button"
                            onClick={() => selectLocation(location)}
                            className="block w-full rounded-lg border-0 bg-white px-3 py-2.5 text-left text-xs leading-relaxed !text-[#31483a] hover:bg-[#edf6ef]"
                          >
                            {location.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </label>
                  <div className="mt-3 grid grid-cols-3 gap-2 max-md:grid-cols-1">
                    <input
                      readOnly
                      value={form.province}
                      placeholder="Provinsi"
                      className="rounded-xl border border-[#dce9df] bg-[#eef4ef] px-3 py-2.5 text-sm !text-[#405348]"
                    />
                    <input
                      readOnly
                      value={form.city}
                      placeholder="Kota/Kabupaten"
                      className="rounded-xl border border-[#dce9df] bg-[#eef4ef] px-3 py-2.5 text-sm !text-[#405348]"
                    />
                    <input
                      readOnly
                      value={form.postalCode}
                      placeholder="Kode pos"
                      className="rounded-xl border border-[#dce9df] bg-[#eef4ef] px-3 py-2.5 text-sm !text-[#405348]"
                    />
                  </div>
                  <label className="mt-3 block">
                    <span className="mb-1.5 block text-[0.92rem] font-semibold text-[#304337]">
                      Detail Alamat
                    </span>
                    <textarea
                      className="w-full rounded-xl border border-[#d6dfd5] bg-white px-3.5 py-3 text-[0.95rem] !text-[#1d2e22] outline-none focus:border-[var(--secondary-green)]"
                      value={form.address}
                      onChange={(e) =>
                        setForm({ ...form, address: e.target.value })
                      }
                      placeholder="Nama jalan, nomor rumah, RT/RW, patokan"
                      rows={3}
                    />
                  </label>
                </div>
              )}

              {mode === "register" && (
                <label>
                  <span className="mb-1.5 block text-[0.92rem] font-semibold text-[#304337]">
                    No. WhatsApp
                  </span>
                  <input
                    className="w-full rounded-xl border border-[#d6dfd5] bg-[#fcfdfc] px-3.5 py-3 text-[0.95rem] !text-[#1d2e22] caret-[#14552e] outline-none placeholder:!text-[#9aa49c] focus:border-[var(--secondary-green)] focus:shadow-[0_0_0_3px_rgba(79,121,66,0.15)]"
                    value={form.phoneWa}
                    onChange={(e) =>
                      setForm({ ...form, phoneWa: e.target.value })
                    }
                    placeholder="08xxxxxxxxxx"
                  />
                </label>
              )}

              <label>
                <span className="mb-1.5 block text-[0.92rem] font-semibold text-[#304337]">
                  Password
                </span>
                <div className="relative">
                  <input
                    className="w-full rounded-xl border border-[#d6dfd5] bg-[#fcfdfc] py-3 pl-3.5 pr-12 text-[0.95rem] !text-[#1d2e22] caret-[#14552e] outline-none placeholder:!text-[#9aa49c] focus:border-[var(--secondary-green)] focus:shadow-[0_0_0_3px_rgba(79,121,66,0.15)]"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    placeholder="Minimal 6 karakter"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute inset-y-0 right-0 inline-flex w-12 items-center justify-center border-0 bg-transparent !text-[#617066] hover:!text-[#14552e]"
                    aria-label={
                      showPassword
                        ? "Sembunyikan password"
                        : "Tampilkan password"
                    }
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </label>
            </div>

            {mode === 'register' && (
              <fieldset className="mt-5 rounded-2xl border border-[#dce9df] bg-[#f5faf6] p-4 text-[#304337]" disabled={loading || uploading}>
                <legend className="px-1 font-semibold">Ingin menjadi affiliate?</legend>
                <div className="flex gap-5">
                  <label className="flex items-center gap-2"><input type="radio" name="affiliate" checked={!form.isAffiliate} onChange={() => setForm({ ...form, isAffiliate: false, affiliatePhotos: [] })} /> Tidak</label>
                  <label className="flex items-center gap-2"><input type="radio" name="affiliate" checked={form.isAffiliate} onChange={() => setForm({ ...form, isAffiliate: true })} /> Ya</label>
                </div>
                {form.isAffiliate && <div className="mt-4">
                  <label className="block text-sm font-semibold" htmlFor="affiliate-photos">Foto pendukung affiliate</label>
                  <p id="affiliate-photo-help" className="my-2 text-xs">Unggah 1–5 foto pendukung bebas. JPG, PNG, atau WebP, maksimal 2 MB per foto.</p>
                  <input id="affiliate-photos" aria-describedby="affiliate-photo-help" type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={(event) => { void uploadPhotos(event.target.files); event.target.value = ''; }} className="w-full text-sm" />
                  {uploading && <p role="status" className="text-sm">Membaca foto...</p>}
                  <div className="mt-3 flex flex-wrap gap-3">{form.affiliatePhotos.map((photo, index) => <div key={index} className="rounded-xl border bg-white p-2">
                    <img src={photo} alt={`Foto pendukung ${index + 1}`} className="h-24 w-24 rounded-lg object-cover" />
                    <button type="button" className="mt-2 w-full text-xs text-red-700" onClick={() => setForm((current) => ({ ...current, affiliatePhotos: current.affiliatePhotos.filter((_, i) => i !== index) }))} aria-label={`Hapus foto pendukung ${index + 1}`}>Hapus</button>
                  </div>)}</div>
                </div>}
              </fieldset>
            )}

            <button
              className="mt-5 h-12 w-full rounded-xl border-0 bg-[var(--primary-green)] text-[0.98rem] font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
              onClick={submit}
              disabled={loading || uploading}
              type="button"
            >
              {loading
                ? "Memproses..."
                : mode === "login"
                  ? "Masuk Sekarang"
                  : "Daftar Sekarang"}
            </button>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
