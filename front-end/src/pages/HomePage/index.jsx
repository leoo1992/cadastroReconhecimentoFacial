import React from "react";
import "./styles.css";
import NavBar from './NavBar';

const HomePage = () => {
  return (
    <>
      <div className="bg-fundo flex-container m-0 p-0">
        <h5 className="text-start text-info d-inline mt-0 mr-0 mb-0 ml-3 p-0 justify-content-center align-content-center align-items-center align-middle align-self-center">
          Reconhecimento Facial
        </h5>
        <NavBar className="p-0 m-0 justify-content-center align-content-center text-center align-items-center align-middle align-self-center"/>
      </div>


    </>
  );
};

export default HomePage;
