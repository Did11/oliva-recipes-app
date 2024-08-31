import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';
import categories from '../data/categories.json';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../contexts/AuthContext'; // Importar AuthContext

const getNextId = () => {
  const currentId = parseInt(localStorage.getItem('recipeIdCounter') || '0', 10);
  const nextId = currentId + 1;
  localStorage.setItem('recipeIdCounter', nextId.toString());
  return nextId.toString();
};

const RecipeEditor = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { state } = useContext(AuthContext); // Obtener el estado de autenticación
  const { user } = state; // Obtener el usuario autenticado

  const difficultyLevels = ['Muy Fácil', 'Fácil', 'Moderado', 'Difícil', 'Muy Difícil'];

  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: [''],
    instructions: [''],
    difficulty: 'Muy Fácil',
    category: '',
  });

  const addIngredientField = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: [...prevRecipe.ingredients, ''],
    }));
  };

  const addInstructionField = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      instructions: [...prevRecipe.instructions, ''],
    }));
  };

  const onSubmit = (data) => {
    const selectedCategory = categories.find(
      (category) => category.name === data.category
    );

    const newRecipe = {
      id: getNextId(),
      ...recipe,
      ...data,
      image: selectedCategory ? selectedCategory.defaultImage : 'default.jpg',
      author: user.username // Asignar el nombre de usuario como autor
    };

    const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    savedRecipes.push(newRecipe);
    localStorage.setItem('recipes', JSON.stringify(savedRecipes));

    console.log('Receta guardada:', newRecipe);

    navigate(`/recipes/${newRecipe.id}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label="Título:"
        name="title"
        register={register}
        error={errors.title}
      />

      <div>
        <label>Ingredientes:</label>
        {recipe.ingredients.map((ingredient, index) => (
          <InputField
            key={index}
            label={`Ingrediente ${index + 1}:`}
            name={`ingredients[${index}]`}
            register={register}
            error={errors.ingredients && errors.ingredients[index]}
            type="text"
          />
        ))}
        <button type="button" onClick={addIngredientField}>
          Añadir Ingrediente
        </button>
      </div>

      <div>
        <label>Instrucciones:</label>
        {recipe.instructions.map((instruction, index) => (
          <InputField
            key={index}
            label={`Instrucción ${index + 1}:`}
            name={`instructions[${index}]`}
            register={register}
            error={errors.instructions && errors.instructions[index]}
            type="textarea"
          />
        ))}
        <button type="button" onClick={addInstructionField}>
          Añadir Instrucción
        </button>
      </div>

      <div>
        <label htmlFor="difficulty">Dificultad:</label>
        <select
          id="difficulty"
          name="difficulty"
          {...register('difficulty')}
        >
          {difficultyLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="category">Categoría:</label>
        <select
          id="category"
          name="category"
          {...register('category')}
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Guardar Receta</button>
    </form>
  );
};

export default RecipeEditor;
