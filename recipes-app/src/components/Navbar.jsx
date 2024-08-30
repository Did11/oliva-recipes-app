import { useContext, Fragment } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';

const Navbar = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { isAuthenticated } = state;

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/recipes">Recetas</Link> 
        </li>
        {!isAuthenticated && (
          <Fragment>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </Fragment>
        )}
        {isAuthenticated && (
          <Fragment>
            <li>
              <Link to="/profile">Mi perfil</Link>
            </li>
            <li>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </li>
          </Fragment>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
