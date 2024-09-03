import PropTypes from 'prop-types';
import ToggleFollowButton from './ToggleFollowButton';
import { Link } from 'react-router-dom';

const ProfileList = ({ recipes, type }) => {
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
                <ToggleFollowButton recipeId={recipe.id} />
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
};

export default ProfileList;
