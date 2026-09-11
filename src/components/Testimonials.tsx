import React from "react";
import { Star } from "lucide-react";

const _testimonials = [
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

const Testimonials: React.FC = () => {
  const testimonials = _testimonials;

  return (
    <section className="bg-[#f9f5ec] py-16 !text-black max-[768px]:py-[5.5rem]" id="ulasan">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-[3.6rem] text-center">
          <span className="mb-4 block text-[0.74rem] font-extrabold uppercase tracking-[0.32em] !text-[#4fc66b]">✦ Cerita Nyata</span>
          <h2 className="mx-auto mb-[0.85rem] max-w-[980px] font-['Playfair_Display',ui-serif,Georgia,Cambria,'Times_New_Roman',Times,serif] text-[clamp(2.2rem,2vw,3.45rem)] font-extrabold leading-[1.05] tracking-[0] !text-[#050a04] max-[768px]:text-[clamp(2rem,9vw,2.65rem)]">
            Mereka Sudah Merasakannya, <span className="font-bold italic !text-[#3b8f2c] underline decoration-1 underline-offset-[0.14em]">Giliranmu</span>
          </h2>
          <p className="mx-auto max-w-[760px] font-['Inter',ui-serif,Georgia,Cambria,'Times_New_Roman',Times,serif] text-[clamp(1rem,1.55vw,1.22rem)] font-normal italic leading-[1.45] !text-[#10140d] max-[768px]:max-w-full max-[768px]:text-base max-[768px]:leading-[1.55]">
            "Saya menyukai pendekatan JaxLab yang berfokus pada edukasi dan
            perubahan gaya hidup, bukan sekadar mengejar angka di timbangan.
            Program seperti ini membantu peserta lebih memahami pentingnya
            kesehatan metabolik dan membangun kebiasaan yang lebih baik."
          </p>
        </div>

        <div className="mx-auto grid max-w-[1220px] grid-cols-2 gap-5 max-[768px]:grid-cols-1">
          {testimonials.slice(0, 4).map((item) => (
            <div key={item.id} className="relative flex min-h-52 flex-col rounded-[14px] border border-[rgba(79,198,107,0.18)] bg-[#002b0d] px-[1.65rem] pb-6 pt-[1.65rem] transition-all duration-[350ms] hover:-translate-y-[3px] hover:border-[rgba(79,198,107,0.36)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.18)] max-[768px]:min-h-0">
              <div className="mb-4 flex gap-[3px] !text-[#ffb000]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < item.rating ? "#facc15" : "none"}
                    color="#facc15"
                  />
                ))}
              </div>

              <p className="mb-[1.55rem] grow text-[0.91rem] italic leading-[1.65] !text-[rgba(249,245,236,0.9)]">{item.quote}</p>

              <div className="mt-auto flex items-center gap-3">
                <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#006b27] text-[0.72rem] font-extrabold tracking-[0.02em] !text-[#4fc66b]">
                  <img className="block !h-full !w-full rounded-[inherit] object-cover object-center" src={item.image} alt={item.name} />
                </div>
                <div>
                  <h4 className="mb-[0.12rem] text-[0.92rem] font-extrabold !text-[#f9f5ec]">{item.name}</h4>
                  <span className="text-[0.78rem] font-normal !text-[rgba(79,198,107,0.72)]">{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
