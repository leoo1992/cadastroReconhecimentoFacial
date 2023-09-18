import React, { useState } from 'react';
import './home.css';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faArrowLeft, faHome } from "@fortawesome/free-solid-svg-icons";
import Menu from '../HomePage/Menu';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function MenuIcon(props) {
  const [theme, setTheme] = useState("default");

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("default");
      props.updateTheme("default");
    } else {
      setTheme("dark");
      props.updateTheme("dark");
    }
  };

  const goBackTooltip = (
    <Tooltip id="go-back-tooltip">Voltar</Tooltip>
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
