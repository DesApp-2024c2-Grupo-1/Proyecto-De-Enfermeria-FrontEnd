import { useNavigate } from "react-router-dom";
import { Stack, Box } from "@mui/material";

export function RegistroDocenteExitoso() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Stack
          sx={{
            height: "400px",
            width: "600px",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.87)",
            borderRadius: "20px",
            boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.2)",
          }}
          spacing={2}
        >
          <Box
            sx={{
              width: "130px",
              height: "130px",
              backgroundColor: "#429870",
              borderRadius: "50%",
              zIndex: "1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.2)",
              color: "rgba(255, 255, 255, 0.87)",
            }}
          >
            <i className="fa fa-user" style={{ fontSize: "60px" }}></i>
          </Box>
          <h1>¡Te has registrado con éxito!</h1>
          <button className="botonClaro" onClick={handleRedirect}>
            Iniciar sesión
          </button>
        </Stack>
      </Stack>
    </>
  );
}
