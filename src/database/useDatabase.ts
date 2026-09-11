import { useContext } from 'react';
import { DBContext } from './DatabaseContext';

export const useDatabaseReady = () => useContext(DBContext);
