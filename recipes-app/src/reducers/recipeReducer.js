const recipeReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case 'ADD_RECIPE':
      // Añadir una nueva receta y actualizar localStorage
      newState = [...state, action.payload];
      localStorage.setItem('recipes', JSON.stringify(newState));
      return newState;
    case 'UPDATE_RECIPE':
      // Actualizar una receta existente y sincronizar con localStorage
      newState = state.map(recipe =>
        recipe.id === action.payload.id ? action.payload : recipe
      );
      localStorage.setItem('recipes', JSON.stringify(newState));
      return newState;
    case 'DELETE_RECIPE':
      // Eliminar una receta y actualizar localStorage
      newState = state.filter(recipe => recipe.id !== action.payload);
      localStorage.setItem('recipes', JSON.stringify(newState));
      return newState;
    default:
      // Retorna el estado actual si la acción no coincide
      return state;
  }
};

export default recipeReducer;
