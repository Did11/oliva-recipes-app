import { useContext } from 'react';
import UserInfo from '../components/UserInfo';
import RecipeList from '../components/RecipeList';
import { AuthContext } from '../contexts/AuthContext';

const ProfilePage = () => {
  const { state } = useContext(AuthContext);
  const { user } = state;

  // Aquí se obtendrían las recetas creadas y seguidas por el usuario desde la base de datos o un API
  const followedRecipes = [/* Obtener recetas seguidas del usuario */];
  const createdRecipes = [/* Obtener recetas creadas por el usuario */];

  return (
    <div>
      <h1>Perfil de {user.username}</h1>
      <UserInfo username={user.username} />
      
      <section>
        <h2>Recetas que sigues</h2>
        <RecipeList recipes={followedRecipes} type="followed" />
      </section>
      
      <section>
        <h2>Recetas que has creado</h2>
        <RecipeList recipes={createdRecipes} type="created" />
      </section>
    </div>
  );
};

export default ProfilePage;
