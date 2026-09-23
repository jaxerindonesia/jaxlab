import type { CheckoutRequestDto, CheckoutResponseDto } from '../models/CheckoutDto';
import { api } from './client';

export async function checkoutOrder(memberId: string | undefined, payload: CheckoutRequestDto): Promise<CheckoutResponseDto> {
  return await api<CheckoutResponseDto>('/api/orders/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(memberId ? { 'x-member-id': memberId } : {}) },
    body: JSON.stringify(payload),
  });
}
