import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';  // Asegúrate de importar el archivo CSS

const Navbar = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { isAuthenticated, user } = state;

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li>
          <Link to="/">Home</Link>
        </li>
        {!isAuthenticated && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
        {isAuthenticated && (
          <>
            <li className="navbar-welcome">Welcome, {user.username}!</li>
            <li>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
