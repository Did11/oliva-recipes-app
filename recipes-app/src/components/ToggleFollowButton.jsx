import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const ToggleFollowButton = ({ recipeId }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const { state } = useContext(AuthContext);
  const { user } = state;

  useEffect(() => {
    const followRecipesByUser = JSON.parse(localStorage.getItem('followRecipesByUser')) || {};
    const followedRecipes = followRecipesByUser[user.username] || [];
    setIsFollowed(followedRecipes.includes(recipeId));
  }, [recipeId, user.username]);

  const handleFollow = () => {
    const followRecipesByUser = JSON.parse(localStorage.getItem('followRecipesByUser')) || {};
    const followedRecipes = followRecipesByUser[user.username] || [];

    if (isFollowed) {
      const updatedRecipes = followedRecipes.filter(id => id !== recipeId);
      followRecipesByUser[user.username] = updatedRecipes;
    } else {
      followedRecipes.push(recipeId);
      followRecipesByUser[user.username] = followedRecipes;
    }

    localStorage.setItem('followRecipesByUser', JSON.stringify(followRecipesByUser));
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
