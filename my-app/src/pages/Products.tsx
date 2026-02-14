// עמוד רשימת מוצרים
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import '../styles/Products.css';

// הגדרת טיפוס למוצר
interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  rating: number;
  category: string;
}

// הגדרת טיפוס לתשובה מה-API
interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const Products = () => {
  // state לשמירת המוצרים
  const [products, setProducts] = useState<Product[]>([]);
  // state למצב טעינה
  const [loading, setLoading] = useState(true);
  // state לשגיאה
  const [error, setError] = useState<string | null>(null);
  // state לעמוד הנוכחי (pagination)
  const [currentPage, setCurrentPage] = useState(1);
  // מספר מוצרים בעמוד
  const [totalProducts, setTotalProducts] = useState(0);
  
  const productsPerPage = 12;

  // פונקציה לשליפת מוצרים מה-API
  const fetchProducts = async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      
      // חישוב skip על פי העמוד הנוכחי
      const skip = (page - 1) * productsPerPage;
      
      // שליפת נתונים מ-DummyJSON
      const response = await fetch(
        `https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}`
      );
      
      if (!response.ok) {
        throw new Error('Error loading products');
      }
      
      const data: ProductsResponse = await response.json();
      setProducts(data.products);
      setTotalProducts(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  // שליפת מוצרים כאשר העמוד משתנה
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  // חישוב מספר העמודים
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  // מעבר לעמוד הבא
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  // מעבר לעמוד הקודם
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  // הצגת מצב טעינה
  if (loading) {
    return <Loading />;
  }

  // Display error
  if (error) {
    return (
      <div className="error-container">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => fetchProducts(currentPage)}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="products-page">
      <h1>Our Products</h1>
      <p className="products-count">
        Displaying {products.length} of {totalProducts} products
      </p>

      {/* Products grid */}
      <div className="products-grid">
        {products.map((product) => (
          <Link 
            to={`/products/${product.id}`} 
            key={product.id} 
            className="product-card"
          >
            <img src={product.thumbnail} alt={product.title} />
            <div className="product-info">
              <h3>{product.title}</h3>
              <p className="product-category">{product.category}</p>
              <div className="product-footer">
                <span className="product-price">${product.price}</span>
                <span className="product-rating">⭐ {product.rating}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* pagination */}
      <div className="pagination">
        <button 
          onClick={previousPage} 
          disabled={currentPage === 1}
          className="pagination-button"
        >
          ← Previous
        </button>
        
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        
        <button 
          onClick={nextPage} 
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Products;
