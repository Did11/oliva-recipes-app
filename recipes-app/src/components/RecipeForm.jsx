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

  const difficultyLevels = ['Muy Fácil', 'Fácil', 'Moderado', 'Difícil', 'Muy Difícil'];

  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: [{ name: '', quantity: '', unit: '' }],
    instructions: [''],
    difficulty: 'Muy Fácil',
    category: '',
  });

  useEffect(() => {
    if (id) {
      const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
      const recipeToEdit = savedRecipes.find((recipe) => recipe.id === id);
      if (recipeToEdit) {
        setRecipe(recipeToEdit);
      }
    }
  }, [id]);

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients[index][field] = value;
    setRecipe({ ...recipe, ingredients: updatedIngredients });
  };

  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...recipe.instructions];
    updatedInstructions[index] = value;
    setRecipe({ ...recipe, instructions: updatedInstructions });
  };

  const addIngredientField = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: [...prevRecipe.ingredients, { name: '', quantity: '', unit: '' }],
    }));
  };

  const addInstructionField = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      instructions: [...prevRecipe.instructions, ''],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedCategory = categories.find((category) => category.name === recipe.category);
    const newRecipe = {
      ...recipe,
      id: id || new Date().getTime().toString(),
      image: selectedCategory ? selectedCategory.defaultImage : 'default.jpg',
      author: recipe.author || user.username,
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

      <IngredientFields
        ingredients={recipe.ingredients}
        onIngredientChange={handleIngredientChange}
        onAddIngredient={addIngredientField} // Pasar la función para añadir ingredientes
      />

      <InstructionFields
        instructions={recipe.instructions}
        onInstructionChange={handleInstructionChange}
        onAddInstruction={addInstructionField} // Pasar la función para añadir instrucciones
      />

      <div>
        <label>Dificultad:</label>
        <select
          value={recipe.difficulty}
          onChange={(e) => setRecipe({ ...recipe, difficulty: e.target.value })}
        >
          {difficultyLevels.map((level) => (
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
