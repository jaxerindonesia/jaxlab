import type { CheckoutRequestDto, CheckoutResponseDto } from '../models/CheckoutDto';
import { api } from './client';

export async function checkoutOrder(memberId: string, payload: CheckoutRequestDto): Promise<CheckoutResponseDto> {
  return await api<CheckoutResponseDto>('/api/orders/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-member-id': memberId },
    body: JSON.stringify(payload),
  });
}
