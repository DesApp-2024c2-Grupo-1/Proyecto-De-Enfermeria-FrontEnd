import React from "react";
import { Box, Stack, Drawer, IconButton, useMediaQuery, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "/assets/home.png";
import ProfileIcon from "/assets/profile.png";
import AlumnosIcon from "/assets/alumnos.png";
import { useDocente } from "../context/DocenteContext";


function MenuOption({ path, label, icon, onClick }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Box
      sx={{
        typography: pathname === path ? "topMenuSelected" : "topMenu",
        padding: 2,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
      onClick={() => {
        navigate(path);
        if (onClick) onClick();
      }}
    >
      <img src={icon} alt={label} style={{ width: 35, height: 35 }} />
      {label}
    </Box>
  );
}

export function Menu() {
  const isDesktop = useMediaQuery("(min-width:1024px)");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { docenteContext } = useDocente();
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const opcionesMenu = [
    { path: "/home", label: "Inicio", icon: HomeIcon },
    { path: "/alumnos", label: "Alumnos", icon: AlumnosIcon },
  ];

  const opcionesMenuMovil = [
    { path: "/home", label: "Inicio", icon: HomeIcon },
    { path: "/alumnos", label: "Alumnos", icon: AlumnosIcon },
    { path: "/perfilDocente", label: "Perfil", icon: ProfileIcon },
  ];

  return (
    <>
      {isDesktop ? (
        <><Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ width: "100%", height: "50px", backgroundColor: "#1A3D2D" }}>
          <Button  sx={{color:"white", marginRight: "48px", paddingRight: "15px", fontSize: "15px"}}  onClick={() => navigate("/perfilDocente")} endIcon={<i class="fa-solid fa-user" style={{fontSize: "25px", marginLeft: "0.25vh", color: "white"}}></i>}>
            {docenteContext.nombre} {docenteContext.apellido}
          </Button>
        </Stack><Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          className="menu"
        >
            <Stack direction="row" spacing={10} sx={{ marginLeft: 6 }}>
              {opcionesMenu.map((option) => (
                <MenuOption
                  key={option.path}
                  path={option.path}
                  label={option.label}
                  icon={option.icon} />
              ))}
            </Stack>
            <img
              src="../assets/unahur-logo-figma-sf.png"
              className="logo"
              alt="Logo"
              style={{ marginRight: 35, marginBottom: 10 }} />
          </Stack></>
      ) : (
        // Menú móvil
        <>
          <IconButton
            onClick={toggleDrawer}
            sx={{ position: "absolute", top: 16, right: 16 }}
          >
            <i class="fa fa-bars" aria-hidden="true"></i>
          </IconButton>
          <Drawer
            anchor="right"
            open={mobileOpen}
            onClose={toggleDrawer}
            PaperProps={{
              sx: { width: "60%", backgroundColor: "#31614b" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 3,
              }}
            >
              <IconButton
                onClick={toggleDrawer}
                sx={{ alignSelf: "flex-end", mb: 2 }}
              >
                <i class="fa fa-times-circle" aria-hidden="true"></i>
              </IconButton>
              {opcionesMenuMovil.map((option) => (
                <MenuOption
                  key={option.path}
                  path={option.path}
                  label={option.label}
                  icon={option.icon}
                  onClick={toggleDrawer}
                />
              ))}
            </Box>
          </Drawer>
        </>
      )}
    </>
  );
}
