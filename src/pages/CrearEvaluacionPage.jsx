import React, { useState } from "react";
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

export function CrearEvaluacionPage() {
  const [criterios, setCriterios] = useState([]);
  const [nuevoCriterio, setNuevoCriterio] = useState("");
  const [puntaje, setNuevoPuntaje] = useState("");
  const [tituloEvaluacion, setTituloEvaluacion] = useState("");
  const [exigencia, setExigencia] = useState("");
  const docente = 1
  const evaluacionData = {tituloEvaluacion, exigencia, docente, criterios}

  const agregarCriterio = () => {
    if (nuevoCriterio) {
      setCriterios([
        ...criterios,
        { pregunta: nuevoCriterio, puntaje: puntaje },
      ]);
      setNuevoCriterio("");
      setNuevoPuntaje("");
    }
  };

  const eliminarCriterio = (indice) => {
    setCriterios(criterios.filter((_, i) => i !== indice));
  };

  const manejarEnvio = () => { postEvaluacionYPreguntas(evaluacionData) 
    
  }
  
  /*

  const manejarEnvio = () => {
    console.log("guarde la evaluacion loco!!!!!", {
      tituloEvaluacion,
      exigencia,
      criterios,
    });
  };

  */


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
          <TextField
            fullWidth
            label="Título de evaluación"
            value={tituloEvaluacion}
            onChange={(e) => setTituloEvaluacion(e.target.value)}
            margin="normal"
            sx={{ marginBottom: 2, backgroundColor: '#BBE2D0'}}
          />
          <TextField
            fullWidth
            label="Exigencia (%)"
            value={exigencia}
            onChange={(e) => setExigencia(e.target.value)}
            margin="normal"
            sx={{ marginBottom: 3, backgroundColor: '#BBE2D0' }}
          />
          <p style={{ marginBottom: 1, fontSize: "17px", fontWeight: "bold" }}>Criterio de Evaluación</p>      
          <List sx={{ marginBottom: 3 }}>
            {criterios.map((criterio, indice) => (
              <ListItem
                key={indice}
                secondaryAction={
                  <Button text="Borrar" onClick={() => eliminarCriterio(indice)} className="botonClaro"/>
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
              sx={{backgroundColor: '#BBE2D0'}}
            />
            <TextField
              label="Puntaje"
              value={puntaje}
              onChange={(e) => setNuevoPuntaje(e.target.value)}
              sx={{ width: 132, marginLeft: '20px', backgroundColor: '#BBE2D0'}}
              inputProps={{ min: 2 }}
            />
            <Button text="Añadir" onClick={agregarCriterio} className="botonClaro" style={{ marginLeft: '20px'}}/>
          </Box>
        </Paper>
        <Button text="Guardar" onClick={manejarEnvio} className="botonClaro" style={{ marginTop: '20px' }}/>
      </Box>
    </Box>
  );
}
