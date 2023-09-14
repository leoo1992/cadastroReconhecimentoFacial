import React, { useState } from 'react';
import './home.css';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faArrowLeft, faHome } from "@fortawesome/free-solid-svg-icons";
import Menu from '../HomePage/Menu';

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
  return (
    <>
      <div className="mt-1">
        <button onClick={handleGoBack} className='btn btn-warning p-0 m-0'>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        <span> </span>

        <button onClick={handleGoHome} className='btn btn-info p-0 m-0'>
          <FontAwesomeIcon icon={faHome} />
        </button>

        <span> </span>

        <button onClick={toggleTheme} className='btn-tamanho btn btn-info p-0 m-0'>
          {theme === "dark" ? (
            <FontAwesomeIcon icon={faSun} className='text-white' />
          ) : (
            <FontAwesomeIcon icon={faMoon} className='text-black' />
          )}
        </button>

      </div>
      <Menu />
    </>
  );
}
export default MenuIcon;