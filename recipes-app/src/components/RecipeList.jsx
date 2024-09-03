import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes }) => (
  recipes.length === 0 ? (
    <p className="text-center text-gray-500">No hay recetas disponibles.</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
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
