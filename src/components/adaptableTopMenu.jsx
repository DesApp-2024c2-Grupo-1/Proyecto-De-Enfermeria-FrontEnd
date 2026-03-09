import React, { useEffect } from "react";
import {
  Box,
  Stack,
  Drawer,
  IconButton,
  useMediaQuery,
  Typography,
  Tooltip,
  Divider,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "/assets/home.png";
import ProfileIcon from "/assets/profile.png";
import AlumnosIcon from "/assets/alumnos.png";
import { useDocente } from "../context/DocenteContext";
import IrAtrasBoton from "./irAtrasBoton";
import PerfilMenuButton from "./PerfilDocenteButton";

function MenuOption({ path, label, icon, onClick, mobile = false }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isActive = pathname === path;

  const handleClick = () => {
    navigate(path);
    if (onClick) onClick();
  };

  if (mobile) {
    return (
      <Box
        onClick={handleClick}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          width: "100%",
          px: 2,
          py: 1.5,
          borderRadius: "10px",
          cursor: "pointer",
          backgroundColor: isActive ? "rgba(255,255,255,0.15)" : "transparent",
          transition: "background-color 0.2s",
          "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
        }}
      >
        <img src={icon} alt={label} style={{ width: 22, height: 22, opacity: 0.9 }} />
        <Typography sx={{ color: "#fff", fontWeight: isActive ? 600 : 400, fontSize: "0.95rem" }}>
          {label}
        </Typography>
      </Box>
    );
  }

  return (
    <Tooltip title={label} placement="right" arrow>
      <Box
        onClick={handleClick}
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0.5,
          px: 1,
          py: 1,
          borderRadius: "12px",
          cursor: "pointer",
          width: "56px",
          backgroundColor: isActive ? "rgba(255,255,255,0.12)" : "transparent",
          transition: "background-color 0.2s",
          "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
          "&::before": isActive
            ? {
                content: '""',
                position: "absolute",
                left: "-12px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "4px",
                height: "60%",
                borderRadius: "0 4px 4px 0",
                backgroundColor: "#6fcfa0",
              }
            : {},
        }}
      >
        <img src={icon} alt={label} style={{ width: 24, height: 24, opacity: isActive ? 1 : 0.65 }} />
        <Typography
          sx={{
            fontSize: "0.65rem",
            color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
            fontWeight: isActive ? 600 : 400,
            lineHeight: 1,
          }}
        >
          {label}
        </Typography>
      </Box>
    </Tooltip>
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

  if (!docenteContext) return null;

  const toggleDrawer = () => setMobileOpen((prev) => !prev);

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
          {/* Topbar */}
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
              scrollbarGutter: "stable",
            }}
          >
            <IrAtrasBoton />
            <PerfilMenuButton />
          </Stack>

          {/* Sidebar */}
          <Stack
            direction="column"
            alignItems="center"
            sx={{
              width: "80px",
              height: "100vh",
              backgroundColor: "#1A3D2D",
              py: 3,
              position: "fixed",
              left: 0,
              top: 0,
              zIndex: 1000,
              gap: 1,
            }}
          >
            <Box sx={{ mb: 2, mt: 0.5 }}>
              <img
                src="../assets/unahur-logo-cuadrado.png"
                alt="Logo"
                style={{ width: 32, height: 32 }}
              />
            </Box>

            <Divider sx={{ width: "50%", borderColor: "rgba(255,255,255,0.1)", mb: 1 }} />

            {opcionesMenu.map((option) => (
              <MenuOption
                key={option.path}
                path={option.path}
                label={option.label}
                icon={option.icon}
              />
            ))}
          </Stack>
        </>
      ) : (
        <>
          {/* Botón hamburguesa móvil */}
          <IconButton
            onClick={toggleDrawer}
            sx={{
              position: "fixed",
              top: 12,
              right: 12,
              zIndex: 1100,
              backgroundColor: "#1A3D2D",
              color: "#fff",
              width: 40,
              height: 40,
              "&:hover": { backgroundColor: "#285742" },
            }}
          >
            <i className="fa fa-bars" aria-hidden="true" style={{ fontSize: "16px" }} />
          </IconButton>

          {/* Drawer móvil */}
          <Drawer
            anchor="right"
            open={mobileOpen}
            onClose={toggleDrawer}
            PaperProps={{
              sx: {
                width: "220px",
                backgroundColor: "#1A3D2D",
                pt: 2,
                pb: 3,
                px: 2,
              },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
              <IconButton onClick={toggleDrawer} sx={{ color: "rgba(255,255,255,0.7)" }}>
                <i className="fa fa-times" aria-hidden="true" style={{ fontSize: "18px" }} />
              </IconButton>
            </Box>

            <Box sx={{ mb: 2, px: 2 }}>
              <Typography sx={{ color: "rgba(255,255,255,0.45)", fontSize: "0.7rem", letterSpacing: "0.1em", fontWeight: 600 }}>
                MENÚ
              </Typography>
            </Box>

            <Stack spacing={0.5}>
              {opcionesMenuMovil.map((option) => (
                <MenuOption
                  key={option.path}
                  path={option.path}
                  label={option.label}
                  icon={option.icon}
                  onClick={toggleDrawer}
                  mobile
                />
              ))}
            </Stack>
          </Drawer>
        </>
      )}
    </>
  );
}
