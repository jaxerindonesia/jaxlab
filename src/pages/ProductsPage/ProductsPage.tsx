import React, { useEffect, useMemo, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Search } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { type ProductDto, getAllProducts, getCategories } from '../../services/service-api';
import { isMemberLoggedIn } from '../../services/auth';
import { addToCart } from '../../services/cart';
import ProductCard from '../../components/ProductCard';

const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [allProducts, setAllProducts] = useState<ProductDto[] | null>(null);
  const [dbCategories, setDbCategories] = useState<string[] | null>(null);
  const loading = allProducts === null || dbCategories === null;

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    if (urlSearch !== searchTerm) {
      setSearchTerm(urlSearch);
      setCurrentPage(1);
    }
  }, [searchParams]);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getAllProducts(), getCategories()])
      .then(([products, categories]) => {
        if (cancelled) return;
        setAllProducts(products);
        setDbCategories(categories);
      })
      .catch(() => {
        if (cancelled) return;
        setAllProducts([]);
        setDbCategories([]);
      });
    return () => { cancelled = true; };
  }, []);

  const productCategories = useMemo(() => ['All', ...(dbCategories ?? [])], [dbCategories]);
  const filteredProducts = useMemo(() => {
    const products = allProducts ?? [];
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allProducts, searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-[#EFE9E3]">
      <Header />
      <main className="pt-8">
        <section className="py-16">
          <div className="container">
            <div className="mb-8 text-center">
              <span className="inline-flex rounded-full bg-[#e6f1ea] px-3 py-1 text-xs font-semibold text-[var(--primary-green)]">Produk Alami JaxLab</span>
              <h2 className="mt-3 text-4xl font-bold text-[var(--primary-green)]">Good Food Starts Here</h2>
              <p className="mx-auto mt-2 max-w-[600px] text-[#666]">Pilihan produk alami untuk mendukung gaya hidup sehat Anda.</p>
            </div>

            <div className="mb-12 flex flex-col items-center gap-6">
              <div className="relative w-full max-w-[400px]">
                <input
                  type="text"
                  placeholder="Cari produk JaxLab..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  className="w-full rounded-full border border-[#ddd] bg-white px-6 py-3 pr-10 text-sm shadow-sm outline-none focus:border-[var(--primary-green)]"
                />
                <Search className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#999]" size={18} />
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {productCategories.map((category) => (
                  <button
                    key={category}
                    className={`rounded-full border px-5 py-2 text-sm transition ${selectedCategory === category ? 'border-[var(--primary-green)] bg-[var(--primary-green)] text-white' : 'border-[#ddd] bg-white text-[#555] hover:border-[var(--primary-green)] hover:text-[var(--primary-green)]'}`}
                    onClick={() => { setSelectedCategory(category); setCurrentPage(1); }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <p className="mb-4 text-center text-sm text-[#666]">
              Menampilkan <strong>{filteredProducts.length}</strong> produk
              {selectedCategory !== 'All' && ` dalam kategori "${selectedCategory}"`}
              {searchTerm && ` untuk "${searchTerm}"`}
            </p>

            <div className="mb-12 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8">
              {loading ? (
                <div className="col-span-full py-16 text-center text-[#888]">Memuat produk...</div>
              ) : paginatedProducts.length > 0 ? paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  showOriginalPrice
                  showStock
                  primaryLabel="Lihat Detail"
                  secondaryLabel="Beli di Website"
                  onPrimaryAction={() => navigate(`/products/${product.id}`)}
                  onSecondaryAction={() => {
                    if (!isMemberLoggedIn()) { navigate('/member/auth'); return; }
                    addToCart(product.id, 1);
                    navigate('/cart');
                  }}
                />
              )) : (
                <div className="col-span-full py-16 text-center text-[#888]">Produk tidak ditemukan. Coba kata kunci lain.</div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="text-center">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button key={page} className={`mx-1 rounded-full px-4 py-2 ${currentPage === page ? 'bg-[var(--primary-green)] text-white' : 'bg-white text-[#555]'}`} onClick={() => setCurrentPage(page)}>{page}</button>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
