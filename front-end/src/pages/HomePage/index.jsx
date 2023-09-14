import React, { useState } from 'react';
import "./home.css";
import Menu from './Menu';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import 'react-toastify/dist/ReactToastify.css';

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
      <div className="text-end bg-fundo d-flex col">
        <h5 className='text-start text-info m-0 p-1 col align-self-center'>
          Face-ID
        </h5>
        <div className="mt-1 col">
          <button onClick={toggleTheme} className='btn-tamanho btn btn-info p-0 m-0'>
            {theme === "dark" ? (
              <FontAwesomeIcon icon={faSun} className='text-white' />
            ) : (
              <FontAwesomeIcon icon={faMoon} className='text-black' />
            )}
          </button>
        </div>
          <Menu/>
      </div>
      <div className={`mt-0 p-0 d-flex flex-column align-items-center vh-100 ${theme === "dark" ? "bg-dark" : "bg-light"}`}>
        <h3 className='text-info'>Reconhecimento Facial</h3>
      </div>
    </>
  );
};

export default HomePage;
