import { createContext, useReducer } from 'react';
import recipeReducer from '../reducers/recipeReducer';

export const RecipeContext = createContext();

export const useRecipeContext = () => {
  // Cargar recetas desde localStorage al inicializar el contexto
  const initialState = JSON.parse(localStorage.getItem('recipes')) || [];
  const [recipes, dispatch] = useReducer(recipeReducer, initialState);

  return { recipes, dispatch };
};
