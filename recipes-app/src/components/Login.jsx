import { useContext } from 'react';
import AuthForm from './AuthForm';
import { AuthContext } from './AuthContext';

const Login = () => {
  const { loginUser } = useContext(AuthContext);

  const handleLogin = (data) => {
    loginUser(data);
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <AuthForm onSubmit={handleLogin} submitLabel="Iniciar Sesión" />
    </div>
  );
};

export default Login;
