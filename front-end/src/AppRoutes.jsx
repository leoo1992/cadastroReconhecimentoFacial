import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Cadastro from "./pages/Cadastro";
import Listas from "./pages/Listas";
import Login from "./pages/LoginPage";
import CadastrarUser from "./pages/LoginPage/CadastroUser";
import Atualiza from "./pages/Cadastro/Atualiza";
import Cadastrados from "./pages/Listas/Cadastrados";
import Usuarios from "./pages/Listas/Usuarios";
import Logs from "./pages/Listas/Logs";

const AppRoutes = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={authenticated ? <HomePage /> : <Login />} />
        <Route path="/home" element={authenticated ? <HomePage /> : <Navigate to="/" />} />

        <Route path="/cadastro" element={authenticated ? <Cadastro /> : <Navigate to="/" />} />
        <Route path="/cadastrousers" element={authenticated ? <CadastrarUser /> : <CadastrarUser />} />

        <Route path="/listas" element={authenticated ? <Listas /> : <Navigate to="/" />} />
        <Route path="/cadastrados" element={authenticated ? <Cadastrados /> : <Navigate to="/" />} />
        <Route path="/logs" element={authenticated ? <Logs /> : <Navigate to="/" />} />
        <Route path="/atualiza/:id" element={authenticated ? <Atualiza /> : <Navigate to="/" />} />
        <Route path="/usuarios" element={authenticated ? <Usuarios /> : <Navigate to="/" />} />

      </Routes>
    </Router>
  );
};

export default AppRoutes;