
import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const ListasFooter = () => {
  return (
      <div className='bottom-0 container-fluid border-0 bg-dark p-2 d-flex justify-content-center align-content-center gap-2 h-100 w-100'>
        <button onClick={() => window.open("https://www.linkedin.com/in/leocustodio1992/", "_blank")} className='btn btn-sm p-1 text-warning text-bg-dark rounded-1'>
          <FaLinkedin size={35} />
        </button>
        <button onClick={() => window.open("https://github.com/leoo1992", "_blank")} className='btn btn-sm p-1 text-warning text-bg-dark rounded-1'>
          <FaGithub size={35} />
        </button>
      </div>
  );
};

export default ListasFooter;
