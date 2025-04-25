import { Box, Typography, Paper, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useEvaluacion } from "../context/EvaluacionContext";
import { getEvaluacionById } from "../services/EvaluacionService";
import EditButton from "./EditButton";

function Carpeta({ titulo, id }) {
  const { setEvaluacionContext } = useEvaluacion();
  const navigate = useNavigate();
  const [evaluacion, setEvaluacion] = useState();

  const fetchEvaluacion = async (id) => {
    const data = await getEvaluacionById(id);
    setEvaluacion(data);
  };

  useEffect(() => {
    fetchEvaluacion(id);
  }, [id]);

  const handleOnClick = async () => {
    if (evaluacion) {
      setEvaluacionContext(evaluacion);
      navigate(`/registrarEvaluacion/${id}`);
    }
  };

  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        gap: 1,
      }}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          sx={{
            paddingTop: "4vh",
            paddingBottom: "2vh",
            width: "15rem",
            backgroundColor: "#daf2e3",
            position: "relative",
            borderRadius: "5px",
            boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.3)",
          }}
        >
          {/* CarpetaPestaña */}
          <Box
            sx={{
              width: "80px",
              height: "20px",
              backgroundColor: "#daf2e3",
              position: "absolute",
              top: "-15px",
              borderBottom: "none",
              borderRadius: "5px 5px 0 0",
            }}
          />
          {/* Contenedor de botones */}
          <Stack
            sx={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              gap: "10px",
  
            }}
          >
            <button
              className="botonClaro"
              onClick={handleOnClick}
              style={{ borderRadius: 5 }}
            >
              Evaluar
            </button>
            <button
              className="botonClaro"
              onClick={() =>
                navigate(
                  `/registroEvaluaciones/evaluaciones-realizadas/${id}`,
                  {
                    state: {
                      evaluacionTitulo: evaluacion ? evaluacion.titulo : "",
                      evaluacionId: id,
                    },
                  }
                )
              }
              style={{ borderRadius: 5 }}
            >
              Ver
            </button>
            <EditButton id={id} />
          </Stack>
        </Paper>

        {/* Título */}
        <Typography
          sx={{
            fontSize: "1.3rem",

            margin: "10px 0 0 0",
            textAlign: "center",
            width: "15rem",
          }}
        >
          {titulo}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default Carpeta;

/*


*/
