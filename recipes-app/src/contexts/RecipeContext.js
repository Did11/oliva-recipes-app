import { createContext, useReducer } from 'react';
import recipeReducer from '../reducers/recipeReducer';

export const RecipeContext = createContext();

export const useRecipeContext = () => {
  // Estado inicial basado en recetas almacenadas en localStorage
  const initialState = JSON.parse(localStorage.getItem('recipes')) || [];
  
  // useReducer para manejar el estado de recetas
  const [recipes, dispatch] = useReducer(recipeReducer, initialState);

  return { recipes, dispatch };
};
