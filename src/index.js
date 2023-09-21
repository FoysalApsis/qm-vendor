import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import App from "./App";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import client from "./config/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// const theme = createTheme({
//   palette: {
//     // primary: "#1661CA",
//     // "primary-dark": "#0D3875",
//     // "primary-light": "#E6ECF5",
//     // secondary: "#FFCD00",
//     // "secondary-light": "#F7F3E1",
//     // tertiary: "#78909C",
//     // "tertiary-light": "#F2F5F7",
//     // "gray-A1": "#dae0e6",
//     // "gray-A2": "#F1F2F3",
//     // "gray-A3": "#5F6D7E",
//     blue:{
//       main:'#1661CA',
//       light:'#E6ECF5',
//       dark:'#0D3875'
//     }
//   },
// });

ReactDOM.render(
  // <ThemeProvider theme={theme}>
    <BrowserRouter>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        limit={3}
        theme="colored"
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
      <QueryClientProvider client={client}>
        <App />
        {/* <ReactQueryDevtools initialIsOpen={false} position="bottom-left" /> */}
      </QueryClientProvider>
    </BrowserRouter>
  // </ThemeProvider>
  ,
  document.getElementById("root")
);
