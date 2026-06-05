import React, { useEffect, useMemo, useState } from 'react';
import { ChevronDown, History, LogIn, LogOut, Menu, ShoppingCart, User, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AUTH_CHANGED_EVENT, clearMember, getMember } from '../services/auth';
import { CART_CHANGED_EVENT, getCart } from '../services/cart';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [memberName, setMemberName] = useState<string | null>(null);
    const [cartCount, setCartCount] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const shortName = useMemo(() => memberName?.split(' ')[0] ?? '', [memberName]);
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const updateViewport = () => setIsMobile(window.innerWidth <= 1024);
        const sync = () => {
            const member = getMember();
            setMemberName(member?.name ?? null);
            setCartCount(getCart().reduce((sum, i) => sum + i.qty, 0));
        };
        updateViewport();
        sync();
        window.addEventListener('resize', updateViewport);
        window.addEventListener('storage', sync);
        window.addEventListener(AUTH_CHANGED_EVENT, sync);
        window.addEventListener(CART_CHANGED_EVENT, sync);
        const handleDocumentClick = () => setIsProfileOpen(false);
        document.addEventListener('click', handleDocumentClick);
        return () => {
            window.removeEventListener('resize', updateViewport);
            window.removeEventListener('storage', sync);
            window.removeEventListener(AUTH_CHANGED_EVENT, sync);
            window.removeEventListener(CART_CHANGED_EVENT, sync);
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    const handleNavigation = (target: string) => {
        setIsMenuOpen(false);
        setIsProfileOpen(false);
        if (target.startsWith('#')) {
            if (location.pathname !== '/') {
                navigate('/');
                setTimeout(() => {
                    const element = document.getElementById(target.substring(1));
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                }, 500);
            } else {
                const element = document.getElementById(target.substring(1));
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        } else {
            navigate(target);
        }
    };

    return (
        <header className="sticky top-0 z-[1000] bg-[var(--primary-green)] py-3 text-white">
            <div className="container flex items-center justify-between gap-4">
                <div className="cursor-pointer" onClick={() => navigate('/')}>
                    <img src="/logo-jaxlab.png" alt="JAXLAB Logo" className="block h-10 w-auto max-[1024px]:h-[34px]" />
                </div>
                {isMobile && isMenuOpen && (
                    <button
                        type="button"
                        aria-label="Tutup menu"
                        className="fixed inset-0 z-[1090] bg-black/20"
                        onClick={() => setIsMenuOpen(false)}
                    />
                )}
                <nav
                    className={`z-[1100] bg-[var(--primary-green)] transition-transform duration-300 max-[1024px]:fixed max-[1024px]:right-0 max-[1024px]:top-0 max-[1024px]:h-screen max-[1024px]:w-[70%] max-[1024px]:flex max-[1024px]:flex-col max-[1024px]:items-start max-[1024px]:justify-start max-[1024px]:gap-4 max-[1024px]:px-8 max-[1024px]:pb-8 max-[1024px]:pt-24 max-[1024px]:shadow-[-2px_0_5px_rgba(0,0,0,0.5)] min-[1025px]:static min-[1025px]:flex min-[1025px]:h-auto min-[1025px]:w-auto min-[1025px]:translate-x-0 min-[1025px]:flex-row min-[1025px]:items-center min-[1025px]:justify-center min-[1025px]:gap-6 min-[1025px]:bg-transparent min-[1025px]:p-0 min-[1025px]:shadow-none ${isMobile ? (isMenuOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none') : 'pointer-events-auto'}`}
                >
                    <a className="cursor-pointer font-normal transition-colors hover:text-[var(--accent-green)] max-[1024px]:w-full max-[1024px]:py-1.5 max-[1024px]:text-lg max-[1024px]:font-semibold" onClick={() => handleNavigation('/')}>Home</a>
                    <a className="cursor-pointer font-normal transition-colors hover:text-[var(--accent-green)] max-[1024px]:w-full max-[1024px]:py-1.5 max-[1024px]:text-lg max-[1024px]:font-semibold" onClick={() => handleNavigation('/products')}>Produk Kami</a>
                    <a className="cursor-pointer font-normal transition-colors hover:text-[var(--accent-green)] max-[1024px]:w-full max-[1024px]:py-1.5 max-[1024px]:text-lg max-[1024px]:font-semibold" onClick={() => handleNavigation('/about')}>Tentang JaxLab</a>
                    <a className="cursor-pointer font-normal transition-colors hover:text-[var(--accent-green)] max-[1024px]:w-full max-[1024px]:py-1.5 max-[1024px]:text-lg max-[1024px]:font-semibold" onClick={() => handleNavigation('/contact')}>Hubungi Kami</a>
                    {!isHomePage && (
                        <div className="mt-3 hidden w-full flex-col gap-3 max-[1024px]:flex">
                            <button type="button" className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/55 text-white hover:bg-white/15" onClick={() => handleNavigation('/cart')} title="Keranjang">
                                <ShoppingCart size={18} />
                                {cartCount > 0 ? <span className="absolute -right-1.5 -top-1.5 inline-block min-h-[17px] min-w-[17px] rounded-full bg-red-500 px-1 text-center text-[10px] leading-[17px] font-bold text-white">{cartCount}</span> : null}
                            </button>
                            {memberName ? (
                                <>
                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-white/60 px-3 py-1.5 text-sm text-white"><User size={14} /> Hi, {shortName}</span>
                                    <button
                                        type="button"
                                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/55 text-white hover:bg-white/15"
                                        onClick={() => { clearMember(); setIsMenuOpen(false); navigate('/'); }}
                                        title="Logout"
                                    >
                                        <LogOut size={16} />
                                    </button>
                                </>
                            ) : (
                                <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/55 text-white hover:bg-white/15" onClick={() => handleNavigation('/member/auth')} title="Login">
                                    <LogIn size={16} />
                                </button>
                            )}
                        </div>
                    )}
                    <div className="mt-5 hidden max-[1024px]:block">
                        <a
                            href={`https://wa.me/6281234567890?text=${encodeURIComponent('Hai! Saya tertarik menjadi Healthy Partner di JaxLab. Boleh minta detail kerjasamanya?')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block rounded-full border border-white px-6 py-2 text-white no-underline transition hover:bg-white hover:text-[var(--primary-green)]"
                        >
                            Join Healthy Partner
                        </a>
                    </div>
                </nav>
                {isMobile && isMenuOpen && (
                    <button
                        type="button"
                        aria-label="Tutup menu"
                        onClick={() => setIsMenuOpen(false)}
                        className="fixed right-[18px] top-[18px] z-[1205] inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-[var(--primary-green)] text-white shadow-[0_8px_24px_rgba(0,0,0,0.22)]"
                    >
                        <X />
                    </button>
                )}
                <div className="flex items-center gap-2">
                    {!isHomePage && (
                        <button className="hidden items-center justify-center gap-1 rounded-full border border-white px-3 py-2 text-white hover:bg-white hover:text-[var(--primary-green)] min-[1025px]:inline-flex" onClick={() => navigate('/cart')}>
                            <ShoppingCart size={17} />
                            {cartCount > 0 ? `(${cartCount})` : ''}
                        </button>
                    )}
                    <a
                        href={`https://wa.me/6281234567890?text=${encodeURIComponent('Hai! Saya tertarik menjadi Healthy Partner di JaxLab. Boleh minta detail kerjasamanya?')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden rounded-full border border-white px-6 py-2 text-white no-underline transition hover:bg-white hover:text-[var(--primary-green)] min-[1025px]:inline-block"
                    >
                        Join Healthy Partner
                    </a>
                    {!isHomePage ? (
                        memberName ? (
                            <div className="relative hidden min-[1025px]:block">
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-2 rounded-full border border-dashed border-white/60 px-3 py-2 text-sm text-white transition hover:bg-white hover:text-[var(--primary-green)]"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        setIsProfileOpen((value) => !value);
                                    }}
                                    aria-expanded={isProfileOpen}
                                    aria-haspopup="menu"
                                >
                                    <User size={14} />
                                    <span>{shortName}</span>
                                    <ChevronDown size={14} className={`transition ${isProfileOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isProfileOpen && (
                                    <div className="absolute right-0 top-[calc(100%+10px)] w-[220px] overflow-hidden rounded-2xl border border-[#dfe8de] bg-white p-2 text-[#213126] shadow-[0_18px_40px_rgba(0,0,0,0.14)]" onClick={(event) => event.stopPropagation()}>
                                        <button
                                            type="button"
                                            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition hover:bg-[#f4f8f4]"
                                            onClick={() => handleNavigation('/orders/history')}
                                        >
                                            <History size={16} />
                                            Riwayat Order
                                        </button>
                                        <button
                                            type="button"
                                            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition hover:bg-[#f4f8f4]"
                                            onClick={() => { setIsProfileOpen(false); navigate('/member'); }}
                                        >
                                            <User size={16} />
                                            Profil Akun
                                        </button>
                                        <div className="my-2 border-t border-[#e8eee7]" />
                                        <button
                                            type="button"
                                            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-[#b42318] transition hover:bg-[#fff4f4]"
                                            onClick={() => { clearMember(); setIsProfileOpen(false); navigate('/'); }}
                                        >
                                            <LogOut size={16} />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button className="hidden items-center justify-center rounded-full border border-white px-3 py-2 text-white hover:bg-white hover:text-[var(--primary-green)] min-[1025px]:inline-flex" onClick={() => navigate('/member/auth')} title="Login">
                                <LogIn size={16} />
                            </button>
                        )
                    ) : null}
                    {!isMenuOpen && (
                        <button className="relative z-[1200] hidden bg-transparent max-[1024px]:block" onClick={(event) => { event.stopPropagation(); setIsMenuOpen(true); }}>
                            <Menu color="white" />
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
