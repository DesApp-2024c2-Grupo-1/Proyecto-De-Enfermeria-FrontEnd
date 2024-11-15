import { Box, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "/assets/home.png";
import ProfileIcon from "/assets/profile.png";
import CrearIcon from "/assets/examen.png";
import AlumnosIcon from "/assets/alumnos.png";

function MenuOption({ path, label, icon }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Box
      sx={{
        typography: pathname === path ? "topMenu" : "topMenuSelected",
        padding: 8,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
      onClick={() => navigate(path)}
    >
      <img src={icon} alt={label} style={{ width: 50, height: 50 }} />
      {label}
    </Box>
  );
}

export function Menu() {
  return (
    <div>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        className="menu"
      >
        <Stack direction="row" spacing={2}>
          <MenuOption path="/home" label="Inicio" icon={HomeIcon} />
          <MenuOption path="/alumnos" label="Alumnos" icon={AlumnosIcon} />
          <MenuOption path="/crearEvaluacion" label="Crear" icon={CrearIcon} />
          <MenuOption path="/perfilDocente" label="Perfil" icon={ProfileIcon} />
        </Stack>

        {/* Logo a la derecha */}
        <img
          src="../assets/unahur-logo-figma-sf.png"
          className="logo"
          alt="Logo"
        />
      </Stack>
    </div>
  );
}
