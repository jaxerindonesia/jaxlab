import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  LogIn,
  MapPin,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
  UserRound,
} from "lucide-react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { getMember } from "../../services/auth";
import { clearCart, getCart, setCart } from "../../services/cart";
import {
  checkoutOrder,
  formatRupiah,
  getAllProducts,
  getShippingCosts,
  searchShippingDestinations,
  type ProductDto,
  type ShippingDestination,
  type ShippingOption,
} from "../../services/service-api";
import { savePaymentSession } from "../../services/payment-session";

declare global {
  interface Window {
    snap?: {
      pay: (
        token: string,
        opts?: {
          onSuccess?: () => void;
          onPending?: () => void;
          onError?: () => void;
        },
      ) => void;
    };
  }
}

type CartRow = { productId: string; qty: number; product: ProductDto };

export default function CartPage() {
  const nav = useNavigate();
  const member = getMember();
  const [cart, setCartState] = useState(getCart());
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [destinationQuery, setDestinationQuery] = useState(
    member?.shippingDestination ?? "",
  );
  const [destinations, setDestinations] = useState<ShippingDestination[]>([]);
  const [selectedDestination, setSelectedDestination] =
    useState<ShippingDestination | null>(() =>
      member?.shippingDestinationId && member.shippingDestination
        ? {
            id: member.shippingDestinationId,
            label: member.shippingDestination,
            province_name: member.province ?? "",
            city_name: member.city ?? "",
            district_name: "",
            subdistrict_name: "",
            zip_code: member.postalCode ?? "",
          }
        : null,
    );
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedShipping, setSelectedShipping] =
    useState<ShippingOption | null>(null);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const totalCartQuantity = cart.reduce((sum, item) => sum + item.qty, 0);

  useEffect(() => {
    getAllProducts()
      .then(setProducts)
      .catch(() => setProducts([]));
  }, []);

  useEffect(() => {
    if (selectedDestination || destinationQuery.trim().length < 3) {
      setDestinations([]);
      return;
    }
    const timer = window.setTimeout(() => {
      searchShippingDestinations(destinationQuery.trim())
        .then(setDestinations)
        .catch(() => setDestinations([]));
    }, 350);
    return () => window.clearTimeout(timer);
  }, [destinationQuery, selectedDestination]);

  const rows = useMemo<CartRow[]>(
    () =>
      cart
        .map((c) => {
          const product = products.find((p) => p.id === c.productId);
          return product ? { ...c, product } : null;
        })
        .filter((r): r is CartRow => r !== null),
    [cart, products],
  );

  const subtotal = rows.reduce((sum, r) => sum + r.product.price * r.qty, 0);
  const ppn = Math.round(subtotal * 0.11);
  const shippingAmount = selectedShipping?.cost ?? 0;
  const total = subtotal + ppn + shippingAmount;

  const chooseDestination = async (destination: ShippingDestination) => {
    setSelectedDestination(destination);
    setDestinationQuery(destination.label);
    setDestinations([]);
    setSelectedShipping(null);
    setLoadingShipping(true);
    try {
      const options = await getShippingCosts(
        destination.id,
        cart.reduce((sum, item) => sum + item.qty, 0),
      );
      setShippingOptions(options);
    } catch (error) {
      setShippingOptions([]);
      alert((error as Error).message || "Gagal mengambil ongkir");
    } finally {
      setLoadingShipping(false);
    }
  };

  useEffect(() => {
    if (!member?.shippingDestinationId || !member.shippingDestination) return;
    const destination: ShippingDestination = {
      id: member.shippingDestinationId,
      label: member.shippingDestination,
      province_name: member.province ?? "",
      city_name: member.city ?? "",
      district_name: "",
      subdistrict_name: "",
      zip_code: member.postalCode ?? "",
    };
    void chooseDestination(destination);
    // Muat tarif langsung dari profil dan perbarui ketika jumlah barang berubah.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member?.shippingDestinationId, totalCartQuantity]);

  const updateQty = (productId: string, qty: number) => {
    const next = cart.map((i) =>
      i.productId === productId ? { ...i, qty: Math.max(1, qty) } : i,
    );
    setCart(next);
    setCartState(next);
  };

  const removeItem = (productId: string) => {
    const next = cart.filter((i) => i.productId !== productId);
    setCart(next);
    setCartState(next);
  };

  const checkout = async () => {
    if (!member || !cart.length || !selectedDestination || !selectedShipping)
      return;
    setLoadingCheckout(true);
    try {
      const res = await checkoutOrder(member.id, {
        items: cart,
        shipping: {
          destinationId: selectedDestination.id,
          destinationLabel: selectedDestination.label,
          courierCode: selectedShipping.code,
          service: selectedShipping.service,
        },
      });
      savePaymentSession(res);
      clearCart();
      setCartState([]);
      if (!window.snap) {
        if (res.redirectUrl) {
          window.location.href = res.redirectUrl;
          return;
        }
        alert("Snap Midtrans belum dimuat. Silakan hubungi admin.");
        return;
      }
      window.snap.pay(res.snapToken, {
        onSuccess: () => {
          alert("Pembayaran berhasil. Pesanan akan segera diproses.");
        },
      });
    } catch (e) {
      alert((e as Error).message || "Gagal checkout");
    } finally {
      setLoadingCheckout(false);
    }
  };

  if (!member) {
    return (
      <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_top_left,rgba(211,233,218,0.65),transparent_32%),linear-gradient(180deg,#f7f3ec_0%,#eee9e2_100%)]">
        <Header />
        <main className="flex flex-1 items-center px-6 pb-16 pt-[7.5rem] max-[640px]:px-4 max-[640px]:pt-[6.5rem]">
          <div className="mx-auto w-full max-w-[680px]">
            <section className="rounded-[28px] border border-white/80 bg-white/95 px-8 py-12 text-center shadow-[0_24px_65px_rgba(34,52,40,0.11)] max-[640px]:px-5 max-[640px]:py-9">
              <span className="mx-auto mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#e7f3e9] !text-[#14552e]">
                <ShoppingBag size={29} />
              </span>
              <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.12em] !text-[#4d7959]">
                Keranjang JaxLab
              </p>
              <h1 className="mb-3 mt-0 text-[clamp(1.7rem,4vw,2.25rem)] font-black !text-[#193421]">
                Masuk untuk Melanjutkan
              </h1>
              <p className="mx-auto mb-7 max-w-[48ch] leading-relaxed !text-[#647068]">
                Produk di keranjangmu tetap tersimpan. Masuk atau daftar sebagai
                member untuk melanjutkan ke pembayaran.
              </p>
              <div className="mx-auto flex max-w-[430px] gap-3 max-[520px]:flex-col">
                <button
                  className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-xl border-0 bg-[#14552e] px-6 font-extrabold text-white shadow-[0_12px_26px_rgba(20,85,46,0.2)] transition hover:-translate-y-0.5 hover:bg-[#0f4625]"
                  onClick={() => nav("/member/auth")}
                >
                  <LogIn size={18} /> Masuk / Daftar
                </button>
                <button
                  className="min-h-[52px] flex-1 rounded-xl border border-[#ceddd1] bg-white px-6 font-bold !text-[#295238] transition hover:bg-[#f4f8f5]"
                  onClick={() => nav("/products")}
                >
                  Lanjut Belanja
                </button>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_top_left,rgba(211,233,218,0.65),transparent_32%),linear-gradient(180deg,#f7f3ec_0%,#eee9e2_100%)]">
      <Header />
      <main className="flex-1 px-6 pb-16 pt-[7.5rem] max-[640px]:px-4 max-[640px]:pb-10 max-[640px]:pt-[6.5rem]">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-7 flex items-end justify-between gap-4 max-[640px]:items-start max-[640px]:flex-col">
            <div>
              <span className="mb-2 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] !text-[#3f7651]">
                Checkout JaxLab
              </span>
              <h1 className="m-0 text-[clamp(1.8rem,3vw,2.6rem)] font-black leading-tight !text-[#15251a]">
                Keranjang Belanja
              </h1>
              <p className="mb-0 mt-2 !text-[#68736b]">
                Periksa kembali produk sebelum melanjutkan pembayaran.
              </p>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 border-0 bg-transparent p-0 text-sm font-bold !text-[#14552e] hover:underline"
              onClick={() => nav("/products")}
            >
              <ArrowLeft size={17} /> Lanjut belanja
            </button>
          </div>

          <section className="grid grid-cols-[minmax(0,1.55fr)_minmax(340px,0.85fr)] items-start gap-6 max-[980px]:grid-cols-1">
            <div className="overflow-hidden rounded-[24px] border border-white/80 bg-white/95 shadow-[0_20px_55px_rgba(34,52,40,0.09)]">
              <div className="flex items-center justify-between border-b border-[#e8eee9] px-6 py-5 max-[640px]:px-4">
                <h2 className="m-0 text-xl font-extrabold !text-[#193421]">
                  Produk Pilihan
                </h2>
                <span className="rounded-full bg-[#edf6ef] px-3 py-1 text-xs font-bold !text-[#28613a]">
                  {rows.length} produk
                </span>
              </div>
              {rows.length === 0 ? (
                <div className="px-6 py-16 text-center">
                  <p className="mb-4 !text-[#657068]">
                    Keranjang masih kosong.
                  </p>
                  <button
                    className="min-h-12 rounded-xl border-0 bg-[#14552e] px-8 font-bold text-white"
                    onClick={() => nav("/products")}
                  >
                    Lihat Produk
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-[#edf0ed] px-6 max-[640px]:px-4">
                  {rows.map((row) => (
                    <article
                      key={row.productId}
                      className="grid grid-cols-[96px_minmax(0,1fr)_auto] items-center gap-5 py-6 max-[640px]:grid-cols-[78px_minmax(0,1fr)] max-[640px]:gap-4"
                    >
                      <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl bg-[#f3f4f0] p-2 max-[640px]:h-[78px] max-[640px]:w-[78px]">
                        <img
                          src={row.product.images?.[0]}
                          alt={row.product.name}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="min-w-0 self-stretch py-1">
                        <p className="mb-1 text-xs font-extrabold uppercase tracking-[0.08em] !text-[#4f805e]">
                          {row.product.category}
                        </p>
                        <h3 className="m-0 line-clamp-2 text-base font-bold leading-snug !text-[#203126]">
                          {row.product.name}
                        </h3>
                        <p className="mb-0 mt-2 text-sm font-semibold !text-[#607066]">
                          {formatRupiah(row.product.price)} / item
                        </p>
                      </div>
                      <div className="flex min-w-[180px] flex-col items-end gap-3 max-[640px]:col-span-2 max-[640px]:min-w-0 max-[640px]:flex-row max-[640px]:items-center max-[640px]:justify-between">
                        <strong className="text-lg !text-[#193421]">
                          {formatRupiah(row.product.price * row.qty)}
                        </strong>
                        <div className="flex items-center gap-2">
                          <div className="inline-flex h-10 items-center rounded-xl border border-[#d9e6dc] bg-[#f8fbf8] p-1">
                            <button
                              type="button"
                              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border-0 bg-white !text-[#14552e] shadow-sm"
                              onClick={() =>
                                updateQty(row.productId, row.qty - 1)
                              }
                              aria-label="Kurangi jumlah"
                            >
                              <Minus size={15} />
                            </button>
                            <span className="min-w-9 text-center text-sm font-extrabold !text-[#213528]">
                              {row.qty}
                            </span>
                            <button
                              type="button"
                              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border-0 bg-[#14552e] !text-white"
                              onClick={() =>
                                updateQty(row.productId, row.qty + 1)
                              }
                              aria-label="Tambah jumlah"
                            >
                              <Plus size={15} />
                            </button>
                          </div>
                          <button
                            type="button"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#f0d1ce] bg-[#fff8f7] !text-[#c33b31] transition hover:bg-[#fff0ee]"
                            onClick={() => removeItem(row.productId)}
                            aria-label={`Hapus ${row.product.name}`}
                            title="Hapus"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            <aside className="sticky top-[6.3rem] rounded-[24px] border border-white/80 bg-white/95 p-6 shadow-[0_20px_55px_rgba(34,52,40,0.09)] max-[980px]:static max-[640px]:p-5">
              <h2 className="mb-5 mt-0 text-xl font-extrabold !text-[#193421]">
                Ringkasan Pembayaran
              </h2>
              <div className="mb-5 rounded-2xl border border-[#dce9df] bg-[#f5faf6] p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-bold !text-[#25432f]">
                  <MapPin size={17} /> Tujuan pengiriman
                </div>
                {member.shippingDestinationId ? (
                  <div className="rounded-xl border border-[#d5e3d8] bg-white px-3 py-3 text-xs leading-relaxed !text-[#405348]">
                    <strong className="block !text-[#25432f]">
                      {member.city}, {member.province} · {member.postalCode}
                    </strong>
                    <span>{member.shippingDestination}</span>
                  </div>
                ) : (
                  <div className="relative">
                    <input
                      id="shipping-destination"
                      value={destinationQuery}
                      onChange={(event) => {
                        setDestinationQuery(event.target.value);
                        setSelectedDestination(null);
                        setSelectedShipping(null);
                        setShippingOptions([]);
                      }}
                      placeholder="Cari kelurahan atau kode pos"
                      autoComplete="off"
                      className="min-h-11 w-full rounded-xl border border-[#ceddd1] bg-white px-3 text-sm !text-[#25382b] outline-none focus:border-[#14552e]"
                    />
                    {destinations.length > 0 && (
                      <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 max-h-56 overflow-y-auto rounded-xl border border-[#d9e6dc] bg-white p-1 shadow-xl">
                        {destinations.map((destination) => (
                          <button
                            key={destination.id}
                            type="button"
                            onClick={() => void chooseDestination(destination)}
                            className="block w-full rounded-lg border-0 bg-white px-3 py-2.5 text-left text-xs leading-relaxed !text-[#31483a] hover:bg-[#edf6ef]"
                          >
                            {destination.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {loadingShipping && (
                  <p className="mb-0 mt-3 text-xs !text-[#68736b]">
                    Mengambil pilihan kurir...
                  </p>
                )}
                {shippingOptions.length > 0 && (
                  <div className="mt-4 flex snap-x gap-3 overflow-x-auto pb-2 [scrollbar-width:thin]">
                    {shippingOptions.slice(0, 12).map((option) => {
                      const selected =
                        selectedShipping?.code === option.code &&
                        selectedShipping?.service === option.service;
                      return (
                        <button
                          key={`${option.code}-${option.service}`}
                          type="button"
                          onClick={() => setSelectedShipping(option)}
                          className={`flex min-w-[190px] flex-[0_0_190px] snap-start flex-col items-start rounded-xl border px-3 py-3 text-left transition ${selected ? "border-[#14552e] bg-[#dff0e3] ring-2 ring-[#14552e]/10" : "border-[#dce9df] bg-white hover:border-[#9bbca4]"}`}
                        >
                          <strong className="line-clamp-1 text-xs uppercase !text-[#25432f]">
                            {option.code} · {option.service}
                          </strong>
                          <span className="mt-1 text-[11px] !text-[#68736b]">
                            Estimasi {option.etd || "-"}
                          </span>
                          <strong className="mt-2 text-sm !text-[#14552e]">
                            {formatRupiah(option.cost)}
                          </strong>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="space-y-3 text-sm !text-[#536258]">
                <div className="flex justify-between gap-4">
                  <span>Subtotal Produk</span>
                  <strong className="!text-[#31483a]">
                    {formatRupiah(subtotal)}
                  </strong>
                </div>
                <div className="flex justify-between gap-4">
                  <span>PPN 11%</span>
                  <strong className="!text-[#31483a]">
                    {formatRupiah(ppn)}
                  </strong>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="inline-flex items-center gap-1.5">
                    <Truck size={15} /> Ongkos Kirim
                  </span>
                  <strong className="!text-[#31483a]">
                    {selectedShipping ? formatRupiah(shippingAmount) : "-"}
                  </strong>
                </div>
              </div>
              <div className="my-5 flex items-center justify-between gap-4 border-y border-dashed border-[#cddbcf] py-4">
                <span className="font-bold !text-[#26372b]">
                  Total Pembayaran
                </span>
                <strong className="text-xl !text-[#14552e]">
                  {formatRupiah(total)}
                </strong>
              </div>

              <div className="rounded-2xl border border-[#dce9df] bg-[#f5faf6] p-4">
                <div className="mb-3 flex items-center gap-2 font-bold !text-[#25432f]">
                  <UserRound size={17} /> Dikirim kepada
                </div>
                <div className="space-y-1 text-sm leading-relaxed !text-[#59685e]">
                  <p className="m-0 font-bold !text-[#25382b]">{member.name}</p>
                  <p className="m-0 break-all">{member.email}</p>
                  <p className="m-0">{member.phoneWa}</p>
                  <p className="m-0">{member.address}</p>
                </div>
              </div>

              <div className="my-4 flex items-start gap-2 rounded-xl bg-[#fff8e8] p-3 text-xs leading-relaxed !text-[#705a23]">
                <ShieldCheck className="mt-0.5 shrink-0" size={17} />
                <span>
                  Tarif pengiriman dihitung langsung dan diverifikasi ulang saat
                  pembayaran.
                </span>
              </div>

              <button
                className="inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-xl border-0 bg-[#14552e] px-5 font-extrabold text-white shadow-[0_12px_28px_rgba(20,85,46,0.22)] transition hover:-translate-y-0.5 hover:bg-[#0f4625] disabled:cursor-not-allowed disabled:opacity-55"
                onClick={checkout}
                disabled={!rows.length || !selectedShipping || loadingCheckout}
              >
                <CreditCard size={19} />{" "}
                {loadingCheckout ? "Memproses..." : "Bayar Online"}
              </button>
              {rows.length > 0 && (
                <button
                  className="mt-3 h-11 w-full border-0 bg-transparent text-sm font-bold !text-[#7a4944] hover:underline"
                  onClick={() => {
                    clearCart();
                    setCartState([]);
                  }}
                >
                  Kosongkan keranjang
                </button>
              )}
            </aside>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
