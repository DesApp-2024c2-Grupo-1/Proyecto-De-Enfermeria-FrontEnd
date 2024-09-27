import React from 'react';
import '../index.css'

const FormInput = ({ label, type, name, placeholder, icon }) => {
  return (
    <div className="form-input">
      <label htmlFor={name}>{label}</label>
      <div className="input-container">
        <i className={`fa fa-${icon}`} style={{ marginRight: '8px' }}></i> {/* Icono */}
        <input 
          type={type} 
          name={name} 
          placeholder={placeholder} 
        />
      </div>
    </div>
  );
};


export default FormInput;
