import { useCallback, useEffect, useState } from "react";
import {
  type ProductDto,
  addBadge,
  addCategory,
  addProduct,
  addStockEntry,
  deleteBadge,
  deleteCategory,
  deleteProduct,
  getAllProducts,
  getBadges,
  getCategories,
  getReferralSetting,
  loginAdmin,
  resetToDefaults,
  updateProduct,
  updateReferralSetting,
} from "../../services/service-api";

function blankProduct(): Omit<ProductDto, "id"> {
  return {
    name: "",
    subtitle: "",
    description: "",
    longDescription: "",
    price: 0,
    originalPrice: undefined,
    category: "",
    badge: undefined,
    rating: 5,
    reviewCount: 0,
    currentStock: 0,
    images: [""],
    specs: [{ label: "", value: "" }],
    benefits: [""],
    marketplaceLinks: [],
  };
}

export function useAdminDashboard() {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem("jaxlab_admin") === "1",
  );
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState("");
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [badges, setBadges] = useState<string[]>([]);
  const [editing, setEditing] = useState<ProductDto | null>(null);
  const [creating, setCreating] = useState(false);
  const [newCat, setNewCat] = useState("");
  const [newBadge, setNewBadge] = useState("");
  const [stockProduct, setStockProduct] = useState<ProductDto | null>(null);
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");
  const [referralPercentage, setReferralPercentage] = useState(5);
  const [form, setForm] = useState<Omit<ProductDto, "id">>(blankProduct());
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [loading, setLoading] = useState({
    login: false,
    saveProduct: false,
    deleteProduct: false,
    addCategory: false,
    deleteCategory: false,
    addBadge: false,
    deleteBadge: false,
    stockMutation: false,
    reset: false,
    referral: false,
  });

  const pushToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2200);
  };

  const refresh = useCallback(async () => {
    const [p, c, b, referral] = await Promise.all([
      getAllProducts(),
      getCategories(),
      getBadges(),
      getReferralSetting(),
    ]);
    setProducts(p);
    setCategories(c);
    setBadges(b);
    setReferralPercentage(referral.percentage);
  }, []);

  useEffect(() => {
    refresh().catch(() => {
      setProducts([]);
      setCategories([]);
      setBadges([]);
    });
  }, [refresh]);

  const setField = <K extends keyof Omit<ProductDto, "id">>(
    key: K,
    value: Omit<ProductDto, "id">[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogin = async () => {
    setLoading((s) => ({ ...s, login: true }));
    try {
      await loginAdmin(pw);
      sessionStorage.setItem("jaxlab_admin", "1");
      setAuthed(true);
      setPwError("");
      pushToast("Login berhasil", "success");
    } catch (e) {
      setPwError("Password salah. Coba lagi.");
      pushToast((e as Error).message || "Login gagal", "error");
    } finally {
      setLoading((s) => ({ ...s, login: false }));
    }
  };

  const logout = () => {
    sessionStorage.removeItem("jaxlab_admin");
    setAuthed(false);
  };

  const startCreate = () => {
    setEditing(null);
    setForm(blankProduct());
    setCreating(true);
  };

  const startEdit = (p: ProductDto) => {
    setEditing(p);
    setForm({ ...p });
    setCreating(true);
  };

  const cancelForm = () => {
    setEditing(null);
    setCreating(false);
  };

  const saveProduct = async () => {
    setLoading((s) => ({ ...s, saveProduct: true }));
    const cleaned = {
      ...form,
      images: form.images.filter((img) => img?.trim()),
      specs: form.specs.filter((s) => s.label.trim() || s.value.trim()),
      benefits: form.benefits.filter((b) => b.trim()),
      originalPrice: form.originalPrice || undefined,
      badge: form.badge || undefined,
    };
    try {
      if (editing) await updateProduct({ id: editing.id, ...cleaned });
      else await addProduct(cleaned);
      cancelForm();
      await refresh();
      pushToast("Produk berhasil disimpan", "success");
    } catch (e) {
      pushToast((e as Error).message || "Gagal menyimpan produk", "error");
    } finally {
      setLoading((s) => ({ ...s, saveProduct: false }));
    }
  };

  const removeProduct = async (id: string) => {
    setLoading((s) => ({ ...s, deleteProduct: true }));
    try {
      await deleteProduct(id);
      await refresh();
      pushToast("Produk berhasil dihapus", "success");
    } catch (e) {
      pushToast((e as Error).message || "Gagal menghapus produk", "error");
    } finally {
      setLoading((s) => ({ ...s, deleteProduct: false }));
    }
  };

  const addCategoryAction = async () => {
    if (!newCat.trim()) return;
    setLoading((s) => ({ ...s, addCategory: true }));
    try {
      await addCategory(newCat.trim());
      setNewCat("");
      await refresh();
      pushToast("Kategori ditambahkan", "success");
    } catch (e) {
      pushToast((e as Error).message || "Gagal tambah kategori", "error");
    } finally {
      setLoading((s) => ({ ...s, addCategory: false }));
    }
  };

  const deleteCategoryAction = async (name: string) => {
    setLoading((s) => ({ ...s, deleteCategory: true }));
    try {
      await deleteCategory(name);
      await refresh();
      pushToast("Kategori dihapus", "success");
    } catch (e) {
      pushToast((e as Error).message || "Gagal hapus kategori", "error");
    } finally {
      setLoading((s) => ({ ...s, deleteCategory: false }));
    }
  };

  const addBadgeAction = async () => {
    if (!newBadge.trim()) return;
    setLoading((s) => ({ ...s, addBadge: true }));
    try {
      await addBadge(newBadge.trim());
      setNewBadge("");
      await refresh();
      pushToast("Badge ditambahkan", "success");
    } catch (e) {
      pushToast((e as Error).message || "Gagal tambah badge", "error");
    } finally {
      setLoading((s) => ({ ...s, addBadge: false }));
    }
  };

  const deleteBadgeAction = async (name: string) => {
    setLoading((s) => ({ ...s, deleteBadge: true }));
    try {
      await deleteBadge(name);
      await refresh();
      pushToast("Badge dihapus", "success");
    } catch (e) {
      pushToast((e as Error).message || "Gagal hapus badge", "error");
    } finally {
      setLoading((s) => ({ ...s, deleteBadge: false }));
    }
  };

  const stockMutation = async (type: "IN" | "OUT") => {
    if (!stockProduct) return;
    setLoading((s) => ({ ...s, stockMutation: true }));
    try {
      await addStockEntry(stockProduct.id, {
        type,
        quantity: qty,
        note: note || undefined,
      });
      setQty(1);
      setNote("");
      await refresh();
      const latest = products.find((p) => p.id === stockProduct.id);
      setStockProduct(latest ?? stockProduct);
      pushToast(
        type === "IN" ? "Barang masuk tercatat" : "Barang keluar tercatat",
        "success",
      );
    } catch (e) {
      pushToast((e as Error).message || "Gagal update stok", "error");
    } finally {
      setLoading((s) => ({ ...s, stockMutation: false }));
    }
  };

  const doReset = async () => {
    setLoading((s) => ({ ...s, reset: true }));
    try {
      await resetToDefaults();
      await refresh();
      pushToast("Data berhasil di-reset", "success");
    } catch (e) {
      pushToast((e as Error).message || "Gagal reset data", "error");
    } finally {
      setLoading((s) => ({ ...s, reset: false }));
    }
  };

  const saveReferralPercentage = async () => {
    setLoading((s) => ({ ...s, referral: true }));
    try {
      const result = await updateReferralSetting(referralPercentage);
      setReferralPercentage(result.percentage);
      pushToast("Persentase referral disimpan", "success");
    } catch (e) {
      pushToast((e as Error).message || "Gagal menyimpan persentase", "error");
    } finally {
      setLoading((s) => ({ ...s, referral: false }));
    }
  };

  return {
    authed,
    pw,
    pwError,
    products,
    categories,
    badges,
    editing,
    creating,
    newCat,
    newBadge,
    stockProduct,
    qty,
    note,
    form,
    referralPercentage,
    setPw,
    setNewCat,
    setNewBadge,
    setStockProduct,
    setQty,
    setNote,
    setField,
    setReferralPercentage,
    handleLogin,
    logout,
    startCreate,
    startEdit,
    cancelForm,
    saveProduct,
    removeProduct,
    addCategoryAction,
    deleteCategoryAction,
    addBadgeAction,
    deleteBadgeAction,
    stockMutation,
    doReset,
    saveReferralPercentage,
    loading,
    toast,
  };
}
