import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatRupiah } from "../../services/service-api";
import { Button } from "../../components/ui/button";
import { AdminLogin } from "./pages/auth/components/AdminLogin";
import { StockOpnameDetail } from "./pages/product/components/StockOpnameDetail";
import { ProductTable } from "./pages/product/components/ProductTable";
import { ProductForm } from "./pages/product/components/ProductForm";
import { AdminToast } from "./shared/components/AdminToast";
import { useAdminDashboard } from "./useAdminDashboard";

const AdminPage: React.FC = () => {
  const vm = useAdminDashboard();
  const navigate = useNavigate();

  if (!vm.authed) {
    return (
      <AdminLogin
        pw={vm.pw}
        pwError={vm.pwError}
        onChangePw={vm.setPw}
        onLogin={() => void vm.handleLogin()}
        loading={vm.loading.login}
      />
    );
  }
  const totalProducts = vm.products.length;
  const totalCategories = vm.categories.length;
  const totalStockAvailable = vm.products.filter(
    (p) => p.stockStatus === "Tersedia",
  ).length;
  const totalBadge = vm.products.filter((p) => !!p.badge).length;

  return (
    <div
      className="min-h-screen overflow-x-hidden bg-[#050b22] text-slate-100"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <header className="sticky top-0 z-20 flex h-20 items-center justify-between gap-3 border-b border-slate-800 bg-[#12152a] px-4 lg:px-8">
        <div onClick={() => navigate("/admin")} className="cursor-pointer">
          <img
            src="/logo-jaxlab.png"
            alt="JAXLAB Logo"
            className="h-8 w-auto"
          />
        </div>
        <div className="flex items-center justify-end gap-2">
          <Link
            to="/"
            className="rounded-xl border border-slate-700 px-3 py-3 text-xs text-slate-300 hover:bg-slate-800 sm:text-sm lg:px-4"
          >
            ← Lihat Website
          </Link>
          <Button
            className="rounded-xl border border-slate-700 px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 sm:text-sm lg:px-4"
            variant="destructive"
            onClick={() => void vm.doReset()}
            disabled={vm.loading.reset}
          >
            {vm.loading.reset ? "Resetting..." : "Reset"}
          </Button>
          <Button
            className="rounded-xl border border-slate-700 px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 sm:text-sm lg:px-4"
            variant="outline"
            onClick={vm.logout}
          >
            Logout
          </Button>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden min-h-[calc(100vh-4rem)] w-[250px] shrink-0 border-r border-slate-800 bg-[#12152a] p-4 lg:block">
          <p className="mb-3 px-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
            Menu
          </p>
          <button className="mb-2 w-full rounded-xl bg-indigo-500/20 px-4 py-2.5 text-left font-semibold text-indigo-300">
            Produk
          </button>
          {!vm.creating && (
            <Button className="mt-3 w-full" onClick={vm.startCreate}>
              + Tambah Produk
            </Button>
          )}
        </aside>

        <main className="flex-1 p-4 md:p-6 lg:p-7">
          <div className="mx-auto w-full max-w-[1360px] space-y-5 lg:space-y-6">
            <details className="rounded-xl border border-slate-800 bg-[#12152a] lg:hidden">
              <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-slate-100">
                Menu Admin
              </summary>
              <div className="space-y-2 border-t border-slate-800 p-3">
                <button className="text-sm w-full rounded-xl bg-indigo-500/20 px-4 py-2.5 text-left font-semibold text-indigo-300">
                  Produk
                </button>
              </div>
            </details>

            {!vm.creating && (
              <Button className="w-full lg:hidden" onClick={vm.startCreate}>
                + Tambah Produk
              </Button>
            )}

            {!vm.stockProduct && !vm.creating && (
              <section className="rounded-2xl border border-emerald-500/20 bg-[#12152a] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-emerald-400">
                      Program Referral
                    </p>
                    <h2 className="m-0 text-xl font-bold text-white">
                      Persentase Bonus
                    </h2>
                    <p className="mb-0 mt-1 text-sm text-slate-400">
                      Dihitung dari subtotal produk pada order yang sudah
                      dibayar.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        value={vm.referralPercentage}
                        onChange={(e) =>
                          vm.setReferralPercentage(Number(e.target.value))
                        }
                        className="h-11 w-28 rounded-xl border border-slate-700 bg-[#090d20] px-3 pr-8 text-right font-bold text-white outline-none focus:border-emerald-500"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                        %
                      </span>
                    </div>
                    <Button
                      onClick={() => void vm.saveReferralPercentage()}
                      disabled={vm.loading.referral}
                    >
                      Simpan
                    </Button>
                  </div>
                </div>
              </section>
            )}
            {!vm.stockProduct && !vm.creating && (
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
                <div className="rounded-2xl border border-slate-800 bg-[#12152a] p-4 shadow-[0_8px_30px_rgba(0,0,0,0.25)] lg:p-6">
                  <div className="text-3xl font-bold leading-none lg:text-5xl">
                    {totalProducts}
                  </div>
                  <div className="mt-1 text-sm text-slate-300 lg:mt-2 lg:text-base">
                    Total Produk
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-[#12152a] p-4 shadow-[0_8px_30px_rgba(0,0,0,0.25)] lg:p-6">
                  <div className="text-3xl font-bold leading-none lg:text-5xl">
                    {totalCategories}
                  </div>
                  <div className="mt-1 text-sm text-slate-300 lg:mt-2 lg:text-base">
                    Kategori
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-[#12152a] p-4 shadow-[0_8px_30px_rgba(0,0,0,0.25)] lg:p-6">
                  <div className="text-3xl font-bold leading-none lg:text-5xl">
                    {totalStockAvailable}
                  </div>
                  <div className="mt-1 text-sm text-slate-300 lg:mt-2 lg:text-base">
                    Stok Tersedia
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-[#12152a] p-4 shadow-[0_8px_30px_rgba(0,0,0,0.25)] lg:p-6">
                  <div className="text-3xl font-bold leading-none lg:text-5xl">
                    {totalBadge}
                  </div>
                  <div className="mt-1 text-sm text-slate-300 lg:mt-2 lg:text-base">
                    Punya Badge
                  </div>
                </div>
              </div>
            )}
            {vm.stockProduct ? (
              <StockOpnameDetail
                product={vm.stockProduct}
                qty={vm.qty}
                note={vm.note}
                onQty={vm.setQty}
                onNote={vm.setNote}
                onIn={() => void vm.stockMutation("IN")}
                onOut={() => void vm.stockMutation("OUT")}
                onBack={() => vm.setStockProduct(null)}
                loading={vm.loading.stockMutation}
              />
            ) : !vm.creating ? (
              <ProductTable
                products={vm.products}
                formatRupiah={formatRupiah}
                onEdit={vm.startEdit}
                onStock={vm.setStockProduct}
                onDelete={(id) => void vm.removeProduct(id)}
                deleting={vm.loading.deleteProduct}
              />
            ) : (
              <ProductForm
                editing={vm.editing}
                form={vm.form}
                categories={vm.categories}
                badges={vm.badges}
                newCat={vm.newCat}
                newBadge={vm.newBadge}
                onNewCat={vm.setNewCat}
                onNewBadge={vm.setNewBadge}
                onAddCategory={() => void vm.addCategoryAction()}
                onAddBadge={() => void vm.addBadgeAction()}
                onDeleteCategory={(name) => void vm.deleteCategoryAction(name)}
                onDeleteBadge={(name) => void vm.deleteBadgeAction(name)}
                setField={vm.setField}
                onSave={() => void vm.saveProduct()}
                onCancel={vm.cancelForm}
                loading={
                  vm.loading.saveProduct ||
                  vm.loading.addCategory ||
                  vm.loading.deleteCategory ||
                  vm.loading.addBadge ||
                  vm.loading.deleteBadge
                }
              />
            )}
          </div>
        </main>
      </div>
      <AdminToast toast={vm.toast} />
    </div>
  );
};

export default AdminPage;
