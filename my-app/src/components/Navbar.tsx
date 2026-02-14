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
        {/* לוגו */}
        <Link to="/" className="navbar-logo">
          🛒 Product Dashboard
        </Link>

        {/* תפריט ניווט */}
        <ul className="navbar-menu">
          <li>
            <Link to="/">בית</Link>
          </li>
          <li>
            <Link to="/products">מוצרים</Link>
          </li>
          <li>
            <Link to="/cart" className="cart-link">
              עגלה
              {/* הצגת מספר פריטים בעגלה */}
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </Link>
          </li>
        </ul>

        {/* כפתור להחלפת נושא */}
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label="החלף נושא"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
