import { Route, Routes } from "react-router-dom";
import { PerfilDocentePage } from "./pages/PerfilDocentePage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { RegisterPageAlumnos } from "./pages/RegisterPageAlumnos";
import { RegistroAlumnoExitoso } from "./pages/RegistroAlumnoExitoso";
import { RegistrarEvaluacionPage } from "./pages/RegistrarEvaluacionPage";
import { RegistroEvaluacionesPage } from "./pages/RegistroEvaluacionesPage";
import { VerEvaluacionPage } from "./pages/VerEvaluacionPage";
import { EvaluacionesPorAlumno } from "./pages/EvaluacionesPorAlumnoPage";
import { AlumnoPerfilPage } from "./pages/AlumnoPerfilPage";
import { AlumnosPage } from "./pages/AlumnosPage";
import { CrearEvaluacionPage } from "./pages/CrearEvaluacionPage";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/alumnos" element={<AlumnosPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route
        path="/evaluacionesPorAlumno"
        element={<EvaluacionesPorAlumno />}
      />
      <Route path="/verEvaluacion" element={<VerEvaluacionPage />} />
      <Route path="/perfilAlumno" element={<AlumnoPerfilPage />} />
      <Route path="/perfilAlumno/:id" element={<AlumnoPerfilPage />} />
      <Route path="/perfilDocente" element={<PerfilDocentePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/registerAlumnos" element={<RegisterPageAlumnos />} />
      <Route
        path="/registrarEvaluacion"
        element={<RegistrarEvaluacionPage />}
      />
      <Route
        path="/registroEvaluaciones"
        element={<RegistroEvaluacionesPage />}
      />
      <Route
        path="/crearEvaluacion"
        element={<CrearEvaluacionPage />}
      />
      <Route path="/registroAlumnoExitoso" element={<RegistroAlumnoExitoso />} />
      <Route path="/verEvaluacion" element={<VerEvaluacionPage />} />
    </Routes>
  );
}
