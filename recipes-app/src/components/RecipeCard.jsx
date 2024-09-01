import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';

const RecipeCard = ({ recipe, canDelete }) => {
  const handleDelete = () => {
    window.location.reload(); // Recargar la página para reflejar los cambios
  };

  return (
    <div className="recipe-card">
      <img src={`/images/${recipe.image}`} alt={recipe.title} className="recipe-card-img" />
      <div className="recipe-card-content">
        <h3>{recipe.title}</h3>
        <p>Autor: {recipe.author || 'Anónimo'}</p>
        <p>Dificultad: {recipe.difficulty}</p>
        <Link to={`/recipes/${recipe.id}`} className="recipe-card-link">
          Ver Detalles
        </Link>
        {canDelete && (
          <DeleteButton recipeId={recipe.id} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    author: PropTypes.string,
    difficulty: PropTypes.string.isRequired,
  }).isRequired,
  canDelete: PropTypes.bool,
};

export default RecipeCard;
