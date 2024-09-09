const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      // Manejar acción de inicio de sesión, actualizando el estado con los datos del usuario
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case 'LOGOUT':
      // Manejar acción de cierre de sesión, limpiando el estado del usuario
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      // Retorna el estado actual si la acción no coincide
      return state;
  }
};

export default authReducer;
