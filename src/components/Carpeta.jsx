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
    <Card
      sx={{
        backgroundColor: "#E8F5E9",
        borderRadius: "16px",
        boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            height: "8px",
            background: "linear-gradient(90deg, #1A3D2D, #388E3C)",
            borderRadius: "16px",
            marginBottom: "8px",
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {edicion === "true" && <EditButton id={id} />}
        </Box>
        <Box sx={{ maxHeight: "6rem", minHeight: "6rem", overflow: "hidden" }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#1A3D2D" }}>
            {titulo}
          </Typography>
          <Typography variant="body2" sx={{ color: "#607D8B", mt: 0.5 }}>
            Versión{" "}
            {evaluacion && evaluacion.version ? evaluacion.version : "no encontrada."}
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
