import React, { useState} from "react";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import 'react-toastify/dist/ReactToastify.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer';
import { Button } from 'react-bootstrap';
import FormLogin from './FormLogin';

const LoginPage = () => {

  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("default");
    } else {
      setTheme("dark");
    }
  };

  const toggleThemeTooltip = (
    <Tooltip id="toggle-theme-tooltip">
      {theme === "dark" ? "Modo Claro" : "Modo Escuro"}
    </Tooltip>
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
      </div>
      <div className={`mt-0 p-0 d-flex flex-column align-items-center vh-100 ${theme === "dark" ? "bg-dark" : "bg-fundo2"}`}>
        <h3 className='text-info fw-bold pt-2 mt-2'>Login</h3>
        <FormLogin />
        <Footer />
      </div>
    </>
  );
};

export default LoginPage;