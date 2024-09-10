import PropTypes from 'prop-types';

const InputField = ({ label, name, type = 'text', register, error }) => (
  <div>
    {/* Etiqueta para el campo de entrada */}
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    {/* Campo de entrada (input) */}
    <input
      id={name}
      name={name}
      type={type}
      {...register(name)} // Registrar el input con react-hook-form
      className={`w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${error ? 'border-red-500' : ''}`}
      placeholder={`Ingrese su ${label.toLowerCase()}`} // Placeholder dinámico según el label
    />
    {/* Mensaje de error si existe */}
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

InputField.propTypes = {
  // Etiqueta para mostrar en el input
  label: PropTypes.string.isRequired,
  // Nombre del campo para manejar el input
  name: PropTypes.string.isRequired,
  // Tipo de campo, por defecto es 'text'
  type: PropTypes.string,
  // Función register de react-hook-form
  register: PropTypes.func.isRequired,
  // Mensaje de error en caso de que haya uno
  error: PropTypes.object,
};

export default InputField;
