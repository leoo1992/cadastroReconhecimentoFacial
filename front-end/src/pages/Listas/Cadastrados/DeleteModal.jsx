import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteModal = ({ show, onCancel, onConfirm }) => {
  return (
    <Modal show={show} onHide={onCancel}>
      <div className='modal-content text-center w-auto'>
        <Modal.Header>
          <Modal.Title>Exclusão</Modal.Title>
          <Button className='btn btn-info btn-close bg-info btn-sm p-2' onClick={onCancel}></Button>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir?
        </Modal.Body>
        <Modal.Footer className='justify-justify-content-evenly'>
          <Button variant="info" onClick={onCancel}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Confirmar
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default DeleteModal;
