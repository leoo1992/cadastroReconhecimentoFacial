import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Cadastro from "./pages/Cadastro";
import Listas from "./pages/Listas";
import Login from "./pages/LoginPage";
import CadastrarUser from "./pages/LoginPage/CadastroUser";
import Atualiza from "./pages/Cadastro/Atualiza";
import Cadastrados from "./pages/Listas/Cadastrados";

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
        <Route path="/" element={authenticated ? <Navigate to="/home" /> : <Login />} />
        <Route path="/cadastrousers" element={authenticated ? <Navigate to="/cadastrousers" /> : <CadastrarUser />} />
        <Route path="/home" element={authenticated ? <HomePage /> : <Navigate to="/" />} />
        <Route path="/cadastro" element={authenticated ? <Cadastro /> : <Navigate to="/" />} />
        <Route path="/listas" element={authenticated ? <Listas /> : <Navigate to="/" />} />
        <Route path="/cadastrados" element={authenticated ? <Cadastrados /> : <Navigate to="/" />} />
        <Route path="/atualiza/:id" element={authenticated ? <Atualiza /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;