import React from 'react';
import { Stack, Box } from '@mui/material';
import FormInput from '../components/FormInput';
import RegisterButton from '../components/ButtonRegister';

export const FormLogin = () => {
  const handleRegisterClick = () => {
    console.log("Formulario enviado!");
  };


  return (
    <Box className='form-container'
      component="form"
      oValidate
      autoComplete="off"
      maxWidth="20vw"
      justifyContent="center"
      alignContent="center">
        
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

      <Stack direction={{xs: "column", sm: "column"}} 
      spacing={{ xs: 1, sm: 3 }} 
      mt={{ xs: 1, sm: 2 }}
      paddingLeft="1vw">
        <FormInput
          label="Nombre"
          type="text"
          name="usuario"
          placeholder="Ingresa su usuario"
          icon="user"
        />
      </Stack>

      <Stack direction={{xs: "column", sm: "column"}} 
      spacing={{ xs: 1, sm: 3 }} 
      mt={{ xs: 1, sm: 2 }}
      paddingLeft="1vw">
        <FormInput
          label="Apellido"
          type="text"
          name="apellido"
          placeholder="Ingrese su contraseña"
          icon="lock"
        />
      </Stack>

      <Stack mt={3} direction="row" justifyContent="center">
        <RegisterButton
          text="Ingresar"
          onClick={handleRegisterClick}
        />
      </Stack>
    </Box>
  );
};