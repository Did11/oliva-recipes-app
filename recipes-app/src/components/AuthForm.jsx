import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import InputField from './InputField';
import * as yup from 'yup';

const AuthForm = ({ onSubmit, submitLabel, isRegister }) => {
  // Definir el esquema de validación usando Yup
  const schema = yup.object().shape({
    username: yup.string().required('El nombre de usuario es obligatorio'), // Validación del campo de nombre de usuario
    password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'), // Validación del campo de contraseña
    ...(isRegister && {
      confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden') // Verificación de que las contraseñas coincidan
        .required('La confirmación de contraseña es obligatoria'),
    }),
  });

  // Inicializar el formulario con react-hook-form y yupResolver para la validación
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // Definir los campos de formulario, ajustando según sea registro o inicio de sesión
  const fields = [
    { name: 'username', label: 'Nombre de Usuario' },
    { name: 'password', label: 'Contraseña', type: 'password' },
    ...(isRegister ? [{ name: 'confirmPassword', label: 'Confirmar Contraseña', type: 'password' }] : []),
  ];

  return (
    // Contenedor del formulario con estilos de fondo, espaciado y sombras
    <div className="max-w-md mx-auto bg-orange-50 p-8 rounded-lg shadow-md"> 
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Renderizar los campos del formulario dinámicamente */}
        {fields.map(({ name, label, type }) => (
          <InputField
            key={name}
            label={label}
            name={name}
            type={type}
            register={register} // Registrar el input con react-hook-form
            error={errors[name]} // Mostrar errores si los hay
          />
        ))}
        {/* Botón de envío del formulario */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200 focus:outline-none"
        >
          {submitLabel} {/* Etiqueta dinámica del botón (p.ej. "Registrar" o "Iniciar sesión") */}
        </button>
      </form>
    </div>
  );
};

AuthForm.propTypes = {
  // Función a ejecutar cuando se envía el formulario
  onSubmit: PropTypes.func.isRequired,
  // Etiqueta para el botón de envío 
  submitLabel: PropTypes.string.isRequired,
  // Booleano para determinar si el formulario es de registro
  isRegister: PropTypes.bool,
};

export default AuthForm;
