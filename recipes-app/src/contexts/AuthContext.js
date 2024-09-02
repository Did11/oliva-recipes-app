import { createContext, useReducer, useEffect } from 'react';
import authReducer from '../reducers/authReducer';

export const AuthContext = createContext();

export const useAuthContext = () => {
  // Inicializar el estado usando el valor guardado en localStorage si existe
  const initialState = {
    isAuthenticated: !!localStorage.getItem('authUser'), // Determina si el usuario está autenticado en función de si hay un usuario almacenado
    user: JSON.parse(localStorage.getItem('authUser')) || null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

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
