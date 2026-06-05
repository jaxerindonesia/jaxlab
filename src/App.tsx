import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import AboutPage from './pages/AboutPage/AboutPage';
import ContactPage from './pages/ContactPage/ContactPage';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import AdminPage from './pages/AdminPage/AdminPage';
import CartPage from './pages/CartPage/CartPage';
import MemberAuthPage from './pages/MemberAuth/MemberAuthPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PaymentErrorPage from './pages/PaymentErrorPage';
import OrderHistoryPage from './pages/OrderHistoryPage/OrderHistoryPage';
import AccountPage from './pages/AccountPage/AccountPage';
import PaymentResultPage from './pages/PaymentResultPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/member" element={<AccountPage />} />
          <Route path="/member/auth" element={<MemberAuthPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders/history" element={<OrderHistoryPage />} />
          <Route path="/payment/success" element={<PaymentSuccessPage />} />
          <Route path="/payment/error" element={<PaymentErrorPage />} />
          <Route path="/payment/result" element={<PaymentResultPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
