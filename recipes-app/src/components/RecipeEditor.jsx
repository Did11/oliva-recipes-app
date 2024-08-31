import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';
import categories from '../data/categories.json';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../contexts/AuthContext';

const getNextId = () => {
  const currentId = parseInt(localStorage.getItem('recipeIdCounter') || '0', 10);
  const nextId = currentId + 1;
  localStorage.setItem('recipeIdCounter', nextId.toString());
  return nextId.toString();
};

const RecipeEditor = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { state } = useContext(AuthContext);
  const { user } = state;

  const difficultyLevels = ['Muy Fácil', 'Fácil', 'Moderado', 'Difícil', 'Muy Difícil'];

  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: [{ name: '', quantity: '', unit: '' }], // Ingredientes con cantidad y unidad
    instructions: [''],
    difficulty: 'Muy Fácil',
    category: '',
  });

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

  const handleIngredientChange = (index, field, value) => {
    setRecipe((prevRecipe) => {
      const updatedIngredients = [...prevRecipe.ingredients];
      updatedIngredients[index][field] = value;
      return { ...prevRecipe, ingredients: updatedIngredients };
    });
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
      author: user.username, // Asignar el nombre de usuario como autor
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
          <div key={index} className="ingredient-field">
            <InputField
              label={`Ingrediente ${index + 1}:`}
              name={`ingredients[${index}].name`}
              register={register}
              error={errors.ingredients && errors.ingredients[index]?.name}
              type="text"
              onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
            />
            <InputField
              label="Cantidad:"
              name={`ingredients[${index}].quantity`}
              register={register}
              error={errors.ingredients && errors.ingredients[index]?.quantity}
              type="text"
              onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
            />
            <select
              name={`ingredients[${index}].unit`}
              {...register(`ingredients[${index}].unit`)}
              onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
            >
              <option value="">Seleccione Unidad</option>
              <option value="Unidad">Unidad</option>
              <option value="Gramos">Gramos</option>
              <option value="Kilos">Kilos</option>
              <option value="Mililitros">Mililitros</option>
              <option value="Litros">Litros</option>
            </select>
          </div>
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
