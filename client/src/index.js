import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { SnackbarProvider } from 'notistack';
import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './styles';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
