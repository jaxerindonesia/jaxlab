import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type ProductDto, getFeaturedProducts } from '../services/service-api';
import { PrimaryButton, TagPill } from './ui/site';
import ProductCard from './ProductCard';

const ProductSection: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductDto[]>([]);

  useEffect(() => {
    let cancelled = false;
    getFeaturedProducts().then((p) => !cancelled && setProducts(p)).catch(() => !cancelled && setProducts([]));
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="bg-[#EFE9E3] py-24" id="products">
      <div className="container">
        <div className="mb-8 text-center">
          <TagPill>Pilihan Alami untuk Sehari-hari</TagPill>
          <h2 className="mt-3 text-4xl font-bold text-[var(--primary-green)]">Good Food Starts Here</h2>
        </div>

        <div className="mb-12 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPrimaryAction={() => navigate(`/products/${product.id}`)}
            />
          ))}
        </div>

        <div className="text-center">
          <PrimaryButton className="px-7" onClick={() => navigate('/products')}>
            Lihat Semua Produk
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
