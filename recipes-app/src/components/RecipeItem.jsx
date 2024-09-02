import { useParams, useNavigate } from 'react-router-dom';
import { useContext, Fragment } from 'react'; 
import { AuthContext } from '../contexts/AuthContext';
import ToggleFollowButton from './ToggleFollowButton';
import DeleteButton from './DeleteButton';

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

  const handleDelete = () => {
    navigate('/recipes'); // Redirige al usuario a la lista de recetas después de eliminar
  };

  // Función para pluralizar las unidades
  const pluralizeUnit = (quantity, unit) => {
    if (quantity === '1') return unit;
    const unitMap = {
      unidad: 'unidades',
      gramo: 'gramos',
      litro: 'litros',
      taza: 'tazas',
      cucharada: 'cucharadas',
      cucharadita: 'cucharaditas',
    };
    return unitMap[unit] || unit;
  };

  return (
    <div className="recipe-item-detail">
      <h1>{recipe.title}</h1>
      <img src={`/images/${recipe.image}`} alt={recipe.title} />
      <p>Autor: {recipe.author || 'Anónimo'}</p>
      <p>Dificultad: {recipe.difficulty}</p>
      <p>Categoría: {recipe.category}</p>
      <p>Tiempo de preparación: {recipe.preparationTime} minutos</p>
      <p>Tiempo de cocción: {recipe.cookingTime} minutos</p>
      <h3>Ingredientes</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.quantity} {pluralizeUnit(ingredient.quantity, ingredient.unit)} de {ingredient.name}
          </li>
        ))}
      </ul>
      <h3>Instrucciones</h3>
      <ol>
        {recipe.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
      {user.username === recipe.author ? (
        <Fragment>
          <button onClick={handleEdit}>Editar Receta</button>
          <DeleteButton recipeId={recipe.id} onDelete={handleDelete} />
        </Fragment>
      ) : (
        <ToggleFollowButton recipeId={recipe.id} />
      )}
    </div>
  );
};

export default RecipeItem;
