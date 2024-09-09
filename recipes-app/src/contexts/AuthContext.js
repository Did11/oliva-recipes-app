import { createContext, useReducer, useEffect } from 'react';
import authReducer from '../reducers/authReducer';

export const AuthContext = createContext();

export const useAuthContext = () => {
  // Estado inicial basado en localStorage para autenticación
  const initialState = {
    isAuthenticated: !!localStorage.getItem('authUser'), // Verifica si el usuario está autenticado
    user: JSON.parse(localStorage.getItem('authUser')) || null, // Obtiene los datos del usuario si existen
  };

  // useReducer para manejar el estado de autenticación
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Efecto para sincronizar el estado con localStorage
  useEffect(() => {
    if (state.isAuthenticated) {
      localStorage.setItem('authUser', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('authUser');
    }
  }, [state.isAuthenticated, state.user]);

  // Retorna el estado y el dispatch para ser utilizados en otros componentes
  return { state, dispatch };
};
