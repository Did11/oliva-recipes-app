import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import RecipePage from '../pages/RecipePage';
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
      <Route path="/recipes" element={<RecipePage />} />

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
      <Route path="/recipes/:id" element={<PrivateRoute element={RecipeDetailPage} />} />
    </Routes>
  );
};

export default AppRoutes;
