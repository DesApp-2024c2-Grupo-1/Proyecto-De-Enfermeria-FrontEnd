import React, { useEffect } from "react";
import { Box, Grid, Stack } from "@mui/material";
import { BrowserRouter, useLocation } from "react-router-dom";
import { Menu } from "./components/TopMenu";
import { AppRouter } from "./AppRouter";

export function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

export function MainLayout() {
  const location = useLocation();

  const menuRoutes = ["/", "/register"];
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
    <Stack direction="column">
      {!shouldHideMenu && <Menu />}
        <AppRouter />
    </Stack>
  );
}
