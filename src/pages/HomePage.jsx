import { Grid, Stack } from "@mui/material";
import Carpeta from "../components/Carpeta";
import CarpetaFake from "../components/CarpetaFake";
import Busqueda from "../components/Busqueda";
import { useEffect, useState } from "react";
import { getAllEvaluaciones } from "../services/EvaluacionService";
import { useDocente } from "../context/DocenteContext";

export function HomePage() {
  const [carpetas, setCarpetas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { docenteContext } = useDocente();

  const listaFiltrada = carpetas.filter((carpeta) =>
    carpeta.titulo.toLowerCase().includes(searchTerm)
  );
  const fetchCarpetas = async () => {
    const data = await getAllEvaluaciones();
    setCarpetas(data);
  };

  useEffect(() => {
    fetchCarpetas();
  }, []);

  return (
    <>
      <h1>
        ¡Bienvenido/a, {docenteContext.nombre} {docenteContext.apellido}!
      </h1>
      <Stack sx={{ display: "flex", alignItems: "center" }}>
        <Busqueda
          placeholder="Buscar por título..."
          width={"350px"}
          height={"100px"}
          margin={"0 0 60px 0"}
          onChange={(e) => setSearchTerm((e.target.value).toLowerCase())}
        />
        <Grid container spacing={10} sx={{ pb: "60px" }}>
          <Grid item xs={12} sm={6} md={4} >
            <CarpetaFake />
          </Grid>
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
