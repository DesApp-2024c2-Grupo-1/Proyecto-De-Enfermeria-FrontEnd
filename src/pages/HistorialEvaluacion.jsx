import { useParams } from "react-router-dom";
import {
  Button,
  Stack,
  TextField,
  Grid,
  Pagination,
  useMediaQuery,
  createTheme
} from "@mui/material";
import ListHeader from "../components/Header";
import Lista from "../components/Lista";
import Carpeta from "../components/Carpeta";
import Busqueda from "../components/Busqueda";
import IrArribaBoton from "../components/irArribaBoton";
import { useEffect, useState } from "react";
import { getAllVersionesDeUnModelo } from "../services/EvaluacionService";
import { useNavigate } from "react-router-dom";

export function HistorialEvaluacion() {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [evaluaciones, setEvaluaciones] = useState([]);
  const keys = ["titulo", "version"];
  const navigate = useNavigate();
  const theme = createTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 8;

  const listaFiltrada = evaluaciones.filter((evaluacion) =>
    evaluacion.version.toString().toLowerCase().includes(searchTerm)
  );

  const listaAMostrar = evaluaciones;
  const paginasTotales = Math.ceil(listaAMostrar.length / itemsPorPagina);
  const evaluacionesPaginadas = listaAMostrar.slice(
    (paginaActual - 1) * itemsPorPagina,
    paginaActual * itemsPorPagina
  );

  const textosHeader = [
    { key: "titulo", value: "Titulo" },
    { key: "version", value: "Version" },
    ,
  ];

  const handleNavigate = (idEval) => {
    navigate(`/evaluacionDeshabilitada/${idEval}`);
    /* navigate("/evaluacionDeshabilitada");*/
  };

  const fetchEvaluaciones = async () => {
    const data = await getAllVersionesDeUnModelo(id);
    setEvaluaciones(data);
    console.log(data);
  };

  useEffect(() => {
    fetchEvaluaciones();
  }, []);

  const handleCambioPagina = (event, value) => {
    setPaginaActual(value);
  };

  return (
    <>
      <h1>Historial de Evaluaciones</h1>
      <IrArribaBoton />

      <Stack sx={{ display: "flex", alignItems: "center" }}>
        <Busqueda
          placeholder="Buscar versión..."
          width={"350px"}
          height={"50px"}
          margin={"0 0 60px 0"}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        />
        <Stack
          sx={{
            width: xs ? "75%" : "60%"
          }}
        >
          <ListHeader key={keys} textos={textosHeader} />
          <Lista
            lista={evaluacionesPaginadas}
            keys={keys}
            buttonOnClick={handleNavigate}
            paramOnClick="id"
          />
          {listaAMostrar.length > itemsPorPagina && (
            <Stack mt={2} alignItems="center">
              <Pagination
                count={paginasTotales}
                page={paginaActual}
                onChange={handleCambioPagina}
              />
            </Stack>
          )}
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
