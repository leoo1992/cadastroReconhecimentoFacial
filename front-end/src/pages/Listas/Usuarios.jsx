import React, { useState, useEffect, useCallback } from 'react';
import "./listas.css";
import api from "./axiosConfig";
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faFilePdf, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { Triangle } from 'react-loader-spinner'
import MenuIcon from '../HomePage/Menuicon';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Link } from 'react-router-dom';
import Tooltip from 'react-bootstrap/Tooltip';
import { SearchField } from '@aws-amplify/ui-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button } from 'react-bootstrap';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';


const Usuarios = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [paginationPerPage, setPaginationPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const divElement = document.querySelector('.rdt_TableHeader > div > div');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);


  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/deletaruser/${idToDelete}`);
      setShowModalDelete(false);
      setToggleCleared(!toggleCleared);
      toast.success("Usuário excluído com sucesso!");
      setTimeout(() => {
        window.location.reload();
      }, 4000);
    } catch (error) {
      toast.error("Erro ao excluir o usuário");
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [{ id: 'ID', usuario: 'Usuário' }],
      body: data.map((row) => [row.id, row.usuario]),
    });
    doc.save('usuarios.pdf');
  };

  const exportToExcel = () => {
    const dataWithoutPassword = data.map(({ senha, ...rest }) => rest);
    const ws = XLSX.utils.json_to_sheet(dataWithoutPassword);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');
    XLSX.writeFile(wb, 'usuarios.xlsx');
  };


  const handleCancelDelete = () => {
    setShowModalDelete(false);
  };

  if (divElement) {
    const selectedId = selectedRows.map((r) => r.id);
    divElement.textContent = selectedId + '  -  Selecionado';
  }

  const fetchUsers = useCallback(async (page, perPage, searchQuery) => {
    try {
      let whereClause = {};

      const response = await api.get(`/listaruser?pagina=${page}&limitePorPagina=${paginationPerPage}&search=${searchQuery}`, {
        params: {
          where: whereClause,
        },
      });

      const { registros, totalregistros } = response.data;

      setData(registros);
      setTotalRows(totalregistros);
    } catch (error) {
      console.error("Erro ao buscar dados do servidor: ", error);
    }
  }, [paginationPerPage]);

  const search = async (query) => {
    try {
      const response = await api.get(`/pesquisaruser?termo=${query}`);
      setData(response.data.resultados);
    } catch (error) {
      console.error("Erro ao realizar pesquisa: ", error);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePerRowsChange = async (newPerPage) => {
    setPaginationPerPage(newPerPage);
  };

  const updateTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const handleRowSelected = (state) => {
    setSelectedRows(state.selectedRows);
  };

  const contextActions = React.useMemo(() => {
    const handleDelete = async () => {
      const selectedIds = selectedRows.map((r) => r.id);
      if (selectedIds.length > 0) {
        setShowModalDelete(true);
        setIdToDelete(selectedIds[0]);
      }
    };
    return (
      <>
        <div className='p-0 m-0 container d-flex justify-content-end' >
          <div className='p-0 m-0 row align-items-center' >
            <div className='p-0 m-0'>
              <OverlayTrigger placement="bottom" overlay={<Tooltip id="delete-button-tooltip">Excluir</Tooltip>}>
                <FontAwesomeIcon icon={faTrash} className="btn p-1 m-1 text-bg-danger" key="delete" onClick={handleDelete} />
              </OverlayTrigger>
            </div>
            <br />
          </div>
        </div>
      </>
    );
  }, [selectedRows]);

  const customText = {
    rowsPerPage: 'Linhas por página:',
    previous: 'Anterior',
    next: 'Próxima',
    loading: 'Carregando',
    noMatch: 'Nenhum registro encontrado',
    page: 'Página',
    of: 'de',
    selected: '{0} selecionado',
    noSelectedRowsSelected: '',
    selectedRows: {
      one: '{0} selecionado',
      other: '{0} selecionados',
    },
    noRowsSelected: '',
  };

  const customSelectedMessage = (selectedCount) => {
    return `${selectedCount} ${selectedCount === 1 ? 'selecionado' : 'selecionados'}`;
  };

  const columns = [
    {
      name: 'Id',
      selector: (row) => row.id,
      sortable: true,
      reorder: true,
      width: '60px',
    },
    {
      name: 'Usuario',
      selector: (row) => row.usuario,
      sortable: true,
      reorder: true,
    }
  ];

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      search(searchQuery);
      fetchUsers(page, paginationPerPage, searchQuery);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [page, paginationPerPage, fetchUsers, searchQuery]);


  const addButtonTooltip = (
    <Tooltip id="add-button-tooltip">Novo</Tooltip>
  );

  const printButtonTooltipPDF = (
    <Tooltip id="add-button-tooltip">Imprimir PDF</Tooltip>
  );
  const printButtonTooltipExcel = (
    <Tooltip id="add-button-tooltip">Imprimir Excel</Tooltip>
  );

  const onClear = () => {
    setSearchQuery('');
    search('');
  };

  const onChange = (event) => {
    const newValue = event.target.value;
    setSearchQuery(newValue);
  };

  return (
    <>
      <Modal show={showModalDelete} onHide={handleCancelDelete}>
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

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme='dark'
      />
      {loading ? (
        <div className='container-fluid text-center m-0 p-0 d-flex flex-column justify-content-center align-items-center align-self-center vh-100 vw-100 bg-fundo'>
          <Triangle
            color='cyan'
            className='vh-100 vw-100 p-0 m-0'
            ariaLabel="triangle-loading"
            visible={true}
          />
          <h1 className='text-center text-info mt-3 pt-3'>{customText.loading}</h1>
        </div>
      ) : (
        <>
          <div className="top-0 text-end bg-fundo col d-flex sombra-baixo">
            <h4 className='text-start text-info m-0 p-2 col align-self-center' >Usuários</h4>
            <MenuIcon updateTheme={updateTheme} />
          </div>
          <div className={`container-fluid m-0 p-0 vh-100 ${theme === "dark" ? "bg-dark" : "bg-light"}`}>
            <DataTable
              className=''
              columns={columns}
              striped
              data={data}
              actions
              defaultSortField="id"
              contextActions={contextActions}
              onSelectedRowsChange={handleRowSelected}
              clearSelectedRows={toggleCleared}
              pagination
              selectableRows
              selectableRowsSingle
              paginationServer
              progressPending={loading}
              paginationTotalRows={totalRows}
              paginationPerPage={paginationPerPage}
              paginationRowsPerPageOptions={[10, 20, 30]}
              paginationComponentOptions={{
                rowsPerPageText: 'Linhas por página:',
                rangeSeparatorText: 'de',
                noRowsPerPage: false,
              }}
              customSelectedMessage={customSelectedMessage}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handlePerRowsChange}
              text={customText}
              highlightOnHover
              pointerOnHover
              theme={theme}
              dense
              subHeader
              subHeaderComponent={
                <div className='flex-container m-0 p-0 col align-items-center'>
                  <div className='text-start m-0 p-0 col'>
                    <OverlayTrigger placement="bottom" overlay={addButtonTooltip}>
                      <Link to="/cadastrousers">
                        <FontAwesomeIcon icon={faPlus} className='btn btn-sm btn-light text-bg-primary p-2 m-1 align-items-center text-center align-self-center justify-content-center align-content-center align-middle' />
                      </Link>
                    </OverlayTrigger>
                    <OverlayTrigger placement='bottom' overlay={printButtonTooltipPDF}>
                      <Button
                        className='btn btn-sm btn-light text-bg-primary p-1 m-1 align-items-center text-center align-self-center justify-content-center align-content-center align-middle'
                        onClick={exportToPDF}
                      >
                        <FontAwesomeIcon icon={faFilePdf} className='p-1 m-0 align-items-center text-center align-self-center justify-content-center align-content-center align-middle' />
                      </Button>
                    </OverlayTrigger>
                    <OverlayTrigger placement='bottom' overlay={printButtonTooltipExcel}>
                      <Button
                        className='btn btn-sm btn-light text-bg-primary p-1 m-1 align-items-center text-center align-self-center justify-content-center align-content-center align-middle'
                        onClick={exportToExcel}
                      >
                        <FontAwesomeIcon icon={faFileExcel} className='p-1 m-0 align-items-center text-center align-self-center justify-content-center align-content-center align-middle' />
                      </Button>
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
                    className='m-0 p-0 d-flex rounded border-0 text-center fw-bolder'
                    style={{
                      textAlign: "center",
                      borderRadius: "8px",
                      lineHeight: "29px"
                    }}
                  />
                </div>
              }
              subHeaderAlign="left"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </>
      )
      }
    </>
  );
};
export default Usuarios;
