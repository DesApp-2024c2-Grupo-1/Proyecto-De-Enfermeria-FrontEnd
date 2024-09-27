import React from 'react';
import FormInput from './FormInput';
import RegisterButton from './ButtonRegister';

export const FormRegister = () => {
  // Función que vamos a ejecutar al hacer click en el boton
  const handleRegisterClick = () => {
    console.log("Formulario enviado!");
    // Aca vamos a sumamos la logica del boton
  };

  return (
    <form className="register-form">
      <div className="form-row">
        <FormInput 
          label="Nombre" 
          type="text" 
          name="nombre" 
          placeholder="Ingresa tu nombre" 
        />
        <FormInput 
          label="Apellido" 
          type="text" 
          name="apellido" 
          placeholder="Ingrese tu apellido" 
        />
      </div>
      <div className="form-row">
        <FormInput 
          label="DNI" 
          type="text" 
          name="dni" 
          placeholder="Ingresa tu DNI" 
        />
        <FormInput 
          label="Email" 
          type="email" 
          name="email" 
          placeholder="Ingresa tu email" 
        />
      </div>
      <div className="form-row">
        <FormInput 
          label="Contraseña" 
          type="password" 
          name="password" 
          placeholder="Ingresa tu contraseña" 
        />
        <FormInput 
          label="Confirmar contraseña" 
          type="password" 
          name="confirm_password" 
          placeholder="Confirma tu contraseña" 
        />
      </div>
      <RegisterButton 
        text="Registrarse" 
        onClick={handleRegisterClick} 
      />
    </form>
  );
};