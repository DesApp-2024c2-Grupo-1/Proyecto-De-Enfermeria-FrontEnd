import { useParams } from "react-router-dom";
import { Button, Stack, TextField, Grid } from "@mui/material";

import Carpeta from "../components/Carpeta";
import Busqueda from "../components/Busqueda";
import IrArribaBoton from "../components/irArribaBoton";
import { useEffect, useState } from "react";


export function HistorialEvaluacion() {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [carpetas, setCarpetas] = useState([
    { id: 1, titulo: "Evaluación 1" },
    { id: 2, titulo: "Evaluación 2" },
    { id: 3, titulo: "Evaluación 3" },
    { id: 4, titulo: "Evaluación 4" },
    { id: 5, titulo: "Evaluación 5" },
    { id: 6, titulo: "Evaluación 6" },
    { id: 7, titulo: "Evaluación 7" },
    { id: 8, titulo: "Evaluación 8" },
    { id: 9, titulo: "Evaluación 9" },
    { id: 10, titulo: "Evaluación 10" },
  ]);
  const listaFiltrada = carpetas.filter((carpeta) =>
    carpeta.titulo.toLowerCase().includes(searchTerm)
  );

  return (
    <>
      <h1>Historial de Evaluaciones</h1>
      <IrArribaBoton />

      <Stack sx={{ display: "flex", alignItems: "center" }}>
        <Busqueda
          placeholder="Buscar por título..."
          width={"350px"}
          height={"100px"}
          margin={"0 0 60px 0"}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        />
        <Grid container spacing={10} sx={{ pb: "60px" }}>
          {listaFiltrada.map((evaluacion, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Carpeta titulo={evaluacion.titulo} id={evaluacion.id} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </>
  );
}
