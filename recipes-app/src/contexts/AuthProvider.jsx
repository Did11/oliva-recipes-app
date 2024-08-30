import { AuthContext, useAuthContext } from './AuthContext';
import PropTypes from 'prop-types';

const AuthProvider = ({ children }) => {
  const { state, dispatch } = useAuthContext();

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
