import React from 'react';

const FormInput = ({ label, type, name, placeholder, icon }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="input-icon">
        <i className={`icon-${icon}`} />
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required
          icon={icon}
        />
      </div>
    </div>
  );
};

export default FormInput;