import React from 'react';
import '../index.css'; // Importa los estilos desde un archivo CSS

export const PruebaPagina = () => {
  const fields = [
    { label: 'Nombre', left: 120, top: 215 },
    { label: 'Apellido', left: 545, top: 215 },
    { label: 'DNI', left: 120, top: 318 },
    { label: 'Email', left: 545, top: 318 },
    { label: 'Contraseña', left: 120, top: 421 },
    { label: 'Confirmar contraseña', left: 545, top: 421 },
  ];

  return (
    <div className="form-container">
      <div className="background"></div>

      {fields.map((field, index) => (
        <div key={index} className="input-field" style={{ left: field.left, top: field.top }}>
          <div className="input-background"></div>
          <div className="input-label">{field.label}</div>
          <div className="input-icon"></div>
        </div>
      ))}

      <div className="circle">
        <div className="inner-circle"></div>
      </div>

      <div className="submit-button">Registrarse</div>
    </div>
  );
};