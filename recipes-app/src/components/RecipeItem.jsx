import PropTypes from 'prop-types';

const RecipeItem = ({ recipe, type }) => {
  return (
    <li className="recipe-item">
      <h3>{recipe.title}</h3>
      <p>{recipe.description}</p>
      {/* Aquí puedes añadir botones para seguir/dejar de seguir, editar, etc. */}
      {type === 'created' && <button>Editar Receta</button>}
      <button>{type === 'followed' ? 'Dejar de seguir' : 'Seguir'}</button>
    </li>
  );
};

RecipeItem.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  type: PropTypes.oneOf(['followed', 'created']).isRequired,
};

export default RecipeItem;
