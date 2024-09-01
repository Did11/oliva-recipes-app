import PropTypes from 'prop-types';

const IngredientFields = ({ ingredients, onIngredientChange, onAddIngredient }) => (
  <div>
    <label>Ingredientes:</label>
    {ingredients.map((ingredient, index) => (
      <div key={index} className="ingredient-field">
        <input
          type="text"
          placeholder="Nombre del ingrediente"
          value={ingredient.name}
          onChange={(e) => onIngredientChange(index, 'name', e.target.value)}
        />
        <input
          type="text"
          placeholder="Cantidad"
          value={ingredient.quantity}
          onChange={(e) => onIngredientChange(index, 'quantity', e.target.value)}
        />
        <select
          value={ingredient.unit}
          onChange={(e) => onIngredientChange(index, 'unit', e.target.value)}
        >
          <option value="">Unidad</option>
          <option value="Gramos">Gramos</option>
          <option value="Kilos">Kilos</option>
          <option value="Mililitros">Mililitros</option>
          <option value="Litros">Litros</option>
        </select>
      </div>
    ))}
    <button type="button" onClick={onAddIngredient}>
      Añadir Ingrediente
    </button>
  </div>
);

IngredientFields.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      quantity: PropTypes.string,
      unit: PropTypes.string,
    })
  ).isRequired,
  onIngredientChange: PropTypes.func.isRequired,
  onAddIngredient: PropTypes.func.isRequired,
};

export default IngredientFields;
