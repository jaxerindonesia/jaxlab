import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PaymentSuccessPage() {
  const { search } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const orderId = params.get('order_id') ?? '-';
  const status = params.get('transaction_status') ?? 'success';

  return (
    <div className="bg-[#efe9e3] min-h-screen flex flex-col">
      <Header />
      <main className="px-0 py-10 flex-1">
        <div className="container">
          <section className="mx-auto max-w-[640px] rounded-2xl border border-[#d7e7d4] bg-white p-6 text-center shadow-[0_16px_40px_rgba(26,77,46,0.08)]">
            <h1 className="mt-0 text-3xl text-[var(--primary-green)]">Pembayaran Berhasil</h1>
            <p className="text-[#405246]">Terima kasih, pembayaran kamu sudah kami terima.</p>
            <p className="my-2 text-[#44584b]"><strong>Order ID:</strong> {orderId}</p>
            <p className="my-2 text-[#44584b]"><strong>Status:</strong> {status}</p>
            <p className="text-sm text-[#5b615b]">Admin akan menghubungi kamu via WhatsApp untuk konfirmasi detail pengiriman.</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Link to="/products" className="h-11 rounded-xl bg-[var(--primary-green)] px-4 font-bold text-white inline-flex items-center">Belanja Lagi</Link>
              <Link to="/" className="h-11 rounded-xl bg-[#edf3ed] px-4 font-bold text-[#274033] inline-flex items-center">Kembali ke Beranda</Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
