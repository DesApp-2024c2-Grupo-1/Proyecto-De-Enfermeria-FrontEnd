import { useState } from "react";
import {
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
import { Input } from "../components/Input";

export function CrearEvaluacionPage() {
  const [preguntas, setPreguntas] = useState([]);
  const [nuevoCriterio, setNuevoCriterio] = useState("");
  const [puntaje, setNuevoPuntaje] = useState("");
  const [titulo, setTitulo] = useState("");
  //const [exigencia, setExigencia] = useState("");
  const navigate = useNavigate();
  const { docenteContext } = useDocente();

const evaluacionData = {titulo, /*exigencia,*/ docente: docenteContext.id, preguntas}

  const agregarCriterio = () => {
    if (nuevoCriterio) {
      setPreguntas([
        ...preguntas,
        { pregunta: nuevoCriterio, puntaje: Number(puntaje) },
      ]);
      setNuevoCriterio("");
      setNuevoPuntaje("");
    }
  };

  const eliminarCriterio = (indice) => {
    setPreguntas(preguntas.filter((_, i) => i !== indice));
  };

  const manejarEnvio = async () => {
    try {
      await postEvaluacionYPreguntas(evaluacionData);
      navigate("/crearEvaluacionExito");
    } catch (error) {
      console.error("Error al crear la evaluación:", error.response?.data || error.message);
    }
  };

  return (
    <Box>
  <h2 style={{ textAlign: "center", marginTop: "7vh" }}>Crear Evaluación</h2>
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
      <Input
        titulo="Título de Evaluación"
        placeholder="Título de evaluación"
        texto="titulo"
        width="100%"
        helperText=""
        helperTextColor="gray"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          marginTop: 2,
        }}
      >
        <Input
          titulo="Nueva Pregunta"
          placeholder="Nueva pregunta"
          texto="nuevaPregunta"
          width="85%"
          helperText=""
          helperTextColor="gray"
          value={nuevoCriterio}
          onChange={(e) => setNuevoCriterio(e.target.value)}
        />
        <Input
          titulo="Puntaje"
          placeholder="Puntaje"
          texto="puntaje"
          width="42.5%"
          helperText=""
          helperTextColor="gray"
          value={puntaje}
          onChange={(e) => setNuevoPuntaje(e.target.value)}
        />
        <Button
          text="Añadir"
          onClick={agregarCriterio}
          className="botonClaro"
          style={{ marginTop: "42px" }}
        />
      </Box>
    </Paper>
    <Button
      text="Guardar"
      onClick={manejarEnvio}
      className="botonClaro"
      style={{ marginTop: "20px" }}
    />
  </Box>
</Box>

  );
}

// 
