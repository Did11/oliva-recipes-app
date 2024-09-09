import { AuthContext, useAuthContext } from './AuthContext';
import PropTypes from 'prop-types';

const AuthProvider = ({ children }) => {
  // Obtener el estado y el dispatch del contexto de autenticación
  const { state, dispatch } = useAuthContext();

  return (
    // Proporcionar el estado y el dispatch a los componentes hijos
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  // Verificación de que 'children' es un nodo de React
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
