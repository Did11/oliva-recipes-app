import PropTypes from 'prop-types';

const DeleteButton = ({ recipeId, onDelete }) => {
  const handleDelete = () => {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar esta receta?');
    if (confirmed) {
      const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
      const updatedRecipes = recipes.filter((recipe) => recipe.id !== recipeId);
      localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
      onDelete(); // Ejecuta la función de callback pasada desde el padre
    }
  };

  return (
    <button onClick={handleDelete}>
      Eliminar Receta
    </button>
  );
};

DeleteButton.propTypes = {
  recipeId: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteButton;
