// עמוד 404 - דף לא נמצא
import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2>Page Not Found</h2>
        <p>Sorry, the page you are looking for does not exist</p>
        
        <div className="not-found-icon">🔍</div>
        
        <div className="not-found-actions">
          <Link to="/" className="home-link-button">
            Back to Home
          </Link>
          <Link to="/products" className="products-link-button">
            View Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
