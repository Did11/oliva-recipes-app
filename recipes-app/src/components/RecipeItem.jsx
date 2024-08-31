import { useParams } from 'react-router-dom';
import ToggleFollowButton from './ToggleFollowButton';

const RecipeItem = () => {
  const { id } = useParams();
  const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
  const recipe = recipes.find((recipe) => recipe.id === id);

  if (!recipe) {
    return <p>No se encontró la receta.</p>;
  }

  return (
    <div className="recipe-item-detail">
      <h1>{recipe.title}</h1>
      <img src={`/images/${recipe.image}`} alt={recipe.title} />
      <p>Autor: {recipe.author || 'Anónimo'}</p>
      <p>Dificultad: {recipe.difficulty}</p>
      <p>Categoría: {recipe.category}</p>
      <h3>Ingredientes</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.quantity} {ingredient.unit} de {ingredient.name}
          </li>
        ))}
      </ul>
      <h3>Instrucciones</h3>
      <ol>
        {recipe.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
      <button>Editar Receta</button>
      <ToggleFollowButton recipeId={recipe.id} />
    </div>
  );
};

export default RecipeItem;
