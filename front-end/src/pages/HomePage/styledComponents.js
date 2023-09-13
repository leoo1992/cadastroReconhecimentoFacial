import styled from 'styled-components'

export const NavContent = styled.div`
background-color: transparent;
  width: 90%;
  max-width: 458px;
  @media screen and (min-width: 768px) {
    max-width: 1110px;
  }
`

export const HamburgerIconButton = styled.button`
  background-color: transparent;
  width: 42px;
  height: 35px;
  border: none;
  outline: none;
  cursor: pointer;
`

export const ModalContainer = styled.div`
background-color: transparent;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100vw;
`

export const CloseButton = styled.button`
  align-self: flex-end;
  width: 30px;
  height: 30px;
  border: none;
  margin-top: 32px;
  margin-right: 15px;
  outline: none;
  cursor: pointer;
`

export const NavLinksList = styled.ul`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding-left: 0;
`

export const NavLinkItem = styled.li`
  list-style-type: none;
`
