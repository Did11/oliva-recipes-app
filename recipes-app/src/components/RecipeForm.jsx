import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import categories from '../data/categories.json';
import IngredientFields from './IngredientFields';
import InstructionFields from './InstructionFields';

const RecipeForm = () => {
  const { id } = useParams(); // Obtener el id de la receta si está en modo edición
  const navigate = useNavigate();
  const { state } = useContext(AuthContext); // Obtener el estado del contexto de autenticación
  const { user } = state;

  // Estado para almacenar la receta actual
  const [recipe, setRecipe] = useState({
    title: '',
    difficulty: '',
    category: '',
    preparationTime: '',
    cookingTime: '',
    ingredients: [{ name: '', quantity: '', unit: 'unidad' }], // Ingredientes iniciales
    instructions: [''], // Instrucciones iniciales
  });

  // Si hay un id, cargamos la receta para editar
  useEffect(() => {
    if (id) {
      const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
      const recipeToEdit = savedRecipes.find((recipe) => recipe.id === id);
      if (recipeToEdit) {
        setRecipe({
          ...recipeToEdit,
        });
      }
    }
  }, [id]);

  // Función para actualizar los ingredientes
  const handleIngredientsChange = (updatedIngredients) => {
    setRecipe((prevRecipe) => ({ ...prevRecipe, ingredients: updatedIngredients }));
  };

  // Función para actualizar las instrucciones
  const handleInstructionsChange = (updatedInstructions) => {
    setRecipe((prevRecipe) => ({ ...prevRecipe, instructions: updatedInstructions }));
  };

  // Validar la receta antes de guardar
  const validateRecipe = () => {
    const { title, difficulty, category, preparationTime, cookingTime, ingredients, instructions } = recipe;
    if (!title.trim() || !difficulty || !category || !preparationTime || !cookingTime) return false;
    if (ingredients.length === 0 || instructions.length === 0) return false;
    const invalidIngredient = ingredients.some(
      (ing) => !ing.name.trim() || !ing.quantity.trim() || !ing.unit.trim()
    );
    const invalidInstruction = instructions.some((instr) => !instr.trim());
    return !invalidIngredient && !invalidInstruction;
  };

  // Manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateRecipe()) {
      alert('Por favor, complete todos los campos correctamente antes de guardar la receta.');
      return;
    }

    const selectedCategory = categories.find((cat) => cat.name === recipe.category);
    const newRecipe = {
      ...recipe,
      id: id || Date.now().toString(), // Asignar ID único si es una nueva receta
      image: selectedCategory ? selectedCategory.defaultImage : 'default.jpg', // Asignar imagen por defecto
      author: user.username, // Asignar el nombre del autor
    };

    const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    if (id) {
      const recipeIndex = savedRecipes.findIndex((r) => r.id === id);
      savedRecipes[recipeIndex] = newRecipe;
    } else {
      savedRecipes.push(newRecipe);
    }

    localStorage.setItem('recipes', JSON.stringify(savedRecipes));
    navigate(`/recipes/${newRecipe.id}`); // Redirigir a los detalles de la receta
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-4 mb-6">
      {/* Título de la receta */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Título:</label>
        <input
          type="text"
          value={recipe.title}
          onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
          className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-gray-50 sm:text-sm"
        />
      </div>

      {/* Tiempo de preparación */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Tiempo de preparación (minutos):</label>
        <input
          type="number"
          value={recipe.preparationTime}
          onChange={(e) => setRecipe({ ...recipe, preparationTime: e.target.value })}
          className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-gray-50 sm:text-sm"
        />
      </div>

      {/* Tiempo de cocción */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Tiempo de cocción (minutos):</label>
        <input
          type="number"
          value={recipe.cookingTime}
          onChange={(e) => setRecipe({ ...recipe, cookingTime: e.target.value })}
          className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-gray-50 sm:text-sm"
        />
      </div>

      {/* Campos de ingredientes */}
      <IngredientFields
        initialIngredients={recipe.ingredients}
        onIngredientsChange={handleIngredientsChange}
      />

      {/* Campos de instrucciones */}
      <InstructionFields
        initialInstructions={recipe.instructions}
        onInstructionsChange={handleInstructionsChange}
      />

      {/* Selección de dificultad */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Dificultad:</label>
        <select
          value={recipe.difficulty}
          onChange={(e) => setRecipe({ ...recipe, difficulty: e.target.value })}
          className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-gray-50 sm:text-sm"
        >
          <option value="" disabled>
            Seleccione la dificultad
          </option>
          {['Fácil', 'Moderado', 'Difícil'].map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      {/* Selección de categoría */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Categoría:</label>
        <select
          value={recipe.category}
          onChange={(e) => setRecipe({ ...recipe, category: e.target.value })}
          className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-gray-50 sm:text-sm"
        >
          <option value="">Seleccionar categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Botón para guardar la receta */}
      <button
        type="submit"
        className="w-full bg-orange-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
      >
        {id ? 'Actualizar Receta' : 'Guardar Receta'}
      </button>
    </form>
  );
};

export default RecipeForm;
