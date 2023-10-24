import React from 'react';
import { FontAwesomeIcon, faTrash, OverlayTrigger, Tooltip } from './UserImports';

const UserContextActions = ({ selectedRows, handleDelete }) => {
  return (
    <div className='p-0 m-0 container d-flex justify-content-end'>
      <div className='p-0 m-0 row align-items-center'>
        <div className='p-0 m-0'>
          <OverlayTrigger placement='bottom' overlay={<Tooltip id='delete-button-tooltip'>Excluir</Tooltip>}>
            <FontAwesomeIcon icon={faTrash} className='btn p-1 m-1 text-bg-danger' key='delete' onClick={handleDelete} />
          </OverlayTrigger>
        </div>
        <br />
      </div>
    </div>
  );
};

export default UserContextActions;