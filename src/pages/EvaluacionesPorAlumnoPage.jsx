import Busqueda from "../components/Busqueda";
import { useNavigate } from "react-router-dom";
import Lista from "../components/Lista";
import { Stack, Box } from "@mui/material";

const datos = [
  { fecha: "12/10/24", porcentaje: "50%" },
  { fecha: "13/10/24", porcentaje: "80%" },
  { fecha: "14/10/24", porcentaje: "70%" },
  { fecha: "15/10/24", porcentaje: "95%" },
  { fecha: "16/10/24", porcentaje: "100%" },
];

export function EvaluacionesPorAlumno() {
  const navigate = useNavigate();
  const keys = ["fecha", "porcentaje"];

  return (
    <>
      <Stack sx={{ alignItems: "center" }}>
        <h1>Lavado de manos</h1>
        <Stack sx={{ width: "80%" }}>
          <Stack
            direction={"row"}
            display={{ alignItems: "center" }}
            spacing={2}
          >
            <h2>Maria Gonzalez</h2>
            <Busqueda />
          </Stack>

          <Lista
            lista={datos}
            keys={keys}
            buttonOnClick={() => navigate("/verEvaluacion")}
          />
        </Stack>
      </Stack>
    </>
  );
}
