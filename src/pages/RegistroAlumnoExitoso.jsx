import { useNavigate } from "react-router-dom";
import { Stack, Box, Button } from "@mui/material";

export function RegistroAlumnoExitoso() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/alumnos");
  };

  return (
    <>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
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
          <h1>¡Alumno registrado con éxito!</h1>
          <Stack direction="row">
            <Button
              variant="contained"
              onClick={handleRedirect}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                background: "#2E7D5D",
                color: "white",
                borderRadius: "10px",
                maxWidth: 150,
                minWidth: 150,
                marginRight: 1,
                px: 3,
                py: 1.2,
                "&:hover": {
                  background: "#275B43",
                },
              }}
            >
              Ir a Alumnos
            </Button>

            <Button
              variant="contained"
              onClick={() => navigate("/registerAlumnos")}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                background: "#2E7D5D",
                color: "white",
                borderRadius: "10px",
                maxWidth: 150,
                minWidth: 150,
                marginLeft: 1,
                px: 3,
                py: 1.2,
                "&:hover": {
                  background: "#275B43",
                },
              }}
            >
              Registrar otro
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
