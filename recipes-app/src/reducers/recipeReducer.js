const recipeReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case 'ADD_RECIPE':
      newState = [...state, action.payload];
      localStorage.setItem('recipes', JSON.stringify(newState));
      return newState;
    case 'UPDATE_RECIPE':
      newState = state.map(recipe =>
        recipe.id === action.payload.id ? action.payload : recipe
      );
      localStorage.setItem('recipes', JSON.stringify(newState));
      return newState;
    case 'DELETE_RECIPE':
      newState = state.filter(recipe => recipe.id !== action.payload);
      localStorage.setItem('recipes', JSON.stringify(newState));
      return newState;
    default:
      return state;
  }
};

export default recipeReducer;
