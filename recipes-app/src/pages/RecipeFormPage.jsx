import RecipeForm from '../components/RecipeForm';

const RecipeFormPage = () => (
  <div>
    <h1>{/* Título dinámico basado en si es edición o creación */}</h1>
    <RecipeForm />
  </div>
);

export default RecipeFormPage;
