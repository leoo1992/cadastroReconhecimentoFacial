import React, { useState } from 'react';
import "./styles.css";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  const [theme, setTheme] = useState("default");

  const handleGoBack = () => {
    window.history.back();
  };

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("default");
    } else {
      setTheme("dark");
    }
  };

  return (
    <>
      <div className="top-0 text-end bg-fundo flex-container">
        <h4 className='text-start text-info m-0 p-0' >Relatórios</h4>
        <div>
          <button onClick={handleGoBack} className='btn btn-danger p-0 m-0'><FontAwesomeIcon icon={faArrowLeft} /></button>
          <span> </span>
          <button onClick={toggleTheme} className='btn-tamanho btn btn-info p-0 m-0'>
            {theme === "dark" ? (
              <FontAwesomeIcon icon={faSun} className='text-white' />
            ) : (
              <FontAwesomeIcon icon={faMoon} className='text-black' />
            )}
          </button>
          <span> </span>
        </div>
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

export default HomePage;
