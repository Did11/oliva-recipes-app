import PropTypes from 'prop-types';

const DeleteButton = ({ recipeId, onDelete }) => {
  // Función que maneja el proceso de eliminación
  const handleDelete = () => {
    // Confirmar si el usuario realmente quiere eliminar la receta
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar esta receta?');
    if (confirmed) {
      // Obtener las recetas almacenadas en localStorage
      const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
      
      // Filtrar las recetas, excluyendo la receta que debe eliminarse
      const updatedRecipes = recipes.filter((recipe) => recipe.id !== recipeId);
      
      // Guardar la lista actualizada de recetas en localStorage
      localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
      
      // Llamar a la función de callback pasada como prop desde el componente padre
      onDelete();
    }
  };

  return (
    <button
      onClick={handleDelete} // Asigna la función de eliminación al botón
      className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors duration-200 focus:outline-none"
    >
      Eliminar Receta
    </button>
  );
};

DeleteButton.propTypes = {
  recipeId: PropTypes.string.isRequired, // ID de la receta es requerido para identificar qué receta eliminar
  onDelete: PropTypes.func.isRequired,   // Callback que se ejecuta cuando la receta es eliminada
};

export default DeleteButton;
