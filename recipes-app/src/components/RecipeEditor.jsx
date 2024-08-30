import { useState } from 'react';
import InputField from './InputField';
import categories from '../data/categories.json';
import { useForm } from 'react-hook-form';

const RecipeEditor = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Opciones de dificultad definidas localmente
  const difficultyLevels = ['Muy Fácil', 'Fácil', 'Moderado', 'Difícil', 'Muy Difícil'];

  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: [''],
    instructions: [''],
    difficulty: 'Muy Fácil',
    category: '',
  });

  // Agrega un nuevo campo de ingrediente
  const addIngredientField = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: [...prevRecipe.ingredients, ''],
    }));
  };

  // Agrega un nuevo campo de instrucción
  const addInstructionField = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      instructions: [...prevRecipe.instructions, ''],
    }));
  };

  // Maneja el envío del formulario
  const onSubmit = (data) => {
    const newRecipe = { ...recipe, ...data };

    // Guardar la receta en localStorage
    const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    savedRecipes.push(newRecipe);
    localStorage.setItem('recipes', JSON.stringify(savedRecipes));

    console.log('Receta guardada:', newRecipe);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Título de la receta */}
      <InputField
        label="Título:"
        name="title"
        register={register}
        error={errors.title}
      />

      {/* Ingredientes */}
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

      {/* Instrucciones */}
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

      {/* Dificultad */}
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

      {/* Categoría */}
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

      {/* Botón de envío */}
      <button type="submit">Guardar Receta</button>
    </form>
  );
};

export default RecipeEditor;
