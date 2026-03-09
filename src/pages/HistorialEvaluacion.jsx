import { useParams, useNavigate } from "react-router-dom";
import {
  Stack,
  Pagination,
  useMediaQuery,
  Box,
  Typography,
  Chip,
} from "@mui/material";
import ListHeader from "../components/Header";
import Lista from "../components/Lista";
import Busqueda from "../components/Busqueda";
import IrArribaBoton from "../components/irArribaBoton";
import { useEffect, useState } from "react";
import { getAllVersionesDeUnModelo } from "../services/EvaluacionService";

export function HistorialEvaluacion() {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [evaluaciones, setEvaluaciones] = useState([]);
  const keys = ["titulo", "version"];
  const navigate = useNavigate();
  const xs = useMediaQuery("(max-width:600px)");
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 8;

  const textosHeader = [
    { key: "titulo", value: "Título" },
    { key: "version", value: "Versión" },
  ];

  useEffect(() => {
    const fetchEvaluaciones = async () => {
      const data = await getAllVersionesDeUnModelo(id);
      setEvaluaciones(data);
    };
    fetchEvaluaciones();
  }, [id]);

  const listaFiltrada = evaluaciones.filter((e) =>
    e.version.toString().toLowerCase().includes(searchTerm)
  );

  const paginasTotales = Math.ceil(listaFiltrada.length / itemsPorPagina);
  const evaluacionesPaginadas = listaFiltrada.slice(
    (paginaActual - 1) * itemsPorPagina,
    paginaActual * itemsPorPagina
  );

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
          Evaluaciones
        </Typography>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "#1A3D2D", mt: 0.5, lineHeight: 1.2 }}
        >
          Historial de versiones
        </Typography>
      </Box>

      {/* Toolbar */}
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
            Versiones
          </Typography>
          <Chip
            label={evaluaciones.length}
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
          placeholder="Buscar versión..."
          width={xs ? "100%" : "220px"}
          height="46px"
          onChange={(e) => {
            setPaginaActual(1);
            setSearchTerm(e.target.value.toLowerCase());
          }}
        />
      </Box>

      {/* Contenido */}
      <Box sx={{ px: { xs: 3, sm: 6 }, pb: 8 }}>
        {listaFiltrada.length > 0 ? (
          <>
            {!xs && <ListHeader textos={textosHeader} />}
            <Lista
              lista={evaluacionesPaginadas}
              keys={keys}
              buttonOnClick={(idEval) => navigate(`/evaluacionDeshabilitada/${idEval}`)}
              paramOnClick="id"
            />
            {listaFiltrada.length > itemsPorPagina && (
              <Stack mt={3} alignItems="center">
                <Pagination
                  count={paginasTotales}
                  page={paginaActual}
                  onChange={(_, value) => setPaginaActual(value)}
                  sx={{
                    "& .MuiPaginationItem-root.Mui-selected": {
                      backgroundColor: "#1A3D2D",
                      color: "#fff",
                    },
                  }}
                />
              </Stack>
            )}
          </>
        ) : (
          <Box sx={{ mt: 8, textAlign: "center", color: "#8ab09a" }}>
            {searchTerm ? (
              <>
                <i
                  className="fa fa-search"
                  style={{ fontSize: "2.5rem", marginBottom: "1rem", display: "block" }}
                />
                <Typography sx={{ fontWeight: 500 }}>
                  No se encontraron versiones para "{searchTerm}"
                </Typography>
              </>
            ) : (
              <>
                <i
                  className="fa fa-history"
                  style={{ fontSize: "2.5rem", marginBottom: "1rem", display: "block" }}
                />
                <Typography sx={{ fontWeight: 500 }}>
                  No hay versiones anteriores para esta evaluación.
                </Typography>
              </>
            )}
          </Box>
        )}
      </Box>
    </>
  );
}
