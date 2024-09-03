import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const InstructionFields = ({ initialInstructions, onInstructionsChange }) => {
  const [instructions, setInstructions] = useState(initialInstructions);

  useEffect(() => {
    setInstructions(initialInstructions); // Sincroniza el estado interno con las nuevas props
  }, [initialInstructions]);

  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...instructions];
    updatedInstructions[index] = value;
    setInstructions(updatedInstructions);
    onInstructionsChange(updatedInstructions);
  };

  const addInstructionField = () => {
    const updatedInstructions = [...instructions, ''];
    setInstructions(updatedInstructions);
    onInstructionsChange(updatedInstructions);
  };

  const removeInstructionField = (index) => {
    const updatedInstructions = instructions.filter((_, i) => i !== index);
    setInstructions(updatedInstructions);
    onInstructionsChange(updatedInstructions);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Instrucciones:</label>
      {instructions.map((instruction, index) => (
        <div key={index} className="flex items-center space-x-2">
          <textarea
            placeholder={`Paso ${index + 1}`}
            value={instruction}
            onChange={(e) => handleInstructionChange(index, e.target.value)}
            className="flex-1 px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-gray-50 sm:text-sm"
          />
          <button
            type="button"
            onClick={() => removeInstructionField(index)}
            className="px-3 py-1 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Eliminar
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addInstructionField}
        className="w-full mt-2 text-sm text-orange-600 bg-orange-200 rounded-md hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
      >
        Añadir Instrucción
      </button>
    </div>
  );
};

InstructionFields.propTypes = {
  initialInstructions: PropTypes.arrayOf(PropTypes.string),
  onInstructionsChange: PropTypes.func.isRequired,
};

InstructionFields.defaultProps = {
  initialInstructions: [''],
};

export default InstructionFields;
