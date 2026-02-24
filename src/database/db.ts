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
  const res = await fetch(path, init);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API ${res.status} ${res.statusText}: ${text}`);
  }
  return (await res.json()) as T;
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
    name: 'Budi Santoso',
    role: 'Pengusaha, Yogyakarta',
    quote:
      'Dulu sering merasa lelah dan kurang fokus. Setelah 3 bulan rutin konsumsi Ketone Immuno, energi saya lebih stabil sepanjang hari. Produktivitas kerja meningkat drastis!',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    rating: 5,
  },
  {
    id: 2,
    name: 'Maya Putri',
    role: 'Yoga Instructor, Bali',
    quote:
      'Jaroliva Olive Oil dengan rosemary jadi favorit saya untuk memasak. Aromanya harum dan rasa masakan jadi lebih premium. Manfaat kesehatannya luar biasa untuk gaya hidup sehat.',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    rating: 5,
  },
  {
    id: 3,
    name: 'Dr. Rudi Hermawan',
    role: 'Dokter Keluarga, Semarang',
    quote:
      'Saya merekomendasikan produk JaxLab kepada pasien yang ingin meningkatkan kesehatan secara alami. Kualitas bahan dan transparansi proses produksinya sangat bisa dipercaya.',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    rating: 5,
  },
  {
    id: 4,
    name: 'Sari Rahayu',
    role: 'Ibu Rumah Tangga, Jakarta',
    quote:
      'Bone Broth JaxLab sudah jadi menu wajib keluarga kami. Anak-anak suka rasanya dan saya tenang karena tahu bahan-bahannya alami dan halal. Terima kasih JaxLab!',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    rating: 5,
  },
  {
    id: 5,
    name: 'Ahmad Fauzi',
    role: 'Atlet Lari, Surabaya',
    quote:
      'Pemulihan otot saya jauh lebih cepat sejak rutin minum Bone Broth JaxLab setelah latihan. Ini produk wajib buat semua atlet yang peduli kesehatan jangka panjang.',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
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
