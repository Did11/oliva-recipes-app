import PropTypes from 'prop-types';
import DeleteButton from './DeleteButton';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const ProfileList = ({ recipes, type, onRecipeDeleted, onUnfollowRecipe }) => {
  const { state } = useContext(AuthContext);
  const { user } = state;

  const handleToggleFollow = (recipeId) => {
    const followRecipesByUser = JSON.parse(localStorage.getItem('followRecipesByUser')) || {};
    const followedRecipes = followRecipesByUser[user.username] || [];

    if (followedRecipes.includes(recipeId)) {
      const updatedFollowedRecipes = followedRecipes.filter(id => id !== recipeId);
      followRecipesByUser[user.username] = updatedFollowedRecipes;
      localStorage.setItem('followRecipesByUser', JSON.stringify(followRecipesByUser));
      if (onUnfollowRecipe) onUnfollowRecipe(recipeId); // Llamamos a onUnfollowRecipe si existe
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
                <button
                  onClick={() => handleToggleFollow(recipe.id)}
                  className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors duration-200 focus:outline-none"
                >
                  Dejar de Seguir
                </button>
              )}
              {type === 'created' && (
                <DeleteButton
                  recipeId={recipe.id}
                  onDelete={() => onRecipeDeleted(recipe.id)}
                />
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No hay recetas disponibles.</p>
      )}
    </div>
  );
};

ProfileList.propTypes = {
  recipes: PropTypes.array.isRequired,
  type: PropTypes.oneOf(['created', 'followed']).isRequired,
  onRecipeDeleted: PropTypes.func,
  onUnfollowRecipe: PropTypes.func, // Definimos que es requerido si es necesario
};

export default ProfileList;
