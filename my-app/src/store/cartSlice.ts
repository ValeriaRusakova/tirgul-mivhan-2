// ניהול state של עגלת הקניות
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// הגדרת טיפוס למוצר בעגלה
export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
}

// הגדרת טיפוס ל-state של העגלה
interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

// פונקציה לחישוב סכומים
const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { totalItems, totalPrice };
};

// טעינת items מ-localStorage
const loadedItems = JSON.parse(localStorage.getItem('cart') || '[]');
const { totalItems, totalPrice } = calculateTotals(loadedItems);

// state התחלתי - מנסה לטעון מ-localStorage אם קיים
const initialState: CartState = {
  items: loadedItems,
  totalItems,
  totalPrice,
};

// חישוב מחדש של סכומים
const recalculate = (state: CartState) => {
  state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // שמירה ב-localStorage
  localStorage.setItem('cart', JSON.stringify(state.items));
};

// יצירת slice עם actions ו-reducers
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // הוספת מוצר לעגלה
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        // אם המוצר כבר קיים, נגדיל את הכמות
        existingItem.quantity += 1;
      } else {
        // אם זה מוצר חדש, נוסיף אותו עם כמות 1
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      recalculate(state);
    },
    
    // שינוי כמות של מוצר
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      
      if (item) {
        item.quantity = action.payload.quantity;
        
        // אם הכמות 0 או פחות, נסיר את המוצר
        if (item.quantity <= 0) {
          state.items = state.items.filter(item => item.id !== action.payload.id);
        }
      }
      
      recalculate(state);
    },
    
    // הסרת מוצר מהעגלה
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      recalculate(state);
    },
    
    // ניקוי כל העגלה
    clearCart: (state) => {
      state.items = [];
      recalculate(state);
    },
  },
});

// export של actions לשימוש בקומפוננטות
export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;

// export של reducer להוספה ל-store
export default cartSlice.reducer;
