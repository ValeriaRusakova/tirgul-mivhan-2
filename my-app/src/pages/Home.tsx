// עמוד הבית
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="home-hero">
        <h1>Welcome to Product Dashboard</h1>
        <p className="home-subtitle">
          Simple and easy-to-use product management system
        </p>
        
        <div className="home-features">
          <Link to="/products" className="feature-card">
            <span className="feature-icon">📦</span>
            <h3>Product Variety</h3>
            <p>Discover great products at affordable prices</p>
          </Link>
          
          <Link to="/cart" className="feature-card">
            <span className="feature-icon">🛒</span>
            <h3>Shopping Cart</h3>
            <p>Add products to your cart easily</p>
          </Link>
          
          <Link to="/products" className="feature-card">
            <span className="feature-icon">⭐</span>
            <h3>Ratings</h3>
            <p>View customer ratings for each product</p>
          </Link>
        </div>
        
        <Link to="/products" className="cta-button">
          View Products
        </Link>
      </div>
    </div>
  );
};

export default Home;
