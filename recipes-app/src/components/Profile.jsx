import PropTypes from 'prop-types';
import UserInfo from './UserInfo';
import ProfileList from './ProfileList';

const Profile = ({ username, createdRecipes, followedRecipes }) => {
  return (
    <div className="max-w-4xl mx-auto p-8">
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
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Recetas que has creado</h2>
        <ProfileList recipes={createdRecipes} type="created" />
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Recetas que sigues</h2>
        <ProfileList recipes={followedRecipes} type="followed" />
      </section>
    </div>
  );
};

Profile.propTypes = {
  username: PropTypes.string.isRequired,
  createdRecipes: PropTypes.array.isRequired,
  followedRecipes: PropTypes.array.isRequired,
};

export default Profile;
