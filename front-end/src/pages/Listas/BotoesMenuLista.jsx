import React from 'react';
import "./listas.css";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const BotoesMenuLista = () => {

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
        {createButtonWithTooltip("Cadastrados", "/cadastrados", "Faces Cadastradas")}
        {createButtonWithTooltip("Logs", "/logs", "Logs Entrada / Saida")}
        {createButtonWithTooltip("Usuários", "/usuarios", "Usuários Administradores")}
    </>
  );
};

export default BotoesMenuLista;
