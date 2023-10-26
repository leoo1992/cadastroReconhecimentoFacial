import React from 'react';
import './footer.css';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      <footer className='p-0 m-0'>
        <svg viewBox="0 0 120 28">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="
             1 0 0 0 0
             0 1 0 0 0
             0 0 1 0 0
             0 0 0 13 -9" result="goo" />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
            <path id="wave" d="M 0,10 C 30,10 30,15 60,15 90,15 90,10 120,10 150,10 150,15 180,15 210,15 210,10 240,10 v 28 h -240 z" />
          </defs>
          <use id="wave3" className="wave" xlinkHref="#wave" x="0" y="-2"></use>
          <use id="wave2" className="wave" xlinkHref="#wave" x="0" y="0"></use>
          <g className="gooeff" filter="url(#goo)">
            <use id="wave1" className="wave" xlinkHref="#wave" x="0" y="1" />
          </g>
        </svg>
        <div className='border-0 bg-transparent m-0 p-0 d-flex justify-content-center gap-2'>
          <button onClick={() => window.open("https://www.linkedin.com/in/leocustodio1992/", "_blank")} className='btn btn-sm mb-1 p-1 text-warning position-relative text-bg-dark rounded-1'>
            <FaLinkedin size={25} />
          </button>
          <button onClick={() => window.open("https://github.com/leoo1992", "_blank")} className='btn btn-sm mb-1 p-1 text-warning position-relative text-bg-dark rounded-1'>
            <FaGithub size={25} />
          </button>
        </div>
      </footer>
    </>
  );
};

export default Footer;
