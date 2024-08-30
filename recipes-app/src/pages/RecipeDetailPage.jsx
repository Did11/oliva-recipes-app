import { useParams } from 'react-router-dom';

const RecipeDetailPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Detalles de la Receta {id}</h1>
      <p>Los detalles de la receta seleccionada.</p>
    </div>
  );
};

export default RecipeDetailPage;
