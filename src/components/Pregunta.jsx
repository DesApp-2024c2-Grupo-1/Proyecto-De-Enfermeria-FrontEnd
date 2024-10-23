export function Pregunta({ pregunta, respuesta, disabled }) {
  return (
    <div className="pregunta">
      <p>{pregunta}</p>
      <input
        type="radio"
        id="si"
        name="respuesta"
        value="Si"
        disabled={disabled}
        checked={respuesta === false}
      />
      <label htmlFor="si"> Si </label>
      <input
        type="radio"
        id="no"
        name="respuesta"
        value="No"
        disabled={disabled}
        checked={respuesta === true}
      />
      <label htmlFor="no"> No </label>
    </div>
  );
}
