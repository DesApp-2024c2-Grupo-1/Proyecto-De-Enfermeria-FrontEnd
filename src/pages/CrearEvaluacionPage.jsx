import { useState } from "react";
import {
  TextField,
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import Button from "../components/Button";
import { postEvaluacionYPreguntas } from "../services/EvaluacionService";
import { useDocente } from "../context/DocenteContext";
import { useNavigate } from 'react-router-dom';

export function CrearEvaluacionPage() {
  const [preguntas, setPreguntas] = useState([]);
  const [nuevoCriterio, setNuevoCriterio] = useState("");
  const [puntaje, setNuevoPuntaje] = useState("");
  const [titulo, setTitulo] = useState("");
  const [exigencia, setExigencia] = useState("");
  const navigate = useNavigate();
  const { docenteContext } = useDocente();

  const evaluacionData = {titulo, exigencia, docente: docenteContext.id, preguntas}

  const agregarCriterio = () => {
    if (nuevoCriterio) {
      setPreguntas([
        ...preguntas,
        { pregunta: nuevoCriterio, puntaje: puntaje },
      ]);
      setNuevoCriterio("");
      setNuevoPuntaje("");
    }
  };

  const eliminarCriterio = (indice) => {
    setPreguntas(preguntas.filter((_, i) => i !== indice));
  };

  const manejarEnvio = () => {
    postEvaluacionYPreguntas(evaluacionData);
    navigate("/crearEvaluacionExito");
  };

  return (
    <Box>
      <h2 style={{ textAlign: "center", marginTop: "7vh" }}>
        Crear Evaluación
      </h2>
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
          sx={{
            width: "100%",
            maxWidth: 600,
            padding: 3,
            borderRadius: 7,
            backgroundColor: "#DDF0E7",
          }}
        >
          <TextField
            fullWidth
            label="Título de evaluación"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            margin="normal"
            sx={{ marginBottom: 2, backgroundColor: "#BBE2D0" }}
          />

          <p style={{ marginBottom: 1, fontSize: "17px", fontWeight: "bold" }}>
            Criterio de Evaluación
          </p>
          <List sx={{ marginBottom: 3 }}>
            {preguntas.map((criterio, indice) => (
              <ListItem
                key={indice}
                secondaryAction={
                  <Button
                    text="Borrar"
                    onClick={() => eliminarCriterio(indice)}
                    className="botonClaro"
                  />
                }
              >
                <ListItemText
                  primary={criterio.pregunta}
                  secondary={`Puntaje: ${criterio.puntaje}`}
                />
              </ListItem>
            ))}
          </List>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              fullWidth
              label="Nueva pregunta"
              value={nuevoCriterio}
              onChange={(e) => setNuevoCriterio(e.target.value)}
              sx={{ backgroundColor: "#BBE2D0" }}
            />
            <TextField
              label="Puntaje"
              value={puntaje}
              onChange={(e) => setNuevoPuntaje(e.target.value)}
              sx={{
                width: 132,
                marginLeft: "20px",
                backgroundColor: "#BBE2D0",
              }}
              inputProps={{ min: 2 }}
            />
            <Button
              text="Añadir"
              onClick={agregarCriterio}
              className="botonClaro"
              style={{ marginLeft: "20px"}}
            />
          </Box>
        </Paper>
        <Button
          text="Guardar"
          onClick={manejarEnvio}
          className="botonClaro"
          style={{ marginTop: "20px"}}
        />
      </Box>
    </Box>
  );
}