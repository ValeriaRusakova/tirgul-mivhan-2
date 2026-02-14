// תפריט ניווט עליון
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAppSelector } from '../store/hooks';
import '../styles/Navbar.css';

const Navbar = () => {
  // גישה לנושא הנוכחי ולפונקציה להחלפתו
  const { theme, toggleTheme } = useTheme();
  
  // קריאת מספר הפריטים בעגלה מ-Redux
  const totalItems = useAppSelector((state) => state.cart.totalItems);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          🛒 Product Dashboard
        </Link>

        {/* Navigation menu */}
        <ul className="navbar-menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/cart" className="cart-link">
              Cart
              {/* Display cart items count */}
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </Link>
          </li>
        </ul>

        {/* Theme toggle button */}
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
