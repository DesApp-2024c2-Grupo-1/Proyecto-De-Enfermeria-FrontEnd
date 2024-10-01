import React from 'react';
import { Stack, Box } from '@mui/material';
import FormInput from '../components/FormInput';
import RegisterButton from '../components/ButtonRegister';

export const FormRegistro = () => {
  const handleRegisterClick = () => {
    console.log("Formulario enviado!");
  };


  return (
    <Box className='form-container'
      component="form"
      oValidate
      autoComplete="off"
      maxWidth="30vw">
        
      <i
        className="fas fa-user-circle"
        style={{
          position: 'absolute',
          top: '15px',
          left: '51%',
          transform: 'translateX(-50%)',
          fontSize: '80px',
          color: '#429870',
          backgroundColor: 'white',
          borderRadius: '50%'  
        }}
      ></i>

      <Stack direction={{xs: "column", sm: "row"}} 
      spacing={{ xs: 1, sm: 2 }} 
      mt={{ xs: 1, sm: 2 }}>
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


      <Stack direction={{xs: "column", sm: "row"}} 
      spacing={{ xs: 1, sm: 2 }}
      mt={{ xs: 1, sm: 2 }}>
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


      <Stack direction={{xs: "column", sm: "row"}} 
      spacing={{ xs: 1, sm: 2 }}
      mt={{ xs: 1, sm: 2 }}>
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