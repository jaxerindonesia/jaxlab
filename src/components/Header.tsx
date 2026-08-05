import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const hasSolidBackground = isScrolled || location.pathname.startsWith('/products');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
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
                <nav className={`fixed right-0 top-0 flex h-screen w-3/4 max-w-80 flex-col items-center justify-center gap-6 bg-[#0b0f0bf7] p-8 shadow-[-4px_0_30px_rgba(0,0,0,0.5)] backdrop-blur-[20px] transition-transform duration-300 ease-in-out min-[1025px]:static min-[1025px]:h-auto min-[1025px]:w-auto min-[1025px]:max-w-none min-[1025px]:translate-x-0 min-[1025px]:flex-row min-[1025px]:gap-[2.2rem] min-[1025px]:bg-transparent min-[1025px]:p-0 min-[1025px]:shadow-none min-[1025px]:backdrop-blur-none ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
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
                <div>
                    <a
                        href={`https://wa.me/6281234567890?text=${encodeURIComponent('Hai! Saya tertarik dengan produk JaxLab. Bisa info lebih lanjut?')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden items-center gap-1.5 rounded-full bg-[#4ade80] px-[1.4rem] py-[0.55rem] text-[0.88rem] font-semibold !text-[#0b0f0b] no-underline transition-all duration-300 hover:-translate-y-px hover:bg-[#22c55e] hover:shadow-[0_4px_15px_rgba(74,222,128,0.3)] min-[1025px]:inline-flex"
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
