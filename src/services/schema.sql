-- ============================================================
-- JaxLab Database Schema
-- SQLite (dijalankan via sql.js di browser)
-- ============================================================

PRAGMA foreign_keys = ON;

-- ─── TABLE: company_info ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS company_info (
    id          INTEGER PRIMARY KEY,
    name        TEXT NOT NULL,
    tagline     TEXT,
    description TEXT,
    email       TEXT,
    phone       TEXT,
    whatsapp    TEXT,
    address     TEXT,
    maps_embed  TEXT,
    ig          TEXT,
    facebook    TEXT,
    tiktok      TEXT,
    youtube     TEXT,
    working_hours TEXT
);

-- ─── TABLE: product_categories ───────────────────────────────
CREATE TABLE IF NOT EXISTS product_categories (
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);

-- ─── TABLE: products ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
    id              INTEGER PRIMARY KEY,
    name            TEXT NOT NULL,
    subtitle        TEXT,
    description     TEXT,
    long_description TEXT,
    price           INTEGER NOT NULL,
    original_price  INTEGER,
    category_id     INTEGER REFERENCES product_categories(id),
    badge           TEXT,          -- 'Best Seller' | 'New' | 'Sale' | NULL
    rating          REAL DEFAULT 0,
    review_count    INTEGER DEFAULT 0,
    stock_status    TEXT DEFAULT 'Tersedia'  -- 'Tersedia' | 'Terbatas' | 'Habis'
);

-- ─── TABLE: product_images ───────────────────────────────────
CREATE TABLE IF NOT EXISTS product_images (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    url        TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0
);

-- ─── TABLE: product_specs ────────────────────────────────────
CREATE TABLE IF NOT EXISTS product_specs (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    label      TEXT NOT NULL,
    value      TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0
);

-- ─── TABLE: product_benefits ─────────────────────────────────
CREATE TABLE IF NOT EXISTS product_benefits (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    benefit    TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0
);

-- ─── TABLE: testimonials ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS testimonials (
    id     INTEGER PRIMARY KEY AUTOINCREMENT,
    name   TEXT NOT NULL,
    role   TEXT,
    quote  TEXT,
    image  TEXT,
    rating INTEGER DEFAULT 5
);

-- ─── TABLE: team_members ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS team_members (
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    name  TEXT NOT NULL,
    role  TEXT,
    bio   TEXT,
    image TEXT
);

-- ─── TABLE: features ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS features (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    icon        TEXT,
    title       TEXT NOT NULL,
    description TEXT
);

-- ─── TABLE: stats ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS stats (
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    value TEXT NOT NULL,
    label TEXT NOT NULL
);

-- ============================================================
-- SEED DATA
-- ============================================================

-- Company Info
INSERT INTO company_info VALUES (
    1,
    'JaxLab',
    'Reliable Product to Enhanced Wellness',
    'JaxLab adalah merek produk makanan sehat alami yang menghadirkan Bone Broth, minyak zaitun premium, dan produk multivitamin alami. Kami berkomitmen pada bahan minimal proses untuk mendukung gaya hidup sehat sejak dini.',
    'hello@jaxlab.id',
    '+62 812-3456-7890',
    '6281234567890',
    'Jl. Cempaka Putih Tengah XVII No.F33, Jakarta Pusat, Indonesia',
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.130847862578!2d110.3695!3d-7.7956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNDcnNDQuMiJTIDExMMKwMjInMTAuMiJF!5e0!3m2!1sen!2sid!4v1000000000000',
    'https://instagram.com/jaxlab.id',
    'https://facebook.com/jaxlab.id',
    'https://tiktok.com/@jaxlab.id',
    'https://youtube.com/@jaxlab',
    'Senin – Jumat: 08.00 – 17.00 WIB'
);

-- Product Categories
INSERT INTO product_categories (name) VALUES ('Bone Broth');
INSERT INTO product_categories (name) VALUES ('Essential Oil');
INSERT INTO product_categories (name) VALUES ('Multivitamin');
INSERT INTO product_categories (name) VALUES ('Healthy Food');
INSERT INTO product_categories (name) VALUES ('Supplement');

-- ── Products ─────────────────────────────────────────────────
-- (1) Bone Broth Original
INSERT INTO products VALUES (
    1,
    'JaxLab Bone Broth Original',
    'Kaldu Tulang Sapi Premium – Kaya Kolagen & Mineral',
    'Kaldu tulang sapi murni kaya kolagen, asam amino, dan mineral esensial.',
    'JaxLab Bone Broth Original dibuat dari tulang sapi pilihan yang dimasak perlahan selama 24 jam untuk mengekstrak kolagen, asam amino, dan mineral secara maksimal. Tanpa pengawet, tanpa MSG, tanpa bahan tambahan buatan. Cocok dikonsumsi langsung atau sebagai bahan masakan bergizi.',
    125000, 150000, 1, 'Best Seller', 5.0, 248, 'Tersedia'
);

-- (2) Jaroliva Olive Oil
INSERT INTO products VALUES (
    2,
    'Jaroliva Olive Oil + Rosemary',
    'Minyak Zaitun Premium dengan Rosemary Segar',
    'Minyak zaitun extra virgin berkualitas tinggi dengan infusi rosemary segar.',
    'Jaroliva Olive Oil + Rosemary adalah paduan sempurna antara minyak zaitun extra virgin premium dan rosemary segar yang diproses secara cold-press. Kaya antioksidan dan lemak sehat omega-3. Ideal untuk memasak, salad dressing, atau dikonsumsi langsung.',
    189000, NULL, 2, 'New', 4.8, 173, 'Tersedia'
);

-- (3) Ketone Immuno
INSERT INTO products VALUES (
    3,
    'Ketone Immuno Booster',
    'Suplemen Imunitas – Formula Ketogenik Alami',
    'Suplemen pendukung imunitas berbasis bahan-bahan alami formula ketogenik.',
    'Ketone Immuno Booster diformulasikan khusus untuk mendukung energi tubuh dan sistem imun dengan pendekatan ketogenik alami. Mengandung MCT Oil, vitamin C alami, zinc, dan ekstrak herbal pilihan yang bekerja sinergis meningkatkan daya tahan tubuh.',
    235000, 275000, 5, 'Sale', 4.9, 312, 'Tersedia'
);

-- (4) Raw Honey
INSERT INTO products VALUES (
    4,
    'Raw Honey Forest Grade A',
    'Madu Hutan Murni Tanpa Filter – Kaya Enzim Alami',
    'Madu hutan mentah Grade A langsung dari lebah liar pegunungan Indonesia.',
    'Raw Honey Forest Grade A adalah madu hutan murni yang dipanen langsung dari sarang lebah liar di hutan pegunungan Kalimantan. Tidak dipanaskan, tidak difilter, sehingga seluruh enzim, serbuk sari, propolis, dan antioksidan alami tetap terjaga. Rasa kaya dan kompleks dengan aroma hutan yang khas.',
    95000, NULL, 4, NULL, 4.7, 189, 'Terbatas'
);

-- (5) Bone Broth Chicken
INSERT INTO products VALUES (
    5,
    'JaxLab Bone Broth Chicken',
    'Kaldu Ayam Kampung – Ringan & Bergizi Tinggi',
    'Kaldu ayam kampung slow-cook kaya gelatin dan asam amino esensial.',
    'JaxLab Bone Broth Chicken dibuat dari tulang ayam kampung segar yang dimasak lambat selama 18 jam. Kaya gelatin alami, asam amino esensial, dan mineral. Lebih ringan dari varian sapi, cocok untuk anak-anak, ibu hamil, dan lansia. Tanpa bahan tambahan apapun.',
    99000, NULL, 1, NULL, 4.8, 201, 'Tersedia'
);

-- (6) VitaGreen Multivitamin
INSERT INTO products VALUES (
    6,
    'VitaGreen Multivitamin Alami',
    'Multivitamin Berbasis Sayuran Hijau & Superfood',
    'Multivitamin lengkap dari ekstrak sayuran hijau, spirulina, dan superfood.',
    'VitaGreen adalah multivitamin alami yang diformulasikan dari ekstrak sayuran hijau organik, spirulina, chlorella, dan superfood terpilih. Mengandung lebih dari 20 vitamin dan mineral esensial dalam bentuk yang mudah diserap tubuh. Vegan-friendly dan bebas gluten.',
    175000, NULL, 3, 'Best Seller', 4.6, 156, 'Tersedia'
);

-- ── Product Images ────────────────────────────────────────────
-- Product 1 Images
INSERT INTO product_images (product_id, url, sort_order) VALUES (1, 'https://images.unsplash.com/photo-1588117305388-c2631a279f82?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 0);
INSERT INTO product_images (product_id, url, sort_order) VALUES (1, 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', 1);
INSERT INTO product_images (product_id, url, sort_order) VALUES (1, 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', 2);
INSERT INTO product_images (product_id, url, sort_order) VALUES (1, 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', 3);

-- Product 2 Images
INSERT INTO product_images (product_id, url, sort_order) VALUES (2, 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 0);
INSERT INTO product_images (product_id, url, sort_order) VALUES (2, 'https://images.unsplash.com/photo-1608571423902-eed4a5e84d85?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', 1);
INSERT INTO product_images (product_id, url, sort_order) VALUES (2, 'https://images.unsplash.com/photo-1601060286854-0d84bb93a1eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', 2);
INSERT INTO product_images (product_id, url, sort_order) VALUES (2, 'https://images.unsplash.com/photo-1559181567-c3190ca9be46?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', 3);

-- Product 3 Images
INSERT INTO product_images (product_id, url, sort_order) VALUES (3, 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 0);
INSERT INTO product_images (product_id, url, sort_order) VALUES (3, 'https://images.unsplash.com/photo-1624638760086-44445672803b?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', 1);
INSERT INTO product_images (product_id, url, sort_order) VALUES (3, 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', 2);
INSERT INTO product_images (product_id, url, sort_order) VALUES (3, 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', 3);

-- Product 4 Images
INSERT INTO product_images (product_id, url, sort_order) VALUES (4, 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 0);
INSERT INTO product_images (product_id, url, sort_order) VALUES (4, 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', 1);
INSERT INTO product_images (product_id, url, sort_order) VALUES (4, 'https://images.unsplash.com/photo-1471943311424-646960669fbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', 2);
INSERT INTO product_images (product_id, url, sort_order) VALUES (4, 'https://images.unsplash.com/photo-1601497803462-2cbfb371c2b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', 3);

-- Product 5 Images
INSERT INTO product_images (product_id, url, sort_order) VALUES (5, 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 0);
INSERT INTO product_images (product_id, url, sort_order) VALUES (5, 'https://images.unsplash.com/photo-1588117305388-c2631a279f82?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', 1);
INSERT INTO product_images (product_id, url, sort_order) VALUES (5, 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', 2);
INSERT INTO product_images (product_id, url, sort_order) VALUES (5, 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', 3);

-- Product 6 Images
INSERT INTO product_images (product_id, url, sort_order) VALUES (6, 'https://images.unsplash.com/photo-1624638760086-44445672803b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 0);
INSERT INTO product_images (product_id, url, sort_order) VALUES (6, 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', 1);
INSERT INTO product_images (product_id, url, sort_order) VALUES (6, 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', 2);
INSERT INTO product_images (product_id, url, sort_order) VALUES (6, 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', 3);

-- ── Product Specs ─────────────────────────────────────────────
-- Product 1 Specs
INSERT INTO product_specs (product_id, label, value, sort_order) VALUES (1, 'Berat Bersih', '500 ml', 0);
INSERT INTO product_specs (product_id, label, value, sort_order) VALUES (1, 'Bahan Utama', 'Tulang Sapi Segar', 1);
INSERT INTO product_specs (product_id, label, value, sort_order) VALUES (1, 'Proses', 'Slow Cook 24 Jam', 2);
INSERT INTO product_specs (product_id, label, value, sort_order) VALUES (1, 'Tanpa', 'MSG, Pengawet, Pewarna', 3);
INSERT INTO product_specs (product_id, label, value, sort_order) VALUES (1, 'Sertifikasi', 'Halal MUI', 4);

-- Product 2 Specs
INSERT INTO product_specs (product_id, label, value, sort_order) VALUES (2, 'Volume', '250 ml', 0);
INSERT INTO product_specs (product_id, label, value, sort_order) VALUES (2, 'Jenis', 'Extra Virgin Olive Oil', 1);
INSERT INTO product_specs (product_id, label, value, sort_order) VALUES (2, 'Proses', 'Cold Press', 2);
INSERT INTO product_specs (product_id, label, value, sort_order) VALUES (2, 'Infusi', 'Rosemary Segar', 3);
INSERT INTO product_specs (product_id, label, value, sort_order) VALUES (2, 'Acidity', '< 0.8%', 4);

-- Product 3 Specs
INSERT INTO product_specs (product_id, label, value, sort_order) VALUES (3, 'Isi', '60 Kapsul', 0);
INSERT INTO product_specs (product_id, label, value, sort_order) VALUES (3, 'Kandungan Utama', 'MCT Oil, Vitamin C, Zinc', 1);
INSERT INTO product_specs (product_id, label, value, sort_order) VALUES (3, 'Anjuran Konsumsi', '2 kapsul / hari', 2);
INSERT INTO product_specs (product_id, label, value, sort_order) VALUES (3, 'Cocok untuk', 'Diet Keto & Umum', 3);
INSERT INTO product_specs (product_id, label, value, sort_order) VALUES (3, 'Sertifikasi', 'BPOM & Halal MUI', 4);

-- Product 4 Specs
INSERT INTO product_specs (product_id, label, value, sort_order) VALUES (4, 'Berat', '350 gram', 0);
INSERT INTO product_specs (product_id, label, value, sort_order) VALUES (4, 'Sumber', 'Lebah Liar Kalimantan', 1);
INSERT INTO product_specs (product_id, label, value, sort_order) VALUES (4, 'Proses', 'Raw, Unfiltered', 2);
INSERT INTO product_specs (product_id, label, value, sort_order) VALUES (4, 'Kadar Air', '< 18%', 3);
INSERT INTO product_specs (product_id, label, value, sort_order) VALUES (4, 'Warna', 'Amber Gelap', 4);

-- Product 5 Specs
INSERT INTO product_specs (product_id, label, value, sort_order) VALUES (5, 'Berat Bersih', '500 ml', 0);
INSERT INTO product_specs (product_id, label, value, sort_order) VALUES (5, 'Bahan Utama', 'Tulang Ayam Kampung', 1);
INSERT INTO product_specs (product_id, label, value, sort_order) VALUES (5, 'Proses', 'Slow Cook 18 Jam', 2);
INSERT INTO product_specs (product_id, label, value, sort_order) VALUES (5, 'Cocok untuk', 'Semua Usia', 3);
INSERT INTO product_specs (product_id, label, value, sort_order) VALUES (5, 'Sertifikasi', 'Halal MUI', 4);

-- Product 6 Specs
INSERT INTO product_specs (product_id, label, value, sort_order) VALUES (6, 'Isi', '90 Tablet', 0);
INSERT INTO product_specs (product_id, label, value, sort_order) VALUES (6, 'Kandungan', 'Spirulina, Chlorella, Vitamin C/D/B', 1);
INSERT INTO product_specs (product_id, label, value, sort_order) VALUES (6, 'Anjuran', '1 tablet / hari', 2);
INSERT INTO product_specs (product_id, label, value, sort_order) VALUES (6, 'Cocok untuk', 'Vegetarian & Vegan', 3);
INSERT INTO product_specs (product_id, label, value, sort_order) VALUES (6, 'Bebas', 'Gluten, Dairy, Soy', 4);

-- ── Product Benefits ──────────────────────────────────────────
-- Product 1 Benefits
INSERT INTO product_benefits (product_id, benefit, sort_order) VALUES (1, 'Mendukung kesehatan sendi dan tulang', 0);
INSERT INTO product_benefits (product_id, benefit, sort_order) VALUES (1, 'Meningkatkan kualitas kulit dengan kolagen alami', 1);
INSERT INTO product_benefits (product_id, benefit, sort_order) VALUES (1, 'Membantu regenerasi sel dan pemulihan tubuh', 2);
INSERT INTO product_benefits (product_id, benefit, sort_order) VALUES (1, 'Meningkatkan imunitas secara alami', 3);

-- Product 2 Benefits
INSERT INTO product_benefits (product_id, benefit, sort_order) VALUES (2, 'Kaya antioksidan polyphenol', 0);
INSERT INTO product_benefits (product_id, benefit, sort_order) VALUES (2, 'Mendukung kesehatan jantung dan kolesterol', 1);
INSERT INTO product_benefits (product_id, benefit, sort_order) VALUES (2, 'Anti-inflamasi alami', 2);
INSERT INTO product_benefits (product_id, benefit, sort_order) VALUES (2, 'Meningkatkan penyerapan nutrisi', 3);

-- Product 3 Benefits
INSERT INTO product_benefits (product_id, benefit, sort_order) VALUES (3, 'Meningkatkan energi sepanjang hari', 0);
INSERT INTO product_benefits (product_id, benefit, sort_order) VALUES (3, 'Memperkuat sistem imun tubuh', 1);
INSERT INTO product_benefits (product_id, benefit, sort_order) VALUES (3, 'Mendukung metabolisme sehat', 2);
INSERT INTO product_benefits (product_id, benefit, sort_order) VALUES (3, 'Membantu fokus dan konsentrasi', 3);

-- Product 4 Benefits
INSERT INTO product_benefits (product_id, benefit, sort_order) VALUES (4, 'Antibakteri dan antivirus alami', 0);
INSERT INTO product_benefits (product_id, benefit, sort_order) VALUES (4, 'Sumber energi instan yang sehat', 1);
INSERT INTO product_benefits (product_id, benefit, sort_order) VALUES (4, 'Kaya antioksidan dan enzim', 2);
INSERT INTO product_benefits (product_id, benefit, sort_order) VALUES (4, 'Mendukung kesehatan pencernaan', 3);

-- Product 5 Benefits
INSERT INTO product_benefits (product_id, benefit, sort_order) VALUES (5, 'Mendukung pertumbuhan anak secara alami', 0);
INSERT INTO product_benefits (product_id, benefit, sort_order) VALUES (5, 'Meningkatkan elastisitas kulit', 1);
INSERT INTO product_benefits (product_id, benefit, sort_order) VALUES (5, 'Membantu pemulihan pasca sakit', 2);
INSERT INTO product_benefits (product_id, benefit, sort_order) VALUES (5, 'Sumber protein dan mineral mudah serap', 3);

-- Product 6 Benefits
INSERT INTO product_benefits (product_id, benefit, sort_order) VALUES (6, 'Melengkapi kebutuhan vitamin & mineral harian', 0);
INSERT INTO product_benefits (product_id, benefit, sort_order) VALUES (6, 'Meningkatkan energi dan vitalitas', 1);
INSERT INTO product_benefits (product_id, benefit, sort_order) VALUES (6, 'Mendukung detoksifikasi alami', 2);
INSERT INTO product_benefits (product_id, benefit, sort_order) VALUES (6, 'Menjaga keseimbangan nutrisi', 3);

-- ── Testimonials ──────────────────────────────────────────────
INSERT INTO testimonials (name, role, quote, image, rating) VALUES (
    'Budi Santoso', 'Pengusaha, Yogyakarta',
    'Dulu sering merasa lelah dan kurang fokus. Setelah 3 bulan rutin konsumsi Ketone Immuno, energi saya lebih stabil sepanjang hari. Produktivitas kerja meningkat drastis!',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', 5
);
INSERT INTO testimonials (name, role, quote, image, rating) VALUES (
    'Maya Putri', 'Yoga Instructor, Bali',
    'Jaroliva Olive Oil dengan rosemary jadi favorit saya untuk memasak. Aromanya harum dan rasa masakan jadi lebih premium. Manfaat kesehatannya luar biasa untuk gaya hidup sehat.',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', 5
);
INSERT INTO testimonials (name, role, quote, image, rating) VALUES (
    'Dr. Rudi Hermawan', 'Dokter Keluarga, Semarang',
    'Saya merekomendasikan produk JaxLab kepada pasien yang ingin meningkatkan kesehatan secara alami. Kualitas bahan dan transparansi proses produksinya sangat bisa dipercaya.',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', 5
);
INSERT INTO testimonials (name, role, quote, image, rating) VALUES (
    'Sari Rahayu', 'Ibu Rumah Tangga, Jakarta',
    'Bone Broth JaxLab sudah jadi menu wajib keluarga kami. Anak-anak suka rasanya dan saya tenang karena tahu bahan-bahannya alami dan halal. Terima kasih JaxLab!',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', 5
);
INSERT INTO testimonials (name, role, quote, image, rating) VALUES (
    'Ahmad Fauzi', 'Atlet Lari, Surabaya',
    'Pemulihan otot saya jauh lebih cepat sejak rutin minum Bone Broth JaxLab setelah latihan. Ini produk wajib buat semua atlet yang peduli kesehatan jangka panjang.',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', 5
);

-- ── Team Members ──────────────────────────────────────────────
INSERT INTO team_members (name, role, bio, image) VALUES ('Ahmad Fariz Jax', 'Founder & CEO', 'Penggagas JaxLab yang percaya bahwa makanan alami adalah fondasi kesehatan sejati. Berpengalaman 10 tahun di industri pangan sehat.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80');
INSERT INTO team_members (name, role, bio, image) VALUES ('Laila Nurhayati', 'Co-Founder & Head of Product', 'Ahli gizi berpengalaman yang merancang setiap formula produk JaxLab untuk memastikan nutrisi optimal dan bahan terpilih.', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80');
INSERT INTO team_members (name, role, bio, image) VALUES ('Dr. Rina Susanti', 'Head of Quality Assurance', 'Doktor ilmu pangan yang memastikan setiap produk JaxLab memenuhi standar keamanan pangan tertinggi dan bersertifikasi halal.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80');
INSERT INTO team_members (name, role, bio, image) VALUES ('Hendra Kusuma', 'Head of Marketing', 'Strategi pemasaran digital yang berfokus pada edukasi komunitas sehat. Percaya bahwa produk baik tak butuh membohongi konsumen.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80');
INSERT INTO team_members (name, role, bio, image) VALUES ('Dewi Anggraini', 'Community Manager', 'Membangun komunitas JaxLab Health Partner yang kini telah berkembang menjadi ribuan anggota di seluruh Indonesia.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80');
INSERT INTO team_members (name, role, bio, image) VALUES ('Rizky Prabowo', 'R&D Specialist', 'Peneliti yang terus mengembangkan formula produk baru JaxLab berbasis riset ilmiah dan kearifan lokal Indonesia.', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80');

-- ── Features ──────────────────────────────────────────────────
INSERT INTO features (icon, title, description) VALUES ('Leaf', 'Minim Proses, Lebih Alami', 'Diproses seminimal mungkin untuk menjaga nutrisi dan karakter alami bahan baku.');
INSERT INTO features (icon, title, description) VALUES ('Award', 'Tanpa Tambahan Buatan', 'Bebas pengawet sintetis, pewarna buatan, MSG, dan bahan kimia tambahan.');
INSERT INTO features (icon, title, description) VALUES ('ShieldCheck', 'Bersertifikasi Halal & BPOM', 'Seluruh produk telah tersertifikasi Halal MUI dan terdaftar di BPOM RI.');
INSERT INTO features (icon, title, description) VALUES ('Heart', 'Untuk Kebiasaan Sehat Harian', 'Dirancang untuk mudah diintegrasikan ke dalam rutinitas sehari-hari keluarga Anda.');

-- ── Stats ─────────────────────────────────────────────────────
INSERT INTO stats (value, label) VALUES ('10.000+', 'Pelanggan Puas');
INSERT INTO stats (value, label) VALUES ('6', 'Produk Premium');
INSERT INTO stats (value, label) VALUES ('5', 'Tahun Berpengalaman');
INSERT INTO stats (value, label) VALUES ('100%', 'Bahan Alami');
