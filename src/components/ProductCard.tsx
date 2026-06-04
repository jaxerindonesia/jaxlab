import React from 'react';
import { formatRupiah, type ProductDto } from '../services/service-api';

type ProductCardProps = {
  product: ProductDto;
  onPrimaryAction?: () => void;
  primaryLabel?: string;
  secondaryLabel?: string;
  onSecondaryAction?: () => void;
  showStock?: boolean;
  showOriginalPrice?: boolean;
};

const badgeClass = (badge: string) =>
  badge === 'Best Seller'
    ? 'bg-[#4a7c59] text-white'
    : badge === 'New'
      ? 'bg-[#2196F3] text-white'
      : 'bg-[#FF5722] text-white';

const stockClass = (status?: string) =>
  status === 'Tersedia'
    ? 'bg-[#e8f5e9] text-[#2e7d32]'
    : status === 'Terbatas'
      ? 'bg-[#fff3e0] text-[#e65100]'
      : 'bg-[#ffebee] text-[#c62828]';

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPrimaryAction,
  primaryLabel = 'Lihat Detail',
  secondaryLabel,
  onSecondaryAction,
  showStock = false,
  showOriginalPrice = false,
}) => {
  return (
    <article className="group relative overflow-hidden rounded-[28px] border border-white/70 bg-white pb-5 text-center shadow-[0_14px_40px_rgba(32,60,44,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(32,60,44,0.14)]">
      {product.badge && (
        <span className={`absolute left-5 top-5 rounded-full px-3.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] ${badgeClass(product.badge)}`}>
          {product.badge}
        </span>
      )}

      <div className="h-[280px] w-full overflow-hidden rounded-none bg-[#f7f4ef]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-[1.03]"
        />
      </div>

      <div className="px-5 pt-5">
        <span className="inline-flex rounded-full bg-[#eef5ef] px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#4a7c59]">
          {product.category}
        </span>

        <h3 className="mt-4 text-[1.05rem] font-semibold leading-snug text-[var(--text-dark)]">
          {product.name}
        </h3>

        <p className="mt-3 min-h-[48px] text-sm leading-6 text-[#777]">
          {product.description}
        </p>

        <div className="mt-4 flex items-end justify-center gap-3">
          <p className="text-[1.05rem] font-bold text-[var(--primary-green)]">
            {formatRupiah(product.price)}
          </p>
          {showOriginalPrice && product.originalPrice && (
            <p className="text-sm text-[#b2b2b2] line-through">
              {formatRupiah(product.originalPrice)}
            </p>
          )}
        </div>

        {showStock && (
          <div className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${stockClass(product.stockStatus)}`}>
            {product.stockStatus}
          </div>
        )}

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            className="rounded-full border border-[var(--primary-green)] px-5 py-2.5 text-sm font-semibold text-[var(--primary-green)] transition hover:bg-[var(--primary-green)] hover:text-white"
            onClick={onPrimaryAction}
          >
            {primaryLabel}
          </button>
          {secondaryLabel && onSecondaryAction && (
            <button
              className="rounded-full bg-[var(--primary-green)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#244f31]"
              onClick={onSecondaryAction}
            >
              {secondaryLabel}
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
