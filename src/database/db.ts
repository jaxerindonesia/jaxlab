/**
 * JaxLab Database Service
 *
 * Arsitektur: SQL Schema (schema.sql) mendefinisikan struktur tabel.
 * Data disimpan dalam TypeScript yang divalidasi sesuai schema tersebut.
 * Pendekatan ini cocok untuk static/JAMstack app tanpa backend server.
 *
 * Schema SQL tersedia di: src/database/schema.sql
 */

// ─── TYPES (berdasarkan schema.sql) ──────────────────────────

export interface Product {
    id: number;
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

// ─── LOCALSTORAGE KEYS ────────────────────────────────────────
const LS_PRODUCTS_KEY = 'jaxlab_products';
const LS_CATEGORIES_KEY = 'jaxlab_categories';

// ─── DATA (sesuai INSERT statements di schema.sql) ────────────

const _companyInfo: CompanyInfo = {
    name: 'JaxLab',
    tagline: 'Reliable Product to Enhanced Wellness',
    description: 'JaxLab adalah merek produk makanan sehat alami yang menghadirkan Bone Broth, minyak zaitun premium, dan produk multivitamin alami. Kami berkomitmen pada bahan minimal proses untuk mendukung gaya hidup sehat sejak dini.',
    email: 'hello@jaxlab.id',
    phone: '+62 812-3456-7890',
    whatsapp: '6281234567890',
    address: 'Jl. Cempaka Putih Tengah XVII No.F33, Jakarta Pusat, Indonesia',
    mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.130847862578!2d110.3695!3d-7.7956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNDcnNDQuMiJTIDExMMKwMjInMTAuMiJF!5e0!3m2!1sen!2sid!4v1000000000000',
    socialMedia: {
        instagram: 'https://instagram.com/jaxlab.id',
        facebook: 'https://facebook.com/jaxlab.id',
        tiktok: 'https://tiktok.com/@jaxlab.id',
        youtube: 'https://youtube.com/@jaxlab',
    },
    workingHours: 'Senin – Jumat: 08.00 – 17.00 WIB',
};

const _defaultCategories: string[] = [
    'Bone Broth', 'Essential Oil', 'Multivitamin', 'Healthy Food', 'Supplement',
];

const _defaultProducts: Product[] = [
    {
        id: 1,
        name: 'JaxLab Bone Broth Original',
        subtitle: 'Kaldu Tulang Sapi Premium – Kaya Kolagen & Mineral',
        description: 'Kaldu tulang sapi murni kaya kolagen, asam amino, dan mineral esensial.',
        longDescription: 'JaxLab Bone Broth Original dibuat dari tulang sapi pilihan yang dimasak perlahan selama 24 jam untuk mengekstrak kolagen, asam amino, dan mineral secara maksimal. Tanpa pengawet, tanpa MSG, tanpa bahan tambahan buatan. Cocok dikonsumsi langsung atau sebagai bahan masakan bergizi.',
        price: 125000,
        originalPrice: 150000,
        category: 'Bone Broth',
        badge: 'Best Seller',
        rating: 5.0,
        reviewCount: 248,
        stockStatus: 'Tersedia',
        images: [
            'https://images.unsplash.com/photo-1588117305388-c2631a279f82?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1610348725531-843dff563e2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
        ],
        specs: [
            { label: 'Berat Bersih', value: '500 ml' },
            { label: 'Bahan Utama', value: 'Tulang Sapi Segar' },
            { label: 'Proses', value: 'Slow Cook 24 Jam' },
            { label: 'Tanpa', value: 'MSG, Pengawet, Pewarna' },
            { label: 'Sertifikasi', value: 'Halal MUI' },
        ],
        benefits: [
            'Mendukung kesehatan sendi dan tulang',
            'Meningkatkan kualitas kulit dengan kolagen alami',
            'Membantu regenerasi sel dan pemulihan tubuh',
            'Meningkatkan imunitas secara alami',
        ],
    },
    {
        id: 2,
        name: 'Jaroliva Olive Oil + Rosemary',
        subtitle: 'Minyak Zaitun Premium dengan Rosemary Segar',
        description: 'Minyak zaitun extra virgin berkualitas tinggi dengan infusi rosemary segar.',
        longDescription: 'Jaroliva Olive Oil + Rosemary adalah paduan sempurna antara minyak zaitun extra virgin premium dan rosemary segar yang diproses secara cold-press. Kaya antioksidan dan lemak sehat omega-3. Ideal untuk memasak, salad dressing, atau dikonsumsi langsung.',
        price: 189000,
        category: 'Essential Oil',
        badge: 'New',
        rating: 4.8,
        reviewCount: 173,
        stockStatus: 'Tersedia',
        images: [
            'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1608571423902-eed4a5e84d85?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1601060286854-0d84bb93a1eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1559181567-c3190ca9be46?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
        ],
        specs: [
            { label: 'Volume', value: '250 ml' },
            { label: 'Jenis', value: 'Extra Virgin Olive Oil' },
            { label: 'Proses', value: 'Cold Press' },
            { label: 'Infusi', value: 'Rosemary Segar' },
            { label: 'Acidity', value: '< 0.8%' },
        ],
        benefits: [
            'Kaya antioksidan polyphenol',
            'Mendukung kesehatan jantung dan kolesterol',
            'Anti-inflamasi alami',
            'Meningkatkan penyerapan nutrisi',
        ],
    },
    {
        id: 3,
        name: 'Ketone Immuno Booster',
        subtitle: 'Suplemen Imunitas – Formula Ketogenik Alami',
        description: 'Suplemen pendukung imunitas berbasis bahan-bahan alami formula ketogenik.',
        longDescription: 'Ketone Immuno Booster diformulasikan khusus untuk mendukung energi tubuh dan sistem imun dengan pendekatan ketogenik alami. Mengandung MCT Oil, vitamin C alami, zinc, dan ekstrak herbal pilihan yang bekerja sinergis meningkatkan daya tahan tubuh.',
        price: 235000,
        originalPrice: 275000,
        category: 'Supplement',
        badge: 'Sale',
        rating: 4.9,
        reviewCount: 312,
        stockStatus: 'Tersedia',
        images: [
            'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1624638760086-44445672803b?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
        ],
        specs: [
            { label: 'Isi', value: '60 Kapsul' },
            { label: 'Kandungan Utama', value: 'MCT Oil, Vitamin C, Zinc' },
            { label: 'Anjuran Konsumsi', value: '2 kapsul / hari' },
            { label: 'Cocok untuk', value: 'Diet Keto & Umum' },
            { label: 'Sertifikasi', value: 'BPOM & Halal MUI' },
        ],
        benefits: [
            'Meningkatkan energi sepanjang hari',
            'Memperkuat sistem imun tubuh',
            'Mendukung metabolisme sehat',
            'Membantu fokus dan konsentrasi',
        ],
    },
    {
        id: 4,
        name: 'Raw Honey Forest Grade A',
        subtitle: 'Madu Hutan Murni Tanpa Filter – Kaya Enzim Alami',
        description: 'Madu hutan mentah Grade A langsung dari lebah liar pegunungan Indonesia.',
        longDescription: 'Raw Honey Forest Grade A adalah madu hutan murni yang dipanen langsung dari sarang lebah liar di hutan pegunungan Kalimantan. Tidak dipanaskan, tidak difilter, sehingga seluruh enzim, serbuk sari, propolis, dan antioksidan alami tetap terjaga. Rasa kaya dan kompleks dengan aroma hutan yang khas.',
        price: 95000,
        category: 'Healthy Food',
        rating: 4.7,
        reviewCount: 189,
        stockStatus: 'Terbatas',
        images: [
            'https://images.unsplash.com/photo-1587049352846-4a222e784d38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1471943311424-646960669fbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1601497803462-2cbfb371c2b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
        ],
        specs: [
            { label: 'Berat', value: '350 gram' },
            { label: 'Sumber', value: 'Lebah Liar Kalimantan' },
            { label: 'Proses', value: 'Raw, Unfiltered' },
            { label: 'Kadar Air', value: '< 18%' },
            { label: 'Warna', value: 'Amber Gelap' },
        ],
        benefits: [
            'Antibakteri dan antivirus alami',
            'Sumber energi instan yang sehat',
            'Kaya antioksidan dan enzim',
            'Mendukung kesehatan pencernaan',
        ],
    },
    {
        id: 5,
        name: 'JaxLab Bone Broth Chicken',
        subtitle: 'Kaldu Ayam Kampung – Ringan & Bergizi Tinggi',
        description: 'Kaldu ayam kampung slow-cook kaya gelatin dan asam amino esensial.',
        longDescription: 'JaxLab Bone Broth Chicken dibuat dari tulang ayam kampung segar yang dimasak lambat selama 18 jam. Kaya gelatin alami, asam amino esensial, dan mineral. Lebih ringan dari varian sapi, cocok untuk anak-anak, ibu hamil, dan lansia. Tanpa bahan tambahan apapun.',
        price: 99000,
        category: 'Bone Broth',
        rating: 4.8,
        reviewCount: 201,
        stockStatus: 'Tersedia',
        images: [
            'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1588117305388-c2631a279f82?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
        ],
        specs: [
            { label: 'Berat Bersih', value: '500 ml' },
            { label: 'Bahan Utama', value: 'Tulang Ayam Kampung' },
            { label: 'Proses', value: 'Slow Cook 18 Jam' },
            { label: 'Cocok untuk', value: 'Semua Usia' },
            { label: 'Sertifikasi', value: 'Halal MUI' },
        ],
        benefits: [
            'Mendukung pertumbuhan anak secara alami',
            'Meningkatkan elastisitas kulit',
            'Membantu pemulihan pasca sakit',
            'Sumber protein dan mineral mudah serap',
        ],
    },
    {
        id: 6,
        name: 'VitaGreen Multivitamin Alami',
        subtitle: 'Multivitamin Berbasis Sayuran Hijau & Superfood',
        description: 'Multivitamin lengkap dari ekstrak sayuran hijau, spirulina, dan superfood.',
        longDescription: 'VitaGreen adalah multivitamin alami yang diformulasikan dari ekstrak sayuran hijau organik, spirulina, chlorella, dan superfood terpilih. Mengandung lebih dari 20 vitamin dan mineral esensial dalam bentuk yang mudah diserap tubuh. Vegan-friendly dan bebas gluten.',
        price: 175000,
        category: 'Multivitamin',
        badge: 'Best Seller',
        rating: 4.6,
        reviewCount: 156,
        stockStatus: 'Tersedia',
        images: [
            'https://images.unsplash.com/photo-1624638760086-44445672803b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
        ],
        specs: [
            { label: 'Isi', value: '90 Tablet' },
            { label: 'Kandungan', value: 'Spirulina, Chlorella, Vitamin C/D/B' },
            { label: 'Anjuran', value: '1 tablet / hari' },
            { label: 'Cocok untuk', value: 'Vegetarian & Vegan' },
            { label: 'Bebas', value: 'Gluten, Dairy, Soy' },
        ],
        benefits: [
            'Melengkapi kebutuhan vitamin & mineral harian',
            'Meningkatkan energi dan vitalitas',
            'Mendukung detoksifikasi alami',
            'Menjaga keseimbangan nutrisi',
        ],
    },
];

// ─── DYNAMIC (mutable) data loaded from localStorage ──────────
let _categories: string[] = _loadCategories();
let _products: Product[] = _loadProducts();

function _loadProducts(): Product[] {
    try {
        const raw = localStorage.getItem(LS_PRODUCTS_KEY);
        if (raw) return JSON.parse(raw) as Product[];
    } catch { /* ignore */ }
    return [..._defaultProducts];
}

function _loadCategories(): string[] {
    try {
        const raw = localStorage.getItem(LS_CATEGORIES_KEY);
        if (raw) return JSON.parse(raw) as string[];
    } catch { /* ignore */ }
    return [..._defaultCategories];
}

function _persistProducts(): void {
    localStorage.setItem(LS_PRODUCTS_KEY, JSON.stringify(_products));
}

function _persistCategories(): void {
    localStorage.setItem(LS_CATEGORIES_KEY, JSON.stringify(_categories));
}

// ─── ADMIN MUTATION FUNCTIONS ─────────────────────────────────

export function addProduct(product: Product): void {
    _products.push(product);
    _persistProducts();
}

export function updateProduct(updated: Product): void {
    const idx = _products.findIndex(p => p.id === updated.id);
    if (idx !== -1) {
        _products[idx] = updated;
        _persistProducts();
    }
}

export function deleteProduct(id: number): void {
    _products = _products.filter(p => p.id !== id);
    _persistProducts();
}

export function getNextProductId(): number {
    if (_products.length === 0) return 1;
    return Math.max(..._products.map(p => p.id)) + 1;
}

export function setCategories(cats: string[]): void {
    _categories = cats;
    _persistCategories();
}

export function addCategory(name: string): void {
    if (!_categories.includes(name)) {
        _categories.push(name);
        _persistCategories();
    }
}

export function deleteCategory(name: string): void {
    _categories = _categories.filter(c => c !== name);
    _persistCategories();
}

export function resetToDefaults(): void {
    _products = [..._defaultProducts];
    _categories = [..._defaultCategories];
    localStorage.removeItem(LS_PRODUCTS_KEY);
    localStorage.removeItem(LS_CATEGORIES_KEY);
}

// ─── OTHER DATA ───────────────────────────────────────────────

const _testimonials: Testimonial[] = [
    { id: 1, name: 'Budi Santoso', role: 'Pengusaha, Yogyakarta', quote: 'Dulu sering merasa lelah dan kurang fokus. Setelah 3 bulan rutin konsumsi Ketone Immuno, energi saya lebih stabil sepanjang hari. Produktivitas kerja meningkat drastis!', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', rating: 5 },
    { id: 2, name: 'Maya Putri', role: 'Yoga Instructor, Bali', quote: 'Jaroliva Olive Oil dengan rosemary jadi favorit saya untuk memasak. Aromanya harum dan rasa masakan jadi lebih premium. Manfaat kesehatannya luar biasa untuk gaya hidup sehat.', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', rating: 5 },
    { id: 3, name: 'Dr. Rudi Hermawan', role: 'Dokter Keluarga, Semarang', quote: 'Saya merekomendasikan produk JaxLab kepada pasien yang ingin meningkatkan kesehatan secara alami. Kualitas bahan dan transparansi proses produksinya sangat bisa dipercaya.', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', rating: 5 },
    { id: 4, name: 'Sari Rahayu', role: 'Ibu Rumah Tangga, Jakarta', quote: 'Bone Broth JaxLab sudah jadi menu wajib keluarga kami. Anak-anak suka rasanya dan saya tenang karena tahu bahan-bahannya alami dan halal. Terima kasih JaxLab!', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', rating: 5 },
    { id: 5, name: 'Ahmad Fauzi', role: 'Atlet Lari, Surabaya', quote: 'Pemulihan otot saya jauh lebih cepat sejak rutin minum Bone Broth JaxLab setelah latihan. Ini produk wajib buat semua atlet yang peduli kesehatan jangka panjang.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', rating: 5 },
];

const _features: Feature[] = [
    { id: 1, icon: 'Leaf', title: 'Minim Proses, Lebih Alami', description: 'Diproses seminimal mungkin untuk menjaga nutrisi dan karakter alami bahan baku.' },
    { id: 2, icon: 'Award', title: 'Tanpa Tambahan Buatan', description: 'Bebas pengawet sintetis, pewarna buatan, MSG, dan bahan kimia tambahan.' },
    { id: 3, icon: 'ShieldCheck', title: 'Bersertifikasi Halal & BPOM', description: 'Seluruh produk telah tersertifikasi Halal MUI dan terdaftar di BPOM RI.' },
    { id: 4, icon: 'Heart', title: 'Untuk Kebiasaan Sehat Harian', description: 'Dirancang untuk mudah diintegrasikan ke dalam rutinitas sehari-hari keluarga Anda.' },
];

const _stats: Stat[] = [
    { id: 1, value: '10.000+', label: 'Pelanggan Puas' },
    { id: 2, value: '6', label: 'Produk Premium' },
    { id: 3, value: '5', label: 'Tahun Berpengalaman' },
    { id: 4, value: '100%', label: 'Bahan Alami' },
];

// ─── QUERY FUNCTIONS (meniru SQL SELECT) ──────────────────────

/** Inisialisasi database. Data bersifat statis sehingga selalu langsung siap. */
export async function initDB(): Promise<void> {
    // Static TypeScript data — no async initialization required.
}

/** SELECT * FROM company_info WHERE id = 1 */
export function getCompanyInfo(): CompanyInfo {
    return _companyInfo;
}

/** SELECT name FROM product_categories ORDER BY id */
export function getCategories(): string[] {
    return [..._categories];
}

/** SELECT * FROM products JOIN product_categories ORDER BY id */
export function getAllProducts(): Product[] {
    return [..._products];
}

/** SELECT * FROM products WHERE id = ? */
export function getProductById(id: number): Product | undefined {
    return _products.find(p => p.id === id);
}

/** SELECT * FROM products WHERE category = ? */
export function getProductsByCategory(category: string): Product[] {
    if (category === 'All') return [..._products];
    return _products.filter(p => p.category === category);
}

/** SELECT * FROM products WHERE badge IN ('Best Seller','New') LIMIT 3 */
export function getFeaturedProducts(): Product[] {
    return _products.filter(p => p.badge === 'Best Seller' || p.badge === 'New').slice(0, 3);
}

/** SELECT * FROM products WHERE name LIKE ? OR description LIKE ? */
export function searchProducts(keyword: string): Product[] {
    const kw = keyword.toLowerCase();
    return _products.filter(p =>
        p.name.toLowerCase().includes(kw) || p.description.toLowerCase().includes(kw)
    );
}

/** SELECT * FROM testimonials ORDER BY id */
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
