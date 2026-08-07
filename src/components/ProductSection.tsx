import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { getFeaturedProducts, type ProductDto } from "../services/service-api";

const ProductSection: React.FC = () => {
  const navigate = useNavigate();
  const productTrackRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<ProductDto[]>([]);

  const scrollProducts = (direction: "prev" | "next") => {
    const track = productTrackRef.current;
    if (!track) return;

    const productCards = track.querySelectorAll<HTMLElement>("[data-product-card]");
    const targetLeft =
      direction === "next" && productCards[2] ? productCards[2].offsetLeft : 0;

    track.scrollTo({
      left: targetLeft,
      behavior: "smooth",
    });
  };

  const certifiedLogos = [
    {
      src: "/img/product-certified/Usda logo.png",
      alt: "USDA Organic",
    },
    {
      src: "/img/product-certified/Malaysia halal.png",
      alt: "Halal Malaysia",
    },
    {
      src: "/img/product-certified/Logo halal tunisia.png",
      alt: "Halal Tunisia",
    },
    {
      src: "/img/product-certified/Halal_Indonesia.png",
      alt: "Halal Indonesia",
    },
    {
      src: "/img/product-certified/Ecocert.png",
      alt: "Ecocert",
    },
    {
      src: "/img/product-certified/BADAN_POM.png",
      alt: "Badan POM",
    },
  ];

  useEffect(() => {
    let cancelled = false;
    getFeaturedProducts()
      .then((p) => {
        if (!cancelled) setProducts(p);
      })
      .catch(() => {
        if (!cancelled) setProducts([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const track = productTrackRef.current;
    if (!track || products.length === 0) return;

    const frameId = requestAnimationFrame(() => {
      track.scrollTo({ left: 0, behavior: "auto" });
    });

    return () => cancelAnimationFrame(frameId);
  }, [products]);

  return (
    <>
      <section className="relative bg-[#f9f5ec] pb-4 pt-20 !text-[#1a1a1a]" id="products">
        <div className="mx-auto max-w-[1490px] px-[25px]">
          <div className="mx-auto mb-[3.2rem] max-w-[1440px] overflow-hidden rounded-[14px] bg-[#10170f] shadow-[0_22px_48px_rgba(20,24,18,0.14)] max-[768px]:mb-[2.2rem] max-[768px]:rounded-xl">
            <video
              className="block !aspect-[16/6.5] max-h-[520px] !w-full bg-[#10170f] object-cover max-[768px]:!aspect-[16/10] max-[768px]:max-h-none"
              autoPlay
              controls
              loop
              muted
              playsInline
              preload="metadata"
              poster="/img/DSC03061-web.jpg"
              aria-label="Video pengantar Fat Fasting JaxLab"
            >
              <source src="/video/tunisia_video.mp4" type="video/mp4" />
              Browser Anda tidak mendukung pemutar video.
            </video>
          </div>

          <div
            className="mx-auto mb-[3.9rem] flex max-w-[1440px] items-end justify-between gap-20 text-left max-[768px]:mb-[2.8rem] max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-[1.3rem]"
          >
            <ScrollReveal
              className="flex-[0_0_min(760px,58%)] translate-y-[34px] opacity-0 transition-[opacity,transform] duration-900 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] [will-change:opacity,transform] [&.is-visible]:translate-y-0 [&.is-visible]:opacity-100 max-[768px]:w-full max-[768px]:flex-none"
              delay={80}
            >
              <span className="mb-[0.9rem] block text-[0.74rem] font-extrabold uppercase tracking-[0.32em] !text-[#004618]">Fat Fasting Essentials</span>
              <h2 className="-mt-[0.9rem] font-['Playfair_Display',ui-serif,Georgia,Cambria,'Times_New_Roman',Times,serif] text-[clamp(2.7rem,3.75vw,4rem)] font-extrabold leading-[0.96] tracking-0 !text-[#001d09] max-[768px]:text-[2.5rem]">
                <span className="block font-extrabold !text-[#004618]">Nutrisi</span>
                <span className="block whitespace-nowrap font-extrabold !text-[#050a04] max-[768px]:whitespace-normal">
                  Pendukung <em className="italic !text-[#050a04]">Fat Fasting</em>
                </span>
              </h2>
            </ScrollReveal>
            <ScrollReveal
              className="max-w-[560px] flex-1 translate-y-[34px] opacity-0 transition-[opacity,transform] duration-900 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] [will-change:opacity,transform] [&.is-visible]:translate-y-0 [&.is-visible]:opacity-100 max-[768px]:w-full"
              delay={220}
            >
              <p className="mb-[0.3rem] max-w-[560px] font-['Inter',system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif] text-[1.02rem] leading-[1.7] !text-[#3d473d] max-[768px]:text-[0.96rem]">
                Produk yang dirancang untuk menemani setiap fase Fat Fasting
                Protocol agar lebih mudah, nyaman, dan optimal.
              </p>
            </ScrollReveal>
          </div>

          <div className="relative mx-auto mb-[3.2rem] max-w-[1440px]">
            <div className="flex w-[calc(100vw-max(25px,calc((100vw-1490px)/2+25px)))] snap-x snap-mandatory gap-[1.35rem] overflow-x-auto pb-0 pl-0 pr-[calc(var(--product-card-width)*0.55)] pt-[0.9rem] [--product-card-width:calc((min(1440px,calc(100vw-50px))-1.35rem)/2)] [overscroll-behavior-x:contain] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-[1180px]:mx-auto max-[1180px]:grid max-[1180px]:w-auto max-[1180px]:max-w-[980px] max-[1180px]:grid-cols-1 max-[1180px]:overflow-visible max-[1180px]:p-0 max-[1180px]:[scroll-snap-type:none] max-[768px]:gap-[1.2rem]" ref={productTrackRef}>
              {products.slice(0, 3).map((product) => {
                const highlights =
                  product.benefits?.length > 0
                    ? product.benefits.slice(0, 2)
                    : [product.subtitle, product.description]
                        .filter(Boolean)
                        .slice(0, 2);

                return (
                  <article data-product-card key={product.id} className="group relative grid min-h-[330px] flex-[0_0_var(--product-card-width)] snap-start grid-cols-[minmax(210px,38%)_minmax(0,1fr)] items-stretch overflow-hidden rounded-[18px] border border-[rgba(6,59,24,0.12)] bg-[#d9edcf] !text-[#063b18] shadow-[0_18px_44px_rgba(20,44,22,0.08)] transition-all duration-300 hover:-translate-y-[5px] hover:border-[rgba(6,59,24,0.22)] hover:shadow-[0_24px_58px_rgba(20,44,22,0.14)] max-[1180px]:min-h-[320px] max-[1180px]:flex-auto max-[768px]:min-h-0 max-[768px]:grid-cols-1">
                    <div className="relative flex min-h-full w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_58%,rgba(79,198,107,0.24),transparent_42%),linear-gradient(145deg,#e6f2dd_0%,#cce4bd_100%)] px-[1.6rem] py-[2.1rem] after:absolute after:bottom-[22px] after:left-[12%] after:right-[12%] after:h-[18px] after:rounded-full after:bg-[rgba(6,59,24,0.12)] after:blur-xl max-[768px]:min-h-[220px] max-[768px]:px-[1.4rem] max-[768px]:pb-[1.45rem] max-[768px]:pt-[1.8rem]">
                      <img className="relative z-[1] !h-60 !w-[min(86%,220px)] object-contain drop-shadow-[0_20px_18px_rgba(6,59,24,0.16)] transition-transform duration-500 group-hover:-translate-y-1 max-[768px]:!h-[190px]" src={product.images[0]} alt={product.name} />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col items-start px-[1.85rem] py-8 text-left max-[768px]:px-5 max-[768px]:pb-[1.35rem] max-[768px]:pt-[1.3rem]">
                      <span className="mb-[0.95rem] inline-flex min-h-[30px] items-center rounded-full border border-[rgba(6,59,24,0.22)] bg-[rgba(79,198,107,0.12)] px-[0.78rem] py-1 text-[0.78rem] font-extrabold leading-[1.3] !text-[#06451b]">
                        {product.badge || product.category}
                      </span>
                      <h3 className="mb-[1.05rem] break-words font-['Inter','Poppins',system-ui,sans-serif] text-[clamp(1.25rem,1.45vw,1.55rem)] font-extrabold leading-[1.18] !text-[#061407]">{product.name}</h3>

                      <ul className="mb-[1.45rem] grid list-none gap-[0.62rem] p-0 text-[clamp(0.88rem,0.98vw,0.95rem)] leading-[1.42] !text-[#233326]">
                        {highlights.map((benefit) => (
                          <li className="grid grid-cols-[20px_minmax(0,1fr)] items-start gap-[0.45rem]" key={benefit}>
                            <Check className="mt-[0.08rem] !h-[18px] !w-[18px] shrink-0 text-[#06451b]" size={20} strokeWidth={2.4} />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto flex w-full flex-wrap items-center gap-[0.85rem] max-[768px]:flex-col max-[768px]:items-stretch max-[768px]:gap-[0.65rem]">
                        <button
                          className="inline-flex min-h-[50px] items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[#063b18] bg-[#063b18] px-[1.55rem] py-[0.82rem] text-[0.86rem] font-extrabold !text-white transition-all duration-300 hover:-translate-y-px hover:border-[#001f08] hover:bg-[#001f08] hover:shadow-[0_12px_24px_rgba(6,59,24,0.22)] max-[768px]:w-full"
                          aria-label={`Beli ${product.name}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/products/${product.id}`);
                          }}
                        >
                          Beli Sekarang
                        </button>
                        <button
                          className="inline-flex min-h-9 items-center justify-start gap-[0.35rem] bg-transparent py-1 text-[0.88rem] font-extrabold !text-[#06451b] underline underline-offset-[3px] hover:!text-[#001f08] max-[768px]:justify-center"
                          type="button"
                          onClick={() => navigate(`/products/${product.id}`)}
                        >
                          Learn More
                          <ArrowRight size={15} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
              <article
                className="flex min-h-[320px] flex-[0_0_var(--product-card-width)] snap-start cursor-pointer flex-col items-start justify-center rounded-none !border-0 bg-transparent px-[2.6rem] py-[2.4rem] !text-[#061407] shadow-none max-[1180px]:flex-auto max-[768px]:min-h-0 max-[768px]:items-center max-[768px]:px-5 max-[768px]:py-6 max-[768px]:text-center"
                onClick={() => navigate("/products")}
              >
                <span className="mb-[0.8rem] block text-[0.72rem] font-black uppercase tracking-[0.24em] !text-[#06451b]">Produk Lainnya</span>
                <h3 className="mb-[0.8rem] max-w-[520px] font-['Playfair_Display',ui-serif,Georgia,Cambria,'Times_New_Roman',Times,serif] text-[clamp(1.85rem,2.55vw,2.8rem)] font-extrabold leading-[1.02] !text-[#050a04]">Temukan rangkaian JaxLab lainnya</h3>
                <p className="mb-[1.45rem] max-w-[620px] font-['Inter',system-ui,sans-serif] text-base leading-[1.55] !text-[#3d473d]">
                  Jelajahi pilihan produk pendukung Fat Fasting dan kebutuhan
                  nutrisi harian Anda.
                </p>
                <button className="inline-flex min-h-12 items-center gap-[0.55rem] rounded-full bg-[#063b18] px-5 py-[0.8rem] font-extrabold !text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#001f08]" type="button">
                  Lihat Semua Produk
                  <ArrowRight size={16} />
                </button>
              </article>
            </div>

            <div
              className="mt-[1.1rem] flex w-[calc(min(1440px,100vw-50px))] justify-end gap-[0.65rem] max-[1180px]:hidden"
              aria-label="Navigasi produk"
            >
              <button
                type="button"
                className="inline-flex h-[46px] w-[46px] items-center justify-center rounded-full border border-[rgba(6,59,24,0.22)] bg-[#063b18] !text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#001f08] hover:bg-[#001f08]"
                aria-label="Geser produk sebelumnya"
                onClick={() => scrollProducts("prev")}
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                className="inline-flex h-[46px] w-[46px] items-center justify-center rounded-full border border-[rgba(6,59,24,0.22)] bg-[#063b18] !text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#001f08] hover:bg-[#001f08]"
                aria-label="Geser produk berikutnya"
                onClick={() => scrollProducts("next")}
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <span
        className="self-center text-lg font-bold !text-black"
      >
        Trusted & Certified
      </span>
      <section
        className="group overflow-hidden bg-[#f9f5ec] py-6"
        aria-label="Sertifikasi produk JaxLab"
      >
        <div className="flex w-max animate-[productCertifiedScroll_36s_linear_infinite] items-center gap-4 [will-change:transform] group-hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:px-4 motion-reduce:[animation:none]">
          {Array.from({ length: 5 }).map((_, groupIndex) =>
            certifiedLogos.map((item, index) => (
              <React.Fragment key={`${groupIndex}-${item.alt}-${index}`}>
                <span className="inline-flex h-[clamp(72px,7vw,96px)] w-[clamp(118px,12vw,172px)] shrink-0 items-center justify-center px-4 py-[0.8rem]">
                  <img className="block !h-[120%] !w-[120%] object-contain [filter:saturate(0.95)_contrast(1.02)]" src={item.src} alt={item.alt} loading="lazy" />
                </span>
                <span className="hidden">•</span>
              </React.Fragment>
            )),
          )}
        </div>
      </section>
    </>
  );
};

export default ProductSection;
