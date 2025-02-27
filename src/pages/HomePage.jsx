import { Grid } from "@mui/material";
import Carpeta from "../components/Carpeta";
import CarpetaFake from "../components/CarpetaFake";
import { useEffect, useState } from "react";
import { getAllEvaluaciones } from "../services/EvaluacionService";
import { useDocente } from "../context/DocenteContext";

export function HomePage() {
  const [carpetas, setCarpetas] = useState([]);
  const { docenteContext } = useDocente();
  const fetchCarpetas = async () => {
    const data = await getAllEvaluaciones();
    setCarpetas(data);
  };

  useEffect(() => {
    fetchCarpetas();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>
        ¡Bienvenido/a, {docenteContext.nombre} {docenteContext.apellido}!
      </h1>
   
        <Grid container spacing={10} sx={{ padding: "20px" }}>
          <Grid item xs={12} sm={6} md={4}>
            <CarpetaFake />
          </Grid>
          {carpetas.map((evaluacion, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Carpeta titulo={evaluacion.titulo} id={evaluacion.id} />
            </Grid>
          ))}
        </Grid>
   
    </div>
  );
}
