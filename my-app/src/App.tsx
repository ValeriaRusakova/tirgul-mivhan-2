// App.tsx - הגדרת ראוטרים ו-Providers
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ראוט עם Layout משותף */}
        <Route path="/" element={<Layout />}>
          {/* עמוד הבית */}
          <Route index element={<Home />} />
          
          {/* עמוד רשימת מוצרים */}
          <Route path="products" element={<Products />} />
          
          {/* עמוד פרטי מוצר */}
          <Route path="products/:id" element={<ProductDetails />} />
          
          {/* עמוד עגלת קניות */}
          <Route path="cart" element={<Cart />} />
          
          {/* עמוד 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
