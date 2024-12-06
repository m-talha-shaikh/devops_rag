import { Link, Outlet } from 'react-router-dom';
import './rootLayout.css';
import { useAuth } from '../../context/AuthContext';

const RootLayout = () => {
  const { user, signOut, isAuthenticated } = useAuth();

  return (
    <div className="rootLayout">
      <header>
        <Link to="/" className="logo">
          <h3 >TradeMate</h3>
        </Link>
        <div className="user">
          {isAuthenticated ? (
            <div className="user-info">
              <span>{user?.fullName}</span>
              <button onClick={signOut} className="auth-btn">Sign Out</button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/sign-in" className="auth-link">Sign In</Link> | 
              <Link to="/sign-up" className="auth-link">Sign Up</Link>
            </div>
          )}
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
