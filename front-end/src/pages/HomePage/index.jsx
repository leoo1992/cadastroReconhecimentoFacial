import React from "react";
import "./styles.css";
import NavBar from './NavBar';

const HomePage = () => {
  return (
    <div className="bg-fundo flex-container m-0 p-0">
        <h5 className="titulo p-0 text-start text-info d-inline justify-content-center align-content-center align-items-center align-middle align-self-center">
          Reconhecimento Facial
        </h5>
      <NavBar className="navibar-button justify-content-center align-content-center text-center align-items-center align-middle align-self-center" />
    </div>
  );
};

export default HomePage;
