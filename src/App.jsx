import React, { useEffect, useState } from "react";
import { Box, Grid, Stack } from "@mui/material";
import { BrowserRouter, Form } from "react-router-dom";
import { TopMenu } from "./components/TopMenu";
import { AppRouter } from "./AppRouter";
import { getCurrentWeather } from "./services/WeatherService";
import { WeatherIndicator } from "./components/WeatherIndicator";
import { FormRegister } from './components/FormRegister';
import './index.css'

export function App() {
  return (
    <div className="form-container">
      <FormRegister />
    </div>
  )
}