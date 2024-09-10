import PropTypes from 'prop-types';
import ProfileList from './ProfileList';
import UserInfo from './UserInfo';

const Profile = ({ username, createdRecipes, followedRecipes, onDeleteRecipe, onUnfollowRecipe }) => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Sección del perfil del usuario con imagen y nombre */}
      <div className="flex items-center space-x-6 mb-8">
        <img 
          src="/images/chef.png"
          alt="Profile" 
          className="w-24 h-24 rounded-full object-cover shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold">{username}</h1>
          <UserInfo username={username} />
        </div>
      </div>
      
      {/* Lista de recetas creadas por el usuario */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Recetas que has creado</h2>
        <ProfileList 
          recipes={createdRecipes} 
          type="created" 
          onRecipeDeleted={onDeleteRecipe} 
        />
      </section>
      
      {/* Lista de recetas que sigue el usuario */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Recetas que sigues</h2>
        <ProfileList 
          recipes={followedRecipes} 
          type="followed" 
          onUnfollowRecipe={onUnfollowRecipe}  // Pasamos onUnfollowRecipe aquí
        />
      </section>
    </div>
  );
};

Profile.propTypes = {
  username: PropTypes.string.isRequired, // El nombre del usuario es obligatorio
  createdRecipes: PropTypes.array.isRequired, // La lista de recetas creadas es obligatoria
  followedRecipes: PropTypes.array.isRequired, // La lista de recetas seguidas es obligatoria
  onDeleteRecipe: PropTypes.func.isRequired, // Función para eliminar una receta
  onUnfollowRecipe: PropTypes.func.isRequired,  // Función para dejar de seguir una receta
};

export default Profile;
