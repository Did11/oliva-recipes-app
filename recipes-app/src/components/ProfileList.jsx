import PropTypes from 'prop-types';
import DeleteButton from './DeleteButton';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const ProfileList = ({ recipes, type, onRecipeDeleted, onUnfollowRecipe }) => {
  const { state } = useContext(AuthContext);
  const { user } = state;

  // Manejar la lógica para dejar de seguir una receta
  const handleToggleFollow = (recipeId) => {
    const followRecipesByUser = JSON.parse(localStorage.getItem('followRecipesByUser')) || {};
    const followedRecipes = followRecipesByUser[user.username] || [];

    if (followedRecipes.includes(recipeId)) {
      // Actualizamos la lista de recetas seguidas
      const updatedFollowedRecipes = followedRecipes.filter(id => id !== recipeId);
      followRecipesByUser[user.username] = updatedFollowedRecipes;
      localStorage.setItem('followRecipesByUser', JSON.stringify(followRecipesByUser));
      if (onUnfollowRecipe) onUnfollowRecipe(recipeId); // Llamamos a la función para dejar de seguir
    }
  };

  return (
    <div>
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <div key={recipe.id} className="flex items-center justify-between bg-white shadow-lg rounded-lg p-4 mb-4 hover:bg-gray-100 transition">
            <div className="flex items-center space-x-4">
              <img
                src={`/images/${recipe.image}`}
                alt={recipe.title}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div>
                <h3 className="text-xl font-bold text-blue-600">{recipe.title}</h3>
                <p className="text-gray-700">Autor: {recipe.author || 'Anónimo'}</p>
                <p className="text-gray-500">Dificultad: {recipe.difficulty}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to={`/recipes/${recipe.id}`} className="text-blue-600 hover:underline">
                Ver Detalles
              </Link>
              {type === 'followed' && (
                // Botón para dejar de seguir una receta si el tipo es "followed"
                <button
                  onClick={() => handleToggleFollow(recipe.id)}
                  className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors duration-200 focus:outline-none"
                >
                  Dejar de Seguir
                </button>
              )}
              {type === 'created' && (
                // Botón para eliminar receta si el tipo es "created"
                <DeleteButton
                  recipeId={recipe.id}
                  onDelete={() => onRecipeDeleted(recipe.id)}
                />
              )}
            </div>
          </div>
        ))
      ) : (
        // Mensaje cuando no hay recetas
        <p>No hay recetas disponibles.</p>
      )}
    </div>
  );
};

ProfileList.propTypes = {
  recipes: PropTypes.array.isRequired, // La lista de recetas es obligatoria
  type: PropTypes.oneOf(['created', 'followed']).isRequired, // El tipo debe ser "created" o "followed"
  onRecipeDeleted: PropTypes.func, // Función para eliminar una receta (opcional)
  onUnfollowRecipe: PropTypes.func, // Función para dejar de seguir una receta (opcional)
};

export default ProfileList;
