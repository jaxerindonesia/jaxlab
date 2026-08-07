import React, { useState, useEffect } from 'react';
import { Menu, ShoppingCart, UserRound, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AUTH_CHANGED_EVENT, getMember } from '../services/auth';
import { CART_CHANGED_EVENT, getCart } from '../services/cart';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [member, setMember] = useState(getMember());
    const [cartCount, setCartCount] = useState(() => getCart().reduce((total, item) => total + item.qty, 0));
    const navigate = useNavigate();
    const location = useLocation();
    const hasSolidBackground = isScrolled
        || location.pathname.startsWith('/products')
        || location.pathname.startsWith('/member')
        || location.pathname.startsWith('/orders')
        || location.pathname.startsWith('/payment')
        || location.pathname === '/contact'
        || location.pathname === '/cart';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const syncMember = () => setMember(getMember());
        const syncCart = () => setCartCount(getCart().reduce((total, item) => total + item.qty, 0));

        window.addEventListener(AUTH_CHANGED_EVENT, syncMember);
        window.addEventListener(CART_CHANGED_EVENT, syncCart);
        window.addEventListener('storage', syncMember);
        window.addEventListener('storage', syncCart);

        return () => {
            window.removeEventListener(AUTH_CHANGED_EVENT, syncMember);
            window.removeEventListener(CART_CHANGED_EVENT, syncCart);
            window.removeEventListener('storage', syncMember);
            window.removeEventListener('storage', syncCart);
        };
    }, []);

    const handleNavigation = (target: string) => {
        setIsMenuOpen(false);
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
        <header className={`fixed inset-x-0 top-0 z-[1000] transition-all duration-[400ms] ${hasSolidBackground
            ? 'border-b border-[#4ade8014] bg-[#0b0f0beb] py-[0.7rem] backdrop-blur-[20px]'
            : 'bg-transparent py-4'
            }`}>
            <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6">
                <div onClick={() => navigate('/')} className="group cursor-pointer">
                    <img className="block !h-[38px] !w-auto opacity-95 brightness-0 invert transition-opacity duration-300 group-hover:opacity-100" src="/logo-jaxlab.png" alt="JAXLAB Logo" />
                </div>
                <nav className={`fixed right-0 top-0 flex h-screen w-3/4 max-w-80 flex-col items-center justify-center gap-6 bg-[#0b0f0bf7] p-8 shadow-[-4px_0_30px_rgba(0,0,0,0.5)] backdrop-blur-[20px] transition-transform duration-300 ease-in-out min-[1025px]:static min-[1025px]:h-auto min-[1025px]:w-auto min-[1025px]:max-w-none min-[1025px]:translate-x-0 min-[1025px]:flex-row min-[1025px]:gap-[1.7rem] min-[1025px]:bg-transparent min-[1025px]:p-0 min-[1025px]:shadow-none min-[1025px]:backdrop-blur-none ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    {[
                        ['/products', 'Produk'],
                        ['/fat-fasting', 'Fat Fasting'],
                        ['/blog', 'Blog'],
                        ['/faq', 'FAQ'],
                    ].map(([target, label]) => (
                        <a key={target} onClick={() => handleNavigation(target)} className="relative cursor-pointer text-[1.1rem] font-normal !text-white/80 transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:rounded-sm after:bg-[#4ade80] after:transition-[width] after:duration-300 hover:!text-white hover:after:w-full min-[1025px]:text-[0.92rem] min-[1025px]:!text-white/75">
                            {label}
                        </a>
                    ))}
                    <div className="flex w-full max-w-[230px] flex-col gap-3 border-t border-white/10 pt-5 min-[1025px]:!hidden">
                        <button type="button" onClick={() => handleNavigation('/cart')} className="relative inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 font-semibold !text-white transition hover:border-[#4ade80]/50 hover:bg-white/10">
                            <ShoppingCart size={18} /> Keranjang
                            {cartCount > 0 && <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#4ade80] px-1.5 text-[0.68rem] font-black !text-[#0b0f0b]">{cartCount > 99 ? '99+' : cartCount}</span>}
                        </button>
                        <button type="button" onClick={() => handleNavigation(member ? '/member' : '/member/auth')} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 font-semibold !text-white transition hover:border-[#4ade80]/50 hover:bg-white/10">
                            <UserRound size={18} /> {member ? member.name : 'Masuk / Daftar'}
                        </button>
                    </div>
                    <div className="mt-5 min-[1025px]:hidden">
                        <a
                            href={`https://wa.me/6281234567890?text=${encodeURIComponent('Hai! Saya tertarik dengan produk JaxLab. Bisa info lebih lanjut?')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full bg-[#4ade80] px-[1.4rem] py-[0.55rem] text-[0.88rem] font-semibold !text-[#0b0f0b] no-underline transition-all duration-300 hover:-translate-y-px hover:bg-[#22c55e] hover:shadow-[0_4px_15px_rgba(74,222,128,0.3)]"
                        >
                            Beli Sekarang
                        </a>
                    </div>
                    <button aria-label="Tutup menu" onClick={() => setIsMenuOpen(false)} className="absolute right-5 top-5 block bg-transparent text-white min-[1025px]:hidden"><X /></button>
                </nav>
                <div className="flex items-center gap-2">
                    <button type="button" onClick={() => navigate('/cart')} className="relative hidden h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 !text-white transition hover:border-[#4ade80]/50 hover:bg-white/10 min-[1025px]:inline-flex" aria-label={`Keranjang, ${cartCount} item`} title="Keranjang">
                        <ShoppingCart size={19} />
                        {cartCount > 0 && <span className="absolute -right-1.5 -top-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#4ade80] px-1 text-[0.65rem] font-black leading-none !text-[#0b0f0b] ring-2 ring-[#0b0f0b]">{cartCount > 99 ? '99+' : cartCount}</span>}
                    </button>
                    <button type="button" onClick={() => navigate(member ? '/member' : '/member/auth')} className="hidden min-h-10 max-w-[140px] items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 text-sm font-semibold !text-white transition hover:border-[#4ade80]/50 hover:bg-white/10 min-[1025px]:inline-flex" title={member ? `Akun ${member.name}` : 'Masuk atau daftar'}>
                        <UserRound size={18} /> <span className="truncate">{member ? member.name : 'Masuk'}</span>
                    </button>
                    <a
                        href={`https://wa.me/6281234567890?text=${encodeURIComponent('Hai! Saya tertarik dengan produk JaxLab. Bisa info lebih lanjut?')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden items-center gap-1.5 rounded-full bg-[#4ade80] px-[1.15rem] py-[0.55rem] text-[0.85rem] font-semibold !text-[#0b0f0b] no-underline transition-all duration-300 hover:-translate-y-px hover:bg-[#22c55e] hover:shadow-[0_4px_15px_rgba(74,222,128,0.3)] min-[1025px]:inline-flex"
                    >
                        Beli Sekarang
                    </a>
                    <button aria-label="Buka menu" className="block bg-transparent min-[1025px]:hidden" onClick={() => setIsMenuOpen(true)}>
                        <Menu color="white" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
