import { Link, Outlet } from 'react-router-dom';
import './rootLayout.css';
import { useAuth } from '../../context/AuthContext';  // Import useAuth hook

const RootLayout = () => {
  const { user, signOut, isAuthenticated } = useAuth();

  return (
    <div className='rootLayout'>
      <header>
        <Link to="/" className='logo'>
          <img src="/logo.png" alt="logo" />
          <span>HBL Knowledge AI</span>
        </Link>
        <div className="user">
          {isAuthenticated ? (
            <div>
              <span>{user?.fullName}</span>
              <button onClick={signOut}>Sign Out</button>
            </div>
          ) : (
            <div>
              <Link to="/sign-in">Sign In</Link> | <Link to="/sign-up">Sign Up</Link>
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