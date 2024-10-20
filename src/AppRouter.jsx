import { Route, Routes } from "react-router-dom";
import { FilmsPage } from "./pages/FilmsPage";
// import { FilmsPage } from "./pages/FilmsPageReduxStyle";
import { ActorsPage } from "./pages/ActorsPage";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { PerfilDocentePage } from "./pages/PerfilDocentePage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/perfilDocente" element={<PerfilDocentePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}
