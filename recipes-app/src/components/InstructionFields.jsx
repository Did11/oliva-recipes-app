// InstructionFields.jsx
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
    <div>
      <label>Instrucciones:</label>
      {instructions.map((instruction, index) => (
        <div key={index} className="instruction-field">
          <textarea
            placeholder={`Paso ${index + 1}`}
            value={instruction}
            onChange={(e) => handleInstructionChange(index, e.target.value)}
          />
          <button type="button" onClick={() => removeInstructionField(index)}>
            Eliminar
          </button>
        </div>
      ))}
      <button type="button" onClick={addInstructionField}>
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
