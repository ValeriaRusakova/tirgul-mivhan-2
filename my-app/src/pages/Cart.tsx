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

  // Function to clear cart
  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to empty your cart?')) {
      dispatch(clearCart());
    }
  };

  // If cart is empty
  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-icon">🛒</div>
        <h2>Your Cart is Empty</h2>
        <p>You haven't added any products to your cart yet</p>
        <Link to="/products" className="continue-shopping-button">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>My Shopping Cart</h1>
        <button onClick={handleClearCart} className="clear-cart-button">
          Clear Cart
        </button>
      </div>

      <div className="cart-content">
        {/* Product list */}
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
                aria-label="Remove product"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="cart-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-row">
            <span>Number of items:</span>
            <span>{totalItems}</span>
          </div>

          <div className="summary-row">
            <span>Total products:</span>
            <span>{items.length}</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row total-row">
            <span>Total:</span>
            <span className="total-price">${totalPrice.toFixed(2)}</span>
          </div>

          <button className="checkout-button">
            Proceed to Checkout
          </button>

          <Link to="/products" className="continue-shopping-link">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
