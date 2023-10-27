import React, { useState } from 'react';
import "./defaultpage.css";
import 'react-toastify/dist/ReactToastify.css';
import MenuIcon from '../HomePage/Menuicon';

const DefaultPage = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'default' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <>
      <div className="text-end bg-fundo d-flex col">
        <h4 className='text-start text-info m-0 p-1 col align-self-center' >EXEMPLO PAGINA PADRÃO</h4>
        <MenuIcon updateTheme={toggleTheme} />
      </div>

      <div className={`container-fluid mt-0 p-0 d-flex flex-column align-items-center vh-100 ${theme === "dark" ? "bg-dark" : "bg-fundo2"}`}>

        <h4>CONTEUDO AQUI</h4>

      </div>
    </>
  );
};

export default DefaultPage;