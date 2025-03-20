import React, { useEffect } from "react";
import { Box, Grid, Stack } from "@mui/material";
import { BrowserRouter, useLocation } from "react-router-dom";
import { Menu } from "./components/adaptableTopMenu";
import { AppRouter } from "./AppRouter";
import Footer from "./components/Footer";

export function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

export function MainLayout() {
  const location = useLocation();

  const menuRoutes = [
    "/",
    "/register",
    "/registerAlumnos",
    "/registroAlumnoExitoso",
    "/registroDocenteExitoso",
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

  return (
    <Stack 
      direction="column" 
      sx={{ minHeight: "100vh" }}
    >
      {!shouldHideMenu && <Menu />}
      <Box sx={{ flexGrow: 1 }}>
        <AppRouter />
      </Box>
      {!shouldHideMenu && <Footer />}
    </Stack>
  );
}
