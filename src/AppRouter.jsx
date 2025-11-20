import { Route, Routes, useLocation } from "react-router-dom";
import PerfilDocentePage from "./pages/PerfilDocentePage";
import HomePage from "./pages/HomePage";
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
import CrearEvaluacionPage from "./pages/CrearEvaluacionPage";
import { CrearEvaluacionExitoPage } from "./pages/CrearEvaluacionExito";
import EditarEvaluacionPage from "./pages/EditarEvaluacionPage";
import { HistorialEvaluacion } from "./pages/HistorialEvaluacion";
import { RegistrarEvaluacionExitoPage } from "./pages/RegistrarEvaluacionExito";
import { EvaluacionDeshabilitadaPage } from "./pages/EvaluacionDeshablitadaPage";
import NoAutorizado from "./components/NoAutorizado";
import ChartMockeadoDemo from "./pages/ChartsPage";
import "./animations.css";

function Page({ children }) {
  return <div className="page">{children}</div>;
}

export function AppRouter() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route
        path="/"
        element={
            <LoginPage />
        }
      />
      <Route
        path="/alumnos"
        element={
          <Page>
            <AlumnosPage />
          </Page>
        }
      />
      <Route
        path="/home"
        element={
          <Page>
            <HomePage />
          </Page>
        }
      />
      <Route
        path="/evaluacionesPorAlumno"
        element={
          <Page>
            <EvaluacionesPorAlumno />
          </Page>
        }
      />
      <Route
        path="/evaluacionesPorAlumno/:idEvaluacion/:idAlumno"
        element={
          <Page>
            <EvaluacionesPorAlumno />
          </Page>
        }
      />
      <Route
        path="/verEvaluacion/:id"
        element={
          <Page>
            <VerEvaluacionPage />
          </Page>
        }
      />
      <Route
        path="/perfilAlumno"
        element={
          <Page>
            <AlumnoPerfilPage />
          </Page>
        }
      />
      <Route
        path="/perfilAlumno/:idAlumno"
        element={
          <Page>
            <AlumnoPerfilPage />
          </Page>
        }
      />
      <Route
        path="/perfilDocente"
        element={
          <Page>
            <PerfilDocentePage />
          </Page>
        }
      />
      <Route
        path="/register"
        element={
            <RegisterPage />
        }
      />
      <Route
        path="/registerAlumnos"
        element={
            <RegisterPageAlumnos />
        }
      />
      <Route
        path="/registrarEvaluacion"
        element={
          <Page>
            <RegistrarEvaluacionPage />
          </Page>
        }
      />
      <Route
        path="/registrarEvaluacion/:id"
        element={
          <Page>
            <RegistrarEvaluacionPage />
          </Page>
        }
      />
      <Route
        path="/registroEvaluaciones"
        element={
          <Page>
            <RegistroEvaluacionesPage />
          </Page>
        }
      />
      <Route
        path="/registroEvaluaciones/evaluaciones-realizadas/:id"
        element={
          <Page>
            <RegistroEvaluacionesPage />
          </Page>
        }
      />
      <Route
        path="/crearEvaluacion"
        element={
          <Page>
            <CrearEvaluacionPage />
          </Page>
        }
      />
      <Route
        path="/registroAlumnoExitoso"
        element={
            <RegistroAlumnoExitoso />
        }
      />
      <Route
        path="/registroDocenteExitoso"
        element={
            <RegistroDocenteExitoso />
        }
      />
      <Route
        path="/verEvaluacion"
        element={
          <Page>
            <VerEvaluacionPage />
          </Page>
        }
      />
      <Route
        path="/crearEvaluacionExito"
        element={
          <Page>
            <CrearEvaluacionExitoPage />
          </Page>
        }
      />
      <Route
        path="/estadisticas"
        element={
          <Page>
            <ChartMockeadoDemo />
          </Page>
        }
      />
      <Route
        path="/evaluarExito"
        element={
          <Page>
            <RegistrarEvaluacionExitoPage />
          </Page>
        }
      />
      <Route
        path="/editarEvaluacion/:id"
        element={
          <Page>
            <EditarEvaluacionPage />
          </Page>
        }
      />
      <Route
        path="/historialEvaluacion/:id"
        element={
          <Page>
            <HistorialEvaluacion />
          </Page>
        }
      />
      <Route
        path="/evaluacionDeshabilitada/:id"
        element={
          <Page>
            <EvaluacionDeshabilitadaPage />
          </Page>
        }
      />
      <Route
        path="/401"
        element={
            <NoAutorizado />
        }
      />
    </Routes>
  );
}
