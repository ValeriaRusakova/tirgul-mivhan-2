// עמוד הבית
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="home-hero">
        <h1>ברוכים הבאים ל-Product Dashboard</h1>
        <p className="home-subtitle">
          מערכת ניהול מוצרים פשוטה וקלה לשימוש
        </p>
        
        <div className="home-features">
          <div className="feature-card">
            <span className="feature-icon">📦</span>
            <h3>מגוון מוצרים</h3>
            <p>גלה מוצרים מעולים במחירים משתלמים</p>
          </div>
          
          <div className="feature-card">
            <span className="feature-icon">🛒</span>
            <h3>עגלת קניות</h3>
            <p>הוסף מוצרים לעגלה בקלות</p>
          </div>
          
          <div className="feature-card">
            <span className="feature-icon">⭐</span>
            <h3>דירוגים</h3>
            <p>צפה בדירוגי לקוחות לכל מוצר</p>
          </div>
        </div>
        
        <Link to="/products" className="cta-button">
          צפה במוצרים
        </Link>
      </div>
    </div>
  );
};

export default Home;
