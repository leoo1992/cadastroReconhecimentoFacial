import React, { useState } from 'react';
import "./listas.css";
import 'react-toastify/dist/ReactToastify.css';
import MenuIcon from '../HomePage/Menuicon';
import Footer from '../Footer';
import BotoesMenuLista from './BotoesMenuLista';

const Listas = () => {
  const [theme, setTheme] = useState("dark");

  const updateTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <>
      <div className="text-end bg-fundo d-flex col sombra-baixo">
        <h4 className='text-start text-info m-0 p-2 col align-self-center'>Listas</h4>
        <MenuIcon updateTheme={updateTheme} />
      </div>
      <div className={`container-fluid mt-0 p-0 d-flex flex-column align-items-center justify-content-start vh-100 ${theme === "dark" ? "bg-dark" : "bg-fundo2"}`}>
        <BotoesMenuLista />
      </div>
      <Footer />
    </>
  );
};

export default Listas;
