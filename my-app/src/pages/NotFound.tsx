// עמוד 404 - דף לא נמצא
import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2>הדף לא נמצא</h2>
        <p>מצטערים, הדף שחיפשת לא קיים</p>
        
        <div className="not-found-icon">🔍</div>
        
        <div className="not-found-actions">
          <Link to="/" className="home-link-button">
            חזרה לדף הבית
          </Link>
          <Link to="/products" className="products-link-button">
            לרשימת המוצרים
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
