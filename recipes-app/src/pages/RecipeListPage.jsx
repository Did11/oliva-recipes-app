import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import RecipeList from '../components/RecipeList';
import { AuthContext } from '../contexts/AuthContext';

const RecipeListPage = () => {
  const [recipes, setRecipes] = useState([]);
  const { state } = useContext(AuthContext); // Obtener el estado de autenticación del contexto
  const { isAuthenticated } = state;
  const location = useLocation();

  useEffect(() => {
    // Cargar las recetas desde localStorage
    const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    setRecipes(savedRecipes);
  }, []);

  // Filtrar las recetas en base a los parámetros de la URL
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';
  const selectedCategory = searchParams.get('category') || '';

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesTitle = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === '' || recipe.category === selectedCategory;
    return matchesTitle && matchesCategory;
  });

  return (
    <div>
      <h1>Recetas</h1>
      {isAuthenticated && (
        <Link to="/recipes/new" className="create-recipe-button">
          Crear Nueva Receta
        </Link>
      )}
      <RecipeList recipes={filteredRecipes} /> {/* Pasar las recetas filtradas */}
    </div>
  );
};

export default RecipeListPage;
