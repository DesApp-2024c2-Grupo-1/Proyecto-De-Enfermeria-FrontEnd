import React from 'react';
import { Stack, Box } from '@mui/material';
import FormInput from './FormInput';
import RegisterButton from './ButtonRegister';


export const FormRegistro = () => {
  const handleRegisterClick = () => {
    console.log("Formulario enviado!");
  };


  return (
    <Box className='form-container'
    component="form"
    oValidate
    autoComplete="off">
      <Stack direction="row" spacing={5} mt={2}>
        <FormInput
          label="Nombre"
          type="text"
          name="nombre"
          placeholder="Ingresa tu nombre"
          icon="user"
        />
        <FormInput
          label="Apellido"
          type="text"
          name="apellido"
          placeholder="Ingresa tu apellido"
          icon="user"
        />
      </Stack>


      <Stack direction="row" spacing={5} mt={2}>
        <FormInput
          label="DNI"
          type="text"
          name="dni"
          placeholder="Ingresa tu DNI"
          icon="address-card"
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          placeholder="Ingresa tu email"
          icon="envelope"
        />
      </Stack>


      <Stack direction="row" spacing={5} mt={2}>
        <FormInput
          label="Contraseña"
          type="password"
          name="password"
          placeholder="Ingresa tu contraseña"
          icon="lock"
        />
        <FormInput
          label="Confirmar Contraseña"
          type="password"
          name="confirm_password"
          placeholder="Confirmar contraseña"
          icon="lock"
        />
      </Stack>


      <Stack mt={3} direction="row" justifyContent="center">
        <RegisterButton
          text="Registrarse"
          onClick={handleRegisterClick}
        />
      </Stack>
    </Box>
  );
};
