import React, { useEffect, useState } from "react";
import { Box, Grid, Stack } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { TopMenu } from "./components/TopMenu";
import { AppRouter } from "./AppRouter";

export function App() {
  const [weatherData, setWeatherData] = useState();

  return (
    <BrowserRouter>
      <Stack direction="column">
        <Grid container direction="row">
          <TopMenu />
        </Grid>
        <Box sx={{ mx: { xs: 1, md: 4 }, my: 4 }}>
          <AppRouter />
        </Box>
      </Stack>
    </BrowserRouter>
  );
}
