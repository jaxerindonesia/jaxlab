/**
 * DatabaseProvider
 * Inisialisasi database saat app pertama load.
 * Child components bisa pakai useDatabaseReady() (dari useDatabase.ts) untuk menunggu DB siap.
 */

import React, { useEffect, useState } from 'react';
import { initDB } from './db';
import { DBContext } from './DatabaseContext';

export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isReady, setIsReady] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        initDB()
            .then(() => setIsReady(true))
            .catch((err: unknown) => {
                console.error('Gagal inisialisasi database:', err);
                setError(String(err));
            });
    }, []);

    if (error) {
        return (
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                minHeight: '100vh', flexDirection: 'column', fontFamily: 'sans-serif',
                padding: '2rem', textAlign: 'center'
            }}>
                <h2 style={{ color: '#c62828' }}>Gagal memuat database</h2>
                <p style={{ color: '#555', maxWidth: '500px' }}>{error}</p>
            </div>
        );
    }

    if (!isReady) {
        return (
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                minHeight: '100vh', flexDirection: 'column', gap: '1rem',
                fontFamily: 'sans-serif', background: '#f8f9fa'
            }}>
                <div style={{
                    width: '48px', height: '48px',
                    border: '4px solid #e0e0e0',
                    borderTop: '4px solid #4a7c59',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                }} />
                <p style={{ color: '#4a7c59', fontWeight: '600', fontSize: '1rem' }}>
                    Memuat database JaxLab...
                </p>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    return (
        <DBContext.Provider value={{ isReady, error }}>
            {children}
        </DBContext.Provider>
    );
};

