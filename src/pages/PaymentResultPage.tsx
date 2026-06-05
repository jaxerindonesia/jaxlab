import { Link, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function normalizeStatus(status: string) {
  const normalized = status.toLowerCase();
  if (normalized === 'success' || normalized === 'settlement' || normalized === 'capture' || normalized === 'paid') {
    return 'success';
  }
  if (normalized === 'pending') {
    return 'pending';
  }
  if (normalized === 'expired') {
    return 'expired';
  }
  if (normalized === 'cancel' || normalized === 'cancelled' || normalized === 'canceled' || normalized === 'deny' || normalized === 'denied' || normalized === 'failure' || normalized === 'failed' || normalized === 'error') {
    return 'error';
  }
  return 'pending';
}

export default function PaymentResultPage() {
  const { search } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const orderId = params.get('order_id') ?? '-';
  const rawStatus = params.get('transaction_status') ?? 'pending';
  const status = normalizeStatus(rawStatus);

  const config = {
    success: {
      title: 'Pembayaran Berhasil',
      border: 'border-[#d7e7d4]',
      shadow: 'shadow-[0_16px_40px_rgba(26,77,46,0.08)]',
      titleColor: 'text-[var(--primary-green)]',
      textColor: 'text-[#405246]',
      subTextColor: 'text-[#5b615b]',
      buttonPrimary: 'bg-[var(--primary-green)]',
      buttonSecondary: 'bg-[#edf3ed] text-[#274033]',
      message: 'Terima kasih, pembayaran kamu sudah kami terima.',
      footer: 'Admin akan menghubungi kamu via WhatsApp untuk konfirmasi detail pengiriman.',
      primaryLink: '/products',
      primaryLabel: 'Belanja Lagi',
    },
    pending: {
      title: 'Pembayaran Pending',
      border: 'border-[#f7e1b3]',
      shadow: 'shadow-[0_16px_40px_rgba(120,92,26,0.08)]',
      titleColor: 'text-[#b66d00]',
      textColor: 'text-[#6a5325]',
      subTextColor: 'text-[#7b6a47]',
      buttonPrimary: 'bg-[#b66d00]',
      buttonSecondary: 'bg-[#f8f2e5] text-[#725417]',
      message: 'Pembayaran kamu masih menunggu konfirmasi dari Midtrans.',
      footer: 'Kamu bisa cek lagi statusnya dari history order setelah beberapa saat.',
      primaryLink: '/orders/history',
      primaryLabel: 'Lihat History',
    },
    expired: {
      title: 'Pembayaran Expired',
      border: 'border-[#e2e8f0]',
      shadow: 'shadow-[0_16px_40px_rgba(71,85,105,0.08)]',
      titleColor: 'text-[#475569]',
      textColor: 'text-[#52606d]',
      subTextColor: 'text-[#64748b]',
      buttonPrimary: 'bg-[#475569]',
      buttonSecondary: 'bg-[#eef2f7] text-[#334155]',
      message: 'Waktu pembayaran sudah habis, order ini tidak bisa diproses lagi.',
      footer: 'Silakan buat order baru jika kamu masih ingin melanjutkan pembelian.',
      primaryLink: '/cart',
      primaryLabel: 'Cek Keranjang',
    },
    error: {
      title: 'Pembayaran Gagal',
      border: 'border-[#f3c9c9]',
      shadow: 'shadow-[0_16px_40px_rgba(120,26,26,0.08)]',
      titleColor: 'text-[#a33232]',
      textColor: 'text-[#5c3d3d]',
      subTextColor: 'text-[#735353]',
      buttonPrimary: 'bg-[#a33232]',
      buttonSecondary: 'bg-[#f4eaea] text-[#6d3737]',
      message: 'Maaf, pembayaran belum berhasil diproses.',
      footer: 'Kamu bisa coba ulang pembayaran dari keranjang belanja.',
      primaryLink: '/cart',
      primaryLabel: 'Coba Bayar Lagi',
    },
  }[status];

  return (
    <div className="min-h-screen bg-[#efe9e3] flex flex-col">
      <Header />
      <main className="flex-1 px-0 py-10">
        <div className="container">
          <section className={`mx-auto max-w-[640px] rounded-2xl border bg-white p-6 text-center ${config.border} ${config.shadow}`}>
            <h1 className={`mt-0 text-3xl ${config.titleColor}`}>{config.title}</h1>
            <p className={config.textColor}>{config.message}</p>
            <p className={`my-2 ${config.textColor}`}><strong>Order ID:</strong> {orderId}</p>
            <p className={`my-2 ${config.textColor}`}><strong>Status:</strong> {rawStatus}</p>
            <p className={`text-sm ${config.subTextColor}`}>{config.footer}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Link to={config.primaryLink} className={`inline-flex h-11 items-center rounded-xl px-4 font-bold text-white ${config.buttonPrimary}`}>
                {config.primaryLabel}
              </Link>
              <Link to="/" className={`inline-flex h-11 items-center rounded-xl px-4 font-bold ${config.buttonSecondary}`}>
                Kembali ke Beranda
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
