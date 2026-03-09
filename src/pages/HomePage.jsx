import { Grid, Stack, Box, Typography, Chip } from "@mui/material";
import Carpeta from "../components/Carpeta";
import CarpetaFake from "../components/CarpetaFake";
import Busqueda from "../components/Busqueda";
import IrArribaBoton from "../components/irArribaBoton";
import { useEffect, useState } from "react";
import { getAllEvaluaciones } from "../services/EvaluacionService";
import { useDocente } from "../context/DocenteContext";
import { autenticacion } from "../components/HandlerNecesidadAuth";

const HomePage = () => {
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
      <IrArribaBoton />

      {/* Header */}
      <Box
        sx={{
          px: { xs: 3, sm: 6 },
          pt: { xs: 4, sm: 5 },
          pb: { xs: 3, sm: 4 },
          borderBottom: "1px solid #e8f1ec",
        }}
      >
        <Typography
          variant="overline"
          sx={{ color: "#5a9e7c", fontWeight: 600, letterSpacing: "0.12em" }}
        >
          Panel principal
        </Typography>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "#1A3D2D", mt: 0.5, lineHeight: 1.2 }}
        >
          ¡Bienvenido/a,{" "}
          <Box component="span" sx={{ color: "#3a8f64" }}>
            {docenteContext.nombre} {docenteContext.apellido}!
          </Box>
        </Typography>
      </Box>

      {/* Barra de búsqueda + conteo */}
      <Box
        sx={{
          px: { xs: 3, sm: 6 },
          pt: 4,
          pb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#1A3D2D" }}>
            Modelos de evaluación
          </Typography>
          <Chip
            label={carpetas.length}
            size="small"
            sx={{
              backgroundColor: "#d7f0dc",
              color: "#1A3D2D",
              fontWeight: 700,
              height: "22px",
            }}
          />
        </Stack>
        <Busqueda
          placeholder="Buscar por título..."
          width={"280px"}
          height={"46px"}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        />
      </Box>

      {/* Grid de carpetas */}
      <Box sx={{ px: { xs: 3, sm: 6 }, pb: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CarpetaFake carpetas={carpetas} />
          </Grid>
          {listaFiltrada.map((evaluacion, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Carpeta
                edicion="true"
                titulo={evaluacion.titulo}
                id={evaluacion.id}
              />
            </Grid>
          ))}
        </Grid>

        {listaFiltrada.length === 0 && searchTerm && (
          <Box
            sx={{
              mt: 8,
              textAlign: "center",
              color: "#8ab09a",
            }}
          >
            <i
              className="fa fa-search"
              style={{ fontSize: "2.5rem", marginBottom: "1rem", display: "block" }}
            />
            <Typography sx={{ fontWeight: 500 }}>
              No se encontraron evaluaciones para "{searchTerm}"
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
};

export default autenticacion(HomePage);