// הגדרת Redux Store
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

// יצירת ה-store עם ה-reducer של העגלה
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// הגדרת טיפוסים לשימוש ב-TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
