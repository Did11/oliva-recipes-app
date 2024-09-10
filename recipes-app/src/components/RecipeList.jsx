import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes }) => (
  recipes.length === 0 ? (
    // Muestra un mensaje si no hay recetas disponibles
    <p className="text-center text-gray-500">No hay recetas disponibles.</p>
  ) : (
    // Muestra las recetas en un diseño de grid
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
      id: PropTypes.string.isRequired, // El ID de la receta es requerido
      title: PropTypes.string.isRequired, // El título de la receta es requerido
      photo: PropTypes.string, // La foto de la receta es opcional
      author: PropTypes.string, // El autor de la receta es opcional
      difficulty: PropTypes.string.isRequired, // La dificultad de la receta es requerida
    })
  ).isRequired, // Las recetas son obligatorias
};

export default RecipeList;
