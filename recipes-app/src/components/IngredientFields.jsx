import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const IngredientFields = ({ initialIngredients, onIngredientsChange }) => {
  const [ingredients, setIngredients] = useState(initialIngredients);

  useEffect(() => {
    setIngredients(initialIngredients); // Sincroniza el estado interno con las nuevas props
  }, [initialIngredients]);

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
    onIngredientsChange(updatedIngredients);
  };

  const addIngredientField = () => {
    const updatedIngredients = [
      ...ingredients,
      { name: '', quantity: '', unit: 'unidad' },
    ];
    setIngredients(updatedIngredients);
    onIngredientsChange(updatedIngredients);
  };

  const removeIngredientField = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
    onIngredientsChange(updatedIngredients);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Ingredientes:</label>
      {ingredients.map((ingredient, index) => (
        <div key={index} className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Cantidad"
            value={ingredient.quantity}
            onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
            className="w-24 px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 sm:text-sm"
          />
          <select
            value={ingredient.unit}
            onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
            className="w-24 px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 sm:text-sm"
          >
            {['unidad', 'gramo', 'kilo', 'centímetro cúbico', 'litro', 'taza', 'cucharada'].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Nombre del ingrediente"
            value={ingredient.name}
            onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
            className="flex-1 px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 sm:text-sm"
          />
          <button
            type="button"
            onClick={() => removeIngredientField(index)}
            className="px-3 py-1 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Eliminar
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addIngredientField}
        className="w-full mt-2 text-sm text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Añadir Ingrediente
      </button>
    </div>
  );
};

IngredientFields.propTypes = {
  initialIngredients: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      quantity: PropTypes.string,
      unit: PropTypes.string,
    })
  ),
  onIngredientsChange: PropTypes.func.isRequired,
};

IngredientFields.defaultProps = {
  initialIngredients: [{ name: '', quantity: '', unit: 'unidad' }],
};

export default IngredientFields;
