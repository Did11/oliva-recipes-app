import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const ToggleFollowButton = ({ recipeId }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const { state } = useContext(AuthContext);
  const { user } = state;
  const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
  const recipe = recipes.find((recipe) => recipe.id === recipeId);

  useEffect(() => {
    if (recipe && user.username !== recipe.author) {
      setIsFollowed(checkIfFollowed(recipeId));
    }
  }, [recipeId, recipe, user.username]);

  const checkIfFollowed = (id) => {
    const followedRecipes = JSON.parse(localStorage.getItem('followedRecipes')) || [];
    return followedRecipes.some(followedId => followedId === id);
  };

  const handleFollow = () => {
    if (recipe && user.username === recipe.author) {
      alert("No puedes seguir tus propias recetas.");
      return;
    }

    const followedRecipes = JSON.parse(localStorage.getItem('followedRecipes')) || [];
    if (isFollowed) {
      const updatedRecipes = followedRecipes.filter(followedId => followedId !== recipeId);
      localStorage.setItem('followedRecipes', JSON.stringify(updatedRecipes));
    } else {
      followedRecipes.push(recipeId);
      localStorage.setItem('followedRecipes', JSON.stringify(followedRecipes));
    }
    setIsFollowed(!isFollowed);
  };

  return (
    <button
      onClick={handleFollow}
      className={`px-4 py-2 text-white rounded-md transition-colors duration-200 focus:outline-none ${isFollowed ? 'bg-orange-600 hover:bg-orange-700' : 'bg-orange-500 hover:bg-orange-600'}`}
    >
      {isFollowed ? 'Dejar de seguir' : 'Seguir'}
    </button>
  );
};

ToggleFollowButton.propTypes = {
  recipeId: PropTypes.string.isRequired,
};

export default ToggleFollowButton;
