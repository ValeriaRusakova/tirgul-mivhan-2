// Layout משותף לכל הדפים
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/Layout.css';

const Layout = () => {
  return (
    <div className="layout">
      {/* תפריט ניווט קבוע */}
      <Navbar />
      
      {/* תוכן הדף - משתנה לפי הראוט */}
      <main className="main-content">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 Product Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
