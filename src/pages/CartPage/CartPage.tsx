import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { getMember } from '../../services/auth';
import { clearCart, getCart, setCart } from '../../services/cart';
import { checkoutOrder, formatRupiah, getAllProducts, type ProductDto } from '../../services/service-api';
import { savePaymentSession } from '../../services/payment-session';

declare global {
  interface Window {
    snap?: { pay: (token: string, opts?: { onSuccess?: () => void; onPending?: () => void; onError?: () => void }) => void };
  }
}

type CartRow = { productId: string; qty: number; product: ProductDto };

export default function CartPage() {
  const nav = useNavigate();
  const member = getMember();
  const [cart, setCartState] = useState(getCart());
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  useEffect(() => { getAllProducts().then(setProducts).catch(() => setProducts([])); }, []);

  const rows = useMemo<CartRow[]>(() => (
    cart
      .map((c) => {
        const product = products.find((p) => p.id === c.productId);
        return product ? { ...c, product } : null;
      })
      .filter((r): r is CartRow => r !== null)
  ), [cart, products]);

  const subtotal = rows.reduce((sum, r) => sum + (r.product.price * r.qty), 0);
  const ppn = Math.round(subtotal * 0.11);
  const total = subtotal + ppn;

  const updateQty = (productId: string, qty: number) => {
    const next = cart.map((i) => i.productId === productId ? { ...i, qty: Math.max(1, qty) } : i);
    setCart(next);
    setCartState(next);
  };

  const removeItem = (productId: string) => {
    const next = cart.filter((i) => i.productId !== productId);
    setCart(next);
    setCartState(next);
  };

  const checkout = async () => {
    if (!member || !cart.length) return;
    setLoadingCheckout(true);
    try {
      const res = await checkoutOrder(member.id, { items: cart });
      savePaymentSession(res);
      clearCart();
      setCartState([]);
      if (!window.snap) {
        if (res.redirectUrl) {
          window.location.href = res.redirectUrl;
          return;
        }
        alert('Snap Midtrans belum dimuat. Silakan hubungi admin.');
        return;
      }
      window.snap.pay(res.snapToken, {
        onSuccess: () => {
          alert('Pembayaran berhasil. Admin akan hubungi Anda via WhatsApp untuk ongkir.');
        },
      });
    } catch (e) {
      alert((e as Error).message || 'Gagal checkout');
    } finally {
      setLoadingCheckout(false);
    }
  };

  if (!member) {
    return (
      <div className="bg-[#efe9e3]">
        <Header />
        <main className="px-0 py-8">
          <div className="container">
            <section className="rounded-2xl border border-[#e6dfd7] bg-white p-5 text-center shadow-[0_16px_40px_rgba(26,77,46,0.08)]">
              <h2 className="mt-0 text-[var(--primary-green)]">Silakan Login Dulu</h2>
              <p>Untuk melanjutkan pembelian di website, login membership terlebih dahulu.</p>
              <button className="mt-3 h-11 w-full max-w-[260px] rounded-xl border-0 bg-[var(--primary-green)] font-bold text-white" onClick={() => nav('/member/auth')}>Login / Register</button>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#efe9e3]">
      <Header />
      <main className="px-0 py-8">
        <div className="container">
          <section className="grid grid-cols-[1.6fr_1fr] gap-5 max-[980px]:grid-cols-1">
            <div className="rounded-[18px] border border-[#e6dfd7] bg-white p-5 shadow-[0_16px_40px_rgba(26,77,46,0.08)]">
              <h1 className="mb-4 mt-0 text-[var(--primary-green)]">Keranjang Belanja</h1>
              {rows.length === 0 ? (
                <div className="text-center">
                  <p>Keranjang masih kosong.</p>
                  <button className="mt-3 h-11 w-full max-w-[260px] rounded-xl border-0 bg-[var(--primary-green)] font-bold text-white" onClick={() => nav('/products')}>Lihat Produk</button>
                </div>
              ) : (
                rows.map((row) => (
                  <article key={row.productId} className="grid grid-cols-[74px_1fr_auto_auto_auto] items-center gap-3 border-t border-[#efe7de] py-3 max-[680px]:grid-cols-[60px_1fr]">
                    <img src={row.product.images?.[0]} alt={row.product.name} className="h-[74px] w-[74px] rounded-xl bg-[#f6f6f6] object-cover max-[680px]:h-[60px] max-[680px]:w-[60px]" />
                    <div>
                      <h3 className="m-0 text-base text-[#213126]">{row.product.name}</h3>
                      <p className="m-0.5 font-bold text-[#4f6b5a]">{formatRupiah(row.product.price)}</p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#d8e3d6] px-2 py-1 max-[680px]:col-start-2 max-[680px]:justify-self-start">
                      <button className="h-6 w-6 rounded-full border-0 bg-[#e7f1e5] text-[var(--primary-green)]" onClick={() => updateQty(row.productId, row.qty - 1)}>-</button>
                      <span>{row.qty}</span>
                      <button className="h-6 w-6 rounded-full border-0 bg-[#e7f1e5] text-[var(--primary-green)]" onClick={() => updateQty(row.productId, row.qty + 1)}>+</button>
                    </div>
                    <div className="font-bold text-[#243427] max-[680px]:col-start-2 max-[680px]:justify-self-start">{formatRupiah(row.product.price * row.qty)}</div>
                    <button className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border border-[#f1bcbc] bg-[#fff7f7] text-[#b42318] max-[680px]:col-start-2 max-[680px]:justify-self-start" onClick={() => removeItem(row.productId)} aria-label={`Hapus ${row.product.name}`} title="Hapus">
                      <Trash2 size={18} />
                    </button>
                  </article>
                ))
              )}
            </div>

            <aside className="rounded-[18px] border border-[#e6dfd7] bg-white p-5 shadow-[0_16px_40px_rgba(26,77,46,0.08)]">
              <h2 className="mt-0 text-[var(--primary-green)]">Ringkasan Pembayaran</h2>
              <div className="mb-2 flex justify-between text-[#44584b]"><span>Subtotal Produk</span><strong>{formatRupiah(subtotal)}</strong></div>
              <div className="mb-2 flex justify-between text-[#44584b]"><span>PPN 11%</span><strong>{formatRupiah(ppn)}</strong></div>
              <div className="flex justify-between border-t border-dashed border-[#d0ddce] pt-3 text-[#15231b]"><span>Total</span><strong>{formatRupiah(total)}</strong></div>

              <div className="mt-4 rounded-xl border border-[#deeadb] bg-[#f7fbf6] p-3">
                <p><strong>{member.name}</strong></p>
                <p>{member.email}</p>
                <p>{member.phoneWa}</p>
                <p>{member.address}</p>
              </div>

              <p className="my-3 text-sm text-[#5b615b]">Ongkos kirim belum termasuk. Admin akan konfirmasi ongkir via WhatsApp setelah pembayaran.</p>

              <button className="h-11 w-full rounded-xl border-0 bg-[var(--primary-green)] font-bold text-white disabled:cursor-not-allowed disabled:opacity-55" onClick={checkout} disabled={!rows.length || loadingCheckout}>
                {loadingCheckout ? 'Memproses...' : 'Bayar Online'}
              </button>
              <button className="mt-2 h-11 w-full rounded-xl border-0 bg-[#edf3ed] font-bold text-[#274033]" onClick={() => { clearCart(); setCartState([]); }}>Kosongkan Keranjang</button>
            </aside>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
