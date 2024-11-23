import {
  Box,
  Paper,
} from "@mui/material";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export function CrearEvaluacionExitoPage() {
  const navigate = useNavigate();

  return (
    <Box>
      <h2 style={{textAlign: 'center', marginTop: '7vh'}}>Crear Evaluación</h2>      
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{ width: "100%", maxWidth: 600, padding: 3, borderRadius: 7, backgroundColor: '#DDF0E7' }}
        >
        <h1>¡La evaluación fue registrada con éxito!</h1>
        <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 3,
          gap: 2
        }}
      >
        <Button
          text="Ir al inicio"
          onClick={() => navigate("/home")}
          className="botonClaro"
          style={{borderRadius: 10}}
        />
        <Button
          text="Crear otra"
          onClick={() => navigate("/crearEvaluacion")}
          className="botonClaro"
          style={{borderRadius: 10}}
        />
      </Box>
        </Paper>
      </Box>
    </Box>
  );
}