import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@mui/material';

import { customMuiTheme } from './config/customMuiTheme';

import { App } from './App';
import './index.css'
import { Provider } from 'react-redux';
import { store } from './store/store';
import { DocenteProvider } from './context/DocenteContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ThemeProvider theme={customMuiTheme}>
      <DocenteProvider>
        <App />
      </DocenteProvider>
    </ThemeProvider>
  </Provider>
)
