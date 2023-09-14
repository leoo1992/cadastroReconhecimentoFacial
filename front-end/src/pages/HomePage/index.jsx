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
      <div className="bg-fundo m-0 p-0 d-flex ">
        <h5 className="col titulo p-0 text-start text-info d-inline align-self-center">
          Face-ID
        </h5>
        <div className="mt-1 justify-content-end align-content-end align-items-end text-end">
          <button onClick={toggleTheme} className='btn-tamanho btn btn-info p-0 m-0'>
            {theme === "dark" ? (
              <FontAwesomeIcon icon={faSun} className='text-white' />
            ) : (
              <FontAwesomeIcon icon={faMoon} className='text-black' />
            )}
          </button>
        </div>
        <NavBar />
      </div>
      <div className={`mt-0 p-0 d-flex flex-column align-items-center vh-100 ${theme === "dark" ? "bg-dark" : "bg-light"}`}>
        <h3 className='text-info'>Reconhecimento Facial</h3>
      </div>
    </>
  );
};

export default HomePage;
