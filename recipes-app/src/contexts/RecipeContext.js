import { createContext, useReducer } from 'react';
import recipeReducer from '../reducers/recipeReducer';

export const RecipeContext = createContext();

export const useRecipeContext = () => {
  const initialState = [];
  const [recipes, dispatch] = useReducer(recipeReducer, initialState);

  return { recipes, dispatch };
};
