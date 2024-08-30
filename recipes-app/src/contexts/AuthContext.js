import { createContext, useReducer, useEffect } from 'react';
import authReducer from '../reducers/authReducer';

export const AuthContext = createContext();

export const useAuthContext = () => {
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

  return { state, dispatch };
};
