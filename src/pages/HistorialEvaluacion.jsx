import { useParams } from "react-router-dom";
import { Button, Stack, TextField, Grid, Pagination, useMediaQuery } from "@mui/material";
import ListHeader from "../components/Header";
import Lista from "../components/Lista";
import { createTheme } from "@mui/material/styles";
import Carpeta from "../components/Carpeta";
import Busqueda from "../components/Busqueda";
import IrArribaBoton from "../components/irArribaBoton";
import { useEffect, useState } from "react";
import { getAllVersionesDeUnModelo } from "../services/EvaluacionService";

export function HistorialEvaluacion() {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [carpetas, setCarpetas] = useState([]);
  const keys = ["titulo", "version", "fechaModificacion"];
    const theme = createTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));
  
  
  const listaFiltrada = carpetas.filter((carpeta) =>
    carpeta.titulo.toLowerCase().includes(searchTerm)
  );

  const textosHeader = [
    { key: "titulo", value: "Titulo" },
    { key: "version", value: "Version" },
    ,
  ];

    const handleNavigate = (id) => {
    navigate(`/perfilAlumno/${id}`, {
      state: {
        alumnoNombre: alumnos.find((alumno) => alumno.id === id).nombre,
        alumnoApellido: alumnos.find((alumno) => alumno.id === id).apellido,
      },
    });
  };


  const fetchCarpetas = async () => {
    const data = await getAllVersionesDeUnModelo(id);
    setCarpetas(data);
    console.log(data);
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
          height={"50px"}
          margin={"0 0 60px 0"}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        />
                <Stack
          sx={{
            width: xs ? "75%" : "70%",
          }}
        >
        <ListHeader key={keys} textos={textosHeader} />
        <Lista
          lista={listaFiltrada}
          keys={keys}
          buttonOnClick={handleNavigate}
          paramOnClick="id"
        />
        </Stack>
        {/*
        <Grid container spacing={10} sx={{ pb: "60px" }}>
          {listaFiltrada.map((evaluacion, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Carpeta edicion="false" titulo={evaluacion.titulo} id={evaluacion.id} />
            </Grid>
          ))}
        </Grid>
        */}
      </Stack>
    </>
  );
}
