import { RecipeContext, useRecipeContext } from './RecipeContext';
import PropTypes from 'prop-types';

const RecipeProvider = ({ children }) => {
  const { recipes, dispatch } = useRecipeContext();

  return (
    <RecipeContext.Provider value={{ recipes, dispatch }}>
      {children}
    </RecipeContext.Provider>
  );
};

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipeProvider;
