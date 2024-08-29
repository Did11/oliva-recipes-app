import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom'; // Importar Navigate para redirigir
import AuthForm from './AuthForm';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [error, setError] = useState(null);

  // Redirigir a home si el usuario ya está autenticado
  if (state.isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleLogin = (data) => {
    const { username, password } = data;

    const user = authenticateUser(username, password);

    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
      setError(null);
    } else {
      setError('Nombre de usuario o contraseña incorrectos');
    }
  };

  const authenticateUser = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find(user => user.username === username && user.password === password);
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <AuthForm onSubmit={handleLogin} submitLabel="Iniciar Sesión" />
    </div>
  );
};

export default Login;
