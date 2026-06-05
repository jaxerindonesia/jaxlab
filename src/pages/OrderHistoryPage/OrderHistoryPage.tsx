import React, { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, Clock3, XCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getMember, isMemberLoggedIn } from '../../services/auth';
import { formatRupiah, getOrderHistory } from '../../services/service-api';
import type { OrderHistoryDto } from '../../services/models/OrderHistoryDto';
import { getPaymentSession } from '../../services/payment-session';

const statusConfig = (status: string) => {
  const normalized = status.toLowerCase();
  if (normalized === 'paid' || normalized === 'settlement' || normalized === 'success') {
    return { label: 'Berhasil', className: 'bg-[#e8f5e9] text-[#2e7d32]', Icon: CheckCircle2 };
  }
  if (normalized === 'expired') {
    return { label: 'Expired', className: 'bg-[#f3f4f6] text-[#6b7280]', Icon: Clock3 };
  }
  if (normalized === 'cancelled' || normalized === 'canceled' || normalized === 'cancel' || normalized === 'denied' || normalized === 'failed') {
    return { label: 'Cancel', className: 'bg-[#ffebee] text-[#c62828]', Icon: XCircle };
  }
  return { label: 'Pending', className: 'bg-[#fff3e0] text-[#e65100]', Icon: Clock3 };
};

const OrderHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const member = getMember();
  const memberId = member?.id ?? null;
  const [orders, setOrders] = useState<OrderHistoryDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    if (!memberId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    getOrderHistory(memberId)
      .then((res) => {
        if (cancelled) return;
        setOrders(res.orders);
      })
      .catch(() => {
        if (cancelled) return;
        setOrders([]);
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [memberId]);

  if (!isMemberLoggedIn()) {
    return (
      <div className="bg-[#efe9e3]">
        <Header />
        <main className="px-0 py-10">
          <div className="container">
            <section className="rounded-2xl border border-[#e6dfd7] bg-white p-6 text-center shadow-[0_16px_40px_rgba(26,77,46,0.08)]">
              <h1 className="text-[var(--primary-green)]">Login dulu untuk melihat history</h1>
              <p className="mt-2 text-[#5f645f]">Riwayat transaksi hanya bisa dilihat oleh member yang sedang login.</p>
              <button className="mt-4 rounded-xl bg-[var(--primary-green)] px-6 py-3 font-bold text-white" onClick={() => navigate('/member')}>
                Login / Register
              </button>
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
          <Link to="/products" className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--primary-green)]">
            <ArrowLeft size={16} /> Kembali ke produk
          </Link>

          <section className="rounded-[18px] border border-[#e6dfd7] bg-white p-6 shadow-[0_16px_40px_rgba(26,77,46,0.08)]">
            <div className="mb-6">
              <h1 className="text-[var(--primary-green)]">Riwayat Pesanan</h1>
              <p className="mt-2 text-[#5f645f]">Halo {member?.name}, berikut daftar order kamu beserta status transaksinya.</p>
            </div>

            {loading ? (
              <div className="py-12 text-center text-[#666]">Memuat history...</div>
            ) : orders.length === 0 ? (
              <div className="py-12 text-center text-[#666]">
                <p>Belum ada history order.</p>
                <button className="mt-4 rounded-xl bg-[var(--primary-green)] px-6 py-3 font-bold text-white" onClick={() => navigate('/products')}>
                  Lihat Produk
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const status = statusConfig(order.paymentStatus);
                  const StatusIcon = status.Icon;
                  return (
                    <article key={order.id} className="rounded-2xl border border-[#eae4db] bg-[#faf8f5] p-5">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="text-sm text-[#6d726b]">Order #{order.id.slice(0, 8)}</p>
                          <h2 className="mt-1 text-lg font-bold text-[#1d241d]">
                            {new Date(order.createdAt).toLocaleString('id-ID', {
                              dateStyle: 'medium',
                              timeStyle: 'short',
                            })}
                          </h2>
                          <p className="mt-1 text-sm text-[#6d726b]">
                            {order.items.length} item • Ref: {order.paymentRef ?? '-'}
                          </p>
                        </div>

                        <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${status.className}`}>
                          <StatusIcon size={16} />
                          {status.label}
                        </div>
                      </div>

                      {order.paymentStatus === 'pending' && (
                        <div className="mt-3">
                          <button
                            type="button"
                            className="rounded-xl bg-[var(--primary-green)] px-4 py-2 text-sm font-bold text-white"
                            onClick={() => {
                              const session = order.paymentRef ? getPaymentSession(order.paymentRef) : null;
                              if (!session) {
                                alert('Link pembayaran belum tersedia lagi. Silakan buat order baru dari keranjang.');
                                return;
                              }
                              if (window.snap) {
                                window.snap.pay(session.snapToken);
                                return;
                              }
                              if (session.redirectUrl) {
                                window.location.href = session.redirectUrl;
                                return;
                              }
                              alert('Link pembayaran belum tersedia lagi. Silakan buat order baru dari keranjang.');
                            }}
                          >
                            Lanjut Bayar
                          </button>
                        </div>
                      )}

                      <div className="mt-5 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3">
                              <div>
                                <p className="font-semibold text-[#1d241d]">{item.productName}</p>
                                <p className="text-sm text-[#6d726b]">
                                  {item.quantity} x {formatRupiah(item.unitPrice)}
                                </p>
                              </div>
                              <p className="font-bold text-[#1d241d]">{formatRupiah(item.lineTotal)}</p>
                            </div>
                          ))}
                        </div>

                        <div className="rounded-xl bg-white p-4">
                          <div className="space-y-2 text-sm text-[#5f645f]">
                            <div className="flex justify-between">
                              <span>Subtotal</span>
                              <strong>{formatRupiah(order.subtotalAmount)}</strong>
                            </div>
                            <div className="flex justify-between">
                              <span>PPN</span>
                              <strong>{formatRupiah(order.ppnAmount)}</strong>
                            </div>
                            <div className="flex justify-between border-t border-dashed border-[#e3ddd3] pt-2 text-base text-[#1d241d]">
                              <span>Total</span>
                              <strong>{formatRupiah(order.totalAmount)}</strong>
                            </div>
                            <div className="pt-2 text-sm">
                              <span className="font-semibold">Status transaksi: </span>
                              <span className={`font-bold ${status.className.split(' ').find((item) => item.startsWith('text-')) ?? 'text-[#1d241d]'}`}>
                                {status.label}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderHistoryPage;
