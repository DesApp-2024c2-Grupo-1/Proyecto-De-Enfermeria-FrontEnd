import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Box, Stack } from "@mui/material";

const data = [
  { nombreEval: 'Determinar altura uterina', Cantidad: 56, Aprobados: 46 },
  { nombreEval: 'Lavado de Manos', Cantidad: 32, Aprobados: 16 },
  { nombreEval: 'Colocacion de elementos de seguridad', Cantidad: 78, Aprobados: 24 },
  { nombreEval: 'Control de signos vitales', Cantidad: 49, Aprobados: 6 },
];

export default function ChartMockeadoDemo() {
  return (
    <>
    <Stack sx={{display: "flex",
            alignItems: "center",
            justifyContent: "center",}}>
    <h2 style={{padding: 25}}>Estadísticas</h2>
    <BarChart width={1250} height={650} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="nombreEval" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Cantidad" fill="#1E3E2D" />
      <Bar dataKey="Aprobados" fill="#31614b" />
    </BarChart>
    </Stack>
  </>
  );
}