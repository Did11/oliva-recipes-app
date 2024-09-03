import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

const Navbar = ({ categories }) => {
  const { state, dispatch } = useContext(AuthContext);
  const { isAuthenticated } = state;
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const handleAddRecipeClick = () => {
    if (isAuthenticated) {
      navigate('/recipes/new');
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="bg-gradient-to-r from-yellow-600 via-orange-500 to-red-500 p-3 shadow-lg">
      <ul className="list-none flex justify-center items-center m-0 p-0 gap-8">
        <li>
          <Link to="/">
            <img src="/images/logo-transparent.png" alt="Home" className="h-16 w-16" />
          </Link>
        </li>
        <li>
          <Link to="/recipes" className="text-white no-underline text-lg hover:text-yellow-200 transition-colors duration-200">Recetas</Link>
        </li>
        {isAuthenticated && (
          <li>
            <button 
              onClick={handleAddRecipeClick} 
              className="text-white no-underline text-lg hover:text-yellow-200 transition-colors duration-200 bg-transparent border-none cursor-pointer focus:outline-none"
            >
              Agregar Receta
            </button>
          </li>
        )}
        <li className="flex-grow">
          <SearchBar categories={categories} />
        </li>
        {!isAuthenticated && (
          <>
            <li>
              <Link to="/login" className="text-white no-underline text-lg hover:text-yellow-200 transition-colors duration-200">Login</Link>
            </li>
            <li>
              <Link to="/register" className="text-white no-underline text-lg hover:text-yellow-200 transition-colors duration-200">Register</Link>
            </li>
          </>
        )}
        {isAuthenticated && (
          <>
            <li>
              <Link to="/profile" className="text-white no-underline text-lg hover:text-yellow-200 transition-colors duration-200">Mi perfil</Link>
            </li>
            <li>
              <button 
                className="bg-red-600 text-white border-none px-3 py-1 cursor-pointer hover:bg-red-500 rounded transition-colors duration-200" 
                onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
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
