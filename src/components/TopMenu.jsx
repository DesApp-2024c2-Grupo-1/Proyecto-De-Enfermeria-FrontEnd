import { Box, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

function MenuOption({ path, label }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Box
      sx={{
        typography: pathname === path ? "topMenu" : "topMenuSelected",
        padding: 2,
      }}
      onClick={() => navigate(path)}
    >
      {label}
    </Box>
  );
}

export function Menu() {
  return (
    <div>
      <Stack direction="row" alignItems="center" className="menu">
        <MenuOption path="/home" label="Inicio" />
        <MenuOption path="/alumnos" label="Alumnos" />
        <MenuOption path="/perfilDocente" label="Perfil" />
      </Stack>
    </div>
  );
}
