import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import './home.css';
import { Transition } from 'react-transition-group';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faUserPlus, faMobileAlt } from "@fortawesome/free-solid-svg-icons";

function Menu() {
  const [open, setOpen] = useState(false),
    handleClose = () => setOpen(false),
    handleShow = () => setOpen(true),
    duration = 300,
    defaultStyle = {
      transition: `opacity ${duration}ms ease-in-out`,
      opacity: 0,
      display: 'none',
    };

   const redirectToExternalURL = () => {
      window.open("http://127.0.0.1:5500/reconhecimento/", "_blank");
  };

   const transitionStyles = {
      entering: { opacity: 0, display: 'block' },
      entered: { opacity: 1, display: 'block' },
      exiting: { opacity: 0, display: 'block' },
      exited: { opacity: 0, display: 'none' },
    };

   const closeButtonTooltip = (
      <Tooltip id="close-button-tooltip">Fechar</Tooltip>
    );

  return (
    <>
      <OverlayTrigger placement="bottom" overlay={<Tooltip id="menu-tooltip">Menu</Tooltip>}>
        <Button
          variant="primary"
          onClick={handleShow}
          aria-expanded={open}
          className='d-flex m-2 p-1 align-items-center text-black bg-info border-0'
          type="button"
        >
          <GiHamburgerMenu className='p-0 m-0' />
        </Button>
      </OverlayTrigger>



      <Transition in={open} timeout={duration}>
        {(state) => (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            <Offcanvas
              show={open}
              onHide={handleClose}
              placement="end"
              className="w-auto border-1 border-info hover-menu"
            >
              <Offcanvas.Header className='bg-fundo flex-row'>
                <div className='col'>
                  <Offcanvas.Title><h5 className='text-center text-info m-0 p-0'>Menu</h5></Offcanvas.Title>
                </div>
                <div className='d-flex'>
                  <OverlayTrigger placement="bottom" overlay={closeButtonTooltip}>
                    <CloseButton type="button" onClick={handleClose} className='text-end btn btn-info  btn-sm bg-info text-white p-1 m-0' data-bs-dismiss="offcanvasDark" aria-label="Close" />
                  </OverlayTrigger>
                </div>
              </Offcanvas.Header>

              <Offcanvas.Body className='bg-fundo d-flex justify-content-center'>
                <ul className='p-1 m-0 list-unstyled d-flex-column text-start'>
                  <li className>
                    <OverlayTrigger placement="left" overlay={<Tooltip id="listas-tooltip">Listas</Tooltip>}>
                      <Link to="/listas" className="btn-menu-tamanho btn btn-info btn-sm mt-3 fs-6 text-start fw-bold">
                        <FontAwesomeIcon icon={faList} className="me-2" /> Listas
                      </Link>
                    </OverlayTrigger>
                  </li>
                  <li className>
                    <OverlayTrigger placement="left" overlay={<Tooltip id="cadastro-tooltip">Cadastro</Tooltip>}>
                      <Link to="/cadastro" className="btn-menu-tamanho btn btn-info btn-sm mt-3 fs-6 fw-bold text-start">
                        <FontAwesomeIcon icon={faUserPlus} className="me-2 text-start " /> Cadastro
                      </Link>
                    </OverlayTrigger>
                  </li>
                  <li className>
                    <OverlayTrigger placement="left" overlay={<Tooltip id="acessar-tooltip">Acessar</Tooltip>}>
                      <Button
                        onClick={() => redirectToExternalURL()}
                        target="_blank"
                        className="btn-menu-tamanho btn btn-info btn-sm mt-3 fs-6 fw-bold text-start">
                        <FontAwesomeIcon icon={faMobileAlt} className="me-2 text-start" /> App
                      </Button>
                    </OverlayTrigger>
                  </li>
                </ul>
              </Offcanvas.Body>
            </Offcanvas>
          </div>
        )}
      </Transition>
    </>
  );
}

export default Menu;
