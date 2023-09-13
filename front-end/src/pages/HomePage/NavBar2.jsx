import Popup from 'reactjs-popup'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoMdClose } from 'react-icons/io'
import { Link } from "react-router-dom";
import './styles.css'
import {
  NavContent,
  HamburgerIconButton,
  ModalContainer,
  CloseButton,
  NavLinksList,
  NavLinkItem,
} from './styledComponents'

const NavBar = () => (
  <NavContent>
    <Popup
      modal
      trigger={
        <HamburgerIconButton data-testid="hamburgerIconButton" className='justify-content-end align-content-end align-items-end'>
          <GiHamburgerMenu size="30" className='text-info'/>
        </HamburgerIconButton>
      }
      className="popup-content"
    >
      {close => (
        <ModalContainer className='bg-secondary '>
          <CloseButton
            type="button"
            className='btn btn-close btn-danger bg-danger'
            data-testid="closeButton"
            onClick={() => close()}
          >
            <IoMdClose size="30" />
          </CloseButton>

          <NavLinksList>
            <NavLinkItem className='navibar-button justify-content-center align-content-center align-items-center align-middle align-self-center'>
              <Link to="/relatorios" className="navibar-button justify-content-center align-content-center align-items-center align-middle align-self-center btn btn-light btn-sm m-1 w-auto fs-6">
                Relatórios
              </Link>
            </NavLinkItem>
            <NavLinkItem className='navibar-button justify-content-center align-content-center align-items-center align-middle align-self-center'>
              <Link to="/cadastro" className="navibar-button justify-content-center align-content-center align-items-center align-middle align-self-center btn btn-info btn-sm m-1 w-auto fs-6">
                Cadastro
              </Link>
            </NavLinkItem>
            <NavLinkItem className='navibar-button justify-content-center align-content-center align-items-center align-middle align-self-center'>
              <Link to="/reconhecimento" className="navibar-button justify-content-center align-content-center align-items-center align-middle align-self-center btn btn-success btn-sm m-1 w-auto fs-6">
                Acessar
              </Link>
            </NavLinkItem>
          </NavLinksList>
        </ModalContainer>
      )}
    </Popup>
  </NavContent>
)

export default NavBar;