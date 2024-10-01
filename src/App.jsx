import React, { useEffect, useState } from "react";
import { Box, Grid, Stack } from "@mui/material";
import { BrowserRouter, Form } from "react-router-dom";
import { TopMenu } from "./components/TopMenu";
import { AppRouter } from "./AppRouter";
import { getCurrentWeather } from "./services/WeatherService";
import { WeatherIndicator } from "./components/WeatherIndicator";
import { FormRegistro } from './pages/FormRegisterPage';
import './index.css'

export function App() {
  return (
    <div style={{ padding: 20, display: 'flex', justifyContent: 'center' }}>
      <div className="background"></div>
      <FormRegistro />
    </div>
  )
}