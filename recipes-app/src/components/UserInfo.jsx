import PropTypes from 'prop-types';

const UserInfo = ({ username }) => {
  return (
    <div className="user-info">
      <p>Nombre de usuario: {username}</p>
    </div>
  );
};

UserInfo.propTypes = {
  username: PropTypes.string.isRequired,
};

export default UserInfo;
