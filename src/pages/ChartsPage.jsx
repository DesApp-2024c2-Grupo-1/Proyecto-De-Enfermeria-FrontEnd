import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer,
} from "recharts";
import {
  Box, Typography, Grid, Card, CardContent, CircularProgress,
  Stack, Chip, TextField, InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getAllEvaluaciones } from "../services/EvaluacionService";
import { findAllAlumnosPorEvaluacion } from "../services/EvaluacionRealizadaService";

function StatCard({ label, value, color = "#1A3D2D" }) {
  return (
    <Card
      variant="outlined"
      sx={{ borderRadius: 3, borderColor: "#e8f1ec", flex: 1, minWidth: 180 }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="body2"
          sx={{
            color: "#5a9e7c",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            mb: 1,
          }}
        >
          {label}
        </Typography>
        <Typography variant="h3" fontWeight={800} color={color} lineHeight={1}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function ChartsPage() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const evaluaciones = await getAllEvaluaciones();

        // One request per unique title (backend groups all versions by title anyway)
        const uniqueTitles = new Map();
        for (const ev of evaluaciones) {
          if (!uniqueTitles.has(ev.titulo)) {
            uniqueTitles.set(ev.titulo, ev.id);
          }
        }

        const results = await Promise.all(
          Array.from(uniqueTitles.entries()).map(async ([titulo, id]) => {
            try {
              const alumnos = await findAllAlumnosPorEvaluacion(id);
              let total = 0;
              let aprobados = 0;
              for (const alumno of alumnos) {
                for (const er of alumno.evaluacionesRealizadas) {
                  total++;
                  const nota = parseInt(er.nota?.replace("%", ""), 10);
                  if (nota >= 60) aprobados++;
                }
              }
              return { nombreEval: titulo, Total: total, Aprobados: aprobados };
            } catch {
              return null;
            }
          })
        );

        setChartData(results.filter((r) => r !== null && r.Total > 0));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredData = chartData.filter((r) =>
    r.nombreEval.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRealizadas = chartData.reduce((s, r) => s + r.Total, 0);
  const totalAprobadas = chartData.reduce((s, r) => s + r.Aprobados, 0);
  const tasaGlobal =
    totalRealizadas > 0 ? Math.round((totalAprobadas / totalRealizadas) * 100) : 0;

  const pieData = [
    { name: "Aprobados", value: totalAprobadas },
    { name: "Desaprobados", value: totalRealizadas - totalAprobadas },
  ];

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress sx={{ color: "#1A3D2D" }} />
      </Box>
    );
  }

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
          Reportes
        </Typography>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "#1A3D2D", mt: 0.5, lineHeight: 1.2 }}
        >
          Estadísticas
        </Typography>
      </Box>

      {/* Toolbar */}
      <Box
        sx={{
          px: { xs: 3, sm: 6 },
          pt: 3,
          pb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Chip
            label={`${filteredData.length} modelo${filteredData.length !== 1 ? "s" : ""}`}
            size="small"
            sx={{ backgroundColor: "#d7f0dc", color: "#1A3D2D", fontWeight: 600 }}
          />
        </Stack>
        <TextField
          size="small"
          placeholder="Buscar modelo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 18, color: "#8ab09a" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            width: { xs: "100%", sm: 280 },
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              "& fieldset": { borderColor: "#e8f1ec" },
              "&:hover fieldset": { borderColor: "#5a9e7c" },
              "&.Mui-focused fieldset": { borderColor: "#1A3D2D" },
            },
          }}
        />
      </Box>

      {/* Content */}
      <Box sx={{ px: { xs: 3, sm: 6 }, pt: 2, pb: 8 }}>
        {chartData.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 12, color: "#8ab09a" }}>
            <Typography variant="h6" fontWeight={600}>
              Sin datos disponibles
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Aún no se registraron evaluaciones realizadas.
            </Typography>
          </Box>
        ) : (
          <>
            {/* KPI Cards */}
            <Stack
              direction="row"
              spacing={2}
              sx={{ mb: 5, flexWrap: "wrap", gap: 2 }}
            >
              <StatCard label="Evaluaciones realizadas" value={totalRealizadas} />
              <StatCard
                label="Tasa de aprobación"
                value={`${tasaGlobal}%`}
                color={tasaGlobal >= 60 ? "#1b5e20" : "#b71c1c"}
              />
            </Stack>

            <Grid container spacing={4}>
              {/* Bar Chart */}
              <Grid item xs={12} lg={8}>
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  color="#1A3D2D"
                  mb={2}
                >
                  Realizaciones por evaluación
                </Typography>
                <Box sx={{ width: "100%", overflowX: "auto" }}>
                  <ResponsiveContainer width="100%" minWidth={400} height={380}>
                    <BarChart
                      data={filteredData}
                      margin={{ top: 5, right: 20, left: 0, bottom: 90 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f2" />
                      <XAxis
                        dataKey="nombreEval"
                        tick={{ fontSize: 12, fill: "#555" }}
                        angle={-35}
                        textAnchor="end"
                        interval={0}
                      />
                      <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                      <Tooltip
                        contentStyle={{
                          borderRadius: 8,
                          border: "1px solid #e8f1ec",
                          fontFamily: "inherit",
                        }}
                      />
                      <Legend
                        wrapperStyle={{ paddingTop: 16, fontSize: 13 }}
                      />
                      <Bar
                        dataKey="Total"
                        name="Total"
                        fill="#1A3D2D"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="Aprobados"
                        name="Aprobados"
                        fill="#5a9e7c"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </Grid>

              {/* Donut Chart */}
              <Grid item xs={12} lg={4}>
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  color="#1A3D2D"
                  mb={2}
                >
                  Distribución global
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={110}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      <Cell fill="#5a9e7c" />
                      <Cell fill="#ef9a9a" />
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: 8,
                        border: "1px solid #e8f1ec",
                        fontFamily: "inherit",
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: 13 }} />
                  </PieChart>
                </ResponsiveContainer>
                <Stack spacing={1} sx={{ mt: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      px: 1,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Aprobados
                    </Typography>
                    <Chip
                      label={`${totalAprobadas} (${tasaGlobal}%)`}
                      size="small"
                      sx={{
                        backgroundColor: "#c8e6c9",
                        color: "#1b5e20",
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      px: 1,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Desaprobados
                    </Typography>
                    <Chip
                      label={`${totalRealizadas - totalAprobadas} (${100 - tasaGlobal}%)`}
                      size="small"
                      sx={{
                        backgroundColor: "#fce4e4",
                        color: "#b71c1c",
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                </Stack>
              </Grid>

              {/* Per-evaluation detail cards */}
              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  color="#1A3D2D"
                  mb={2}
                >
                  Detalle por evaluación
                </Typography>
                <Grid container spacing={2}>
                  {filteredData.length === 0 ? (
                  <Grid item xs={12}>
                    <Box sx={{ py: 6, textAlign: "center", color: "#8ab09a" }}>
                      <Typography variant="body1" fontWeight={600}>
                        Sin resultados para "{searchTerm}"
                      </Typography>
                    </Box>
                  </Grid>
                ) : filteredData.map((ev) => {
                    const pct =
                      ev.Total > 0
                        ? Math.round((ev.Aprobados / ev.Total) * 100)
                        : 0;
                    return (
                      <Grid item xs={12} sm={6} lg={4} key={ev.nombreEval}>
                        <Card
                          variant="outlined"
                          sx={{ borderRadius: 3, borderColor: "#e8f1ec" }}
                        >
                          <CardContent>
                            <Typography
                              fontWeight={700}
                              color="#1A3D2D"
                              title={ev.nombreEval}
                              sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {ev.nombreEval}
                            </Typography>
                            <Stack
                              direction="row"
                              spacing={0.5}
                              mt={1.5}
                              flexWrap="wrap"
                              gap={0.5}
                            >
                              <Chip
                                label={`${ev.Total} realizadas`}
                                size="small"
                                sx={{
                                  backgroundColor: "#d7f0dc",
                                  color: "#1A3D2D",
                                  fontWeight: 600,
                                }}
                              />
                              <Chip
                                label={`${ev.Aprobados} aprobadas`}
                                size="small"
                                sx={{
                                  backgroundColor: "#c8e6c9",
                                  color: "#1b5e20",
                                  fontWeight: 600,
                                }}
                              />
                              <Chip
                                label={`${pct}%`}
                                size="small"
                                sx={{
                                  backgroundColor:
                                    pct >= 60 ? "#c8e6c9" : "#fce4e4",
                                  color: pct >= 60 ? "#1b5e20" : "#b71c1c",
                                  fontWeight: 700,
                                }}
                              />
                            </Stack>
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </Box>
  );
}