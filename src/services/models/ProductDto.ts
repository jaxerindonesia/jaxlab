export interface ProductDto {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  category: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  stockStatus?: 'Tersedia' | 'Habis' | 'Terbatas';
  currentStock: number;
  images: string[];
  specs: { label: string; value: string }[];
  benefits: string[];
  marketplaceLinks: { label: string; url: string }[];
}
