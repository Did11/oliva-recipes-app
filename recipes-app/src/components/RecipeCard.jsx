import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';

const RecipeCard = ({ recipe, canDelete }) => {
  const handleDelete = () => {
    window.location.reload(); // Recargar la página para reflejar los cambios
  };

  // Función para determinar el color de la dificultad
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Muy Fácil':
        return 'text-green-500';
      case 'Fácil':
        return 'text-green-500';
      case 'Moderado':
        return 'text-yellow-500';
      case 'Difícil':
        return 'text-red-600';
      case 'Muy Difícil':
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="relative">
      <Link to={`/recipes/${recipe.id}`} className="block bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl">
        <img
          src={`/images/${recipe.image}`}
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-bold text-blue-600 mb-2">{recipe.title}</h3>
          <p className="text-gray-700">Autor: {recipe.author || 'Anónimo'}</p>
          <p className="text-gray-700">Categoría: {recipe.category}</p>
          <p className={getDifficultyColor(recipe.difficulty)}>Dificultad: {recipe.difficulty}</p>
        </div>
      </Link>
      {canDelete && (
        <div className="absolute top-4 right-4">
          <DeleteButton recipeId={recipe.id} onDelete={handleDelete} />
        </div>
      )}
    </div>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    author: PropTypes.string,
    category: PropTypes.string.isRequired, // Aseguramos que la categoría es obligatoria
    difficulty: PropTypes.string.isRequired,
  }).isRequired,
  canDelete: PropTypes.bool,
};

export default RecipeCard;
