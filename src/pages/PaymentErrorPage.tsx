import { Navigate, useLocation } from 'react-router-dom';

export default function PaymentErrorPage() {
  const { search } = useLocation();
  return <Navigate to={`/payment/result${search}`} replace />;
}
