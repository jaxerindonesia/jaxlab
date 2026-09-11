/**
 * JaxLab Database Service
 *
 * Arsitektur baru:
 * - Produk & kategori disimpan di database via Prisma (akses melalui API lokal `/api/*`)
 * - Konten non-produk (company info, features, stats, testimonials) tetap statis di frontend
 */

export interface Product {
  id: string;
  name: string;
  priority: number;
  subtitle: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  category: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  stockStatus: 'Tersedia' | 'Habis' | 'Terbatas';
  images: string[];
  specs: { label: string; value: string }[];
  benefits: string[];
  marketplaceLinks: { label: string; url: string }[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
  rating: number;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  mapsEmbed: string;
  socialMedia: { instagram: string; facebook: string; tiktok: string; youtube: string };
  workingHours: string;
}

export interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface Stat {
  id: number;
  value: string;
  label: string;
}


async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(path, { ...init, signal: controller.signal });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`API ${res.status} ${res.statusText}: ${text}`);
    }
    return (await res.json()) as T;
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      throw new Error('API timeout after 5000ms');
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}

const _companyInfo: CompanyInfo = {
  name: 'JaxLab',
  tagline: 'Reliable Product to Enhanced Wellness',
  description:
    'JaxLab adalah merek produk makanan sehat alami yang menghadirkan Bone Broth, minyak zaitun premium, dan produk multivitamin alami. Kami berkomitmen pada bahan minimal proses untuk mendukung gaya hidup sehat sejak dini.',
  email: 'hello@jaxlab.id',
  phone: '+62 812-3456-7890',
  whatsapp: '6281234567890',
  address: 'Jl. Cempaka Putih Tengah XVII No.F33, Jakarta Pusat, Indonesia',
  mapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.130847862578!2d110.3695!3d-7.7956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNDcnNDQuMiJTIDExMMKwMjInMTAuMiJF!5e0!3m2!1sen!2sid!4v1000000000000',
  socialMedia: {
    instagram: 'https://instagram.com/jaxlab.id',
    facebook: 'https://facebook.com/jaxlab.id',
    tiktok: 'https://tiktok.com/@jaxlab.id',
    youtube: 'https://youtube.com/@jaxlab',
  },
  workingHours: 'Senin – Jumat: 08.00 – 17.00 WIB',
};

const _testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'dr. Andi P.',
    role: 'Dokter Umum · Bandung',
    quote:
      'Saya menyukai pendekatan JaxLab yang berfokus pada edukasi dan perubahan gaya hidup, bukan sekadar mengejar angka di timbangan. Program seperti ini membantu peserta lebih memahami pentingnya kesehatan metabolik dan membangun kebiasaan yang lebih baik.',
    image: '/img/image_1dc335a.png',
    rating: 5,
  },
  {
    id: 2,
    name: 'Ibu Rina, 52 Tahun',
    role: 'Ibu Rumah Tangga & Entrepreneur · Jakarta',
    quote:
      'Awalnya saya ragu mencoba Fat Fasting. Setelah mengikuti panduan dan komunitas JaxLab, saya merasa pola makan saya jadi lebih teratur, energi lebih stabil, dan saya lebih sadar dalam memilih makanan setiap hari.',
    image: '/img/image_efb47978.png',
    rating: 5,
  },
  {
    id: 3,
    name: 'Bapak Hendra, 41 Tahun',
    role: 'Professional IT · Medan',
    quote:
      'Yang paling saya suka bukan hanya soal perubahan berat badan, tapi kebiasaan saya ikut berubah. Saya jadi lebih konsisten bergerak, lebih mengontrol porsi makan, dan merasa tubuh lebih ringan untuk beraktivitas',
    image: '/img/image_70590cf9.png',
    rating: 5,
  },
  {
    id: 4,
    name: 'Ibu Vina, 36 Tahun',
    role: 'Ibu Rumah Tangga & Guru · Surabaya',
    quote:
      'Sebagai ibu yang sibuk mengurus keluarga, saya butuh program yang praktis. Panduan menu dan komunitas JaxLab membuat saya lebih mudah menjalani pola hidup sehat tanpa harus memasak menu yang berbeda setiap hari.',
    image: '/img/image_f6ea7314.png',
    rating: 5,
  },
  {
    id: 5,
    name: 'Ahmad Fauzi',
    role: 'Atlet Lari, Surabaya',
    quote:
      'Pemulihan otot saya jauh lebih cepat sejak rutin minum Bone Broth JaxLab setelah latihan. Ini produk wajib buat semua atlet yang peduli kesehatan jangka panjang.',
    image: '/img/image_1dc335a.png',
    rating: 5,
  },
];

const _features: Feature[] = [
  {
    id: 1,
    icon: 'Leaf',
    title: 'Minim Proses, Lebih Alami',
    description: 'Diproses seminimal mungkin untuk menjaga nutrisi dan karakter alami bahan baku.',
  },
  {
    id: 2,
    icon: 'Award',
    title: 'Tanpa Tambahan Buatan',
    description: 'Bebas pengawet sintetis, pewarna buatan, MSG, dan bahan kimia tambahan.',
  },
  {
    id: 3,
    icon: 'ShieldCheck',
    title: 'Bersertifikasi Halal & BPOM',
    description: 'Seluruh produk telah tersertifikasi Halal MUI dan terdaftar di BPOM RI.',
  },
  {
    id: 4,
    icon: 'Heart',
    title: 'Untuk Kebiasaan Sehat Harian',
    description: 'Dirancang untuk mudah diintegrasikan ke dalam rutinitas sehari-hari keluarga Anda.',
  },
];

const _stats: Stat[] = [
  { id: 1, value: '10.000+', label: 'Pelanggan Puas' },
  { id: 2, value: '6', label: 'Produk Premium' },
  { id: 3, value: '5', label: 'Tahun Berpengalaman' },
  { id: 4, value: '100%', label: 'Bahan Alami' },
];

export async function initDB(): Promise<void> {
  await api<{ ok: true }>('/api/health');
}

/** SELECT * FROM company_info WHERE id = 1 */
export function getCompanyInfo(): CompanyInfo {
  return _companyInfo;
}

export async function getCategories(): Promise<string[]> {
  return await api<string[]>('/api/categories');
}

export async function getAllProducts(): Promise<Product[]> {
  return await api<Product[]>('/api/products');
}

export async function getProductById(id: string): Promise<Product | null> {
  return await api<Product>(`/api/products/${encodeURIComponent(id)}`).catch(() => null);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return await api<Product[]>('/api/products/featured');
}

export async function addProduct(product: Omit<Product, 'id'>): Promise<Product | null> {
  return await api<Product | null>('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
}

export async function updateProduct(product: Product): Promise<void> {
  await api<{ ok: true }>(`/api/products/${encodeURIComponent(product.id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
}

export async function deleteProduct(id: string): Promise<void> {
  await api<{ ok: true }>(`/api/products/${encodeURIComponent(id)}`, { method: 'DELETE' });
}

export async function addCategory(name: string): Promise<void> {
  await api<{ ok: true }>('/api/categories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
}

export async function deleteCategory(name: string): Promise<void> {
  await api<{ ok: true }>('/api/categories', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
}

export async function resetToDefaults(): Promise<void> {
  await api<{ ok: true }>('/api/admin/reset', { method: 'POST' });
}

export function getTestimonials(): Testimonial[] {
  return [..._testimonials];
}

/** SELECT * FROM features ORDER BY id */
export function getFeatures(): Feature[] {
  return [..._features];
}

/** SELECT * FROM stats ORDER BY id */
export function getStats(): Stat[] {
  return [..._stats];
}

/** Helper: format harga ke Rupiah */
export function formatRupiah(price: number): string {
  return `Rp ${price.toLocaleString('id-ID')}`;
}
