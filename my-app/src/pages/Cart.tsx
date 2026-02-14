// עמוד עגלת הקניות
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { updateQuantity, removeFromCart, clearCart } from '../store/cartSlice';
import '../styles/Cart.css';

const Cart = () => {
  // קריאת מידע העגלה מ-Redux
  const { items, totalItems, totalPrice } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  // פונקציה לשינוי כמות
  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  // פונקציה להסרת מוצר
  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  // פונקציה לניקוי העגלה
  const handleClearCart = () => {
    if (window.confirm('האם אתה בטוח שברצונך לרוקן את העגלה?')) {
      dispatch(clearCart());
    }
  };

  // אם העגלה ריקה
  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-icon">🛒</div>
        <h2>העגלה שלך ריקה</h2>
        <p>עדיין לא הוספת מוצרים לעגלה</p>
        <Link to="/products" className="continue-shopping-button">
          המשך לקנות
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>עגלת הקניות שלי</h1>
        <button onClick={handleClearCart} className="clear-cart-button">
          רוקן עגלה
        </button>
      </div>

      <div className="cart-content">
        {/* רשימת המוצרים */}
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.thumbnail} alt={item.title} className="cart-item-image" />
              
              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p className="cart-item-price">${item.price} ליחידה</p>
              </div>

              <div className="cart-item-quantity">
                <button 
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  className="quantity-button"
                >
                  -
                </button>
                <span className="quantity-display">{item.quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  className="quantity-button"
                >
                  +
                </button>
              </div>

              <div className="cart-item-total">
                <p className="item-total-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <button 
                onClick={() => handleRemove(item.id)}
                className="remove-button"
                aria-label="הסר מוצר"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        {/* סיכום ההזמנה */}
        <div className="cart-summary">
          <h2>סיכום הזמנה</h2>
          
          <div className="summary-row">
            <span>מספר פריטים:</span>
            <span>{totalItems}</span>
          </div>

          <div className="summary-row">
            <span>סה"כ מוצרים:</span>
            <span>{items.length}</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row total-row">
            <span>סה"כ לתשלום:</span>
            <span className="total-price">${totalPrice.toFixed(2)}</span>
          </div>

          <button className="checkout-button">
            המשך לתשלום
          </button>

          <Link to="/products" className="continue-shopping-link">
            ← המשך בקניות
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
