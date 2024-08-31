import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes }) => (
  recipes.length === 0 ? (
    <p>No hay recetas disponibles.</p>
  ) : (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
);

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      photo: PropTypes.string,
      author: PropTypes.string,
      difficulty: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default RecipeList;
