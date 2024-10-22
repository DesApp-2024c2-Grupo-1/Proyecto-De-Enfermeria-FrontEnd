export function Input({ disabled, placeholder, texto, titulo }) {
  return (
    <div>
      <h2>{titulo}</h2>
      <input
        type="text"
        placeholder={placeholder}
        disabled={disabled}
        className="input"
      >
        {texto}
      </input>
    </div>
  );
}
