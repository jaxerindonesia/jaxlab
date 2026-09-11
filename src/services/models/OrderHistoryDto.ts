export interface OrderHistoryItemDto {
  id: string;
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

export interface OrderHistoryDto {
  id: string;
  subtotalAmount: number;
  ppnAmount: number;
  totalAmount: number;
  paymentStatus: string;
  paymentProvider: string;
  paymentRef: string | null;
  createdAt: string;
  items: OrderHistoryItemDto[];
}

export interface OrderHistoryResponseDto {
  orders: OrderHistoryDto[];
}
