import { useContext, useEffect, useState } from 'react';
import UserInfo from '../components/UserInfo';
import RecipeList from '../components/RecipeList';
import ToggleFollowButton from '../components/ToggleFollowButton'; // Importa el componente
import { AuthContext } from '../contexts/AuthContext';

const ProfilePage = () => {
  const { state } = useContext(AuthContext);
  const { user } = state;

  const [followedRecipes, setFollowedRecipes] = useState([]);
  const [createdRecipes, setCreatedRecipes] = useState([]);

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    
    // Filtrar las recetas creadas por el usuario
    const userCreatedRecipes = savedRecipes.filter(recipe => recipe.author === user.username);
    setCreatedRecipes(userCreatedRecipes);

    // Obtener las recetas seguidas por el usuario
    const followedIds = JSON.parse(localStorage.getItem('followedRecipes')) || [];
    const userFollowedRecipes = savedRecipes.filter(recipe => followedIds.includes(recipe.id));
    setFollowedRecipes(userFollowedRecipes);
  }, [user.username]);

  return (
    <div>
      <h1>Perfil de {user.username}</h1>
      <UserInfo username={user.username} />
      
      <section>
        <h2>Recetas que sigues</h2>
        {followedRecipes.length > 0 ? (
          <RecipeList recipes={followedRecipes} type="followed">
            {followedRecipes.map(recipe => (
              <div key={recipe.id}>
                <h3>{recipe.title}</h3>
                <ToggleFollowButton recipeId={recipe.id} /> {/* Botón para dejar de seguir */}
              </div>
            ))}
          </RecipeList>
        ) : (
          <p>No hay recetas disponibles.</p>
        )}
      </section>
      
      <section>
        <h2>Recetas que has creado</h2>
        {createdRecipes.length > 0 ? (
          <RecipeList recipes={createdRecipes} type="created" />
        ) : (
          <p>No hay recetas disponibles.</p>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
