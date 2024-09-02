// RecipeForm.jsx
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
    difficulty: 'Muy Fácil',
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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Título:</label>
        <input
          type="text"
          value={recipe.title}
          onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
        />
      </div>

      <div>
        <label>Tiempo de preparación (minutos):</label>
        <input
          type="number"
          value={recipe.preparationTime}
          onChange={(e) => setRecipe({ ...recipe, preparationTime: e.target.value })}
        />
      </div>

      <div>
        <label>Tiempo de cocción (minutos):</label>
        <input
          type="number"
          value={recipe.cookingTime}
          onChange={(e) => setRecipe({ ...recipe, cookingTime: e.target.value })}
        />
      </div>

      <IngredientFields
        initialIngredients={recipe.ingredients}
        onIngredientsChange={handleIngredientsChange}
      />

      <InstructionFields
        initialInstructions={recipe.instructions}
        onInstructionsChange={handleInstructionsChange}
      />

      <div>
        <label>Dificultad:</label>
        <select
          value={recipe.difficulty}
          onChange={(e) => setRecipe({ ...recipe, difficulty: e.target.value })}
        >
          {['Muy Fácil', 'Fácil', 'Moderado', 'Difícil', 'Muy Difícil'].map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Categoría:</label>
        <select
          value={recipe.category}
          onChange={(e) => setRecipe({ ...recipe, category: e.target.value })}
        >
          <option value="">Seleccionar categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">{id ? 'Actualizar Receta' : 'Guardar Receta'}</button>
    </form>
  );
};

export default RecipeForm;
