import React from "react";
import Routes from "./routes";
import { createMuiTheme, responsiveFontSizes, MuiThemeProvider } from '@material-ui/core';
/* Cores */
import green from '@material-ui/core/colors/green';
import lightGreen from '@material-ui/core/colors/lightGreen';

import './App.css';

let theme = createMuiTheme(
  {
    palette: {
      primary: green,
      secondary: lightGreen,
    },
  }

);
theme = responsiveFontSizes(theme);

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Routes />;
    </MuiThemeProvider>

  )
}

export default App;
