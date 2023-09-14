import React, { useState } from 'react';
import "./relatorio.css";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import MenuIcon from '../HomePage/Menuicon';

const Relatorios = () => {
  const [theme, setTheme] = useState("default");

  const updateTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <>
      <div className="text-end bg-fundo d-flex col">
        <h4 className='text-start text-info m-0 p-1 col align-self-center' >Relatórios</h4>
        <MenuIcon updateTheme={updateTheme} />
      </div>
      <div className={`container-fluid mt-0 p-0 d-flex flex-column align-items-center vh-100 ${theme === "dark" ? "bg-dark" : "bg-light"}`}>
        <Link to="/cadastrados">
          <button className='btn btn-sm btn-secondary btn-menu border-black p-3 mt-3'>Cadastrados</button>
        </Link>
        <Link to="/logs">
          <button className='btn btn-sm btn-info btn-menu border-black p-3 mt-3'>Logs</button>
        </Link>
        <Link to="/users">
          <button className='btn btn-sm btn-info btn-menu border-black p-3 mt-3'>Usuários</button>
        </Link>
      </div>
    </>

  );
};

export default Relatorios;
