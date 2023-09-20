import React, { useState } from 'react';
import "./listas.css";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import MenuIcon from '../HomePage/Menuicon';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const Listas = () => {
  const [theme, setTheme] = useState("default");

  const updateTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const createButtonWithTooltip = (text, link, tooltipText) => (
    <OverlayTrigger
      key={text}
      placement="top"
      overlay={<Tooltip>{tooltipText}</Tooltip>}
    >
      <Button
        to={link}
        as={Link}
        className='btn btn-sm btn-info btn-menu border-black p-3 mt-3 fw-semibold'
      >
        {text}
      </Button>
    </OverlayTrigger>
  );

  return (
    <>
      <div className="text-end bg-fundo d-flex col">
        <h4 className='text-start text-info m-0 p-2 col align-self-center'>Listas</h4>
        <MenuIcon updateTheme={updateTheme} />
      </div>
      <div className={`container-fluid mt-0 p-0 d-flex flex-column align-items-center vh-100 ${theme === "dark" ? "bg-dark" : "bg-fundo2"}`}>
        {createButtonWithTooltip("Cadastrados", "/cadastrados", "Faces Cadastradas")}
        {createButtonWithTooltip("Logs", "/logs", "Logs Entrada / Saida")}
        {createButtonWithTooltip("Usuários", "/users", "Usuários Administradores")}
      </div>
    </>
  );
};

export default Listas;
