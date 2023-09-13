import React, { useState } from 'react';
import "./styles.css";
import NavBar from './NavBar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  const [theme, setTheme] = useState("default");

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("default");
    } else {
      setTheme("dark");
    }
  };
  return (
    <>
      <div className="bg-fundo flex-container m-0 p-0">
        <h5 className="titulo p-0 text-start text-info d-inline justify-content-center align-content-center align-items-center align-middle align-self-center">
          Face-ID
        </h5>
        <NavBar className="navibar-button justify-content-center align-content-center text-center align-items-center align-middle align-self-center" />
      </div>
      <div className={`container-fluid mt-0 p-0 d-flex flex-column align-items-end vh-100 ${theme === "dark" ? "bg-dark" : "bg-light"}`}>
        <div className='m-3'>
          <button onClick={toggleTheme} className='btn-tamanho btn btn-info p-0 m-0'>
            {theme === "dark" ? (
              <FontAwesomeIcon icon={faSun} className='text-white' />
            ) : (
              <FontAwesomeIcon icon={faMoon} className='text-black' />
            )}
          </button>
        </div>

      </div>
    </>
  );
};

export default HomePage;
