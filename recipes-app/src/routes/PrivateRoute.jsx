import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import PropTypes from 'prop-types';

const PrivateRoute = ({ element: Component, ...rest }) => {
  // Obtener el estado de autenticación desde el contexto
  const { state } = useContext(AuthContext);
  const { isAuthenticated } = state;

  // Si el usuario está autenticado, renderizar el componente, de lo contrario, redirigir al login
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  // Validar que el elemento pasado es un componente React
  element: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
