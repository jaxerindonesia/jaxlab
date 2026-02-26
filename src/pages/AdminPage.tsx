import React, { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './AdminPage.css';
import {
    type Product,
    getAllProducts,
    getCategories,
    formatRupiah,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    deleteCategory,
    resetToDefaults,
} from '../database/db';
import {
    Package,
    Tag,
    TrendingUp,
    AlertTriangle,
    Search,
    Filter,
    Plus,
    Edit2,
    Trash2,
    X,
    CheckCircle,
    XCircle,
    AlertCircle,
    RefreshCw,
    LogOut,
    Home,
    Loader2,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';

const ADMIN_PASSWORD = 'jaxlab2024';
const ITEMS_PER_PAGE = 10;

function blankProduct(): Omit<Product, 'id'> {
    return {
        name: '',
        subtitle: '',
        description: '',
        longDescription: '',
        price: 0,
        originalPrice: undefined,
        category: '',
        badge: undefined,
        rating: 5,
        reviewCount: 0,
        stockStatus: 'Tersedia',
        images: [''],
        specs: [{ label: '', value: '' }],
        benefits: [''],
    };
}

type Tab = 'products' | 'categories';

interface Toast {
    id: string;
    type: 'success' | 'error' | 'warning';
    message: string;
}

interface ConfirmModal {
    title: string;
    message: string;
    onConfirm: () => void;
}

const AdminPage: React.FC = () => {
    const [authed, setAuthed] = useState(() => sessionStorage.getItem('jaxlab_admin') === '1');
    const [pw, setPw] = useState('');
    const [pwError, setPwError] = useState('');

    const handleLogin = () => {
        if (pw === ADMIN_PASSWORD) {
            sessionStorage.setItem('jaxlab_admin', '1');
            setAuthed(true);
        } else {
            setPwError('Password salah. Coba lagi.');
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('jaxlab_admin');
        setAuthed(false);
        setPw('');
    };

    const [tab, setTab] = useState<Tab>('products');
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategoriesState] = useState<string[]>([]);
    const [editing, setEditing] = useState<Product | null>(null);
    const [creating, setCreating] = useState(false);
    const [newCat, setNewCat] = useState('');
    const [loading, setLoading] = useState(true);
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [confirmModal, setConfirmModal] = useState<ConfirmModal | null>(null);
    const [search, setSearch] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const showToast = useCallback((type: Toast['type'], message: string) => {
        const id = Date.now().toString();
        setToasts(prev => [...prev, { id, type, message }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 4000);
    }, []);

    const refresh = useCallback(async () => {
        setLoading(true);
        try {
            const [p, c] = await Promise.all([getAllProducts(), getCategories()]);
            setProducts(p);
            setCategoriesState(c);
        } catch {
            setProducts([]);
            setCategoriesState([]);
        } finally {
            setLoading(false);
        }
    }, []);

    React.useEffect(() => {
        refresh();
    }, [refresh]);

    const [form, setForm] = useState<Omit<Product, 'id'>>(blankProduct());

    const openCreate = () => {
        setForm(blankProduct());
        setEditing(null);
        setCreating(true);
    };

    const openEdit = (p: Product) => {
        setForm({
            name: p.name,
            subtitle: p.subtitle,
            description: p.description,
            longDescription: p.longDescription,
            price: p.price,
            originalPrice: p.originalPrice,
            category: p.category,
            badge: p.badge,
            rating: p.rating,
            reviewCount: p.reviewCount,
            stockStatus: p.stockStatus,
            images: [...p.images],
            specs: p.specs.map(s => ({ ...s })),
            benefits: [...p.benefits],
        });
        setEditing(p);
        setCreating(true);
    };

    const closeForm = () => {
        setCreating(false);
        setEditing(null);
    };

    const handleSave = async () => {
        if (!form.name.trim()) {
            showToast('error', 'Nama produk harus diisi');
            return;
        }
        if (form.price <= 0) {
            showToast('error', 'Harga harus lebih dari 0');
            return;
        }

        const cleaned = {
            ...form,
            images: form.images.filter(i => i.trim() !== ''),
            specs: form.specs.filter(s => s.label.trim() !== '' || s.value.trim() !== ''),
            benefits: form.benefits.filter(b => b.trim() !== ''),
            originalPrice: form.originalPrice || undefined,
            badge: form.badge || undefined,
        };

        try {
            if (editing) {
                await updateProduct({ id: editing.id, ...cleaned });
                showToast('success', 'Produk berhasil diperbarui');
            } else {
                await addProduct(cleaned);
                showToast('success', 'Produk berhasil ditambahkan');
            }
            await refresh();
            closeForm();
        } catch {
            showToast('error', 'Gagal menyimpan produk');
        }
    };

    const handleDelete = async (id: string) => {
        setConfirmModal({
            title: 'Hapus Produk',
            message: 'Yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan.',
            onConfirm: async () => {
                try {
                    await deleteProduct(id);
                    showToast('success', 'Produk berhasil dihapus');
                    await refresh();
                } catch {
                    showToast('error', 'Gagal menghapus produk');
                }
                setConfirmModal(null);
            },
        });
    };

    const handleReset = () => {
        setConfirmModal({
            title: 'Reset Data',
            message: 'Reset semua data ke default? Semua perubahan Anda akan hilang.',
            onConfirm: async () => {
                try {
                    await resetToDefaults();
                    showToast('success', 'Data berhasil direset ke default');
                    await refresh();
                    closeForm();
                } catch {
                    showToast('error', 'Gagal mereset data');
                }
                setConfirmModal(null);
            },
        });
    };

    const handleAddCategory = async () => {
        if (!newCat.trim()) return;
        try {
            await addCategory(newCat.trim());
            showToast('success', 'Kategori berhasil ditambahkan');
            setNewCat('');
            await refresh();
        } catch {
            showToast('error', 'Gagal menambahkan kategori');
        }
    };

    const handleDeleteCategory = (name: string) => {
        setConfirmModal({
            title: 'Hapus Kategori',
            message: `Hapus kategori "${name}"?`,
            onConfirm: async () => {
                try {
                    await deleteCategory(name);
                    showToast('success', 'Kategori berhasil dihapus');
                    await refresh();
                } catch {
                    showToast('error', 'Gagal menghapus kategori');
                }
                setConfirmModal(null);
            },
        });
    };

    const setField = <K extends keyof Omit<Product, 'id'>>(key: K, value: Omit<Product, 'id'>[K]) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const filteredProducts = useMemo(() => {
        let result = products;
        if (search) {
            const s = search.toLowerCase();
            result = result.filter(p => 
                p.name.toLowerCase().includes(s) ||
                p.description?.toLowerCase().includes(s) ||
                p.category.toLowerCase().includes(s)
            );
        }
        if (filterCategory) {
            result = result.filter(p => p.category === filterCategory);
        }
        return result;
    }, [products, search, filterCategory]);

    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredProducts, currentPage]);

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

    const stats = useMemo(() => ({
        totalProducts: products.length,
        totalCategories: categories.length,
        totalValue: products.reduce((sum, p) => sum + p.price, 0),
        lowStock: products.filter(p => p.stockStatus !== 'Tersedia').length,
    }), [products, categories]);

    if (!authed) {
        return (
            <div className="admin-login">
                <div className="admin-login-box">
                    <div className="admin-login-logo">
                        <Package />
                    </div>
                    <h2>JaxLab Admin</h2>
                    <p>Masukkan password untuk mengakses panel admin.</p>
                    {pwError && <div className="login-error">{pwError}</div>}
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={pw}
                            onChange={e => { setPw(e.target.value); setPwError(''); }}
                            onKeyDown={e => e.key === 'Enter' && handleLogin()}
                        />
                    </div>
                    <button className="login-btn" onClick={handleLogin}>Masuk</button>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <header className="admin-topbar">
                <div className="admin-topbar-brand">
                    <div className="admin-topbar-logo">
                        <Package />
                    </div>
                    <h1>JaxLab Admin</h1>
                    <span className="admin-topbar-subtitle">Panel Manajemen</span>
                </div>
                <div className="admin-topbar-actions">
                    <Link to="/" className="btn-link">
                        <Home size={16} /> Lihat Website
                    </Link>
                    <button onClick={handleReset} className="btn-reset">
                        <RefreshCw size={16} /> Reset Default
                    </button>
                    <button onClick={handleLogout} className="btn-logout">
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </header>

            <div className="admin-body">
                <div className="admin-tabs">
                    <button className={tab === 'products' ? 'active' : ''} onClick={() => { setTab('products'); closeForm(); setSearch(''); setFilterCategory(''); setCurrentPage(1); }}>
                        <Package size={16} /> Produk
                    </button>
                    <button className={tab === 'categories' ? 'active' : ''} onClick={() => { setTab('categories'); closeForm(); }}>
                        <Tag size={16} /> Kategori
                    </button>
                </div>

                {tab === 'products' && !creating && (
                    <>
                        <div className="admin-stats">
                            <div className="admin-stat-card">
                                <div className="admin-stat-icon blue"><Package /></div>
                                <div className="admin-stat-content">
                                    <div className="admin-stat-value">{stats.totalProducts}</div>
                                    <div className="admin-stat-label">Total Produk</div>
                                </div>
                            </div>
                            <div className="admin-stat-card">
                                <div className="admin-stat-icon green"><Tag /></div>
                                <div className="admin-stat-content">
                                    <div className="admin-stat-value">{stats.totalCategories}</div>
                                    <div className="admin-stat-label">Kategori</div>
                                </div>
                            </div>
                            <div className="admin-stat-card">
                                <div className="admin-stat-icon orange"><TrendingUp /></div>
                                <div className="admin-stat-content">
                                    <div className="admin-stat-value">{formatRupiah(stats.totalValue)}</div>
                                    <div className="admin-stat-label">Total Nilai Produk</div>
                                </div>
                            </div>
                            <div className="admin-stat-card">
                                <div className="admin-stat-icon red"><AlertTriangle /></div>
                                <div className="admin-stat-content">
                                    <div className="admin-stat-value">{stats.lowStock}</div>
                                    <div className="admin-stat-label">Stok Terbatas/Habis</div>
                                </div>
                            </div>
                        </div>

                        <div className="admin-card">
                            <div className="admin-card-header">
                                <h2>Daftar Produk</h2>
                                <button className="btn-add" onClick={openCreate}>
                                    <Plus size={16} /> Tambah Produk
                                </button>
                            </div>

                            <div className="admin-filters">
                                <div className="search-box">
                                    <Search size={18} className="search-icon" />
                                    <input
                                        type="text"
                                        placeholder="Cari produk..."
                                        value={search}
                                        onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                                    />
                                </div>
                                <div className="filter-box">
                                    <Filter size={18} />
                                    <select value={filterCategory} onChange={e => { setFilterCategory(e.target.value); setCurrentPage(1); }}>
                                        <option value="">Semua Kategori</option>
                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>

                            {loading ? (
                                <div className="skeleton-table">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="skeleton-row">
                                            <div className="skeleton-cell skeleton-thumb"></div>
                                            <div className="skeleton-cell skeleton-text"></div>
                                            <div className="skeleton-cell skeleton-text"></div>
                                            <div className="skeleton-cell skeleton-text"></div>
                                            <div className="skeleton-cell skeleton-text"></div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <>
                                    <div className="admin-table-wrapper">
                                        <table className="admin-table">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: 80 }}>Foto</th>
                                                    <th>Nama Produk</th>
                                                    <th>Kategori</th>
                                                    <th>Harga</th>
                                                    <th>Badge</th>
                                                    <th>Stok</th>
                                                    <th style={{ width: 140 }}>Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {paginatedProducts.map(p => (
                                                    <tr key={p.id}>
                                                        <td>
                                                            {p.images[0]
                                                                ? <img src={p.images[0]} alt="" className="product-thumb" />
                                                                : <div className="product-thumb-placeholder"><Package size={20} /></div>
                                                            }
                                                        </td>
                                                        <td>
                                                            <div className="product-info">
                                                                <div className="product-name">{p.name}</div>
                                                                <div className="product-category">{p.category}</div>
                                                            </div>
                                                        </td>
                                                        <td>{p.category}</td>
                                                        <td>
                                                            <span className="product-price">{formatRupiah(p.price)}</span>
                                                            {p.originalPrice && (
                                                                <span className="product-original-price">{formatRupiah(p.originalPrice)}</span>
                                                            )}
                                                        </td>
                                                        <td>
                                                            {p.badge && <span className={`badge badge-${p.badge.toLowerCase()}`}>{p.badge}</span>}
                                                        </td>
                                                        <td>
                                                            <span className={`stock-badge ${p.stockStatus === 'Tersedia' ? 'available' : p.stockStatus === 'Terbatas' ? 'limited' : 'out'}`}>
                                                                {p.stockStatus}
                                                            </span>
                                                        </td>
                                                        <td className="actions-cell">
                                                            <button className="btn-edit" onClick={() => openEdit(p)} title="Edit">
                                                                <Edit2 size={14} /> Edit
                                                            </button>
                                                            <button className="btn-delete" onClick={() => handleDelete(p.id)} title="Hapus">
                                                                <Trash2 size={14} /> Hapus
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {paginatedProducts.length === 0 && (
                                                    <tr>
                                                        <td colSpan={7}>
                                                            <div className="admin-table-empty">
                                                                <Package size={48} />
                                                                <p>Tidak ada produk ditemukan</p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    {totalPages > 1 && (
                                        <div className="pagination">
                                            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                                                <ChevronLeft size={16} /> Prev
                                            </button>
                                            <span className="page-info">Halaman {currentPage} dari {totalPages}</span>
                                            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                                                Next <ChevronRight size={16} />
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </>
                )}

                {tab === 'products' && creating && (
                    <div className="admin-card">
                        <div className="admin-card-header">
                            <h2>{editing ? `Edit: ${editing.name}` : 'Tambah Produk Baru'}</h2>
                        </div>
                        <div className="admin-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Nama Produk <span className="required">*</span></label>
                                    <input value={form.name} onChange={e => setField('name', e.target.value)} placeholder="Contoh: JaxLab Bone Broth" />
                                </div>
                                <div className="form-group">
                                    <label>Kategori</label>
                                    <select value={form.category} onChange={e => setField('category', e.target.value)}>
                                        <option value="">— Pilih Kategori —</option>
                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group full-width">
                                <label>Subtitle</label>
                                <input value={form.subtitle} onChange={e => setField('subtitle', e.target.value)} placeholder="Tagline singkat produk" />
                            </div>

                            <div className="form-group full-width">
                                <label>Deskripsi Singkat</label>
                                <textarea value={form.description} onChange={e => setField('description', e.target.value)} rows={2} />
                            </div>
                            <div className="form-group full-width">
                                <label>Deskripsi Lengkap</label>
                                <textarea value={form.longDescription} onChange={e => setField('longDescription', e.target.value)} rows={4} />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Harga (Rp) <span className="required">*</span></label>
                                    <input type="number" value={form.price} onChange={e => setField('price', Number(e.target.value))} min={0} />
                                </div>
                                <div className="form-group">
                                    <label>Harga Asli (Rp) — kosongkan jika tidak diskon</label>
                                    <input type="number" value={form.originalPrice ?? ''} onChange={e => setField('originalPrice', e.target.value ? Number(e.target.value) : undefined)} min={0} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Badge</label>
                                    <select value={form.badge ?? ''} onChange={e => setField('badge', e.target.value || undefined)}>
                                        <option value="">Tidak ada</option>
                                        <option value="Best Seller">Best Seller</option>
                                        <option value="New">New</option>
                                        <option value="Sale">Sale</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Status Stok</label>
                                    <select value={form.stockStatus} onChange={e => setField('stockStatus', e.target.value as Product['stockStatus'])}>
                                        <option value="Tersedia">Tersedia</option>
                                        <option value="Terbatas">Terbatas</option>
                                        <option value="Habis">Habis</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Rating (0–5)</label>
                                    <input type="number" value={form.rating} onChange={e => setField('rating', Number(e.target.value))} min={0} max={5} step={0.1} />
                                </div>
                                <div className="form-group">
                                    <label>Jumlah Ulasan</label>
                                    <input type="number" value={form.reviewCount} onChange={e => setField('reviewCount', Number(e.target.value))} min={0} />
                                </div>
                            </div>

                            <div className="form-group full-width">
                                <label>Gambar (URL)</label>
                                <div className="dynamic-list">
                                    {form.images.map((img, i) => (
                                        <div key={i} className="dynamic-list-item">
                                            <input
                                                value={img}
                                                onChange={e => {
                                                    const imgs = [...form.images];
                                                    imgs[i] = e.target.value;
                                                    setField('images', imgs);
                                                }}
                                                placeholder="https://..."
                                            />
                                            <button className="btn-remove-item" onClick={() => {
                                                const imgs = form.images.filter((_, idx) => idx !== i);
                                                setField('images', imgs.length ? imgs : ['']);
                                            }}><X size={16} /></button>
                                        </div>
                                    ))}
                                    <button className="btn-add-item" onClick={() => setField('images', [...form.images, ''])}>
                                        <Plus size={16} /> Tambah Gambar
                                    </button>
                                </div>
                            </div>

                            <div className="form-group full-width">
                                <label>Spesifikasi</label>
                                <div className="dynamic-list">
                                    {form.specs.map((spec, i) => (
                                        <div key={i} className="dynamic-list-item">
                                            <input
                                                value={spec.label}
                                                onChange={e => {
                                                    const specs = form.specs.map((s, idx) => idx === i ? { ...s, label: e.target.value } : s);
                                                    setField('specs', specs);
                                                }}
                                                placeholder="Label (misal: Berat)"
                                            />
                                            <input
                                                value={spec.value}
                                                onChange={e => {
                                                    const specs = form.specs.map((s, idx) => idx === i ? { ...s, value: e.target.value } : s);
                                                    setField('specs', specs);
                                                }}
                                                placeholder="Nilai (misal: 500ml)"
                                            />
                                            <button className="btn-remove-item" onClick={() => {
                                                const specs = form.specs.filter((_, idx) => idx !== i);
                                                setField('specs', specs.length ? specs : [{ label: '', value: '' }]);
                                            }}><X size={16} /></button>
                                        </div>
                                    ))}
                                    <button className="btn-add-item" onClick={() => setField('specs', [...form.specs, { label: '', value: '' }])}>
                                        <Plus size={16} /> Tambah Spesifikasi
                                    </button>
                                </div>
                            </div>

                            <div className="form-group full-width">
                                <label>Manfaat</label>
                                <div className="dynamic-list">
                                    {form.benefits.map((b, i) => (
                                        <div key={i} className="dynamic-list-item">
                                            <input
                                                value={b}
                                                onChange={e => {
                                                    const bens = [...form.benefits];
                                                    bens[i] = e.target.value;
                                                    setField('benefits', bens);
                                                }}
                                                placeholder="Manfaat produk"
                                            />
                                            <button className="btn-remove-item" onClick={() => {
                                                const bens = form.benefits.filter((_, idx) => idx !== i);
                                                setField('benefits', bens.length ? bens : ['']);
                                            }}><X size={16} /></button>
                                        </div>
                                    ))}
                                    <button className="btn-add-item" onClick={() => setField('benefits', [...form.benefits, ''])}>
                                        <Plus size={16} /> Tambah Manfaat
                                    </button>
                                </div>
                            </div>

                            <div className="form-actions">
                                <button className="btn-save" onClick={handleSave}>
                                    <CheckCircle size={16} /> {editing ? 'Simpan Perubahan' : 'Tambah Produk'}
                                </button>
                                <button className="btn-cancel" onClick={closeForm}>
                                    <XCircle size={16} /> Batal
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {tab === 'categories' && (
                    <div className="admin-card">
                        <div className="admin-card-header">
                            <h2>Kategori Produk</h2>
                        </div>
                        <div className="category-list">
                            {categories.map(c => (
                                <span key={c} className="category-chip">
                                    {c}
                                    <button onClick={() => handleDeleteCategory(c)} title="Hapus"><X size={14} /></button>
                                </span>
                            ))}
                            {categories.length === 0 && <p style={{ color: '#9aa0a6' }}>Belum ada kategori.</p>}
                        </div>
                        <div className="add-category-row">
                            <input
                                value={newCat}
                                onChange={e => setNewCat(e.target.value)}
                                placeholder="Nama kategori baru"
                                onKeyDown={e => e.key === 'Enter' && handleAddCategory()}
                            />
                            <button className="btn-add" onClick={handleAddCategory}><Plus size={16} /> Tambah</button>
                        </div>
                    </div>
                )}
            </div>

            <div className="toast-container">
                {toasts.map(toast => (
                    <div key={toast.id} className={`toast toast-${toast.type}`}>
                        {toast.type === 'success' && <CheckCircle size={18} />}
                        {toast.type === 'error' && <XCircle size={18} />}
                        {toast.type === 'warning' && <AlertCircle size={18} />}
                        <span>{toast.message}</span>
                        <button onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}><X size={16} /></button>
                    </div>
                ))}
            </div>

            {confirmModal && (
                <div className="modal-overlay" onClick={() => setConfirmModal(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-icon modal-icon-warning">
                            <AlertTriangle size={24} />
                        </div>
                        <h3>{confirmModal.title}</h3>
                        <p>{confirmModal.message}</p>
                        <div className="modal-actions">
                            <button className="btn-cancel" onClick={() => setConfirmModal(null)}>Batal</button>
                            <button className="btn-delete" onClick={confirmModal.onConfirm}>Ya, Hapus</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPage;
