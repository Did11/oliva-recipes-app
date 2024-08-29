import PropTypes from 'prop-types';
import RecipeItem from './RecipeItem';

const RecipeList = ({ recipes, type }) => {
  if (recipes.length === 0) {
    return <p>No has {type === 'followed' ? 'seguido' : 'creado'} ninguna receta aún.</p>;
  }

  return (
    <ul className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeItem key={recipe.id} recipe={recipe} type={type} />
      ))}
    </ul>
  );
};

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.oneOf(['followed', 'created']).isRequired,
};

export default RecipeList;
