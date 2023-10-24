import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DesativarModal = ({ show, onCancel, onConfirm, ativo }) => {
  return (
    <Modal show={show} onHide={onCancel}>
      <div className='modal-content text-center w-auto'>
        <Modal.Header>
          <Modal.Title>{ativo === "1" ? "Desativar" : "Ativar"}</Modal.Title>
          <Button className='btn btn-info btn-close bg-info btn-sm p-2' onClick={onCancel}></Button>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja {ativo === "1" ? "desativar" : "ativar"}?
        </Modal.Body>
        <Modal.Footer className='justify-justify-content-evenly'>
          <Button variant="info" onClick={onCancel}>
            Cancelar
          </Button>
          <Button variant={ativo === "1" ? "danger" : "success"} onClick={onConfirm}>
            Confirmar
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default DesativarModal;
