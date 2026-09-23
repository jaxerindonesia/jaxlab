import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Eye, Lock, Database, UserCheck, Mail, Info, CheckCircle2, Scale, Clock, AlertCircle } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const lastUpdated = '23 September 2026';

interface PolicySection {
  id: string;
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}

const sections: PolicySection[] = [
  {
    id: 'dasar-hukum-dan-ruang-lingkup',
    icon: <Scale size={20} />,
    title: '1. Landasan Hukum Pelindungan Data Pribadi (UU PDP No. 27/2022)',
    content: (
      <div className="flex flex-col gap-3 text-[0.875rem] leading-[1.75] text-[#374151]">
        <p>
          Kebijakan Privasi ini disusun dan diberlakukan sebagai bentuk komitmen kepatuhan JaxLab Indonesia terhadap <strong>Undang-Undang Republik Indonesia Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP)</strong> serta Peraturan Pemerintah Nomor 71 Tahun 2019 tentang Penyelenggaraan Sistem dan Transaksi Elektronik.
        </p>
        <p>
          JaxLab Indonesia berkedudukan sebagai <strong>Pengendali Data Pribadi</strong> yang bertanggung jawab atas pengelolaan, penyimpanan, dan pemrosesan data pribadi Anda secara sah, patut, transparan, dan terbatas pada tujuan yang telah disetujui.
        </p>
      </div>
    ),
  },
  {
    id: 'informasi-yang-dikumpulkan',
    icon: <Database size={20} />,
    title: '2. Kategori Data Pribadi yang Kami Kumpulkan',
    content: (
      <div className="flex flex-col gap-3 text-[0.875rem] leading-[1.75] text-[#374151]">
        <p>
          Sesuai dengan klasifikasi Pasal 4 UU PDP, jenis data pribadi yang kami kumpulkan mencakup Data Pribadi Umum:
        </p>
        <ul className="ml-4 flex flex-col gap-1.5 list-disc">
          <li><strong className="text-[#193421]">Data Identitas:</strong> Nama lengkap, tanggal lahir/usia (untuk verifikasi kelayakan transaksi), dan jenis kelamin.</li>
          <li><strong className="text-[#193421]">Data Kontak &amp; Pengiriman:</strong> Alamat email aktif, nomor telepon/WhatsApp, dan alamat domisili/pengiriman barang lengkap dengan kode pos.</li>
          <li><strong className="text-[#193421]">Data Akun &amp; Kredensial:</strong> Username, kata sandi yang tersimpan dalam format hash terenkripsi (bcrypt/argon2), serta riwayat pesanan/transaksi.</li>
          <li><strong className="text-[#193421]">Data Teknis:</strong> Alamat IP, jenis peramban (browser), sistem operasi perangkat, serta cookie sesi untuk keamanan akses.</li>
        </ul>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5 text-xs text-emerald-950">
          <strong>Perhatian:</strong> JaxLab tidak pernah mengumpulkan atau menyimpan nomor kartu kredit/debit lengkap atau kode CVV Anda secara langsung. Seluruh pembayaran diproses oleh Payment Gateway resmi berizin Bank Indonesia yang telah tersertifikasi PCI-DSS Level 1.
        </div>
      </div>
    ),
  },
  {
    id: 'tujuan-pemrosesan',
    icon: <Eye size={20} />,
    title: '3. Dasar & Tujuan Pemrosesan Data Pribadi',
    content: (
      <div className="flex flex-col gap-3 text-[0.875rem] leading-[1.75] text-[#374151]">
        <p>Kami memproses data pribadi Anda berdasarkan:</p>
        <ul className="ml-4 flex flex-col gap-1.5 list-disc">
          <li><strong>Persetujuan eksplisit</strong> yang Anda berikan saat mendaftar akun atau mencentang persetujuan syarat privasi saat checkout.</li>
          <li><strong>Pelaksanaan kontrak perjanjian jual beli</strong> untuk memproses invoice, pengemasan produk, dan pengiriman barang ke alamat Anda.</li>
          <li><strong>Kepatuhan terhadap kewajiban hukum</strong> perpajakan dan pelaporan transaksi keuangan di Indonesia.</li>
        </ul>
        <p>Tujuan pemrosesan mencakup:</p>
        <ul className="ml-4 flex flex-col gap-1.5 list-disc">
          <li>Memverifikasi identitas dan akun member JaxLab.</li>
          <li>Memproses transaksi pemesanan produk dan mengoordinasikan pengiriman dengan ekspedisi.</li>
          <li>Menyediakan layanan purnajual, customer care, dan penanganan klaim garansi atau refund.</li>
          <li>Mendeteksi, mencegah, dan menangani aktivitas penipuan atau ancaman keamanan siber.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'hak-subjek-data',
    icon: <Shield size={20} />,
    title: '4. Hak-Hak Anda sebagai Subjek Data (Pasal 5 - 13 UU PDP)',
    content: (
      <div className="flex flex-col gap-3 text-[0.875rem] leading-[1.75] text-[#374151]">
        <p>Sebagai pemilik data pribadi, Undang-Undang PDP menjamin hak-hak Anda, antara lain:</p>
        <div className="grid gap-2.5 sm:grid-cols-2">
          <div className="rounded-xl border border-[#e8e2da] bg-[#faf8f5] p-3 text-xs">
            <strong className="text-[#193421] block mb-1">Hak Akses &amp; Salinan (Pasal 6)</strong>
            Anda berhak meminta salinan data pribadi yang Anda serahkan kepada kami.
          </div>
          <div className="rounded-xl border border-[#e8e2da] bg-[#faf8f5] p-3 text-xs">
            <strong className="text-[#193421] block mb-1">Hak Koreksi / Perbaikan (Pasal 7)</strong>
            Anda berhak memperbarui dan memperbaiki kesalahan data pribadi Anda sewaktu-waktu melalui profil akun.
          </div>
          <div className="rounded-xl border border-[#e8e2da] bg-[#faf8f5] p-3 text-xs">
            <strong className="text-[#193421] block mb-1">Hak Penghapusan &amp; Pemusnahan (Pasal 8)</strong>
            Anda berhak meminta penutupan akun dan penghapusan data pribadi Anda, sepanjang tidak bertentangan dengan kewajiban retensi hukum.
          </div>
          <div className="rounded-xl border border-[#e8e2da] bg-[#faf8f5] p-3 text-xs">
            <strong className="text-[#193421] block mb-1">Hak Penarikan Persetujuan (Pasal 9)</strong>
            Anda berhak mencabut persetujuan pemrosesan data pribadi untuk keperluan buletin atau komunikasi promosi.
          </div>
        </div>
        <p className="mt-1">
          Untuk menggunakan hak-hak di atas, Anda dapat mengirimkan permohonan tertulis ke alamat email resmi kami di <strong>itsupport@jaxergroup.com</strong>.
        </p>
      </div>
    ),
  },
  {
    id: 'keamanan-dan-insiden-data',
    icon: <Lock size={20} />,
    title: '5. Keamanan Data & Penanganan Insiden Kebocoran',
    content: (
      <div className="flex flex-col gap-3 text-[0.875rem] leading-[1.75] text-[#374151]">
        <p>
          JaxLab menerapkan standar keamanan teknis dan organisasi yang ketat, termasuk penggunaan protokol HTTPS/TLS modern, pembatasan hak akses berbasis peran (RBAC), serta pemantauan integritas sistem secara berkelanjutan.
        </p>
        <p>
          Sesuai dengan <strong>Pasal 46 UU PDP</strong>, dalam hal terjadi kegagalan pelindungan data pribadi (insiden siber atau kebocoran data), JaxLab berkewajiban menyampaikan pemberitahuan tertulis maksimal dalam waktu <strong>3 x 24 jam</strong> kepada subjek data yang terdampak dan lembaga pemerintah yang berwenang.
        </p>
      </div>
    ),
  },
  {
    id: 'berbagi-informasi',
    icon: <UserCheck size={20} />,
    title: '6. Pengungkapan Terbatas kepada Pihak Ketiga',
    content: (
      <div className="flex flex-col gap-3 text-[0.875rem] leading-[1.75] text-[#374151]">
        <p>
          JaxLab <strong>tidak pernah menjual, menyewakan, atau memperdagangkan data pribadi Anda</strong> kepada pihak ketiga manapun untuk kepentingan periklanan pihak luar. Data hanya dibagikan secara terbatas untuk operasional layanan:
        </p>
        <ul className="ml-4 flex flex-col gap-1.5 list-disc">
          <li><strong className="text-[#193421]">Penyedia Jasa Logistik / Kurir:</strong> Untuk keperluan pengiriman fisik pesanan (nama penerima, alamat, dan nomor telepon kontak pengantaran).</li>
          <li><strong className="text-[#193421]">Mitra Payment Gateway Berizin BI:</strong> Untuk memverifikasi status pembayaran secara real-time.</li>
          <li><strong className="text-[#193421]">Aparat Penegak Hukum:</strong> Hanya jika diwajibkan oleh penetapan pengadilan atau ketentuan hukum yang sah di Republik Indonesia.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'masa-retensi-data',
    icon: <Clock size={20} />,
    title: '7. Masa Retensi & Penyimpanan Data Pribadi',
    content: (
      <div className="flex flex-col gap-3 text-[0.875rem] leading-[1.75] text-[#374151]">
        <p>
          Kami menyimpan data pribadi Anda selama akun Anda berstatus aktif atau selama diperlukan untuk memenuhi tujuan pengumpulannya.
        </p>
        <p>
          Sesuai dengan ketentuan <strong>Undang-Undang Nomor 8 Tahun 1997 tentang Dokumen Perusahaan</strong> dan peraturan perpajakan di Indonesia, data transaksi keuangan dan riwayat pemesanan akan disimpan minimal selama <strong>5 (lima) tahun</strong> untuk keperluan audit dan kepatuhan hukum sebelum dihapus atau dianonimkan secara permanen.
        </p>
      </div>
    ),
  },
  {
    id: 'cookie-storage',
    icon: <Info size={20} />,
    title: '8. Penggunaan Cookie & Penyimpanan Lokal',
    content: (
      <p className="text-[0.875rem] leading-[1.75] text-[#374151]">
        Website JaxLab menggunakan teknologi penyimpanan lokal (localStorage dan sesi peramban) murni untuk keperluan fungsionalitas esensial, seperti mengingat isi keranjang belanja, status login member, dan pengaturan tampilan. Anda dapat menghapus data ini kapan saja melalui menu riwayat peramban web Anda.
      </p>
    ),
  },
  {
    id: 'perubahan-kebijakan',
    icon: <AlertCircle size={20} />,
    title: '9. Pembaruan Kebijakan Privasi',
    content: (
      <p className="text-[0.875rem] leading-[1.75] text-[#374151]">
        Kebijakan ini dapat kami tinjau dan perbarui sewaktu-waktu untuk menyesuaikan dengan peraturan perundang-undangan pelindungan data pribadi yang berlaku di Indonesia. Setiap perubahan penting akan kami informasikan melalui pengumuman di website ini dengan mencantumkan tanggal revisi terbaru.
      </p>
    ),
  },
];

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#f9f5ec]">
      <Header />

      <main className="flex-1 px-6 pb-20 pt-32 max-[640px]:px-4 max-[640px]:pt-28">
        <div className="mx-auto max-w-4xl">
          {/* Quick Navigation Tabs */}
          <div className="mb-6 flex flex-wrap items-center gap-2 rounded-2xl border border-[#e8e2da] bg-white/80 p-2 text-xs font-semibold backdrop-blur-[10px]">
            <span className="px-3 py-1.5 text-[#374151]">Pilih Dokumen Legal:</span>
            <Link
              to="/privacy-policy"
              className="rounded-xl bg-[#193421] px-3 py-1.5 text-white"
            >
              Kebijakan Privasi
            </Link>
            <Link
              to="/terms-and-conditions"
              className="rounded-xl px-3 py-1.5 text-[#374151] transition hover:bg-[#f0ece5] hover:text-[#193421]"
            >
              Syarat &amp; Ketentuan
            </Link>
            <Link
              to="/refund-policy"
              className="rounded-xl px-3 py-1.5 text-[#374151] transition hover:bg-[#f0ece5] hover:text-[#193421]"
            >
              Kebijakan Pengembalian Dana
            </Link>
            <Link
              to="/terms-of-service"
              className="rounded-xl px-3 py-1.5 text-[#374151] transition hover:bg-[#f0ece5] hover:text-[#193421]"
            >
              Ketentuan Layanan
            </Link>
          </div>

          <article className="rounded-3xl border border-[#e8e2da] bg-white p-8 shadow-[0_15px_45px_rgba(34,52,40,0.06)] max-[640px]:p-5">
            {/* Header */}
            <div className="border-b border-[#e8e2da] pb-6">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f5e9] px-3 py-1 text-xs font-extrabold uppercase tracking-[0.1em] text-[#1b5e20]">
                  <CheckCircle2 size={13} /> Kepatuhan UU PDP No. 27/2022
                </span>
                <span className="inline-flex rounded-full bg-[#f0ece5] px-3 py-1 text-xs font-semibold text-[#374151]">
                  Pengendali Data: JaxLab Indonesia
                </span>
              </div>
              <h1 className="mt-3 text-3xl font-black text-[#193421] max-[640px]:text-2xl">
                Kebijakan Privasi
              </h1>
              <p className="mt-1 text-xs font-medium text-[#4b5563]">
                Terakhir Diperbarui: {lastUpdated} &bull; Sesuai Regulasi Pelindungan Data Pribadi Republik Indonesia
              </p>
              <p className="mt-4 leading-relaxed text-[#374151]">
                Kebijakan Privasi ini menjelaskan bagaimana JaxLab Indonesia mengumpulkan, memproses, menyimpan, dan melindungi data pribadi Anda saat menggunakan website kami, sesuai dengan standar Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP).
              </p>
            </div>

            {/* Sections */}
            <div className="mt-8 space-y-6">
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="rounded-2xl border border-[#f0ece5] bg-[#faf8f5]/60 p-6 max-[640px]:p-4"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e6f1ea] text-[#1a4d2e]">
                      {section.icon}
                    </div>
                    <h2 className="text-[1.05rem] font-bold text-[#193421]">{section.title}</h2>
                  </div>
                  {section.content}
                </section>
              ))}
            </div>

            {/* Contact / DPO Information */}
            <div className="mt-10 rounded-2xl border border-[#c8e6c9] bg-[#f1f8e9] p-6 text-[0.875rem] text-[#2e7d32]">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#d4edda] text-[#1a4d2e]">
                  <Mail size={18} />
                </div>
                <h2 className="text-base font-bold text-[#1b5e20]">Kontak Petugas Pelindungan Data (DPO) &amp; Layanan Bantuan</h2>
              </div>
              <p className="mb-3 leading-relaxed text-[#33691e]">
                Untuk melaksanakan hak-hak subjek data (penarikan persetujuan, permohonan akses, koreksi, atau penghapusan data) atau jika Anda memiliki pertanyaan terkait pelindungan data pribadi, silakan hubungi tim kami:
              </p>
              <div className="grid gap-2 text-xs sm:grid-cols-2 text-[#1b5e20]">
                <div>
                  <strong>Email Resmi Privasi &amp; DPO:</strong><br />
                  <a href="mailto:itsupport@jaxergroup.com" className="font-semibold underline hover:text-[#4ade80]">
                    itsupport@jaxergroup.com
                  </a>
                </div>
                <div>
                  <strong>Alamat Operasional:</strong><br />
                  Jl. Cempaka Putih Tengah XVII No.F33, Cempaka Putih, Jakarta Pusat, DKI Jakarta 10510
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#c8e6c9]">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1b5e20] transition-colors hover:text-[#4ade80]"
                >
                  Buka Halaman Kontak Layanan Pelanggan →
                </Link>
              </div>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
