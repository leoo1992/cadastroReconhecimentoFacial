import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavItem = styled.li`
  list-style: none;
  margin: 0 rem;
  Link {
    text-decoration: none;
  }
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
  }
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
    <Nav className='navbar navbar-dark p-1 m-0 '>

      <MobileNavToggle onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
        {isMobileNavOpen ?
          <button type="button" className="btn btn-sm btn-close btn-info" aria-label="Close">
          </button> :
          <button type="button" className="btn btn-sm btn-white fs-6" aria-label="Menu">
            <span className="navbar-toggler-icon"></span>
          </button>}
      </MobileNavToggle>

      <DesktopNav>
        <NavItem><Link to="/relatorios" className="btn btn-light btn-sm m-1 w-auto fs-6">
          Relatórios
        </Link></NavItem>
        <NavItem><Link to="/cadastro" className="btn btn-info btn-sm m-1 w-auto fs-6">
          Cadastro
        </Link></NavItem>
        <NavItem><Link to="/reconhecimento" className="btn btn-success btn-sm m-1 w-auto fs-6">
          Acessar
        </Link></NavItem>

      </DesktopNav>
      <MobileNav style={{ display: isMobileNavOpen ? 'flex' : 'none' }}>
        <NavItem><Link to="/relatorios" className="btn btn-light btn-sm m-1 w-auto fs-6">
          Relatórios
        </Link></NavItem>
        <NavItem><Link to="/cadastro" className="btn btn-info btn-sm m-1 w-auto fs-6">
          Cadastro
        </Link></NavItem>
        <NavItem><Link to="/reconhecimento" className="btn btn-success btn-sm m-1 w-auto fs-6">
          Acessar
        </Link></NavItem>
      </MobileNav>
    </Nav>
  );
};
export default NavBar;