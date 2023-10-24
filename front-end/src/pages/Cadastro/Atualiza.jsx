import React, { useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import "./cadastro.css";
import MenuIcon from '../HomePage/Menuicon';
import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer';
import FormAtualizaFaces from './FormAtualizaFaces';

const Atualiza = () => {
  const [theme, setTheme] = useState("dark");
  const updateTheme = (newTheme) => {
    setTheme(newTheme);
  };

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
      <div className="text-end bg-fundo d-flex col">
        <h4 className='text-start text-info m-0 p-2 col align-self-center' >Atualizar</h4>
        <MenuIcon updateTheme={updateTheme} />
      </div>
      <div className={`container-fluid mt-0 pt-4 d-flex flex-column align-items-center vh-100 ${theme === "dark" ? "bg-dark" : "bg-fundo2"}`}>
        < FormAtualizaFaces />
        <Footer />
      </div>
    </>
  );
};
export default Atualiza;
