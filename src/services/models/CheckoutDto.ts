export interface CheckoutRequestDto {
  items: { productId: string; qty: number }[];
  shipping: {
    destinationId: number;
    destinationLabel: string;
    courierCode: string;
    service: string;
  };
  customer?: { name: string; email: string; phoneWa: string; address: string };
}

export interface CheckoutResponseDto {
  orderId: string;
  paymentRef: string;
  snapToken: string;
  redirectUrl?: string;
  paymentProvider?: 'xendit' | 'midtrans';
  grossAmount: number;
  ppnAmount: number;
  subtotal: number;
  shippingAmount: number;
}
