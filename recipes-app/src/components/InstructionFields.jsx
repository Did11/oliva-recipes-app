import PropTypes from 'prop-types';

const InstructionFields = ({ instructions, onInstructionChange, onAddInstruction }) => (
  <div>
    <label>Instrucciones:</label>
    {instructions.map((instruction, index) => (
      <div key={index} className="instruction-field">
        <input
          type="text"
          value={instruction}
          onChange={(e) => onInstructionChange(index, e.target.value)}
        />
      </div>
    ))}
    <button type="button" onClick={onAddInstruction}>
      Añadir Instrucción
    </button>
  </div>
);

InstructionFields.propTypes = {
  instructions: PropTypes.arrayOf(PropTypes.string).isRequired,
  onInstructionChange: PropTypes.func.isRequired,
  onAddInstruction: PropTypes.func.isRequired,
};

export default InstructionFields;
