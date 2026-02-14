// עמוד פרטי מוצר
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { addToCart } from '../store/cartSlice';
import Loading from '../components/Loading';
import '../styles/ProductDetails.css';

// הגדרת טיפוס למוצר מלא
interface ProductDetails {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

const ProductDetailsPage = () => {
  // קבלת ה-ID מה-URL
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // state למוצר
  const [product, setProduct] = useState<ProductDetails | null>(null);
  // state לטעינה
  const [loading, setLoading] = useState(true);
  // state לשגיאה
  const [error, setError] = useState<string | null>(null);
  // state להודעה כשמוסיפים לעגלה
  const [addedToCart, setAddedToCart] = useState(false);

  // פונקציה לשליפת פרטי מוצר
  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`https://dummyjson.com/products/${id}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('המוצר לא נמצא');
        }
        throw new Error('שגיאה בטעינת המוצר');
      }

      const data: ProductDetails = await response.json();
      setProduct(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה לא ידועה');
    } finally {
      setLoading(false);
    }
  };

  // שליפת המוצר כאשר ה-ID משתנה
  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  // פונקציה להוספת מוצר לעגלה
  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
      }));
      
      // הצגת הודעה
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  // הצגת מצב טעינה
  if (loading) {
    return <Loading />;
  }

  // הצגת שגיאה
  if (error) {
    return (
      <div className="error-container">
        <h2>אופס! משהו השתבש</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/products')}>חזרה למוצרים</button>
      </div>
    );
  }

  // אם אין מוצר
  if (!product) {
    return null;
  }

  return (
    <div className="product-details">
      <button onClick={() => navigate('/products')} className="back-button">
        ← חזרה למוצרים
      </button>

      <div className="product-content">
        {/* תמונת המוצר */}
        <div className="product-image-section">
          <img src={product.thumbnail} alt={product.title} className="main-image" />
        </div>

        {/* פרטי המוצר */}
        <div className="product-info-section">
          <h1>{product.title}</h1>
          
          <div className="product-meta">
            <span className="product-brand">{product.brand}</span>
            <span className="product-category">{product.category}</span>
          </div>

          <div className="product-rating-large">
            ⭐ {product.rating} / 5
          </div>

          <p className="product-description">{product.description}</p>

          <div className="product-price-section">
            <span className="price-label">מחיר:</span>
            <span className="price-value">${product.price}</span>
          </div>

          <div className="product-stock">
            {product.stock > 0 ? (
              <span className="in-stock">✓ במלאי ({product.stock} יחידות)</span>
            ) : (
              <span className="out-of-stock">✗ אזל מהמלאי</span>
            )}
          </div>

          {/* כפתור הוספה לעגלה */}
          <button 
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="add-to-cart-button"
          >
            {product.stock > 0 ? '🛒 הוסף לעגלה' : 'אזל מהמלאי'}
          </button>

          {/* הודעת אישור */}
          {addedToCart && (
            <div className="success-message">
              ✓ המוצר נוסף לעגלה בהצלחה!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
