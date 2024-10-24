import { Grid } from "@mui/material";
import Carpeta from "../components/Carpeta";

export function HomePage() {
  const carpetas = [
    "Carpeta 1",
    "Carpeta 2",
    "Carpeta 3",
    "Carpeta 4",
    "Carpeta 5",
    "Carpeta 6",
    "Carpeta 7",
    "Carpeta 8",
    "Carpeta 9",
    "Carpeta 10",
    "Carpeta 11",
    "Carpeta 12"
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>¡Bienvenido/a, Carlos Perez!</h1>
      <div className="gridCarpetas">
      <Grid container spacing={10}>
        {carpetas.map((titulo, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Carpeta titulo={titulo} />
          </Grid>
        ))}
      </Grid>
      </div>
    </div>
  );
}
