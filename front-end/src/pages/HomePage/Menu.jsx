import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi'
import { Link } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import 'react-toastify/dist/ReactToastify.css';
import './home.css'


// <NavContent>
//   <Popup
//     modal
//     trigger={

//     }
//     className="popup-content fade"
//   >
//     {close => (
//       <ModalContainer className='bg-fundo w-auto d-flex col collapse collapse-horizontal' id="collapseWidthExample">
//         <CloseButton
//           type="button"
//           className='btn btn-close btn-danger bg-danger m-1'
//           data-testid="closeButton"
//           onClick={() => close()}
//         >
//         </CloseButton>


//       </ModalContainer>
//     )}
//   </Popup>
// </NavContent>
function Menu() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <GiHamburgerMenu size="30" className='text-info' />
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <ul className='p-3 m-0 d-flex col list-unstyled'>
            <li className='justify-content-center align-content-center align-items-center align-middle align-self-center'>
              <Link to="/relatorios" className="navibar-button justify-content-center align-content-center align-items-center align-middle align-self-center btn btn-light btn-sm m-1 fs-6">
                Relatórios
              </Link>
            </li>
            <li className=' justify-content-center align-content-center align-items-center align-middle align-self-center'>
              <Link to="/cadastro" className="navibar-button justify-content-center align-content-center align-items-center align-middle align-self-center btn btn-info btn-sm m-1 fs-6">
                Cadastro
              </Link>
            </li>
            <li className=' justify-content-center align-content-center align-items-center align-middle align-self-center'>
              <Link to="/reconhecimento" className="navibar-button justify-content-center align-content-center align-items-center align-middle align-self-center btn btn-success btn-sm m-1 fs-6">
                Acessar
              </Link>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Menu;