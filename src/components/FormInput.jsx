import "../index.css";

const FormInput = ({
  type,
  placeholder,
  value,
  onChange,
  className,
  icono,
}) => {
  return (
  <div>
    <div className="recuadroInputs">
      <i className={`fa fa-${icono}`} style={{ marginRight: "8px" }}></i>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
      />
    </div>
    </div>
  );
};

export default FormInput;
