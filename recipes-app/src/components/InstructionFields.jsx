import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const InstructionFields = ({ initialInstructions, onInstructionsChange }) => {
  // Estado local para manejar las instrucciones
  const [instructions, setInstructions] = useState(initialInstructions);

  useEffect(() => {
    // Sincroniza el estado con las instrucciones iniciales cuando cambian
    setInstructions(initialInstructions);
  }, [initialInstructions]);

  // Manejar el cambio en una instrucción
  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...instructions];
    updatedInstructions[index] = value;
    setInstructions(updatedInstructions);
    onInstructionsChange(updatedInstructions); // Informar cambios al componente padre
  };

  // Añadir un nuevo campo de instrucción vacío
  const addInstructionField = () => {
    const updatedInstructions = [...instructions, '']; // Nueva instrucción vacía
    setInstructions(updatedInstructions);
    onInstructionsChange(updatedInstructions);
  };

  // Eliminar un campo de instrucción por su índice
  const removeInstructionField = (index) => {
    const updatedInstructions = instructions.filter((_, i) => i !== index);
    setInstructions(updatedInstructions);
    onInstructionsChange(updatedInstructions);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Instrucciones:</label>
      {/* Renderizar los campos de instrucciones */}
      {instructions.map((instruction, index) => (
        <div key={index} className="flex items-center space-x-2">
          {/* Campo de texto para cada paso de la instrucción */}
          <textarea
            placeholder={`Paso ${index + 1}`}
            value={instruction}
            onChange={(e) => handleInstructionChange(index, e.target.value)}
            className="flex-1 px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-gray-50 sm:text-sm"
          />
          {/* Botón para eliminar una instrucción */}
          <button
            type="button"
            onClick={() => removeInstructionField(index)}
            className="px-3 py-1 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Eliminar
          </button>
        </div>
      ))}
      {/* Botón para añadir una nueva instrucción */}
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
  // Instrucciones iniciales pasadas como prop
  initialInstructions: PropTypes.arrayOf(PropTypes.string),
  // Función para manejar los cambios en las instrucciones
  onInstructionsChange: PropTypes.func.isRequired,
};

InstructionFields.defaultProps = {
  // Instrucción vacía por defecto
  initialInstructions: [''],
};

export default InstructionFields;
