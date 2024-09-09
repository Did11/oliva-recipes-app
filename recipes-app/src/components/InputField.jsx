import PropTypes from 'prop-types';

const InputField = ({ label, name, type = 'text', register, error }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      {...register(name)}
      className={`w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${error ? 'border-red-500' : ''}`}
      placeholder={`Ingrese su ${label.toLowerCase()}`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  register: PropTypes.func.isRequired,
  error: PropTypes.object,
};

export default InputField;
