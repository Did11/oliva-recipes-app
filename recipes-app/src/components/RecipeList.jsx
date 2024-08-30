import PropTypes from 'prop-types';
import RecipeItem from './RecipeItem';

const RecipeList = ({ recipes }) => {
  if (recipes.length === 0) {
    return <p>No hay recetas disponibles.</p>; 
  }

  return (
    <ul className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeItem key={recipe.id} recipe={recipe} />
      ))}
    </ul>
  );
};

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RecipeList;
