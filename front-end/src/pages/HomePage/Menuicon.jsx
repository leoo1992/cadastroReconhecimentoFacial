import React, { useState, useEffect } from 'react';
import './home.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faArrowLeft, faHome, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import Menu from '../HomePage/Menu';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Cookies from 'js-cookie';

function MenuIcon(props) {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    props.updateTheme(theme);
  }, [theme, props]);

   const handleGoHome = () => {
      window.location.href = '/home';
    };

  const handlelogout = () => {
    const cookies = Cookies.get();
    for (const cookie in cookies) {
      Cookies.remove(cookie);
    }
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem('actionsExecuted', 'false');
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "default" : "dark";
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const goBackTooltip = (
    <Tooltip id="go-back-tooltip">Voltar</Tooltip>
  );

  const logoutTooltip = (
    <Tooltip id="go-back-tooltip">Logout</Tooltip>
  );

  const goHomeTooltip = (
    <Tooltip id="go-home-tooltip">Home</Tooltip>
  );

  const toggleThemeTooltip = (
    <Tooltip id="toggle-theme-tooltip">
      {theme === "dark" ? "Modo Claro" : "Modo Escuro"}
    </Tooltip>
  );

  return (
    <>
      <div className="d-flex m-1 p-0 align-items-center">
        <OverlayTrigger placement="bottom" overlay={goBackTooltip}>
          <FontAwesomeIcon onClick={handleGoBack} icon={faArrowLeft} className='btn btn-warning p-1 m-1' />
        </OverlayTrigger>
        <OverlayTrigger placement="bottom" overlay={goHomeTooltip}>
          <FontAwesomeIcon icon={faHome} onClick={handleGoHome} className='btn btn-info p-1 m-1' />
        </OverlayTrigger>
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
    </>
  );
}

export default MenuIcon;
