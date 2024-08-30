const recipeReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_RECIPE':
      return [...state, action.payload];
    case 'UPDATE_RECIPE':
      return state.map(recipe => 
        recipe.id === action.payload.id ? action.payload : recipe
      );
    case 'DELETE_RECIPE':
      return state.filter(recipe => recipe.id !== action.payload);
    default:
      return state;
  }
};

export default recipeReducer;
