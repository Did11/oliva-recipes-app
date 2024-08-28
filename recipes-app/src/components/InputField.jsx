import PropTypes from 'prop-types';

const InputField = ({ label, name, type = 'text', register, error }) => {
  return (
    <div>
      <label>{label}</label>
      <input type={type} {...register(name)} />
      {error && <p>{error.message}</p>}
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  register: PropTypes.func.isRequired,
  error: PropTypes.object,
};

export default InputField;
