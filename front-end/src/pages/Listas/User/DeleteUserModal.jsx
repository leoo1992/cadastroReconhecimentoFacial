import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteUserModal = ({ showModal, handleConfirmDelete, handleCancelDelete, theme }) => {
  return (
    <Modal show={showModal} onHide={handleCancelDelete}>
      <div className={`modal-content text-center w-auto ${theme === "dark" ? "bg-dark text-white fw-bold" : "bg-light"}`}>
        <Modal.Header>
          <Modal.Title className='fs-5'>Exclusão</Modal.Title>
          <Button className='btn btn-info btn-close bg-info btn-sm p-2' onClick={handleCancelDelete}></Button>
        </Modal.Header>
        <Modal.Body className='fs-6'>
          Tem certeza que deseja excluir?
        </Modal.Body>
        <Modal.Footer className='justify-justify-content-evenly'>
          <Button variant="info fw-bold" onClick={handleCancelDelete}>
            Cancelar
          </Button>
          <Button variant="danger fw-bold" onClick={handleConfirmDelete}>
            Confirmar
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default DeleteUserModal;
