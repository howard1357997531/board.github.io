import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//npm install react-cookie
import { CookiesProvider } from "react-cookie";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CookiesProvider>
    <React.StrictMode>
      <BrowserRouter>
        <div className="container index">
          <App />
        </div>
      </BrowserRouter>
    </React.StrictMode>
  </CookiesProvider>
);
