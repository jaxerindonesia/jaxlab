import { api } from './client';
import type { OrderHistoryResponseDto } from '../models/OrderHistoryDto';

export async function getOrderHistory(memberId: string): Promise<OrderHistoryResponseDto> {
  return await api<OrderHistoryResponseDto>('/api/orders/history', {
    headers: { 'x-member-id': memberId },
  });
}
