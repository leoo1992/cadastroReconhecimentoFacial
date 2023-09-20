import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Cadastro from "./pages/Cadastro";
import Atualiza from "./pages/Cadastro/Atualiza";
import Listas from "./pages/Listas";
import Cadastrados from "./pages/Listas/Cadastrados";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/cadastro" element={<Cadastro />} />
        <Route exact path="/listas" element={<Listas />} />
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
