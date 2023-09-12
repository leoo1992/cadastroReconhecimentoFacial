import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Cadastro from "./pages/Cadastro";
import Relatorios from "./pages/Relatorios";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/cadastro" element={<Cadastro />} />
        <Route exact path="/relatorios" element={<Relatorios />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
