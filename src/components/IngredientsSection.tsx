import React from 'react';

const ingredients = [
    {
        id: 1,
        name: 'Habbatussauda',
        description: 'Jintan hitam yang kaya akan thymoquinone untuk mendukung imunitas tubuh.',
        emoji: '🌿',
    },
    {
        id: 2,
        name: 'Minyak Zaitun',
        description: 'Extra virgin olive oil kaya antioksidan dan asam lemak sehat untuk jantung.',
        emoji: '🫒',
    },
    {
        id: 3,
        name: 'Temulawak',
        description: 'Rimpang asli Indonesia untuk kesehatan hati dan meningkatkan nafsu makan.',
        emoji: '🌱',
    },
    {
        id: 4,
        name: 'Pegagan',
        description: 'Tanaman herbal untuk meningkatkan fungsi otak dan sirkulasi darah.',
        emoji: '🍃',
    },
    {
        id: 5,
        name: 'Jahe Merah',
        description: 'Mengandung gingerol tinggi untuk anti-inflamasi dan menghangatkan tubuh.',
        emoji: '🫚',
    },
    {
        id: 6,
        name: 'Kunyit',
        description: 'Kaya curcumin sebagai anti-inflamasi alami dan antioksidan kuat.',
        emoji: '✨',
    },
    {
        id: 7,
        name: 'Daun Kelor',
        description: 'Superfood lokal kaya vitamin, mineral, dan asam amino esensial.',
        emoji: '🌿',
    },
    {
        id: 8,
        name: 'Propolis',
        description: 'Produk lebah alami dengan sifat antibakteri dan penguatan imunitas.',
        emoji: '🍯',
    },
];

const IngredientsSection: React.FC = () => {
    return (
        <section className="relative bg-[#0b0f0b] py-28 max-[600px]:py-20" id="bahan">
            <div className="mx-auto max-w-[1200px] px-6">
                <div className="mb-12 text-center">
                    <span className="mb-3 inline-flex items-center gap-1.5 text-[0.85rem] font-medium uppercase tracking-[1px] !text-[#4ade80]">✦ Bahan Pilihan</span>
                    <h2 className="mb-4 text-[2.5rem] font-bold leading-[1.2] !text-white">Bahan Alami Terpercaya</h2>
                    <p className="mx-auto max-w-[650px] text-[1.05rem] leading-[1.7] !text-white/60">
                        Kami hanya menggunakan bahan-bahan alami terbaik dari alam Indonesia yang telah teruji khasiatnya secara turun-temurun.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-4 gap-[1.2rem] max-[1024px]:grid-cols-2 max-[600px]:grid-cols-1">
                    {ingredients.map((item) => (
                        <div key={item.id} className="flex cursor-default items-start gap-4 rounded-2xl border border-white/5 bg-[#141f16] p-6 transition-all duration-[350ms] hover:-translate-y-[3px] hover:border-[rgba(34,197,94,0.3)] hover:bg-[#1a2e1f] hover:shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[rgba(34,197,94,0.08)] text-[1.8rem]">{item.emoji}</div>
                            <div>
                                <h3 className="mb-[0.35rem] text-[0.95rem] font-semibold !text-white">{item.name}</h3>
                                <p className="text-[0.82rem] leading-[1.5] !text-white/60">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default IngredientsSection;
