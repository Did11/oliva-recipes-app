import { useContext, useEffect, useState } from 'react';
import Profile from '../components/Profile';
import { AuthContext } from '../contexts/AuthContext';

const ProfilePage = () => {
  const { state } = useContext(AuthContext);
  const { user } = state;

  const [createdRecipes, setCreatedRecipes] = useState([]);
  const [followedRecipes, setFollowedRecipes] = useState([]);

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    
    const userCreatedRecipes = savedRecipes.filter(recipe => recipe.author === user.username);
    setCreatedRecipes(userCreatedRecipes);

    const followedIds = JSON.parse(localStorage.getItem('followedRecipes')) || [];
    const userFollowedRecipes = savedRecipes.filter(recipe => followedIds.includes(recipe.id));
    setFollowedRecipes(userFollowedRecipes);
  }, [user.username]);

  return (
    <Profile 
      username={user.username}
      createdRecipes={createdRecipes}
      followedRecipes={followedRecipes}
    />
  );
};

export default ProfilePage;
