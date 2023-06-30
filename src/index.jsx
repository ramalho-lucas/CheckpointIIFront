import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import ThemeProvider from "./contexts/theme-context";
import AuthProvider from "./contexts/auth-context";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Detail from "./Routes/Detail";
import "./index.css";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children:[
      {path : "/", element: <Home/>},
      {path : "/login", element: <Login/>},
      {path : "/detail/:matricula", element: <Detail/>},
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById("root"));
//Lembre-se de configurar suas rotas e seu contexto aqui
root.render(
  <AuthProvider>
  <ThemeProvider >
    <RouterProvider router={router}/>
  </ThemeProvider>
</AuthProvider>

);
