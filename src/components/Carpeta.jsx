import { Box, Typography, Paper, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useEvaluacion } from "../context/EvaluacionContext";
import { getEvaluacionById } from "../services/EvaluacionService";
import EditButton from "./EditButton";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

function Carpeta({ titulo, id, edicion }) {
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
    /*
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
            paddingBottom: edicion === "true" ? "2vh" : "4vh",
            width: "15rem",
            backgroundColor: "#daf2e3",
            position: "relative",
            borderRadius: "10px",
            boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.3)",
          }}
        >
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
              {edicion === "true" ? "Evaluar" : "Consultar"}
            </button>
            {edicion === "true" && <button
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
            </button> }
            {edicion === "true" && <EditButton id={id} />}
          </Stack>
        </Paper>

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
*/
    <Card
      sx={{
        maxWidth: "23rem",
        color: "#000",
        backgroundColor: "#daf2e3",
        borderRadius: "10px",
        boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.3)",
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        {edicion === "true" && <EditButton id={id} />}
        </Box>
        <Box sx={{ maxHeight: "6rem", minHeight: "6rem", overflow: "hidden" }}>
          <Typography
            sx={{
              fontSize: "1.3rem",
              margin: "10px 0 0 0",
              width: "15rem",
              textAlign: "left",
            }}
          >
            {titulo}
          </Typography>

          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            Versión{" "}
            {evaluacion && evaluacion.version ? evaluacion.version : "1"}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          sx={{
            color: "#1A3D2D",
            borderRadius: "10px",
            borderColor: "#1A3D2D",
            "&:hover": {
              backgroundColor: "#daf2e3",
              color: "#1A3D2D",
              borderColor: "#daf2e3",
            },
            width: "100px",
          }}
          onClick={handleOnClick}
        >
          {edicion === "true" ? "Evaluar" : "Consultar"}
        </Button>
        <Button
          sx={{
            color: "#FFFFFF",
            backgroundColor: "#1A3D2D",
            borderColor: "#1A3D2D",
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: "#daf2e3",
              color: "#1A3D2D",
              borderColor: "#daf2e3",
            },
            width: "100px",
          }}
          onClick={() =>
            navigate(`/registroEvaluaciones/evaluaciones-realizadas/${id}`, {
              state: {
                evaluacionTitulo: evaluacion ? evaluacion.titulo : "",
                evaluacionId: id,
              },
            })
          }
          autoFocus
        >
          Ver
        </Button>
      </CardActions>
    </Card>
  );
}

export default Carpeta;
