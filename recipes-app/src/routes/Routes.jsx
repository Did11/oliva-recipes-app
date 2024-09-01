import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import RecipeListPage from '../pages/RecipeListPage';
import RecipeFormPage from '../pages/RecipeFormPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import AboutPage from '../pages/AboutPage';
import ProfilePage from '../pages/ProfilePage';
import RecipeDetailPage from '../pages/RecipeDetailPage';
import PrivateRoute from './PrivateRoute';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const AppRoutes = () => {
  const { state } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/recipes" element={<RecipeListPage />} />
      <Route path="/recipes/:id" element={<RecipeDetailPage />} />

      {/* Ruta para crear nuevas recetas */}
      <Route
        path="/recipes/new"
        element={<PrivateRoute element={RecipeFormPage} />}
      />

      {/* Ruta para editar recetas existentes */}
      <Route
        path="/edit-recipe/:id"
        element={<PrivateRoute element={RecipeFormPage} />}
      />

      {/* Rutas públicas protegidas por autenticación */}
      <Route
        path="/login"
        element={state.isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={state.isAuthenticated ? <Navigate to="/" /> : <RegisterPage />}
      />

      <Route path="/about" element={<AboutPage />} />

      {/* Rutas protegidas */}
      <Route path="/profile" element={<PrivateRoute element={ProfilePage} />} />
    </Routes>
  );
};

export default AppRoutes;
