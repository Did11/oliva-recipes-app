import { useParams, useNavigate } from 'react-router-dom';
import { useContext, Fragment, useState } from 'react'; 
import { AuthContext } from '../contexts/AuthContext';
import ToggleFollowButton from './ToggleFollowButton';
import DeleteButton from './DeleteButton';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Asegúrate de que esto coincide con tu div principal en index.html

const RecipeItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useContext(AuthContext);
  const { user } = state;
  const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
  const recipe = recipes.find((recipe) => recipe.id === id);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  if (!recipe) {
    return <p>No se encontró la receta.</p>;
  }

  const handleEdit = () => {
    navigate(`/edit-recipe/${recipe.id}`);
  };

  const handleDelete = () => {
    navigate('/recipes'); // Redirige al usuario a la lista de recetas después de eliminar
  };

  const pluralizeUnit = (quantity, unit) => {
    if (quantity === '1') return unit;
    const unitMap = {
      unidad: 'unidades',
      gramo: 'gramos',
      kilo: 'kilos',
      'centímetro cúbico': 'c.c.',
      litro: 'litros',
      taza: 'tazas',
      cucharada: 'cucharadas',
    };
    return unitMap[unit] || unit;
  };

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="flex mb-8">
        <div className="w-1/2 pr-4">
          <img 
            src={`/images/${recipe.image}`} 
            alt={recipe.title} 
            className="w-full h-64 object-cover rounded-lg shadow-md cursor-pointer" 
            onClick={() => setModalIsOpen(true)} 
          />
        </div>
        <div className="w-1/2 pl-4 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
          <p className="text-lg mb-2"><strong>Autor:</strong> {recipe.author || 'Anónimo'}</p>
          <p className="text-lg mb-2"><strong>Dificultad:</strong> {recipe.difficulty}</p>
          <p className="text-lg mb-2"><strong>Categoría:</strong> {recipe.category}</p>
          <p className="text-lg mb-2"><strong>Tiempo de preparación:</strong> {recipe.preparationTime} minutos</p>
          <p className="text-lg mb-6"><strong>Tiempo de cocción:</strong> {recipe.cookingTime} minutos</p>
        </div>
      </div>
      
      <h3 className="text-2xl font-semibold mb-4">Ingredientes</h3>
      <ul className="list-disc list-inside mb-8 text-gray-800">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.quantity} {pluralizeUnit(ingredient.quantity, ingredient.unit)} de {ingredient.name}
          </li>
        ))}
      </ul>
      
      <h3 className="text-2xl font-semibold mb-4">Instrucciones</h3>
      <ol className="list-decimal list-inside text-gray-800">
        {recipe.instructions.map((instruction, index) => (
          <li key={index} className="mb-2">{instruction}</li>
        ))}
      </ol>
      
      <div className="mt-8 flex justify-center gap-4">
        {user.username === recipe.author ? (
          <Fragment>
            <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Editar Receta</button>
            <DeleteButton recipeId={recipe.id} onDelete={handleDelete} />
          </Fragment>
        ) : (
          <ToggleFollowButton recipeId={recipe.id} />
        )}
      </div>

      <Modal 
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: 'none',
            border: 'none',
            background: 'none',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
          }
        }}
      >
        <img 
          src={`/images/${recipe.image}`} 
          alt={recipe.title} 
          className="w-full h-full object-cover rounded-lg shadow-md" 
          onClick={() => setModalIsOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default RecipeItem;
