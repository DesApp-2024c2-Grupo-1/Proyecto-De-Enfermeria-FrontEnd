import { Box, Stack } from "@mui/material";
import { cyan } from "@mui/material/colors";
import { useLocation, useNavigate } from "react-router-dom";

function MenuOption({ path, label }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Box
      sx={{
        typography: pathname === path ? "topMenu" : "topMenuSelected",
        mr: 8,
      }}
      onClick={() => navigate(path)}
    >
      {label}
    </Box>
  );
}

export function TopMenu() {
  return (
    <Stack direction="row" alignItems="center" className="menu">
      <MenuOption path="/home" label="Home" />
      <MenuOption path="/perfilDocente" label="Perfil" />
    </Stack>
  );
}
