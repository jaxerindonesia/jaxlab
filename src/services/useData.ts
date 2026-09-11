import { useContext } from 'react';
import { DataContext } from './DataContext';

export const useDataReady = () => useContext(DataContext);
