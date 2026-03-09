import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getAllEvaluacionesRealizadasPorAlumno } from "../services/EvaluacionRealizadaService";
import { Stack, Box, Typography, Chip } from "@mui/material";
import ListaCards from "../components/ListaCards";
import AlumnoPerfilHeader from "../components/AlumnoPerfilHeader";
import Busqueda from "../components/Busqueda";

export function AlumnoPerfilPage() {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const alumnoNombre = location.state?.alumnoNombre;
  const alumnoApellido = location.state?.alumnoApellido;
  const { idAlumno } = useParams();

  useEffect(() => {
    if (!location.state || !location.state.alumnoNombre) {
      navigate("/401", { replace: true });
    }
  }, [location.state, navigate]);

  const evaluacionesTitulos = Array.from(
    new Set(evaluaciones.map((e) => e.evaluacion.titulo))
  );

  const evaluacionesFiltradas = evaluacionesTitulos
    .filter((titulo) => titulo.toLowerCase().includes(searchTerm))
    .map((titulo) => ({
      titulo,
      instancias: evaluaciones.filter((e) => e.evaluacion.titulo === titulo),
    }));

  useEffect(() => {
    const fetchEvaluaciones = async () => {
      const data = await getAllEvaluacionesRealizadasPorAlumno(idAlumno);
      setEvaluaciones(data);
    };
    fetchEvaluaciones();
  }, [idAlumno]);

  return (
    <Box sx={{ width: "100%" }}>
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
          Perfil del alumno
        </Typography>
        <AlumnoPerfilHeader
          alumnoNombre={alumnoNombre}
          alumnoApellido={alumnoApellido}
          evaluaciones={evaluaciones}
        />
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
            Evaluaciones
          </Typography>
          <Chip
            label={evaluacionesTitulos.length}
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
          width={280}
          height={46}
          placeholder="Buscar por título..."
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        />
      </Box>

      {/* Lista */}
      <Box sx={{ px: { xs: 3, sm: 6 }, pb: 8 }}>
        {evaluacionesFiltradas.length > 0 ? (
          evaluacionesFiltradas.map((evaluacion, index) => (
            <ListaCards
              key={index}
              titulo={evaluacion.titulo}
              lista={evaluacion.instancias}
              keys={["fecha", "nota"]}
              buttonOnClick={(id) => navigate(`/verEvaluacion/${id}`)}
              paramOnClick="id"
            />
          ))
        ) : (
          <Box sx={{ mt: 8, textAlign: "center", color: "#8ab09a" }}>
            {evaluaciones.length === 0 ? (
              <>
                <i
                  className="fa fa-clipboard"
                  style={{ fontSize: "2.5rem", marginBottom: "1rem", display: "block" }}
                />
                <Typography sx={{ fontWeight: 500 }}>
                  Este alumno aún no tiene evaluaciones realizadas.
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 0.5, color: "#aac4b4", cursor: "pointer" }}
                  onClick={() => navigate("/alumnos")}
                >
                  Volver al listado de alumnos
                </Typography>
              </>
            ) : (
              <>
                <i
                  className="fa fa-search"
                  style={{ fontSize: "2.5rem", marginBottom: "1rem", display: "block" }}
                />
                <Typography sx={{ fontWeight: 500 }}>
                  No se encontraron evaluaciones para "{searchTerm}"
                </Typography>
              </>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
