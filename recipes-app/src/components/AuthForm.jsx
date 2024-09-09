import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import InputField from './InputField';
import * as yup from 'yup';

const AuthForm = ({ onSubmit, submitLabel, isRegister }) => {
  const schema = yup.object().shape({
    username: yup.string().required('El nombre de usuario es obligatorio'),
    password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
    ...(isRegister && {
      confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden')
        .required('La confirmación de contraseña es obligatoria'),
    }),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const fields = [
    { name: 'username', label: 'Nombre de Usuario' },
    { name: 'password', label: 'Contraseña', type: 'password' },
    ...(isRegister ? [{ name: 'confirmPassword', label: 'Confirmar Contraseña', type: 'password' }] : []),
  ];

  return (
    <div className="max-w-md mx-auto bg-orange-50 p-8 rounded-lg shadow-md"> {/* Fondo claro y esquinas más redondeadas */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {fields.map(({ name, label, type }) => (
          <InputField
            key={name}
            label={label}
            name={name}
            type={type}
            register={register}
            error={errors[name]}
          />
        ))}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200 focus:outline-none"
        >
          {submitLabel}
        </button>
      </form>
    </div>
  );
};

AuthForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string.isRequired,
  isRegister: PropTypes.bool,
};

export default AuthForm;
