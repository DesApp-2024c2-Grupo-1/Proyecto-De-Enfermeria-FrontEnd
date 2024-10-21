import { Route, Routes } from "react-router-dom";
import { PerfilDocentePage } from "./pages/PerfilDocentePage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { AlumnosPage } from "./pages/AlumnosPage";
import { RegistrarEvaluacionPage } from "./pages/RegistrarEvaluacionPage";
import { RegistroEvaluacionesPage } from "./pages/RegistroEvaluacionesPage";
//import { VerExamenPage } from "./pages/VerExamenPage";
//import { RegistroEvaluacionesPage } from "./pages/RegistroEvaluacionesPage";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/alumnos" element={<AlumnosPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/perfilDocente" element={<PerfilDocentePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/registrarEvaluacion" element={<RegistrarEvaluacionPage />} />
      <Route path="/registroEvaluaciones" element={<RegistroEvaluacionesPage />} />

    </Routes>
  );
}
