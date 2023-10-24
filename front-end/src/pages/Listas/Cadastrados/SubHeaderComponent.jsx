import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEye, faEyeSlash, faFilePdf, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { SearchField } from '@aws-amplify/ui-react';

const SubHeaderComponent = ({ showInactive, setShowInactive, exportToPDF, exportToExcel, searchQuery, onChange, onClear }) => {
  const addButtonTooltip = (
    <Tooltip id="add-button-tooltip">Novo</Tooltip>
  );

  const printButtonTooltipPDF = (
    <Tooltip id="add-button-tooltip">Imprimir PDF</Tooltip>
  );
  const printButtonTooltipExcel = (
    <Tooltip id="add-button-tooltip">Imprimir Excel</Tooltip>
  );

  return (
    <div className='d-flex flex-row m-0 p-0 w-100  justify-content-between flex-wrap'>
      <div className='m-0 p-0 d-flex nowrap'>
        <OverlayTrigger placement="bottom" overlay={addButtonTooltip}>
          <Link to="/cadastro">
            <FontAwesomeIcon icon={faPlus} className='btn btn-sm btn-light text-bg-primary p-1 m-1 fs-5' />
          </Link>
        </OverlayTrigger>
        {showInactive ? (
          <OverlayTrigger placement="bottom" overlay={<Tooltip id="ocultar-button-tooltip">Ocultar Inativos</Tooltip>}>
            <FontAwesomeIcon icon={faEyeSlash} onClick={() => setShowInactive(false)} className='eye-icon btn btn-sm btn-light text-bg-primary p-1 m-1 fs-5' />
          </OverlayTrigger>
        ) : (
          <OverlayTrigger placement="bottom" overlay={<Tooltip id="exibir-button-tooltip">Exibir Inativos</Tooltip>}>
            <FontAwesomeIcon icon={faEye} onClick={() => setShowInactive(true)} className='eye-icon btn btn-sm btn-light text-bg-primary p-1 m-1 fs-5' />
          </OverlayTrigger>
        )}
        <OverlayTrigger placement='bottom' overlay={printButtonTooltipPDF}>
          <FontAwesomeIcon icon={faFilePdf} onClick={exportToPDF} className='btn btn-sm btn-light text-bg-primary p-1 m-1 fs-5' />
        </OverlayTrigger>
        <OverlayTrigger placement='bottom' overlay={printButtonTooltipExcel}>
          <FontAwesomeIcon icon={faFileExcel} className='btn btn-sm btn-light text-bg-primary p-1 m-1 fs-5' onClick={exportToExcel} />
        </OverlayTrigger>
      </div>

      <SearchField
        placeholder="Procurar"
        size="small"
        hasSearchButton={false}
        hasSearchIcon={false}
        labelHidden={false}
        onChange={(event) => onChange(event)}
        onClear={onClear}
        value={searchQuery}
        className='m-0 p-0 rounded border-0 text-center fw-bolder fs-6 input-group-sm flex-wrap d-flex'
        style={{
          textAlign: "center",
          borderRadius: "8px",
          lineHeight: "29px",
          width: '150px'
        }}
      />
    </div>
  );
};

export default SubHeaderComponent;
