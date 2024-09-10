import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import RecipeListPage from '../pages/RecipeListPage';
import RecipeFormPage from '../pages/RecipeFormPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProfilePage from '../pages/ProfilePage';
import RecipeDetailPage from '../pages/RecipeDetailPage';
import PrivateRoute from './PrivateRoute';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const AppRoutes = () => {
  // Obtener el estado de autenticación desde el contexto
  const { state } = useContext(AuthContext);

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/recipes" element={<RecipeListPage />} />
      <Route path="/recipes/:id" element={<RecipeDetailPage />} />

      {/* Ruta protegida para crear nuevas recetas */}
      <Route
        path="/recipes/new"
        element={<PrivateRoute element={RecipeFormPage} />}
      />

      {/* Ruta protegida para editar recetas existentes */}
      <Route
        path="/edit-recipe/:id"
        element={<PrivateRoute element={RecipeFormPage} />}
      />

      {/* Redirigir si ya está autenticado, de lo contrario, mostrar página de login */}
      <Route
        path="/login"
        element={state.isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
      />

      {/* Redirigir si ya está autenticado, de lo contrario, mostrar página de registro */}
      <Route
        path="/register"
        element={state.isAuthenticated ? <Navigate to="/" /> : <RegisterPage />}
      />

      {/* Ruta protegida para el perfil del usuario */}
      <Route path="/profile" element={<PrivateRoute element={ProfilePage} />} />
    </Routes>
  );
};

export default AppRoutes;
