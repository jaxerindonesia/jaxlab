export type ProductSeed = {
  name: string;
  category: string;
  subtitle: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  rating: number;
  reviewCount: number;
  stockStatus: 'Tersedia' | 'Habis' | 'Terbatas';
  images: string[];
  specs: { label: string; value: string }[];
  benefits: string[];
};

export const seedCategories = [
  'Bone Broth',
  'Essential Oil',
  'Multivitamin',
  'Healthy Food',
  'Supplement',
] as const;

export const seedProducts: ProductSeed[] = [
  {
    name: 'JaxLab Bone Broth Original',
    subtitle: 'Kaldu Tulang Sapi Premium – Kaya Kolagen & Mineral',
    description: 'Kaldu tulang sapi murni kaya kolagen, asam amino, dan mineral esensial.',
    longDescription:
      'JaxLab Bone Broth Original dibuat dari tulang sapi pilihan yang dimasak perlahan selama 24 jam untuk mengekstrak kolagen, asam amino, dan mineral secara maksimal. Tanpa pengawet, tanpa MSG, tanpa bahan tambahan buatan. Cocok dikonsumsi langsung atau sebagai bahan masakan bergizi.',
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
    name: 'Jaroliva Olive Oil + Rosemary',
    subtitle: 'Minyak Zaitun Premium dengan Rosemary Segar',
    description: 'Minyak zaitun extra virgin berkualitas tinggi dengan infusi rosemary segar.',
    longDescription:
      'Jaroliva Olive Oil + Rosemary adalah paduan sempurna antara minyak zaitun extra virgin premium dan rosemary segar yang diproses secara cold-press. Kaya antioksidan dan lemak sehat omega-3. Ideal untuk memasak, salad dressing, atau dikonsumsi langsung.',
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
    name: 'Ketone Immuno Booster',
    subtitle: 'Suplemen Imunitas – Formula Ketogenik Alami',
    description: 'Suplemen pendukung imunitas berbasis bahan-bahan alami formula ketogenik.',
    longDescription:
      'Ketone Immuno Booster diformulasikan khusus untuk mendukung energi tubuh dan sistem imun dengan pendekatan ketogenik alami. Mengandung MCT Oil, vitamin C alami, zinc, dan ekstrak herbal pilihan yang bekerja sinergis meningkatkan daya tahan tubuh.',
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
    name: 'Raw Honey Forest Grade A',
    subtitle: 'Madu Hutan Murni Tanpa Filter – Kaya Enzim Alami',
    description: 'Madu hutan mentah Grade A langsung dari lebah liar pegunungan Indonesia.',
    longDescription:
      'Raw Honey Forest Grade A adalah madu hutan murni yang dipanen langsung dari sarang lebah liar di hutan pegunungan Kalimantan. Tidak dipanaskan, tidak difilter, sehingga seluruh enzim, serbuk sari, propolis, dan antioksidan alami tetap terjaga. Rasa kaya dan kompleks dengan aroma hutan yang khas.',
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
    name: 'JaxLab Bone Broth Chicken',
    subtitle: 'Kaldu Ayam Kampung – Ringan & Bergizi Tinggi',
    description: 'Kaldu ayam kampung slow-cook kaya gelatin dan asam amino esensial.',
    longDescription:
      'JaxLab Bone Broth Chicken dibuat dari tulang ayam kampung segar yang dimasak lambat selama 18 jam. Kaya gelatin alami, asam amino esensial, dan mineral. Lebih ringan dari varian sapi, cocok untuk anak-anak, ibu hamil, dan lansia. Tanpa bahan tambahan apapun.',
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
    name: 'VitaGreen Multivitamin Alami',
    subtitle: 'Multivitamin Berbasis Sayuran Hijau & Superfood',
    description: 'Multivitamin lengkap dari ekstrak sayuran hijau, spirulina, dan superfood.',
    longDescription:
      'VitaGreen adalah multivitamin alami yang diformulasikan dari ekstrak sayuran hijau organik, spirulina, chlorella, dan superfood terpilih. Mengandung lebih dari 20 vitamin dan mineral esensial dalam bentuk yang mudah diserap tubuh. Vegan-friendly dan bebas gluten.',
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

