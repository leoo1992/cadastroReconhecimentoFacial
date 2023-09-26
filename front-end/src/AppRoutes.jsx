import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import HomePage from "./pages/HomePage";
import Cadastro from "./pages/Cadastro";
import Listas from "./pages/Listas";
import Login from "./pages/LoginPage";
import CadastrarUser from "./pages/LoginPage/CadastroUser";
import Atualiza from "./pages/Cadastro/Atualiza";
import Cadastrados from "./pages/Listas/Cadastrados";

const AppRoutes = () => {
  // eslint-disable-next-line
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/cadastrousers" element={<CadastrarUser />} />
        <Route exact path="/reconhecimento" />
        <Route exact path="/logs" />
      </Routes>

        <PrivateRoute
          path="/home"
          element={<HomePage />}
          authenticated={authenticated}
        />
        <PrivateRoute
          path="/cadastro"
          element={<Cadastro />}
          authenticated={authenticated}
        />
        <PrivateRoute
          path="/listas"
          element={<Listas />}
          authenticated={authenticated}
        />
        <PrivateRoute
          path="/cadastrados"
          element={<Cadastrados />}
          authenticated={authenticated}
        />
        <PrivateRoute
          path="/atualiza/:id"
          element={<Atualiza />}
          authenticated={authenticated}
        />
    </Router>
  );
};

export default AppRoutes;