import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import ToggleFollowButton from './ToggleFollowButton';

const RecipeItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useContext(AuthContext);
  const { user } = state;
  const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
  const recipe = recipes.find((recipe) => recipe.id === id);

  if (!recipe) {
    return <p>No se encontró la receta.</p>;
  }

  const handleEdit = () => {
    navigate(`/edit-recipe/${recipe.id}`);
  };

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
      {user.username === recipe.author && (
        <button onClick={handleEdit}>Editar Receta</button>
      )}
      {user.username !== recipe.author && (
        <ToggleFollowButton recipeId={recipe.id} />
      )}
    </div>
  );
};

export default RecipeItem;
