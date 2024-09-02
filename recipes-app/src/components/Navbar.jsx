import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Navbar = ({ categories }) => {
  const { state, dispatch } = useContext(AuthContext);
  const { isAuthenticated } = state;

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <nav className="bg-gray-800 p-2 px-5">
      <ul className="list-none flex justify-between items-center m-0 p-0 gap-12">
        <div className="flex items-center space-x-4">
          <li>
            <Link to="/" className="text-white no-underline text-base hover:underline">Home</Link>
          </li>
          <li>
            <Link to="/recipes" className="text-white no-underline text-base hover:underline">Recetas</Link>
          </li>
        </div>
        <SearchBar categories={categories} />
        {!isAuthenticated && (
          <div className="flex items-center space-x-4">
            <li>
              <Link to="/login" className="text-white no-underline text-base hover:underline">Login</Link>
            </li>
            <li>
              <Link to="/register" className="text-white no-underline text-base hover:underline">Register</Link>
            </li>
          </div>
        )}
        {isAuthenticated && (
          <div className="flex items-center space-x-4">
            <li>
              <Link to="/profile" className="text-white no-underline text-base hover:underline">Mi perfil</Link>
            </li>
            <li>
              <button 
                className="bg-gray-700 text-white border-none px-2 py-1 cursor-pointer hover:bg-gray-500" 
                onClick={handleLogout}>
                Logout
              </button>
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
};

// Agregar PropTypes para validar `categories`
Navbar.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Navbar;
