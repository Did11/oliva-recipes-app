import { useContext, useEffect, useState } from 'react';
import Profile from '../components/Profile';
import { AuthContext } from '../contexts/AuthContext';

const ProfilePage = () => {
  const { state } = useContext(AuthContext);
  const { user } = state;

  const [createdRecipes, setCreatedRecipes] = useState([]);
  const [followedRecipes, setFollowedRecipes] = useState([]);

  useEffect(() => {
    // Cargar recetas creadas y seguidas del localStorage
    const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const followRecipesByUser = JSON.parse(localStorage.getItem('followRecipesByUser')) || {};
    const followedIds = followRecipesByUser[user.username] || [];

    // Filtrar recetas creadas por el usuario y seguidas
    const userCreatedRecipes = savedRecipes.filter(recipe => recipe.author === user.username);
    const userFollowedRecipes = savedRecipes.filter(recipe => followedIds.includes(recipe.id));

    setCreatedRecipes(userCreatedRecipes);
    setFollowedRecipes(userFollowedRecipes);
  }, [user.username]);

  // Manejar la eliminación de una receta
  const handleDeleteRecipe = (recipeId) => {
    const updatedRecipes = createdRecipes.filter(recipe => recipe.id !== recipeId);
    setCreatedRecipes(updatedRecipes);

    const allRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const newRecipesList = allRecipes.filter(recipe => recipe.id !== recipeId);
    localStorage.setItem('recipes', JSON.stringify(newRecipesList));

    handleUnfollowRecipe(recipeId);
  };

  // Manejar la acción de dejar de seguir una receta
  const handleUnfollowRecipe = (recipeId) => {
    const followRecipesByUser = JSON.parse(localStorage.getItem('followRecipesByUser')) || {};
    const followedRecipes = followRecipesByUser[user.username] || [];
    const updatedFollowedRecipes = followedRecipes.filter(id => id !== recipeId);

    followRecipesByUser[user.username] = updatedFollowedRecipes;
    localStorage.setItem('followRecipesByUser', JSON.stringify(followRecipesByUser));

    setFollowedRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== recipeId));
  };

  return (
    <Profile 
      username={user.username}
      createdRecipes={createdRecipes}
      followedRecipes={followedRecipes}
      onDeleteRecipe={handleDeleteRecipe}
      onUnfollowRecipe={handleUnfollowRecipe}
    />
  );
};

export default ProfilePage;
