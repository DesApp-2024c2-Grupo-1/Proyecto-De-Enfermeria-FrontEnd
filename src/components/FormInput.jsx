import React from 'react';
import '../index.css'

const FormInput = ({ type, placeholder, value, onChange, className }) => {
  return (
      <div>
        <input 
          type={type} 
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={className}
        />
      </div>
  );
};

export default FormInput;