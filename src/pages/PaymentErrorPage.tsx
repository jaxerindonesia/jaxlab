import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PaymentErrorPage() {
  const { search } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const orderId = params.get('order_id') ?? '-';
  const status = params.get('transaction_status') ?? 'error';

  return (
    <div className="bg-[#efe9e3] min-h-screen flex flex-col">
      <Header />
      <main className="px-0 py-10 flex-1">
        <div className="container">
          <section className="mx-auto max-w-[640px] rounded-2xl border border-[#f3c9c9] bg-white p-6 text-center shadow-[0_16px_40px_rgba(120,26,26,0.08)]">
            <h1 className="mt-0 text-3xl text-[#a33232]">Pembayaran Gagal</h1>
            <p className="text-[#5c3d3d]">Maaf, pembayaran belum berhasil diproses.</p>
            <p className="my-2 text-[#5c3d3d]"><strong>Order ID:</strong> {orderId}</p>
            <p className="my-2 text-[#5c3d3d]"><strong>Status:</strong> {status}</p>
            <p className="text-sm text-[#735353]">Kamu bisa coba ulang pembayaran dari keranjang belanja.</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Link to="/cart" className="h-11 rounded-xl bg-[#a33232] px-4 font-bold text-white inline-flex items-center">Coba Bayar Lagi</Link>
              <Link to="/" className="h-11 rounded-xl bg-[#f4eaea] px-4 font-bold text-[#6d3737] inline-flex items-center">Kembali ke Beranda</Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
