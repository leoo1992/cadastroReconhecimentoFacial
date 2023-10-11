import React, { useState } from 'react';
import "./listas.css";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import MenuIcon from '../HomePage/Menuicon';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const Relatorios = () => {
  const [theme, setTheme] = useState("dark");

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
        className='btn btn-sm btn-info btn-menu border-black p-2 mt-5 fw-semibold'
      >
        {text}
      </Button>
    </OverlayTrigger>
  );

  return (
    <>
      <div className="text-end bg-fundo d-flex col sombra-baixo">
        <h4 className='text-start text-info m-0 p-2 col align-self-center'>Relatórios</h4>
        <MenuIcon updateTheme={updateTheme} />
      </div>
      <div className={`container-fluid mt-0 p-0 d-flex flex-column align-items-center justify-content-start vh-100 ${theme === "dark" ? "bg-dark" : "bg-fundo2"}`}>
        {createButtonWithTooltip("Cadastrados", "/cadastradosrelatorios", "Relatorio de Faces Cadastradas")}
        {createButtonWithTooltip("Logs", "/logsrelatorios", "Relatório de Logs Entrada / Saida")}
        {createButtonWithTooltip("Usuários", "/usuariosrelatorios", "Relatórios de Usuários")}
        {createButtonWithTooltip("Listas", "/listas", "Listas")}
      </div>
    </>
  );
};

export default Relatorios;