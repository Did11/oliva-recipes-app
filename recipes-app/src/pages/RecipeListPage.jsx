import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeList from '../components/RecipeList';
import { AuthContext } from '../contexts/AuthContext';

const RecipeListPage = () => {
  const [recipes, setRecipes] = useState([]);
  const { state } = useContext(AuthContext); // Obtener el estado de autenticación del contexto
  const { isAuthenticated } = state;

  useEffect(() => {
    // Cargar las recetas desde localStorage
    const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    setRecipes(savedRecipes);
  }, []);

  return (
    <div>
      <h1>Recetas</h1>
      {isAuthenticated && (
        <Link to="/recipes/new" className="create-recipe-button">
          Crear Nueva Receta
        </Link>
      )}
      <RecipeList recipes={recipes} /> {/* Pasar las recetas cargadas */}
    </div>
  );
};

export default RecipeListPage;
