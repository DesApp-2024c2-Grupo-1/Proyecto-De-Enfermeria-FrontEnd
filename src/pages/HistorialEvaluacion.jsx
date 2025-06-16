import { useParams } from "react-router-dom";
import { Button, Stack, TextField, Grid } from "@mui/material";

import Carpeta from "../components/Carpeta";
import Busqueda from "../components/Busqueda";
import IrArribaBoton from "../components/irArribaBoton";
import { useEffect, useState } from "react";
import { getAllVersionesDeUnModelo } from "../services/EvaluacionService";


export function HistorialEvaluacion() {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [carpetas, setCarpetas] = useState([]);
  const listaFiltrada = carpetas.filter((carpeta) =>
    carpeta.titulo.toLowerCase().includes(searchTerm)
  );


    const fetchCarpetas = async () => {
      const data = await getAllVersionesDeUnModelo(id);
      setCarpetas(data);
    };
  
    useEffect(() => {
      fetchCarpetas();
    }, []);

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
              <Carpeta edicion="false" titulo={evaluacion.titulo} id={evaluacion.id} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </>
  );
}
