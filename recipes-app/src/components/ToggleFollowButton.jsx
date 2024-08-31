import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const ToggleFollowButton = ({ recipeId }) => {
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    setIsFollowed(checkIfFollowed(recipeId));
  }, [recipeId]);

  function checkIfFollowed(id) {
    const followedRecipes = JSON.parse(localStorage.getItem('followedRecipes')) || [];
    return followedRecipes.some(recipeId => recipeId === id);
  }

  function handleFollow() {
    const followedRecipes = JSON.parse(localStorage.getItem('followedRecipes')) || [];
    if (isFollowed) {
      // Unfollow logic
      const updatedRecipes = followedRecipes.filter(recipeId => recipeId !== recipeId);
      localStorage.setItem('followedRecipes', JSON.stringify(updatedRecipes));
    } else {
      // Follow logic
      followedRecipes.push(recipeId);
      localStorage.setItem('followedRecipes', JSON.stringify(followedRecipes));
    }
    setIsFollowed(!isFollowed);
  }

  return (
    <button onClick={handleFollow}>
      {isFollowed ? 'Dejar de seguir' : 'Seguir'}
    </button>
  );
};

ToggleFollowButton.propTypes = {
  recipeId: PropTypes.string.isRequired,
};

export default ToggleFollowButton;
