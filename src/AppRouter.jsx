import { Route, Routes } from "react-router-dom";
import { FilmsPage } from "./pages/FilmsPage";
// import { FilmsPage } from "./pages/FilmsPageReduxStyle";
import { ActorsPage } from "./pages/ActorsPage";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { PerfilDocentePage } from "./pages/PerfilDocentePage";
import { HomePage } from "./pages/HomePage";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/films" element={<FilmsPage />} />
      <Route path="/actors" element={<ActorsPage />} />
      <Route path="/perfilDocente" element={<PerfilDocentePage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
