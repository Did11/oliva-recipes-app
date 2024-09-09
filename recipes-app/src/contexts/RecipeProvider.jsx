import { RecipeContext, useRecipeContext } from './RecipeContext';
import PropTypes from 'prop-types';

const RecipeProvider = ({ children }) => {
  // Obtener las recetas y el dispatch del contexto de recetas
  const { recipes, dispatch } = useRecipeContext();

  return (
    // Proporcionar las recetas y el dispatch a los componentes hijos
    <RecipeContext.Provider value={{ recipes, dispatch }}>
      {children}
    </RecipeContext.Provider>
  );
};

RecipeProvider.propTypes = {
  // Verificación de que 'children' es un nodo de React
  children: PropTypes.node.isRequired,
};

export default RecipeProvider;
