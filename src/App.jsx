import React, { useEffect, useState } from "react";
import { Box, Grid, Stack } from "@mui/material";
import { BrowserRouter, useLocation } from "react-router-dom";
import { TopMenu } from "./components/TopMenu";
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

  const hiddenMenuPaths = ["/", "/register"];

  const shouldHideMenu = hiddenMenuPaths.includes(location.pathname);

  return (
    <Stack direction="column">
      {!shouldHideMenu && <TopMenu />}
      <Box sx={{ mx: { xs: 1, md: 4 }, my: 4 }}>
        <AppRouter />
      </Box>
    </Stack>
  );
}
