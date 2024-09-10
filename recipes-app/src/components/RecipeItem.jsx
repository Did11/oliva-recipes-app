import { useParams, useNavigate } from 'react-router-dom';
import { useContext, Fragment, useState } from 'react'; 
import { AuthContext } from '../contexts/AuthContext';
import ToggleFollowButton from './ToggleFollowButton';
import DeleteButton from './DeleteButton';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Configura el elemento raíz para accesibilidad en Modal

const RecipeItem = () => {
  const { id } = useParams(); // Obtiene el id de la receta desde los parámetros de la URL
  const navigate = useNavigate();
  const { state } = useContext(AuthContext);
  const { user } = state; // Obtiene el usuario logueado desde el contexto de autenticación

  // Obtiene todas las recetas guardadas en localStorage
  const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
  // Encuentra la receta correspondiente al id pasado por parámetros
  const recipe = recipes.find((recipe) => recipe.id === id);
  
  const [modalIsOpen, setModalIsOpen] = useState(false); // Estado para controlar la visibilidad del modal

  if (!recipe) {
    return <p>No se encontró la receta.</p>; // Muestra un mensaje si no se encuentra la receta
  }

  const handleEdit = () => {
    navigate(`/edit-recipe/${recipe.id}`); // Redirige a la página de edición de la receta
  };

  const handleDelete = () => {
    navigate('/recipes'); // Redirige al usuario a la lista de recetas después de eliminar
  };

  // Función para pluralizar las unidades de ingredientes
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
    <div className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-4xl mx-auto my-10">
      <div className="flex mb-8">
        <div className="w-1/2 pr-4">
          <img 
            src={`/images/${recipe.image}`} 
            alt={recipe.title} 
            className="w-full h-64 object-cover rounded-lg shadow-md cursor-pointer" 
            onClick={() => setModalIsOpen(true)} // Abre el modal cuando se hace clic en la imagen
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
        {/* Solo el usuario logueado que es el autor de la receta puede editar o eliminar */}
        {user && user.username === recipe.author ? (
          <Fragment>
            <button onClick={handleEdit} className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors duration-200 focus:outline-none">Editar Receta</button>
            <DeleteButton recipeId={recipe.id} onDelete={handleDelete} />
          </Fragment>
        ) : (
          <ToggleFollowButton recipeId={recipe.id} /> // Muestra el botón de seguir/dejar de seguir para otros usuarios
        )}
      </div>

      {/* Modal para mostrar la imagen en tamaño completo */}
      <Modal 
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)} // Cierra el modal
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
            backgroundColor: 'rgba(0, 0, 0, 0.75)' // Fondo oscuro del modal
          }
        }}
      >
        <img 
          src={`/images/${recipe.image}`} 
          alt={recipe.title} 
          className="w-full h-full object-cover rounded-lg shadow-md" 
          onClick={() => setModalIsOpen(false)} // Cierra el modal al hacer clic en la imagen
        />
      </Modal>
    </div>
  );
};

export default RecipeItem;
