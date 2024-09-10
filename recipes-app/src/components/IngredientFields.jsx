import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const IngredientFields = ({ initialIngredients, onIngredientsChange }) => {
  // Estado local para manejar los ingredientes
  const [ingredients, setIngredients] = useState(initialIngredients);

  useEffect(() => {
    // Sincroniza el estado con las props iniciales cuando cambien
    setIngredients(initialIngredients);
  }, [initialIngredients]);

  // Manejar el cambio de un ingrediente (nombre, cantidad, unidad)
  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
    onIngredientsChange(updatedIngredients); // Informar cambios al componente padre
  };

  // Añadir un nuevo campo de ingrediente vacío
  const addIngredientField = () => {
    const updatedIngredients = [
      ...ingredients,
      { name: '', quantity: '', unit: 'unidad' }, // Valores por defecto
    ];
    setIngredients(updatedIngredients);
    onIngredientsChange(updatedIngredients);
  };

  // Eliminar un campo de ingrediente por su índice
  const removeIngredientField = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
    onIngredientsChange(updatedIngredients);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Ingredientes:</label>
      {/* Renderizar los campos de ingredientes */}
      {ingredients.map((ingredient, index) => (
        <div key={index} className="flex items-center space-x-2">
          {/* Campo de cantidad */}
          <input
            type="text"
            placeholder="Cantidad"
            value={ingredient.quantity}
            onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
            className="w-24 px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-gray-50 sm:text-sm"
          />
          {/* Selector de unidad */}
          <select
            value={ingredient.unit}
            onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
            className="w-24 px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-gray-50 sm:text-sm"
          >
            {/* Opciones de unidades */}
            {['unidad', 'gramo', 'kilo', 'centímetro cúbico', 'litro', 'taza', 'cucharada'].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {/* Campo de nombre del ingrediente */}
          <input
            type="text"
            placeholder="Nombre del ingrediente"
            value={ingredient.name}
            onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
            className="flex-1 px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-gray-50 sm:text-sm"
          />
          {/* Botón para eliminar un ingrediente */}
          <button
            type="button"
            onClick={() => removeIngredientField(index)}
            className="px-3 py-1 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Eliminar
          </button>
        </div>
      ))}
      {/* Botón para añadir un nuevo ingrediente */}
      <button
        type="button"
        onClick={addIngredientField}
        className="w-full mt-2 text-sm text-orange-600 bg-orange-200 rounded-md hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
      >
        Añadir Ingrediente
      </button>
    </div>
  );
};

IngredientFields.propTypes = {
  // Ingredientes iniciales que se pasan como prop
  initialIngredients: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      quantity: PropTypes.string,
      unit: PropTypes.string,
    })
  ),
  // Función para manejar los cambios en los ingredientes
  onIngredientsChange: PropTypes.func.isRequired,
};

IngredientFields.defaultProps = {
  // Ingrediente vacío por defecto
  initialIngredients: [{ name: '', quantity: '', unit: 'unidad' }],
};

export default IngredientFields;
