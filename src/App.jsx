import React, { useEffect, useState } from "react";
import { Box, Stack, useMediaQuery } from "@mui/material";
import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "./components/adaptableTopMenu";
import { AppRouter } from "./AppRouter";
import Footer from "./components/Footer";
import { noAutorizadoCallback } from "./services/_authRequest";
import HandlerRedireccion from "./components/HandlerRedireccion";
import { DocenteProvider } from "./context/DocenteContext";
import { createTheme } from "@mui/material/styles";

export function App() {
  return (
    <BrowserRouter>
      <DocenteProvider>
        <MainLayout />
        <HandlerRedireccion />
      </DocenteProvider>
    </BrowserRouter>
  );
}

export function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = createTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));

  const menuRoutes = [
    "/",
    "/register",
    "/registerAlumnos",
    "/registroAlumnoExitoso",
    "/registroDocenteExitoso",
    "/401",
  ];

  const shouldHideMenu = menuRoutes.includes(location.pathname);

  useEffect(() => {
    const body = document.body;

    if (menuRoutes.includes(location.pathname)) {
      body.style.backgroundColor = "#1A3D2D";
    } else {
      body.style.backgroundColor = "rgba(255, 255, 255, 0.87)";
    }
  }, [location.pathname]);

  useEffect(() => {
    noAutorizadoCallback(() => {
      console.log("Usuario no autorizado");
      navigate("/401");
    });

    return () => noAutorizadoCallback(null);
  }, [navigate]);

  return (
    <Stack direction="column" sx={{ minHeight: "100vh" }}>
      {!shouldHideMenu && <Menu />}
      <Box sx={{ flexGrow: 1, paddingLeft: (shouldHideMenu || xs) ? "0px" : "80px" }}>
        <AppRouter />
      </Box>
      {!shouldHideMenu && <Footer />}
    </Stack>
  );
}
