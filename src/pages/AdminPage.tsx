import React, { useState, useCallback } from 'react';
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

// ─── Simple password gate (session-only) ─────────────────────────
const ADMIN_PASSWORD = 'jaxlab2024';

// ─── Blank product template ──────────────────────────────────────
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

const AdminPage: React.FC = () => {
    // ─── Auth ────────────────────────────────────────────────────
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

    // ─── State ───────────────────────────────────────────────────
    const [tab, setTab] = useState<Tab>('products');
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategoriesState] = useState<string[]>([]);
    const [editing, setEditing] = useState<Product | null>(null);
    const [creating, setCreating] = useState(false);
    const [newCat, setNewCat] = useState('');

    // Force-refresh from db
    const refresh = useCallback(async () => {
        const [p, c] = await Promise.all([getAllProducts(), getCategories()]);
        setProducts(p);
        setCategoriesState(c);
    }, []);

    React.useEffect(() => {
        refresh().catch(() => {
            setProducts([]);
            setCategoriesState([]);
        });
    }, [refresh]);

    // ─── Form state ──────────────────────────────────────────────
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
        if (!form.name.trim()) { alert('Nama produk harus diisi'); return; }
        if (form.price <= 0) { alert('Harga harus lebih dari 0'); return; }

        // Clean up empty entries
        const cleaned = {
            ...form,
            images: form.images.filter(i => i.trim() !== ''),
            specs: form.specs.filter(s => s.label.trim() !== '' || s.value.trim() !== ''),
            benefits: form.benefits.filter(b => b.trim() !== ''),
            originalPrice: form.originalPrice || undefined,
            badge: form.badge || undefined,
        };

        if (editing) {
            await updateProduct({ id: editing.id, ...cleaned });
        } else {
            await addProduct(cleaned);
        }
        await refresh();
        closeForm();
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Yakin ingin menghapus produk ini?')) return;
        await deleteProduct(id);
        await refresh();
    };

    const handleReset = async () => {
        if (!confirm('Reset semua data ke default? Perubahan Anda akan hilang.')) return;
        await resetToDefaults();
        await refresh();
        closeForm();
    };

    const handleAddCategory = async () => {
        if (!newCat.trim()) return;
        await addCategory(newCat.trim());
        setNewCat('');
        await refresh();
    };

    const handleDeleteCategory = async (name: string) => {
        if (!confirm(`Hapus kategori "${name}"?`)) return;
        await deleteCategory(name);
        await refresh();
    };

    // ─── Form field helpers ──────────────────────────────────────
    const setField = <K extends keyof Omit<Product, 'id'>>(key: K, value: Omit<Product, 'id'>[K]) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    // ─── LOGIN SCREEN ────────────────────────────────────────────
    if (!authed) {
        return (
            <div className="admin-login">
                <div className="admin-login-box">
                    <h2>🔒 JaxLab Admin</h2>
                    <p>Masukkan password untuk mengakses panel admin.</p>
                    {pwError && <p className="login-error">{pwError}</p>}
                    <input
                        type="password"
                        placeholder="Password"
                        value={pw}
                        onChange={e => { setPw(e.target.value); setPwError(''); }}
                        onKeyDown={e => e.key === 'Enter' && handleLogin()}
                    />
                    <button className="login-btn" onClick={handleLogin}>Masuk</button>
                </div>
            </div>
        );
    }

    // ─── DASHBOARD ───────────────────────────────────────────────
    return (
        <div className="admin-page">
            {/* Top Bar */}
            <header className="admin-topbar">
                <h1>JaxLab Admin Panel</h1>
                <div className="admin-topbar-actions">
                    <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.85rem' }}>
                        ← Lihat Website
                    </Link>
                    <button className="btn-danger" onClick={handleReset}>Reset Default</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </header>

            <div className="admin-body">
                {/* Tabs */}
                <div className="admin-tabs">
                    <button className={tab === 'products' ? 'active' : ''} onClick={() => { setTab('products'); closeForm(); }}>
                        Produk ({products.length})
                    </button>
                    <button className={tab === 'categories' ? 'active' : ''} onClick={() => { setTab('categories'); closeForm(); }}>
                        Kategori ({categories.length})
                    </button>
                </div>

                {/* ─── PRODUCTS TAB ─────────────────────────────── */}
                {tab === 'products' && !creating && (
                    <div className="admin-card">
                        <div className="admin-card-header">
                            <h2>Daftar Produk</h2>
                            <button className="btn-add" onClick={openCreate}>+ Tambah Produk</button>
                        </div>
                        <div style={{ overflowX: 'auto' }}>
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Foto</th>
                                        <th>Nama</th>
                                        <th>Kategori</th>
                                        <th>Harga</th>
                                        <th>Badge</th>
                                        <th>Stok</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(p => (
                                        <tr key={p.id}>
                                            <td>
                                                {p.images[0]
                                                    ? <img src={p.images[0]} alt="" className="product-thumb" />
                                                    : <span style={{ color: '#aaa' }}>—</span>
                                                }
                                            </td>
                                            <td><strong>{p.name}</strong></td>
                                            <td>{p.category}</td>
                                            <td>{formatRupiah(p.price)}</td>
                                            <td>{p.badge || '—'}</td>
                                            <td>{p.stockStatus}</td>
                                            <td className="actions-cell">
                                                <button className="btn-edit" onClick={() => openEdit(p)}>Edit</button>
                                                <button className="btn-delete" onClick={() => handleDelete(p.id)}>Hapus</button>
                                            </td>
                                        </tr>
                                    ))}
                                    {products.length === 0 && (
                                        <tr><td colSpan={7} style={{ textAlign: 'center', color: '#999', padding: '2rem' }}>Belum ada produk.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* ─── PRODUCT FORM ────────────────────────────── */}
                {tab === 'products' && creating && (
                    <div className="admin-card">
                        <div className="admin-card-header">
                            <h2>{editing ? `Edit: ${editing.name}` : 'Tambah Produk Baru'}</h2>
                        </div>
                        <div className="admin-form">
                            {/* Row 1: Name & Category */}
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Nama Produk *</label>
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

                            {/* Row 2: Subtitle */}
                            <div className="form-group full-width">
                                <label>Subtitle</label>
                                <input value={form.subtitle} onChange={e => setField('subtitle', e.target.value)} placeholder="Tagline singkat produk" />
                            </div>

                            {/* Row 3: Descriptions */}
                            <div className="form-group full-width">
                                <label>Deskripsi Singkat</label>
                                <textarea value={form.description} onChange={e => setField('description', e.target.value)} rows={2} />
                            </div>
                            <div className="form-group full-width">
                                <label>Deskripsi Lengkap</label>
                                <textarea value={form.longDescription} onChange={e => setField('longDescription', e.target.value)} rows={4} />
                            </div>

                            {/* Row 4: Price, Original Price, Badge, Stock */}
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Harga (Rp) *</label>
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

                            {/* Row 5: Rating & Reviews */}
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

                            {/* Images (dynamic list) */}
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
                                            }}>✕</button>
                                        </div>
                                    ))}
                                    <button className="btn-add-item" onClick={() => setField('images', [...form.images, ''])}>
                                        + Tambah Gambar
                                    </button>
                                </div>
                            </div>

                            {/* Specs (dynamic label/value) */}
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
                                                style={{ flex: 1 }}
                                            />
                                            <input
                                                value={spec.value}
                                                onChange={e => {
                                                    const specs = form.specs.map((s, idx) => idx === i ? { ...s, value: e.target.value } : s);
                                                    setField('specs', specs);
                                                }}
                                                placeholder="Nilai (misal: 500ml)"
                                                style={{ flex: 1 }}
                                            />
                                            <button className="btn-remove-item" onClick={() => {
                                                const specs = form.specs.filter((_, idx) => idx !== i);
                                                setField('specs', specs.length ? specs : [{ label: '', value: '' }]);
                                            }}>✕</button>
                                        </div>
                                    ))}
                                    <button className="btn-add-item" onClick={() => setField('specs', [...form.specs, { label: '', value: '' }])}>
                                        + Tambah Spesifikasi
                                    </button>
                                </div>
                            </div>

                            {/* Benefits (dynamic list) */}
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
                                            }}>✕</button>
                                        </div>
                                    ))}
                                    <button className="btn-add-item" onClick={() => setField('benefits', [...form.benefits, ''])}>
                                        + Tambah Manfaat
                                    </button>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="form-actions">
                                <button className="btn-save" onClick={handleSave}>
                                    {editing ? 'Simpan Perubahan' : 'Tambah Produk'}
                                </button>
                                <button className="btn-cancel" onClick={closeForm}>Batal</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ─── CATEGORIES TAB ──────────────────────────── */}
                {tab === 'categories' && (
                    <div className="admin-card">
                        <div className="admin-card-header">
                            <h2>Kategori Produk</h2>
                        </div>
                        <div className="category-list">
                            {categories.map(c => (
                                <span key={c} className="category-chip">
                                    {c}
                                    <button onClick={() => handleDeleteCategory(c)} title="Hapus">✕</button>
                                </span>
                            ))}
                            {categories.length === 0 && <p style={{ color: '#999' }}>Belum ada kategori.</p>}
                        </div>
                        <div className="add-category-row">
                            <input
                                value={newCat}
                                onChange={e => setNewCat(e.target.value)}
                                placeholder="Nama kategori baru"
                                onKeyDown={e => e.key === 'Enter' && handleAddCategory()}
                            />
                            <button className="btn-add" onClick={handleAddCategory}>Tambah</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPage;
