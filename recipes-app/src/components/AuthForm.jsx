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
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <button type="submit">{submitLabel}</button>
    </form>
  );
};

AuthForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string.isRequired,
  isRegister: PropTypes.bool,
};

export default AuthForm;
