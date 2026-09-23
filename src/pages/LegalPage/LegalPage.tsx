import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, CheckCircle2, AlertTriangle } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

type Section = {
  title: string;
  body: string | React.ReactNode;
};

interface LegalPageData {
  badge: string;
  title: string;
  lastUpdated: string;
  intro: string;
  lawReference: string;
  sections: Section[];
}

const content: Record<string, LegalPageData> = {
  terms: {
    badge: 'Ketentuan Transaksi & Perdagangan Elektronik (PMSE)',
    title: 'Syarat & Ketentuan',
    lastUpdated: '23 September 2026',
    intro:
      'Syarat & Ketentuan ini mengatur seluruh kegiatan transaksi pembelian produk, pemesanan, dan penggunaan layanan komersial pada website JaxLab Indonesia. Syarat ini disusun berdasarkan Undang-Undang Republik Indonesia Nomor 8 Tahun 1999 tentang Perlindungan Konsumen, Peraturan Pemerintah Nomor 80 Tahun 2019 tentang Perdagangan Melalui Sistem Elektronik (PMSE), serta Peraturan Menteri Perdagangan Nomor 31 Tahun 2023.',
    lawReference: 'UU No. 8/1999 (Perlindungan Konsumen) & PP No. 80/2019 (PMSE)',
    sections: [
      {
        title: '1. Ketentuan Umum & Kelayakan Pengguna',
        body: (
          <div className="space-y-3">
            <p>
              Dengan mengakses website JaxLab dan/atau melakukan pemesanan, Anda menyatakan dan menjamin bahwa:
            </p>
            <ul className="ml-5 list-disc space-y-1.5 text-[#374151]">
              <li>Anda telah berusia minimal <strong>21 (dua puluh satu) tahun</strong> atau telah menikah sesuai ketentuan Pasal 330 KUHPerdata, atau menggunakan layanan ini di bawah pengawasan dan persetujuan sah dari orang tua/wali.</li>
              <li>Data dan informasi diri yang Anda berikan (nama lengkap, nomor telepon aktif, email, dan alamat pengiriman) adalah akurat, benar, terkini, dan lengkap.</li>
              <li>Anda menyetujui transaksi elektronik yang dilakukan melalui website ini memiliki kekuatan hukum yang sah dan mengikat para pihak.</li>
            </ul>
          </div>
        ),
      },
      {
        title: '2. Informasi Produk & Disclaimer Kesehatan (BPOM & UU Kesehatan)',
        body: (
          <div className="space-y-3">
            <p>
              JaxLab menyediakan produk pangan alami dan suplemen pendukung gaya hidup sehat (seperti Bone Broth, Extra Virgin Olive Oil, Cocofenol, dan Ketone Imuno Booster).
            </p>
            <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-[0.875rem] text-amber-900">
              <div className="flex items-center gap-2 font-bold mb-1 text-amber-950">
                <AlertTriangle size={18} className="text-amber-600" />
                Penting: Disclaimer Medis & Kesehatan
              </div>
              <p className="leading-relaxed">
                Seluruh informasi produk, materi edukasi Fat Fasting, dan panduan yang disediakan di website ini ditujukan sebagai edukasi nutrisi dan gaya hidup, serta <strong>bukan merupakan nasihat medis, resep obat, atau diagnosis pengganti tenaga medis/dokter spesialis</strong>. Konsultasikan terlebih dahulu dengan dokter Anda sebelum memulai protokol puasa atau program diet khusus, terutama bagi penderita penyakit kronis, ibu hamil, atau menyusui.
              </p>
            </div>
          </div>
        ),
      },
      {
        title: '3. Harga, Mata Uang, dan Perpajakan',
        body: (
          <ul className="ml-5 list-disc space-y-1.5 text-[#374151]">
            <li>Sesuai dengan <strong>Undang-Undang Nomor 7 Tahun 2011 tentang Mata Uang</strong>, seluruh harga produk yang ditampilkan di website JaxLab menggunakan mata uang resmi <strong>Rupiah (IDR)</strong>.</li>
            <li>Harga yang tercantum adalah harga resmi yang berlaku pada saat transaksi dilakukan. JaxLab berhak memperbarui harga sewaktu-waktu tanpa pemberitahuan sebelumnya, namun tidak berlaku surut bagi transaksi yang pembayarannya telah terverifikasi.</li>
            <li>Biaya pengiriman dihitung secara transparan saat checkout berdasarkan berat paket, dimensi, dan tarif resmi kurir pihak ketiga yang terintegrasi (RajaOngkir).</li>
          </ul>
        ),
      },
      {
        title: '4. Tata Cara Pemesanan & Pembayaran',
        body: (
          <div className="space-y-3">
            <p>
              Pemesanan produk dilakukan melalui tahapan checkout yang transparan:
            </p>
            <ol className="ml-5 list-decimal space-y-1.5 text-[#374151]">
              <li>Pelanggan memilih produk, ukuran/kemasan, dan jumlah yang diinginkan ke dalam Keranjang Belanja.</li>
              <li>Pelanggan mengisi atau memilih alamat pengiriman lengkap beserta layanan kurir yang tersedia.</li>
              <li>Pelanggan memilih metode pembayaran resmi yang disediakan oleh Payment Gateway berizin Bank Indonesia (seperti QRIS, Transfer Bank/Virtual Account, e-Wallet, atau Kartu Kredit/Debit).</li>
              <li>Pesanan dianggap sah dan akan diproses pengirimannya setelah pembayaran berhasil terverifikasi otomatis oleh sistem pembayaran.</li>
            </ol>
          </div>
        ),
      },
      {
        title: '5. Pengiriman dan Penerimaan Pesanan',
        body: (
          <ul className="ml-5 list-disc space-y-1.5 text-[#374151]">
            <li>Pesanan akan dikemas menggunakan standar keamanan kemasan pangan (bubble wrap/kardus pelindung khusus untuk produk botol kaca/cairan).</li>
            <li>Waktu operasional pengiriman adalah hari kerja (Senin - Sabtu). Pesanan yang diverifikasi pada hari Minggu atau Hari Libur Nasional akan diproses pada hari kerja berikutnya.</li>
            <li>Nomor resi pengiriman resmi akan diperbarui pada akun member dan/atau dikirimkan ke email/WhatsApp pemesan setelah paket diserahkan ke pihak ekspedisi.</li>
          </ul>
        ),
      },
      {
        title: '6. Hak Konsumen & Perlindungan terhadap Klausula Baku',
        body: (
          <div className="space-y-3">
            <p>
              Sesuai dengan <strong>Pasal 18 Undang-Undang Nomor 8 Tahun 1999 tentang Perlindungan Konsumen</strong>, JaxLab menjunjung tinggi hak-hak konsumen dan memastikan tidak ada klausula baku yang sepihak mengalihkan tanggung jawab hukum kami atas kerugian yang timbul akibat kesalahan atau kelalaian langsung dari pihak JaxLab.
            </p>
            <p>
              Hak atas ganti rugi, penukaran barang cacat, atau pengembalian dana diatur secara rinci dalam <Link to="/refund-policy" className="font-semibold text-[#1a4d2e] underline hover:text-[#4ade80]">Kebijakan Pengembalian Dana & Barang</Link>.
            </p>
          </div>
        ),
      },
      {
        title: '7. Hukum yang Berlaku & Penyelesaian Sengketa',
        body: (
          <div className="space-y-3">
            <p>
              Syarat & Ketentuan ini tunduk pada dan ditafsirkan sesuai dengan <strong>Hukum Negara Republik Indonesia</strong>.
            </p>
            <p>
              Apabila timbul perselisihan antara Pelanggan dan JaxLab yang berkaitan dengan transaksi, para pihak sepakat untuk mengutamakan penyelesaian secara musyawarah untuk mufakat. Apabila musyawarah tidak mencapai mufakat, perselisihan dapat diselesaikan melalui <strong>Badan Penyelesaian Sengketa Konsumen (BPSK)</strong> atau Pengadilan Negeri yang berwenang di wilayah hukum domisili operasional JaxLab di Indonesia.
            </p>
          </div>
        ),
      },
      {
        title: '8. Saluran Layanan & Pengaduan Konsumen',
        body: (
          <div className="space-y-3">
            <p>
              Sesuai dengan regulasi Kementerian Perdagangan Republik Indonesia, kami menyediakan kanal layanan pengaduan konsumen sebagai berikut:
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-[#e8e2da] bg-[#f9fbf9] p-4 text-[0.875rem]">
                <strong className="block text-[#193421] mb-1">Layanan Konsumen JaxLab Indonesia</strong>
                <p className="text-[#374151] mb-1">Email: itsupport@jaxergroup.com</p>
                <p className="text-[#374151]">WhatsApp Bantuan: +62 813-1536-969</p>
                <p className="text-[#374151] mt-1 text-xs">Jam Operasional: Senin – Sabtu, 08.00 – 17.00 WIB</p>
              </div>
              <div className="rounded-xl border border-[#e8e2da] bg-[#f9fbf9] p-4 text-[0.875rem]">
                <strong className="block text-[#193421] mb-1">Pengaduan Konsumen Kemendag RI</strong>
                <p className="text-[#374151] mb-1">Direktorat Jenderal PKTN Kementerian Perdagangan RI</p>
                <p className="text-[#374151]">WhatsApp Ditjen PKTN: 0853-1111-1010</p>
                <p className="text-[#374151] mt-1 text-xs">Website: simpktn.kemendag.go.id</p>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },

  refund: {
    badge: 'Perlindungan Konsumen & Garansi Produk',
    title: 'Kebijakan Pengembalian Dana & Barang',
    lastUpdated: '23 September 2026',
    intro:
      'JaxLab Indonesia berkomitmen untuk memberikan produk pangan alami terbaik dan berkualitas tinggi. Kebijakan ini menetapkan mekanisme pengembalian barang (retur) dan pengembalian dana (refund) sesuai dengan Undang-Undang Nomor 8 Tahun 1999 tentang Perlindungan Konsumen dan Peraturan Pemerintah Nomor 80 Tahun 2019 tentang Perdagangan Melalui Sistem Elektronik (PMSE).',
    lawReference: 'Pasal 19 UU No. 8/1999 & Pasal 26-28 PP No. 80/2019',
    sections: [
      {
        title: '1. Kondisi yang Berhak Menerima Retur & Pengembalian Dana',
        body: (
          <div className="space-y-3">
            <p>Konsumen berhak mengajukan permohonan penukaran barang atau pengembalian dana apabila:</p>
            <ul className="ml-5 list-disc space-y-1.5 text-[#374151]">
              <li><strong>Barang Rusak / Pecah / Bocor:</strong> Produk kemasan (seperti botol kaca, kemasan cairan, atau segel) mengalami kerusakan fisik saat dalam perjalanan ekspedisi.</li>
              <li><strong>Produk Tidak Sesuai Pesanan:</strong> Varian produk, ukuran kemasan, atau jumlah unit yang diterima berbeda dengan rincian pesanan pada invoice resmi.</li>
              <li><strong>Cacat Produksi / Melewati Masa Kadaluwarsa:</strong> Produk terbukti mengalami penurunan kualitas tidak wajar atau tanggal kadaluwarsa terlampaui saat paket diterima.</li>
            </ul>
          </div>
        ),
      },
      {
        title: '2. Syarat & Prosedur Klaim (Wajib Video Unboxing)',
        body: (
          <div className="space-y-3">
            <p>
              Untuk memastikan keabsahan klaim sesuai standar e-commerce dan ekspedisi di Indonesia, pemohon wajib memenuhi ketentuan berikut:
            </p>
            <ol className="ml-5 list-decimal space-y-2 text-[#374151]">
              <li>
                <strong>Batas Waktu Pelaporan:</strong> Pengajuan komplain wajib disampaikan maksimal dalam waktu <strong>2 x 24 jam</strong> sejak paket dinyatakan berstatus <em>“Delivered” / “Terkirim”</em> pada sistem lacak resi kurir.
              </li>
              <li>
                <strong>Video Unboxing Utuh:</strong> Melampirkan rekaman video pembukaan paket (unboxing) yang jelas, tanpa jeda/tanpa potongan/editing, mulai dari paket masih terbungkus lakban/plastik kurir utuh dengan label resi terbaca jelas, hingga produk dikeluarkan dan diperiksa.
              </li>
              <li>
                <strong>Foto Pendukung:</strong> Melampirkan foto label resi pengiriman dan foto bagian produk yang mengalami kerusakan atau ketidaksesuaian.
              </li>
            </ol>
          </div>
        ),
      },
      {
        title: '3. Tanggung Jawab Ongkos Kirim Pengembalian',
        body: (
          <ul className="ml-5 list-disc space-y-1.5 text-[#374151]">
            <li>Jika kerusakan, cacat produk, atau kesalahan pengiriman terbukti berasal dari pihak JaxLab atau kelalaian pengemasan, seluruh <strong>biaya ongkos kirim pengembalian dan pengiriman produk pengganti ditanggung 100% oleh JaxLab</strong>.</li>
            <li>Jika pengembalian dilakukan atas permintaan sepihak pelanggan tanpa kesalahan dari pihak JaxLab (misalnya salah memilih varian oleh pemesan), biaya pengiriman menjadi tanggung jawab pelanggan.</li>
          </ul>
        ),
      },
      {
        title: '4. Estimasi Waktu dan Metode Pengembalian Dana (Refund)',
        body: (
          <div className="space-y-3">
            <p>
              Setelah barang retur diterima di fasilitas logistik JaxLab and selesai diverifikasi tim Quality Assurance (maksimal 1-2 hari kerja):
            </p>
            <div className="overflow-x-auto rounded-xl border border-[#e8e2da]">
              <table className="w-full text-left text-sm text-[#374151]">
                <thead className="bg-[#f0ece5] text-xs font-bold uppercase text-[#193421]">
                  <tr>
                    <th className="px-4 py-3">Metode Pembayaran Awal</th>
                    <th className="px-4 py-3">Bentuk Refund</th>
                    <th className="px-4 py-3">Estimasi Pencairan Dana</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e8e2da] bg-white">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[#193421]">Transfer Bank / Virtual Account</td>
                    <td className="px-4 py-3">Transfer ke Rekening Bank Pelanggan</td>
                    <td className="px-4 py-3">1 – 3 Hari Kerja</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[#193421]">QRIS / e-Wallet (GoPay, OVO, ShopeePay)</td>
                    <td className="px-4 py-3">Saldo e-Wallet / Transfer Bank</td>
                    <td className="px-4 py-3">1 – 3 Hari Kerja</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[#193421]">Kartu Kredit / Debit Online</td>
                    <td className="px-4 py-3">Reversal / Kredit Limit Kartu</td>
                    <td className="px-4 py-3">7 – 14 Hari Kerja (tergantung bank penerbit)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ),
      },
      {
        title: '5. Kondisi yang Tidak Memenuhi Syarat Refund',
        body: (
          <ul className="ml-5 list-disc space-y-1.5 text-[#374151]">
            <li>Laporan disampaikan melewati batas waktu 2 x 24 jam sejak barang diterima.</li>
            <li>Tidak menyertakan bukti video unboxing utuh sebagaimana diwajibkan pada poin 2.</li>
            <li>Kerusakan produk disebabkan oleh kelalaian penyimpanan oleh konsumen (misalnya produk beku dibiarkan di suhu ruang melebihi batas toleransi, terkena sinar matahari langsung, atau kemasan telah dikonsumsi sebagian besar).</li>
            <li>Perubahan preferensi rasa subjektif konsumen tanpa adanya kerusakan mutu fisik pada produk.</li>
          </ul>
        ),
      },
      {
        title: '6. Cara Mengajukan Pengembalian Dana / Barang',
        body: (
          <div className="space-y-3">
            <p>Untuk memulai proses pengajuan klaim, silakan hubungi tim Customer Care kami dengan format:</p>
            <div className="rounded-xl bg-[#f0ece5] p-4 font-mono text-xs text-[#2c3e30] leading-relaxed">
              Subjek: Pengajuan Klaim - [Nomor Pesanan / Invoice]<br />
              Nama Pemesan: [Nama Lengkap Anda]<br />
              Nomor Telepon: [Nomor WhatsApp Aktif]<br />
              Rincian Kendala: [Deskripsi produk rusak / salah kirim]<br />
              Lampiran: [Video Unboxing Utuh &amp; Foto Resi]
            </div>
            <p>Kirimkan permohonan melalui email <strong>itsupport@jaxergroup.com</strong> atau WhatsApp Layanan Konsumen di <strong>+62 813-1536-969</strong>.</p>
          </div>
        ),
      },
    ],
  },

  service: {
    badge: 'Aturan Penggunaan Sistem Elektronik & Platform',
    title: 'Ketentuan Layanan',
    lastUpdated: '23 September 2026',
    intro:
      'Ketentuan Layanan ini mengatur hak, kewajiban, batasan penggunaan sistem elektronik, dan kepemilikan hak kekayaan intelektual atas platform website JaxLab Indonesia. Ketentuan ini disusun berdasarkan Undang-Undang Nomor 11 Tahun 2008 jo. Undang-Undang Nomor 1 Tahun 2024 tentang Informasi dan Transaksi Elektronik (UU ITE) serta Peraturan Pemerintah Nomor 71 Tahun 2019.',
    lawReference: 'UU No. 1/2024 (Perubahan UU ITE) & PP No. 71/2019 (PSTE)',
    sections: [
      {
        title: '1. Ruang Lingkup Layanan Sistem Elektronik',
        body: (
          <p className="leading-relaxed text-[#374151]">
            Website JaxLab (jaxlab.co.id / platform terkait) adalah portal sistem elektronik yang menyediakan informasi produk pangan sehat alami, artikel edukasi nutrisi, katalog produk, kalkulasi ongkos kirim resmi, pemrosesan transaksi belanja online, serta pengelolaan akun keanggotaan (member).
          </p>
        ),
      },
      {
        title: '2. Akun Pengguna & Keamanan Kredensial',
        body: (
          <ul className="ml-5 list-disc space-y-1.5 text-[#374151]">
            <li>Pengguna bertanggung jawab penuh untuk menjaga kerahasiaan kata sandi (password), kode verifikasi (OTP), dan akses akun masing-masing.</li>
            <li>Segala aktivitas transaksi dan pertukaran data yang dilakukan melalui akun Anda dianggap sebagai tindakan sah dari pemilik akun yang bersangkutan.</li>
            <li>Anda wajib segera memberitahukan kepada JaxLab jika mendapati adanya penggunaan akun tanpa izin atau indikasi pembobolan keamanan.</li>
            <li>JaxLab tidak akan pernah meminta kata sandi atau kode OTP rahasia Anda melalui sambungan telepon, SMS, atau media sosial manapun.</li>
          </ul>
        ),
      },
      {
        title: '3. Hak Kekayaan Intelektual (HAKI)',
        body: (
          <div className="space-y-3">
            <p>
              Seluruh konten, materi, dan aset yang ada pada website ini dilindungi oleh undang-undang di Republik Indonesia:
            </p>
            <ul className="ml-5 list-disc space-y-1.5 text-[#374151]">
              <li><strong>Merek Dagang:</strong> Nama “JaxLab”, logo JaxLab, slogan, dan tanda visual lainnya merupakan merek dagang sah yang dilindungi oleh <strong>Undang-Undang Nomor 20 Tahun 2016 tentang Merek dan Indikasi Geografis</strong>.</li>
              <li><strong>Hak Cipta:</strong> Seluruh teks, susunan artikel, grafis, tata letak antarmuka (UI/UX), foto produk resmi, video materi edukasi, dan kode sumber sistem dilindungi oleh <strong>Undang-Undang Nomor 28 Tahun 2014 tentang Hak Cipta</strong>.</li>
              <li>Dilarang keras menyalin, mereproduksi, mendistribusikan ulang, memodifikasi, atau mempublikasikan konten JaxLab untuk kepentingan komersial pihak ketiga tanpa izin tertulis dari JaxLab.</li>
            </ul>
          </div>
        ),
      },
      {
        title: '4. Batasan Penggunaan yang Dilarang (Prohibited Conduct)',
        body: (
          <div className="space-y-3">
            <p>Sesuai dengan ketentuan <strong>UU ITE</strong>, pengguna dilarang:</p>
            <ul className="ml-5 list-disc space-y-1.5 text-[#374151]">
              <li>Melakukan rekayasa balik (reverse engineering), dekompilasi, atau mencoba membobol kode sumber sistemJaxLab.</li>
              <li>Menggunakan bot otomatis, scraper, crawler, spider, atau teknologi ekstraksi data otomatis tanpa izin tertulis resmi.</li>
              <li>Menyebarkan virus, malware, script berbahaya, atau melakukan serangan penolakan layanan (DDoS) terhadap infrastruktur JaxLab.</li>
              <li>Melakukan manipulasi data transaksi, pemalsuan identitas (identity theft), atau transaksi menggunakan metode pembayaran tanpa hak/curang.</li>
            </ul>
          </div>
        ),
      },
      {
        title: '5. Ketersediaan Sistem & Keadaan Kahar (Force Majeure)',
        body: (
          <p className="leading-relaxed text-[#374151]">
            JaxLab berupaya semaksimal mungkin memastikan layanan website dapat diakses 24 jam sehari. Namun, JaxLab dibebaskan dari tanggung jawab atas kegagalan atau keterlambatan pemenuhan kewajiban yang diakibatkan oleh keadaan di luar kendali wajar (Keadaan Kahar / Force Majeure), termasuk namun tidak terbatas pada bencana alam, pandemi, gangguan massal pada jaringan telekomunikasi/ISP, pemadaman listrik nasional, pemeliharaan mendesak infrastruktur perbankan/payment gateway mitra, serta kebijakan pemerintah baru yang mengikat.
          </p>
        ),
      },
      {
        title: '6. Perubahan Ketentuan Layanan',
        body: (
          <p className="leading-relaxed text-[#374151]">
            JaxLab berhak meninjau dan memperbarui Ketentuan Layanan ini secara berkala untuk mematuhi perkembangan regulasi perundang-undangan Republik Indonesia. Perubahan berlaku efektif segera setelah dipublikasikan pada halaman ini. Penggunaan berkelanjutan Anda atas layanan JaxLab menandakan persetujuan Anda terhadap ketentuan yang telah diperbarui.
          </p>
        ),
      },
      {
        title: '7. Kontak Hukum dan Operasional',
        body: (
          <p className="leading-relaxed text-[#374151]">
            Untuk pertanyaan atau komunikasi resmi terkait Ketentuan Layanan dan kepatuhan hukum, silakan hubungi tim hukum kami melalui email di <strong>itsupport@jaxergroup.com</strong> dengan subjek “Legal &amp; Compliance Inquiry”.
          </p>
        ),
      },
    ],
  },
};

export default function LegalPage({ kind }: { kind: keyof typeof content }) {
  const page = content[kind] || content.terms;

  return (
    <div className="flex min-h-screen flex-col bg-[#f9f5ec]">
      <Header />

      {/* Main Container */}
      <main className="flex-1 px-6 pb-20 pt-32 max-[640px]:px-4 max-[640px]:pt-28">
        <div className="mx-auto max-w-4xl">
          {/* Quick Navigation Tabs for the 4 Legal Documents */}
          <div className="mb-6 flex flex-wrap items-center gap-2 rounded-2xl border border-[#e8e2da] bg-white/80 p-2 text-xs font-semibold backdrop-blur-[10px]">
            <span className="px-3 py-1.5 text-[#374151]">Pilih Dokumen Legal:</span>
            <Link
              to="/privacy-policy"
              className="rounded-xl px-3 py-1.5 text-[#374151] transition hover:bg-[#f0ece5] hover:text-[#193421]"
            >
              Kebijakan Privasi
            </Link>
            <Link
              to="/terms-and-conditions"
              className={`rounded-xl px-3 py-1.5 transition ${kind === 'terms' ? 'bg-[#193421] text-white' : 'text-[#374151] hover:bg-[#f0ece5] hover:text-[#193421]'}`}
            >
              Syarat &amp; Ketentuan
            </Link>
            <Link
              to="/refund-policy"
              className={`rounded-xl px-3 py-1.5 transition ${kind === 'refund' ? 'bg-[#193421] text-white' : 'text-[#374151] hover:bg-[#f0ece5] hover:text-[#193421]'}`}
            >
              Kebijakan Pengembalian Dana
            </Link>
            <Link
              to="/terms-of-service"
              className={`rounded-xl px-3 py-1.5 transition ${kind === 'service' ? 'bg-[#193421] text-white' : 'text-[#374151] hover:bg-[#f0ece5] hover:text-[#193421]'}`}
            >
              Ketentuan Layanan
            </Link>
          </div>

          <article className="rounded-3xl border border-[#e8e2da] bg-white p-8 shadow-[0_15px_45px_rgba(34,52,40,0.06)] max-[640px]:p-5">
            {/* Header Area */}
            <div className="border-b border-[#e8e2da] pb-6">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f5e9] px-3 py-1 text-xs font-extrabold uppercase tracking-[0.1em] text-[#1b5e20]">
                  <CheckCircle2 size={13} /> {page.badge}
                </span>
                <span className="inline-flex rounded-full bg-[#f0ece5] px-3 py-1 text-xs font-semibold text-[#374151]">
                  Dasar Hukum: {page.lawReference}
                </span>
              </div>
              <h1 className="mt-3 text-3xl font-black text-[#193421] max-[640px]:text-2xl">
                {page.title}
              </h1>
              <p className="mt-1 text-xs font-medium text-[#4b5563]">
                Terakhir Diperbarui: {page.lastUpdated} &bull; Berlaku untuk Wilayah Hukum Republik Indonesia
              </p>
              <p className="mt-4 leading-relaxed text-[#374151]">
                {page.intro}
              </p>
            </div>

            {/* Sections */}
            <div className="mt-8 space-y-8">
              {page.sections.map((section) => (
                <section key={section.title} className="rounded-2xl border border-[#f0ece5] bg-[#faf8f5]/60 p-5 max-[640px]:p-4">
                  <h2 className="mb-3 text-[1.1rem] font-black text-[#193421]">
                    {section.title}
                  </h2>
                  <div className="text-[0.93rem] leading-7 text-[#374151]">
                    {section.body}
                  </div>
                </section>
              ))}
            </div>

            {/* Regulatory Notice Footer */}
            <div className="mt-10 rounded-2xl border border-[#c8e6c9] bg-[#f1f8e9] p-5 text-xs text-[#2e7d32]">
              <div className="flex items-start gap-2.5">
                <Scale size={20} className="shrink-0 text-[#2e7d32]" />
                <div className="space-y-1">
                  <strong className="block text-sm font-bold text-[#1b5e20]">
                    Kepatuhan Regulasi Perdagangan Elektronik Republik Indonesia
                  </strong>
                  <p className="leading-relaxed text-[#33691e]">
                    Dokumen ini diselaraskan dengan peraturan perundang-undangan perlindungan konsumen (UU No. 8/1999), sistem perdagangan elektronik PMSE (PP No. 80/2019 &amp; Permendag No. 31/2023), mata uang Rupiah (UU No. 7/2011), serta transaksi elektronik (UU ITE). Untuk pertanyaan dan pengaduan, hubungi saluran resmi JaxLab Indonesia atau Ditjen PKTN Kemendag RI.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
