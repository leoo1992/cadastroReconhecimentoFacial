import React from 'react';
import Popup from 'reactjs-popup'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoMdClose } from 'react-icons/io'
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import './home.css'
import {
  NavContent,
  HamburgerIconButton,
  ModalContainer,
  CloseButton,
  NavLinksList,
  NavLinkItem,
} from './styledComponents'

function Menu() {
  return (
    <NavContent>
      <Popup
        modal
        trigger={
          <HamburgerIconButton data-testid="hamburgerIconButton">
            <GiHamburgerMenu size="30" className='text-info' />
          </HamburgerIconButton>
        }
        className="popup-content"
      >
        {close => (
          <ModalContainer className='bg-fundo w-auto d-flex col'>
            <CloseButton
              type="button"
              className='btn btn-close btn-danger bg-danger m-1'
              data-testid="closeButton"
              onClick={() => close()}
            >
              <IoMdClose size="30" />
            </CloseButton>

            <NavLinksList className='p-3 m-0 d-flex col'>
              <NavLinkItem className='justify-content-center align-content-center align-items-center align-middle align-self-center'>
                <Link to="/relatorios" className="navibar-button justify-content-center align-content-center align-items-center align-middle align-self-center btn btn-light btn-sm m-1 fs-6">
                  Relatórios
                </Link>
              </NavLinkItem>
              <NavLinkItem className=' justify-content-center align-content-center align-items-center align-middle align-self-center'>
                <Link to="/cadastro" className="navibar-button justify-content-center align-content-center align-items-center align-middle align-self-center btn btn-info btn-sm m-1 fs-6">
                  Cadastro
                </Link>
              </NavLinkItem>
              <NavLinkItem className=' justify-content-center align-content-center align-items-center align-middle align-self-center'>
                <Link to="/reconhecimento" className="navibar-button justify-content-center align-content-center align-items-center align-middle align-self-center btn btn-success btn-sm m-1 fs-6">
                  Acessar
                </Link>
              </NavLinkItem>
            </NavLinksList>
          </ModalContainer>
        )}
      </Popup>
    </NavContent>
  );
}

export default Menu;