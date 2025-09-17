import React from "react";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NoAutorizado = () => {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate("/");
  };


React.useEffect(() => {
  document.body.style.overflow = 'hidden'
  return () => {
    document.body.style.overflow = 'unset'
  };
}, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#424242", // Gris oscuro
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        
      }}
    >
      <Container
        component="main"
        maxWidth="sm"
      >
        <Paper
          elevation={8}
          sx={{
            padding: 4,
            textAlign: "center",
            backgroundColor: "#f5f5f5", // Gris claro
            borderRadius: 2,
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.3)",
            marginBottom: 25
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            sx={{
              color: "#424242",
              fontWeight: "bold",
              marginBottom: 3,
            }}
          >
            NO AUTORIZADO
          </Typography>
          
          <Typography 
            variant="body1" 
            paragraph
            sx={{
              color: "#424242",
              marginBottom: 2,
              fontSize: "1.1rem",
            }}
          >
            Tu sesión expiró, o no tenés permisos para ver esta página.
          </Typography>

          <Typography 
            variant="body2" 
            paragraph
            sx={{
              color: "#616161",
              marginBottom: 4,
            }}
          >
            Si estás autenticado correctamente y deberías tener permiso para ver esta pantalla, por favor, contacta a un administrador.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={handleGoToLogin}
            size="large"
            sx={{
              backgroundColor: "#424242",
              color: "white",
              padding: "12px 24px",
              fontSize: "1rem",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#616161",
              },
            }}
          >
            Inicio de Sesión
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default NoAutorizado;