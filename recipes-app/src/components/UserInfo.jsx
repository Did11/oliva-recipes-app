import PropTypes from 'prop-types';

const UserInfo = ({ username }) => {
  return (
    <div className="user-info">
      <p>Nombre de usuario: {username}</p> {/* Muestra el nombre de usuario */}
    </div>
  );
};

UserInfo.propTypes = {
  username: PropTypes.string.isRequired, // El nombre de usuario es obligatorio
};

export default UserInfo;
