import React from 'react';

const RegisterButton = ({ text, onClick }) => {
  return (
    <button type="button" className="register-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default RegisterButton;