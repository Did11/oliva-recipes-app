import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import categories from '../data/categories.json';
import IngredientFields from './IngredientFields';
import InstructionFields from './InstructionFields';

const RecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useContext(AuthContext);
  const { user } = state;

  const [recipe, setRecipe] = useState({
    title: '',
    difficulty: '',
    category: '',
    preparationTime: '',
    cookingTime: '',
    ingredients: [{ name: '', quantity: '', unit: 'unidad' }],
    instructions: [''],
  });

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

  const handleIngredientsChange = (updatedIngredients) => {
    setRecipe((prevRecipe) => ({ ...prevRecipe, ingredients: updatedIngredients }));
  };

  const handleInstructionsChange = (updatedInstructions) => {
    setRecipe((prevRecipe) => ({ ...prevRecipe, instructions: updatedInstructions }));
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateRecipe()) {
      alert('Por favor, complete todos los campos correctamente antes de guardar la receta.');
      return;
    }

    const selectedCategory = categories.find((cat) => cat.name === recipe.category);
    const newRecipe = {
      ...recipe,
      id: id || Date.now().toString(),
      image: selectedCategory ? selectedCategory.defaultImage : 'default.jpg',
      author: user.username,
    };

    const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    if (id) {
      const recipeIndex = savedRecipes.findIndex((r) => r.id === id);
      savedRecipes[recipeIndex] = newRecipe;
    } else {
      savedRecipes.push(newRecipe);
    }

    localStorage.setItem('recipes', JSON.stringify(savedRecipes));
    navigate(`/recipes/${newRecipe.id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Título:</label>
        <input
          type="text"
          value={recipe.title}
          onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
          className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 sm:text-sm"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Tiempo de preparación (minutos):</label>
        <input
          type="number"
          value={recipe.preparationTime}
          onChange={(e) => setRecipe({ ...recipe, preparationTime: e.target.value })}
          className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 sm:text-sm"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Tiempo de cocción (minutos):</label>
        <input
          type="number"
          value={recipe.cookingTime}
          onChange={(e) => setRecipe({ ...recipe, cookingTime: e.target.value })}
          className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 sm:text-sm"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Ingredientes:</label>
        <div className="space-y-2">
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={ingredient.name}
                onChange={(e) =>
                  handleIngredientsChange(
                    recipe.ingredients.map((ing, i) =>
                      i === index ? { ...ing, name: e.target.value } : ing
                    )
                  )
                }
                placeholder="Ingrediente"
                className="flex-1 px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 sm:text-sm"
              />
              <input
                type="text"
                value={ingredient.quantity}
                onChange={(e) =>
                  handleIngredientsChange(
                    recipe.ingredients.map((ing, i) =>
                      i === index ? { ...ing, quantity: e.target.value } : ing
                    )
                  )
                }
                placeholder="Cantidad"
                className="w-24 px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 sm:text-sm"
              />
              <select
                value={ingredient.unit}
                onChange={(e) =>
                  handleIngredientsChange(
                    recipe.ingredients.map((ing, i) =>
                      i === index ? { ...ing, unit: e.target.value } : ing
                    )
                  )
                }
                className="w-24 px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 sm:text-sm"
              >
                <option value="unidad">Unidad</option>
                <option value="gramos">Gramos</option>
                <option value="litros">Litros</option>
              </select>
              <button
                type="button"
                onClick={() =>
                  handleIngredientsChange(recipe.ingredients.filter((_, i) => i !== index))
                }
                className="px-3 py-1 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Eliminar
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              handleIngredientsChange([...recipe.ingredients, { name: '', quantity: '', unit: 'unidad' }])
            }
            className="w-full mt-2 text-sm text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Añadir Ingrediente
          </button>
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Instrucciones:</label>
        <div className="space-y-2">
          {recipe.instructions.map((instruction, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={instruction}
                onChange={(e) =>
                  handleInstructionsChange(
                    recipe.instructions.map((instr, i) => (i === index ? e.target.value : instr))
                  )
                }
                placeholder="Instrucción"
                className="flex-1 px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 sm:text-sm"
              />
              <button
                type="button"
                onClick={() =>
                  handleInstructionsChange(recipe.instructions.filter((_, i) => i !== index))
                }
                className="px-3 py-1 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Eliminar
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleInstructionsChange([...recipe.instructions, ''])}
            className="w-full mt-2 text-sm text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Añadir Instrucción
          </button>
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Dificultad:</label>
        <select
          value={recipe.difficulty}
          onChange={(e) => setRecipe({ ...recipe, difficulty: e.target.value })}
          className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 sm:text-sm"
        >
          {['Fácil', 'Moderado', 'Difícil'].map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Categoría:</label>
        <select
          value={recipe.category}
          onChange={(e) => setRecipe({ ...recipe, category: e.target.value })}
          className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 sm:text-sm"
        >
          <option value="">Seleccionar categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {id ? 'Actualizar Receta' : 'Guardar Receta'}
      </button>
    </form>
  );
};

export default RecipeForm;
