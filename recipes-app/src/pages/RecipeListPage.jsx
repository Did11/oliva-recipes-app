import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeList from '../components/RecipeList';

const RecipeListPage = () => {
  const [recipes, setRecipes] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    setRecipes(savedRecipes);
  }, []);

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';
  const selectedCategory = searchParams.get('category') || '';

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesTitle = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === '' || recipe.category === selectedCategory;
    return matchesTitle && matchesCategory;
  });

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Recetas</h1>
      <RecipeList recipes={filteredRecipes} />
    </div>
  );
};

export default RecipeListPage;
