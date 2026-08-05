import React, { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

const galleryImages = [
  {
    src: "/img/DSC03038-web.jpg",
    alt: "Galeri foto JaxLab 1",
  },
  {
    src: "/img/DSC02982-web.jpg",
    alt: "Galeri foto JaxLab 2",
  },
  {
    src: "/img/DSC03061-web.jpg",
    alt: "Galeri foto JaxLab 3",
  },
  {
    src: "/img/DSC02984.jpg",
    alt: "Galeri foto JaxLab 4",
  },
  {
    src: "/img/HAN02200.jpg",
    alt: "Galeri foto JaxLab 5",
  },
  {
    src: "/img/HAN03450.jpg",
    alt: "Galeri foto JaxLab 6",
  },
  {
    src: "/img/IMG_4856.jpg",
    alt: "Galeri foto JaxLab 7",
  },
];

const videos = [
  {
    id: "t1xx8JeVqJk",
    title: "Fat Fasting bersama JaxLab",
    url: "https://youtu.be/t1xx8JeVqJk?si=QInFBy9FVjrK4TnL",
  },
  {
    id: "7GHDGkkBW64",
    title: "Panduan Fat Fasting JaxLab",
    url: "https://youtu.be/7GHDGkkBW64?si=rhAFaE1NyvW9E1aH",
  },
  {
    id: "S-QpDZQsmdM",
    title: "Cerita Perjalanan Sehat JaxLab",
    url: "https://youtu.be/S-QpDZQsmdM?si=j9WuSvY_xJwX64cB",
  },
];

const MediaSection: React.FC = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [activeVideo, setActiveVideo] = useState(0);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const [ctaVisible, setCtaVisible] = useState(false);
  const previousImage =
    (activeImage - 1 + galleryImages.length) % galleryImages.length;
  const nextImage = (activeImage + 1) % galleryImages.length;
  const headingClass = "mx-auto mb-[0.85rem] max-w-[980px] font-['Playfair_Display',ui-serif,Georgia,Cambria,'Times_New_Roman',Times,serif] text-[clamp(2.2rem,2vw,3.45rem)] font-extrabold leading-[1.05] !text-[#050a04]";
  const introClass = "max-w-[960px] font-['Inter',system-ui,sans-serif] text-base leading-[1.7] !text-[#3d473d]";
  const ctaChild = `translate-y-7 scale-[0.98] opacity-0 transition-[opacity,transform] duration-[720ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] [will-change:opacity,transform] ${ctaVisible ? 'translate-y-0 scale-100 opacity-100' : ''} motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none`;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((current) => (current + 1) % galleryImages.length);
    }, 5500); // ganti foto setiap 5.5 detik
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setCtaVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setCtaVisible(entry.isIntersecting);
      },
      { threshold: 0.26, rootMargin: "0px 0px -18% 0px" },
    );

    if (ctaRef.current) observer.observe(ctaRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#f9f5ec]" id="gallery">
      <div className="bg-[#f9f5ec] pt-[5.5rem]">
        <div
          className="max-w-[100vw] bg-[#d9edcf] px-6 py-16"
        >
          <div className="relative flex flex-col items-center justify-center gap-[0.9rem] text-center max-[900px]:mb-[1.8rem] max-[900px]:gap-4">
            <h2 className={headingClass}>Momen dari <span className="font-bold italic !text-[#3b8f2c]">Perjalanan Sehat</span> Jaxlab</h2>
            <p className={introClass}>
              Lebih dari sekadar produk, Jaxlab adalah perjalanan yang dibangun
              oleh orang-orang dengan visi yang sama. Temukan cerita, aktivitas,
              dan momen di balik layar yang menjadi bagian dari setiap langkah
              kami.
            </p>
          </div>

          <div className="mx-auto mb-16 grid w-[min(100%,1180px)] items-center gap-[1.15rem] max-[900px]:mb-12 max-[900px]:w-full max-[900px]:gap-[0.85rem]">
            <div className="relative h-[clamp(360px,47vw,610px)] w-full rounded-3xl bg-[#d9edcf] before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-[5] before:w-[16%] before:bg-[linear-gradient(90deg,#d9edcf_4%,rgba(217,237,207,0))] after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-[5] after:w-[16%] after:bg-[linear-gradient(270deg,#d9edcf_4%,rgba(217,237,207,0))] max-[900px]:h-[380px] max-[900px]:rounded-[18px]" aria-live="polite">
              {galleryImages.map((image, index) => {
                const slideState =
                  index === activeImage
                    ? "active"
                    : index === previousImage
                      ? "prev"
                      : index === nextImage
                        ? "next"
                        : "hidden";

                return (
                  <button
                    key={image.src}
                    className={`absolute top-1/2 h-[min(40vw,520px)] max-h-[calc(100%-70px)] w-[min(66vw,900px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[22px] bg-[#eef4e8] p-0 shadow-[0_18px_42px_rgba(6,59,24,0.16)] transition-[opacity,left,transform,filter,box-shadow] duration-[1250ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] max-[900px]:h-[270px] max-[900px]:w-[min(78vw,420px)] max-[900px]:rounded-2xl ${slideState === 'active' ? 'left-1/2 z-[3] scale-100 opacity-100 [filter:blur(0)_saturate(1)] shadow-[0_0_0_8px_rgba(255,255,255,0.72),0_24px_58px_rgba(6,59,24,0.22)]' : slideState === 'prev' ? 'left-[30%] z-[2] -rotate-3 scale-[0.72] opacity-[0.26] [filter:blur(10px)_saturate(0.78)] max-[900px]:left-[24%] max-[900px]:scale-[0.68]' : slideState === 'next' ? 'left-[70%] z-[2] rotate-3 scale-[0.72] opacity-[0.26] [filter:blur(10px)_saturate(0.78)] max-[900px]:left-[76%] max-[900px]:scale-[0.68]' : 'pointer-events-none left-1/2 z-[1] scale-[0.76] opacity-0 [filter:blur(12px)_saturate(0.82)]'}`}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={`Tampilkan foto ${index + 1}`}
                    aria-hidden={slideState === "hidden"}
                    tabIndex={slideState === "hidden" ? -1 : 0}
                  >
                    <img className="block !h-full !w-full object-cover" src={image.src} alt={image.alt} />
                  </button>
                );
              })}
            </div>

            <div
              className="flex items-center justify-center gap-[0.48rem] max-[900px]:gap-2"
              aria-label="Pilihan foto galeri"
            >
              {galleryImages.map((image, index) => (
                <button
                  key={image.src}
                  className={`min-h-0 rounded-full p-0 transition-all duration-300 hover:-translate-y-px hover:!h-[9px] hover:!w-[34px] hover:bg-[#063b18] ${activeImage === index ? '!h-[9px] !w-[34px] bg-[#063b18]' : '!h-[9px] !w-[9px] bg-[rgba(6,59,24,0.26)]'}`}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`Tampilkan foto ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="mb-8 flex flex-col items-center justify-center gap-[0.9rem] text-center">
            <h2 className={headingClass}>Jelajahi <span className="font-bold italic !text-[#3b8f2c]">Ruang Sehat</span> Jaxlab</h2>
            <p className={introClass}>
              Jelajahi konten yang membantu Anda memahami kesehatan dengan lebih
              sederhana, ilmiah, dan mudah diterapkan dalam kehidupan
              sehari-hari.
            </p>
          </div>

          <div className="mx-auto w-[min(100%,890px)]">
            <div className="overflow-hidden rounded-xl bg-[#102315] shadow-[0_18px_45px_rgba(12,35,18,0.12)] max-[900px]:rounded-[10px]">
              <iframe
                src={`https://www.youtube.com/embed/${videos[activeVideo].id}`}
                title={videos[activeVideo].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen className="block !aspect-video !w-full border-0 bg-[#0b150d]"
              />
            </div>
            <div className="mt-[0.95rem] grid grid-cols-[repeat(3,minmax(0,180px))] justify-center gap-5 max-[900px]:mt-4 max-[900px]:grid-cols-1 max-[900px]:gap-[0.6rem]" aria-label="Pilihan video">
              {videos.map((video, index) => (
                <button
                  key={video.id}
                  type="button"
                  className={`min-h-0 overflow-hidden bg-transparent p-0 transition-all duration-300 max-[900px]:rounded-[10px] ${activeVideo === index ? 'scale-100 opacity-100 shadow-[0_10px_24px_rgba(12,35,18,0.16)]' : 'scale-[0.98] opacity-70 hover:scale-100 hover:opacity-100 hover:shadow-[0_10px_24px_rgba(12,35,18,0.16)]'}`}
                  onClick={() => setActiveVideo(index)}
                  aria-label={`Tampilkan video ${video.title}`}
                >
                  <img className="block !aspect-video !w-full rounded-xl border border-[rgba(6,20,10,0.08)] object-cover"
                    src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                    alt={video.title}
                  />
                </button>
              ))}
            </div>
          </div>

          <div
            ref={ctaRef}
            className={`mx-auto mt-20 max-w-[80%] rounded-[28px] bg-[#001802] px-12 py-16 text-center shadow-[0_24px_60px_rgba(0,31,8,0.12)] transition-[opacity,transform] duration-[850ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] [will-change:opacity,transform] max-[900px]:mb-14 max-[900px]:rounded-[20px] max-[900px]:px-8 max-[900px]:pb-[2.8rem] max-[900px]:pt-12 ${ctaVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-[42px] scale-[0.97] opacity-0'} motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none`}
          >
            <span className={`${ctaChild} mb-[1.35rem] block text-[0.72rem] font-extrabold uppercase tracking-[0.38em] !text-[rgba(79,198,107,0.78)]`}>
              MULAI RESET TUBUHMU HARI INI
            </span>
            <h2 className={`${ctaChild} mb-[1.35rem] whitespace-nowrap font-['Playfair_Display',ui-serif,Georgia,serif] text-[clamp(2.55rem,3.9vw,4.15rem)] font-extrabold leading-[1.04] !text-[#f9f5ec] ${ctaVisible ? 'delay-100' : ''} max-[900px]:whitespace-normal max-[900px]:text-[2.35rem]`}>
              <span className="font-extrabold !text-[#f9f5ec]">Kembalikan Tubuh ke</span>{" "}
              <span className="font-bold italic !text-[#4fc66b]">Fitrahnya</span>
            </h2>
            <strong className={`${ctaChild} mx-auto mb-[0.85rem] block text-[clamp(1.05rem,1.8vw,1.35rem)] font-extrabold leading-[1.35] !text-[#f9f5ec] ${ctaVisible ? 'delay-200' : ''}`}>
              Mulai dari Metabolisme yang Lebih Sehat
            </strong>
            <p className={`${ctaChild} mx-auto mb-[2.15rem] max-w-[680px] font-['Inter',system-ui,sans-serif] text-[0.98rem] leading-[1.7] !text-[rgba(249,245,236,0.62)] ${ctaVisible ? 'delay-300' : ''}`}>
              Fat Fasting 72 Jam bersama JaxLab membantu mendukung tubuh kembali
              menggunakan lemak sebagai sumber energi alami, didampingi nutrisi
              premium dan komunitas yang siap menemani perjalanan sehatmu.
            </p>
            <div className={`${ctaChild} mb-[1.55rem] flex flex-wrap justify-center gap-4 ${ctaVisible ? 'delay-[400ms]' : ''}`}>
              <a className="inline-flex min-h-[54px] items-center justify-center gap-[0.55rem] rounded-full bg-[#4fc66b] px-7 py-[0.85rem] font-extrabold !text-[#001f08] transition-all duration-300 hover:-translate-y-0.5" href="#products">
                Mulai Fat Fasting
                <ArrowRight size={18} />
              </a>
              <a className="inline-flex min-h-[54px] items-center justify-center gap-[0.55rem] rounded-full border border-[rgba(249,245,236,0.22)] bg-transparent px-7 py-[0.85rem] font-extrabold !text-[#d7c97c] transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(249,245,236,0.42)] hover:!text-[#f9f5ec]" href="#kenapa">
                Pelajari Protokol
              </a>
            </div>
            <div className={`${ctaChild} flex flex-wrap justify-center gap-[0.55rem] text-[0.78rem] !text-[rgba(249,245,236,0.38)] ${ctaVisible ? 'delay-500' : ''}`}>
              <span className="after:ml-[0.55rem] after:content-['•'] after:!text-[rgba(249,245,236,0.32)]">Akses Tanya Jawab dengan Dokter</span>
              <span className="after:ml-[0.55rem] after:content-['•'] after:!text-[rgba(249,245,236,0.32)]">Produk Halal & BPOM Indonesia</span>
              <span>Bergabung dengan Komunitas JaxLab</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaSection;
