import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimesCircle, faTrash, faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const ContextActions = ({ selectedRows, navigate, handleImageChange, handleDelete, handleDesativar, handleEditar }) => {
  return (
    <div className='p-0 m-0 container-fluid d-flex justify-content-end align-items-center'>
      <label htmlFor="image-upload" className="btn text-bg-light m-1 p-0 btn">
        <OverlayTrigger placement="bottom" overlay={<Tooltip id="edit-image-tooltip">Add Image</Tooltip>}>
          <FontAwesomeIcon icon={faCameraRetro} className='m-0 p-0' />
        </OverlayTrigger>
        <input
          type="file"
          id="image-upload"
          accept=".jpeg"
          style={{ display: 'none' }}
          onChange={handleImageChange}
          className='m-0 p-0 btn-sm btn'
        />
      </label>

      <OverlayTrigger placement="bottom" overlay={<Tooltip id="edit-button-tooltip">Editar</Tooltip>}>
        <FontAwesomeIcon icon={faEdit} className="btn text-bg-primary p-1 m-1" onClick={handleEditar} />
      </OverlayTrigger>

      <OverlayTrigger placement="bottom" overlay={<Tooltip id="times-circle-button-tooltip">Desativar</Tooltip>}>
        <FontAwesomeIcon icon={faTimesCircle} className="btn text-bg-warning p-1 m-1" onClick={handleDesativar} />
      </OverlayTrigger>

      <OverlayTrigger placement="bottom" overlay={<Tooltip id="delete-button-tooltip">Excluir</Tooltip>}>
        <FontAwesomeIcon icon={faTrash} className="btn p-1 m-1 text-bg-danger" key="delete" onClick={handleDelete} />
      </OverlayTrigger>
    </div>
  );
};

export default ContextActions;
