import { useContext, useState } from 'react';
import AuthForm from './AuthForm';
import { AuthContext } from '../contexts/AuthContext';

const Register = () => {
  const { dispatch } = useContext(AuthContext); // Usar dispatch para el manejo del estado
  const [error, setError] = useState(null);

  const handleRegister = (data) => {
    const { username, password } = data;

    // Lógica de validación movida a una función separada
    if (isUsernameTaken(username)) {
      setError('El nombre de usuario ya está en uso.');
      return;
    }

    // Registrar el usuario y actualizar el estado de autenticación
    registerNewUser(username, password);
  };

  // Verificar si el nombre de usuario ya está en uso
  const isUsernameTaken = (username) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.username === username);
  };

  // Registrar un nuevo usuario y guardar en localStorage
  const registerNewUser = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));

    // Despachar la acción LOGIN para actualizar el estado de autenticación
    dispatch({ type: 'LOGIN', payload: { username, password } });

    // Limpiar cualquier error anterior
    setError(null);
  };

  return (
    <div>
      <h1>Registrarse</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <AuthForm
        onSubmit={handleRegister}
        submitLabel="Registrarse"
        isRegister={true}
      />
    </div>
  );
};

export default Register;
