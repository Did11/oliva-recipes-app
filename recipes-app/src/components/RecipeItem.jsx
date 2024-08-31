import { useParams } from 'react-router-dom';
import ToggleFollowButton from './ToggleFollowButton'; // Importa el nuevo componente

const RecipeItem = () => {
  const { id } = useParams(); // Obtener el ID de la receta desde la URL
  const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
  const recipe = recipes.find((recipe) => recipe.id === id);

  if (!recipe) {
    return <p>No se encontró la receta.</p>;
  }

  return (
    <div className="recipe-item-detail">
      <h1>{recipe.title}</h1>
      <img src={`/images/${recipe.image}`} alt={recipe.title} />
      <p>Autor: {recipe.author || 'Anónimo'}</p> {/* Muestra el autor o 'Anónimo' si no hay autor */}
      <p>Dificultad: {recipe.difficulty}</p>
      <p>Categoría: {recipe.category}</p>
      <h3>Ingredientes</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instrucciones</h3>
      <ol>
        {recipe.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
      <button>Editar Receta</button>
      <ToggleFollowButton recipeId={recipe.id} /> {/* Usa el nuevo componente */}
    </div>
  );
};

export default RecipeItem;
