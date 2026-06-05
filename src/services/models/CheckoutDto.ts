export interface CheckoutRequestDto {
  items: { productId: string; qty: number }[];
}

export interface CheckoutResponseDto {
  orderId: string;
  paymentRef: string;
  snapToken: string;
  redirectUrl?: string;
  grossAmount: number;
  ppnAmount: number;
  subtotal: number;
}
