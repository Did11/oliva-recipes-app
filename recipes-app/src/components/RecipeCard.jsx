import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <img src={`/images/${recipe.image}`} alt={recipe.title} className="recipe-card-img" />
      <div className="recipe-card-content">
        <h3>{recipe.title}</h3>
        <p>Autor: {recipe.author || 'Anónimo'}</p> {/* Asume 'Anónimo' si no hay autor */}
        <p>Dificultad: {recipe.difficulty}</p>
        <Link to={`/recipes/${recipe.id}`} className="recipe-card-link">
          Ver Detalles
        </Link>
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,  // Cambié 'photo' a 'image'
    author: PropTypes.string,
    difficulty: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipeCard;
