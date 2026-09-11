import React from 'react';
import './IngredientsSection.css';

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
        <section className="ingredients-section" id="bahan">
            <div className="container">
                <div className="section-header text-center">
                    <span className="section-subtitle">✦ Bahan Pilihan</span>
                    <h2>Bahan Alami Terpercaya</h2>
                    <p className="section-desc">
                        Kami hanya menggunakan bahan-bahan alami terbaik dari alam Indonesia yang telah teruji khasiatnya secara turun-temurun.
                    </p>
                </div>

                <div className="ingredients-grid">
                    {ingredients.map((item) => (
                        <div key={item.id} className="ingredient-card">
                            <div className="ingredient-emoji">{item.emoji}</div>
                            <div className="ingredient-info">
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default IngredientsSection;
