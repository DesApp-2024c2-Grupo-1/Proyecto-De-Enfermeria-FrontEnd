import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Drawer,
  IconButton,
  useMediaQuery,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "/assets/home.png";
import ProfileIcon from "/assets/profile.png";
import AlumnosIcon from "/assets/alumnos.png";
import EstadisticasIcon from "/assets/estadisticas.png";
import { useDocente } from "../context/DocenteContext";
import IrAtrasBoton from "./irAtrasBoton";
import PerfilMenuButton from "./PerfilDocenteButton";

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

  useEffect(() => {
    if (!docenteContext) {
      navigate("/401", { replace: true });
    }
  }, [docenteContext, navigate]);

  if (!docenteContext) {
    return null;
  }

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
        <>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              height: "60px",
              px: 4,
              backgroundColor: "#fff",
              borderBottom: "1px solid #E5E7EB",
              position: "sticky",
              top: 0,
              zIndex: 1000,
            }}
          >
            <IrAtrasBoton />
            <PerfilMenuButton />
          </Stack>

          <Stack
            direction="column"
            alignItems="center"
            spacing={4}
            sx={{
              width: "80px",
              height: "100vh",
              backgroundColor: "#1A3D2D",
              color: "white",
              py: 4,
              position: "fixed",
              left: 0,
              top: 0,
              zIndex: 1000,
            }}
          >
            <img
              src="../assets/unahur-logo-cuadrado.png"
              alt="Logo"
              style={{
                width: 35,
                height: 35,
                marginTop: -17,
                marginBottom: -7,
              }}
            />
            {opcionesMenu.map((option) => (
              <Box
                key={option.path}
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => navigate(option.path)}
              >
                <img src={option.icon} alt={option.label} width={30} />
              </Box>
            ))}
          </Stack>
        </>
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
