// Hooks מותאמים לשימוש עם Redux ו-TypeScript
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// במקום להשתמש ב-useDispatch רגיל, נשתמש בזה לקבלת type safety
export const useAppDispatch = () => useDispatch<AppDispatch>();

// במקום להשתמש ב-useSelector רגיל, נשתמש בזה לקבלת type safety
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
