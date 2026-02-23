import { createContext } from 'react';

export interface DBContextValue {
    isReady: boolean;
    error: string | null;
}

export const DBContext = createContext<DBContextValue>({ isReady: false, error: null });
