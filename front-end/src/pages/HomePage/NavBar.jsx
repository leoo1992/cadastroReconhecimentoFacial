import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  align-self: center;
  position: center;
  align-content:center;
  vertical-align: middle;
`;

const NavItem = styled.li`
  list-style: none;
  margin: 0 rem;
  Link {
    text-decoration: none;
  };
  justify-content: center;
  align-items: center;
  text-align: center;
  align-self: center;
  position: center;
  align-content:center;
  vertical-align: middle;
`;

const MobileNavToggle = styled.button`
  display: block;
  background-color: transparent;
  border: none;
  cursor: pointer;
  @media (min-width: 768px) {
    display: none;
  }
`;

const DesktopNav = styled.ul`
  display: flex;
  flex-direction: row;
  @media (max-width: 767px) {
    display: none;
  };
  justify-content: center;
  align-items: center;
  text-align: center;
  align-self: center;
  position: center;
  align-content:center;
  vertical-align: middle;
`;

const MobileNav = styled.ul`
  display: none;
  flex-direction: column;
  margin: 0;
  padding: 0;
  @media (max-width: 767px) {
    display: flex;
  }
`;

const NavBar = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);

  return (
    <Nav className='navibar-button navbar navbar-dark p-0 m-0 justify-content-center align-content-center align-items-center align-middle align-self-center'>
      <MobileNavToggle onClick={() => setIsMobileNavOpen(!isMobileNavOpen)} className='justify-content-end align-content-end align-items-end align-middle align-self-end'>
        {isMobileNavOpen ?
          <button type="button" className="btn btn-sm btn-danger text-white p-0 m-0 mb-2 rounded-circle" aria-label="Close"><span className='botao-x'>x</span>
          </button> :
          <button type="button" className="btn btn-sm btn-white fs-6 justify-content-center align-content-center align-items-center align-middle align-self-center" aria-label="Menu">
            <span className="navbar-toggler-icon"></span>
          </button>}
      </MobileNavToggle>

      <DesktopNav className='navibar-button justify-content-center align-content-center align-items-center align-middle align-self-center'>
        <NavItem className='navibar-button justify-content-center align-content-center align-items-center align-middle align-self-center'><Link to="/relatorios" className="navibar-button justify-content-center align-content-center align-items-center align-middle align-self-center btn btn-light btn-sm m-1 w-auto fs-6">
          Relatórios
        </Link></NavItem>
        <NavItem className='navibar-button justify-content-center align-content-center align-items-center align-middle align-self-center'><Link to="/cadastro" className="navibar-button justify-content-center align-content-center align-items-center align-middle align-self-center btn btn-info btn-sm m-1 w-auto fs-6">
          Cadastro
        </Link></NavItem>
        <NavItem className='navibar-button justify-content-center align-content-center align-items-center align-middle align-self-center'><Link to="/reconhecimento" className="navibar-button justify-content-center align-content-center align-items-center align-middle align-self-center btn btn-success btn-sm m-1 w-auto fs-6">
          Acessar
        </Link></NavItem>
      </DesktopNav>

      <MobileNav style={{ display: isMobileNavOpen ? 'flex' : 'none' }}>
        <NavItem className='p-0 m-0 justify-content-end align-content-end align-items-end align-middle align-self-end'><Link to="/relatorios" className="btn btn-light btn-sm mt-1 w-auto fs-6 p-1 mt-1">
          Relatórios
        </Link></NavItem>
        <NavItem className='p-0 m-0 justify-content-end align-content-end align-items-end align-middle align-self-end'><Link to="/cadastro" className="btn btn-info btn-sm w-auto fs-6 p-1 mt-1">
          Cadastro
        </Link></NavItem>
        <NavItem className='p-0 m-0 justify-content-end align-content-end align-items-end align-middle align-self-end'><Link to="/reconhecimento" className="btn btn-success btn-sm w-auto fs-6 p-1 mt-1 mb-1">
          Acessar
        </Link></NavItem>
      </MobileNav>

    </Nav>
  );
};
export default NavBar;