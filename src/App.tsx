import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home/Home'));
const ProductsPage = lazy(() => import('./pages/ProductsPage/ProductsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage/ContactPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage/ProductDetailPage'));
const AdminPage = lazy(() => import('./pages/AdminPage/AdminPage'));
const CartPage = lazy(() => import('./pages/CartPage/CartPage'));
const MemberAuthPage = lazy(() => import('./pages/MemberAuth/MemberAuthPage'));
const PaymentSuccessPage = lazy(() => import('./pages/PaymentSuccessPage'));
const PaymentErrorPage = lazy(() => import('./pages/PaymentErrorPage'));
const OrderHistoryPage = lazy(() => import('./pages/OrderHistoryPage/OrderHistoryPage'));
const AccountPage = lazy(() => import('./pages/AccountPage/AccountPage'));
const PaymentResultPage = lazy(() => import('./pages/PaymentResultPage'));
const FatFastingPage = lazy(() => import('./pages/FatFastingPage/FatFastingPage'));

function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        <Suspense fallback={<div className="min-h-screen bg-[#f9f5ec]" aria-label="Memuat halaman" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/fat-fasting" element={<FatFastingPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/member" element={<AccountPage />} />
          <Route path="/member/auth" element={<MemberAuthPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders/history" element={<OrderHistoryPage />} />
          <Route path="/payment/success" element={<PaymentSuccessPage />} />
          <Route path="/payment/error" element={<PaymentErrorPage />} />
          <Route path="/payment/result" element={<PaymentResultPage />} />
        </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
