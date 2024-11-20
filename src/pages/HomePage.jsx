import { Grid } from "@mui/material";
import Carpeta from "../components/Carpeta";
import { useEffect, useState } from "react";
import { getAllEvaluaciones } from "../services/EvaluacionService";

export function HomePage() {
  const [carpetas, setCarpetas] = useState([]) 
  const fetchCarpetas = async () => {
    const data = await getAllEvaluaciones()
    setCarpetas(data)
  };

  useEffect(() =>{
    fetchCarpetas()
  }, [])

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>¡Bienvenido/a, Carlos Perez!</h1>
      <div className="gridCarpetas">
      <Grid container spacing={10}>
        {carpetas.map((evaluacion, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Carpeta titulo={evaluacion.titulo} />
          </Grid>
        ))}
      </Grid>
      </div>
    </div>
  );
}
