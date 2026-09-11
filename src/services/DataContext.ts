import { createContext } from 'react';

export interface DataContextValue {
    isReady: boolean;
    error: string | null;
}

export const DataContext = createContext<DataContextValue>({ isReady: false, error: null });
