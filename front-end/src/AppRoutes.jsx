import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Cadastro from "./pages/Cadastro";
import Atualiza from "./pages/Cadastro/Atualiza";
import Relatorios from "./pages/Relatorios";
import Cadastrados from "./pages/Relatorios/Cadastrados";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/cadastro" element={<Cadastro />} />
        <Route exact path="/relatorios" element={<Relatorios />} />
        <Route exact path="/cadastrados" element={<Cadastrados />} />
        <Route path="/atualiza/:id" element={<Atualiza />} />
        <Route exact path="/reconhecimento" />
        <Route exact path="/logs" />
        <Route exact path="/users" />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
