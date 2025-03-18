import { Route, Routes } from "react-router-dom";
import { PerfilDocentePage } from "./pages/PerfilDocentePage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { RegisterPageAlumnos } from "./pages/RegisterPageAlumnos";
import { RegistroAlumnoExitoso } from "./pages/RegistroAlumnoExitoso";
import { RegistroDocenteExitoso } from "./pages/RegistroDocenteExitoso";
import { RegistrarEvaluacionPage } from "./pages/RegistrarEvaluacionPage";
import { RegistroEvaluacionesPage } from "./pages/RegistroEvaluacionesPage";
import { VerEvaluacionPage } from "./pages/VerEvaluacionPage";
import { EvaluacionesPorAlumno } from "./pages/EvaluacionesPorAlumnoPage";
import { AlumnoPerfilPage } from "./pages/AlumnoPerfilPage";
import { AlumnosPage } from "./pages/AlumnosPage";
import { CrearEvaluacionPage } from "./pages/CrearEvaluacionPage";
import { CrearEvaluacionExitoPage } from "./pages/CrearEvaluacionExito";

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
      <Route
        path="/evaluacionesPorAlumno/:idEvaluacion/:idAlumno"
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
        path="/registrarEvaluacion/:id"
        element={<RegistrarEvaluacionPage />}
      />
      <Route
        path="/registroEvaluaciones"
        element={<RegistroEvaluacionesPage />}
      />
      <Route
        path="/registroEvaluaciones/evaluaciones-realizadas/:id"
        element={<RegistroEvaluacionesPage />}
      />
      <Route path="/crearEvaluacion" element={<CrearEvaluacionPage />} />
      <Route
        path="/registroAlumnoExitoso"
        element={<RegistroAlumnoExitoso />}
      />
      <Route
        path="/registroDocenteExitoso"
        element={<RegistroDocenteExitoso />}
      />
      <Route path="/verEvaluacion" element={<VerEvaluacionPage />} />
      <Route
        path="/crearEvaluacionExito"
        element={<CrearEvaluacionExitoPage />}
      />
    </Routes>
  );
}
