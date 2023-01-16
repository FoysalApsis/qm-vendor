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

ReactDOM.render(
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
  </BrowserRouter>,
  document.getElementById("root")
);
