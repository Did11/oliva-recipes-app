// IngredientFields.jsx
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
    <div>
      <label>Ingredientes:</label>
      {ingredients.map((ingredient, index) => (
        <div key={index} className="ingredient-field">
          <input
            type="text"
            placeholder="Cantidad"
            value={ingredient.quantity}
            onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
          />
          <select
            value={ingredient.unit}
            onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
          >
            {['unidad', 'gramo', 'litro', 'taza', 'cucharada', 'cucharadita'].map((option) => (
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
          />
          <button type="button" onClick={() => removeIngredientField(index)}>
            Eliminar
          </button>
        </div>
      ))}
      <button type="button" onClick={addIngredientField}>
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
