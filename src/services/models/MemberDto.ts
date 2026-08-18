export interface MemberDto {
  id: string;
  name: string;
  email: string;
  address: string;
  phoneWa: string;
  shippingDestinationId: number | null;
  shippingDestination: string | null;
  province: string | null;
  city: string | null;
  postalCode: string | null;
  referralCode: string;
}
