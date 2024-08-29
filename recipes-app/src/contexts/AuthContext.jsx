import { createContext, useReducer, useEffect } from 'react';
import authReducer from '../reducers/authReducer';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const initialState = {
    isAuthenticated: false,
    user: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Restaurar estado de autenticación desde localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('authUser'));
    if (storedUser) {
      dispatch({ type: 'LOGIN', payload: storedUser });
    }
  }, []);

  // Guardar el estado de autenticación en localStorage
  useEffect(() => {
    if (state.isAuthenticated) {
      localStorage.setItem('authUser', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('authUser');
    }
  }, [state.isAuthenticated, state.user]);

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
