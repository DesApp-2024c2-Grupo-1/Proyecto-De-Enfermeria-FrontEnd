export function Pregunta({ pregunta, respuesta, disabled }) {
  return (
    <div className="pregunta">
      <p>{pregunta}</p>
      <div>
        <input
          type="radio"
          id={`si-${pregunta}`}
          name={`respuesta-${pregunta}`}
          value="Si"
          disabled={disabled}
          checked={respuesta === true}
        />
        <label htmlFor={`si-${pregunta}`}> Si </label>
      </div>
      <div>
        <input
          type="radio"
          id={`no-${pregunta}`}
          name={`respuesta-${pregunta}`}
          value="No"
          disabled={disabled}
          checked={respuesta === false}
        />
        <label htmlFor={`no-${pregunta}`}> No </label>
      </div>
    </div>
  );
}
