import { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeList from '../components/RecipeList';
import { RecipeContext } from '../contexts/RecipeContext';
import { AuthContext } from '../contexts/AuthContext';

const RecipeListPage = () => {
  const { recipes } = useContext(RecipeContext); // Obtener todas las recetas del contexto
  const { state } = useContext(AuthContext); // Obtener el estado de autenticación del contexto
  const { isAuthenticated } = state;

  return (
    <div>
      <h1>Recetas</h1>
      {isAuthenticated && (
        <Link to="/recipes/new" className="create-recipe-button">
          Crear Nueva Receta
        </Link>
      )}
      <RecipeList recipes={recipes} /> {/* Pasar solo las recetas */}
    </div>
  );
};

export default RecipeListPage;
