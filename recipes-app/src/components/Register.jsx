import { useContext, useState } from 'react';
import AuthForm from './AuthForm';
import { AuthContext } from '../contexts/AuthContext';

const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const handleRegister = (data) => {
    const { username, password } = data;

    // Obtener usuarios almacenados en localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Verificar si el nombre de usuario ya existe
    const userExists = users.some(user => user.username === username);

    if (userExists) {
      setError('El nombre de usuario ya está en uso.');
      return;
    }

    // Si no existe, registrar el usuario
    registerUser({ username, password });
    setError(null);  // Limpiar el mensaje de error si el registro fue exitoso
  };

  return (
    <div>
      <h1>Registrarse</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Mostrar error si existe */}
      <AuthForm
        onSubmit={handleRegister}
        submitLabel="Registrarse"
        isRegister={true}
      />
    </div>
  );
};

export default Register;
