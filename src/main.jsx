import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/styles/index.css";
import { Provider } from "react-redux";
import { Providers } from "./redux/providers.jsx";
// import store from "./redux/store.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  // <Provider store={store}>
  //   <BrowserRouter>
  //     <App />
  //   </BrowserRouter>
  // </Provider>
  <Providers>
    {/* <ToastContainer /> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Providers>
);
