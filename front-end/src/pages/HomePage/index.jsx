import React, { useState } from 'react';
import "./home.css";
import Menu from './Menu';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Cookies from 'js-cookie';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("default");
    } else {
      setTheme("dark");
    }
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

  const handlelogout = () => {
    const cookies = Cookies.get();
    for (const cookie in cookies) {
      Cookies.remove(cookie);
    }
    localStorage.clear();
    sessionStorage.clear();
    toast.success("Logout efetuado com sucesso... Redirecionando.");
    setTimeout(() => {
      window.location.href = '/';
    }, 4000);
  };

  const toggleThemeTooltip = (
    <Tooltip id="toggle-theme-tooltip">
      {theme === "dark" ? "Modo Claro" : "Modo Escuro"}
    </Tooltip>
  );

  const logoutTooltip = (
    <Tooltip id="go-back-tooltip">Logout</Tooltip>
  );

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme='dark'
      />
      <div className="text-end bg-fundo d-flex sombra-baixo">
        <h5 className='text-start text-info m-0 p-2 col align-self-center fw-bold'>
          Face-ID
        </h5>
        <div className="d-flex m-1 p-0 align-items-center">
          <OverlayTrigger placement="bottom" overlay={logoutTooltip}>
            <FontAwesomeIcon onClick={handlelogout} icon={faSignOutAlt} className='btn btn-warning p-1 m-1' />
          </OverlayTrigger>
          <OverlayTrigger placement="bottom" overlay={toggleThemeTooltip}>
            <Button onClick={toggleTheme} className='btn-tamanho btn btn-info p-0 m-1'>
              {theme === "dark" ? (
                <FontAwesomeIcon icon={faSun} className='text-white p-0 m-0' />
              ) : (
                <FontAwesomeIcon icon={faMoon} className='text-black  m-0 p-0 ' />
              )}
            </Button>
          </OverlayTrigger>
        </div>
        <Menu />
      </div>
      <div className={`mt-0 p-0 d-flex flex-column align-items-center vh-100 ${theme === "dark" ? "bg-dark" : "bg-fundo2"}`}>
        <h3 className='text-info fw-bold pt-3 mt-1 text-start'>Home Page</h3>
        {createButtonWithTooltip("Cadastrados", "/cadastrados", "Faces Cadastradas")}
        {createButtonWithTooltip("Logs", "/logs", "Logs Entrada / Saida")}
        {createButtonWithTooltip("Usuários", "/usuarios", "Usuários Administradores")}
        {createButtonWithTooltip("Relatórios", "/relatorios", "Relatórios")}
      </div>
    </>
  );
};

export default HomePage;
