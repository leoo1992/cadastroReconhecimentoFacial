import React, { useState, useEffect, useCallback } from 'react';
import '../listas.css';
import api from '../axiosConfig';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Triangle } from 'react-loader-spinner';
import MenuIcon from '../../HomePage/Menuicon';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import DeleteUserModal from './DeleteUserModal';
import SubHeaderUser from './SubHeaderUser';

const Usuarios = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [paginationPerPage, setPaginationPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  useEffect(() => {
    const divElement = document.querySelector('.rdt_TableHeader > div > div');

    if (divElement) {
      const selectedId = selectedRows.map((r) => r.id);
      divElement.textContent = selectedId + '  -  Selecionado';
    }
  }, [selectedRows]);

  const fetchAllData = useCallback(async () => {
    try {
      const response = await api.get('/imprimiruser', {});
      return response.data.registros;
    } catch (error) {
      console.error('Error fetching all data: ', error);
      return [];
    }
  }, []);

  const exportToPDF = async () => {
    const allData = await fetchAllData();
    const doc = new jsPDF();
    const tableData = allData.map((row) => [row.id, row.usuario]);
    doc.autoTable({
      head: [{ id: 'ID', usuario: 'Usuario' }],
      body: tableData,
    });
    doc.save('usuarios.pdf');
    toast.info('Download Iniciado');
  };

  const exportToExcel = async () => {
    const allData = await fetchAllData();
    const tableData = allData.map((row) => ({
      ID: row.id,
      Usuario: row.usuario,
    }));
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');
    XLSX.writeFile(wb, 'Usuarios.xlsx');
    toast.info('Download Iniciado');
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/deletaruser/${idToDelete}`);
      setShowModalDelete(false);
      setToggleCleared(!toggleCleared);
      toast.success('Usuário excluído com sucesso!');
      setTimeout(() => {
        window.location.reload();
      }, 4000);
    } catch (error) {
      toast.error('Erro ao excluir o usuário');
    }
  };

  const handleCancelDelete = () => {
    setShowModalDelete(false);
  };

  const fetchUsers = useCallback(async (page, perPage, searchQuery) => {
    try {
      const whereClause = {};
      const response = await api.get(`/listaruser?pagina=${page}&limitePorPagina=${paginationPerPage}&search=${searchQuery}`, {
        params: {
          where: whereClause,
        },
      });

      const { registros, totalregistros } = response.data;

      setData(registros);
      setTotalRows(totalregistros);
    } catch (error) {
      console.error('Erro ao buscar dados do servidor: ', error);
    }
  }, [paginationPerPage]);

  const search = async (query) => {
    try {
      const response = await api.get(`/pesquisaruser?termo=${query}`);
      setData(response.data.resultados);
    } catch (error) {
      console.error('Erro ao realizar pesquisa: ', error);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePerRowsChange = (newPerPage) => {
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
    },
  ];

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      search(searchQuery);
      fetchUsers(page, paginationPerPage, searchQuery);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [page, paginationPerPage, fetchUsers, searchQuery]);

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
      <DeleteUserModal
        showModal={showModalDelete}
        handleConfirmDelete={handleConfirmDelete}
        handleCancelDelete={handleCancelDelete}
        theme={theme}
      />
      <ToastContainer
        position='top-center'
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
            ariaLabel='triangle-loading'
            visible={true}
          />
          <h1 className='text-center text-info mt-3 pt-3'>{customText.loading}</h1>
        </div>
      ) : (
        <>
          <div className='top-0 text-end bg-fundo col d-flex sombra-baixo'>
            <h4 className='text-start text-info m-0 p-2 col align-self-center'>Usuários</h4>
            <MenuIcon updateTheme={updateTheme} />
          </div>
          <div className={`container-fluid m-0 p-0 vh-100 ${theme === 'dark' ? 'bg-dark' : 'bg-light'}`}>
            <DataTable
              className=''
              columns={columns}
              striped
              data={data}
              actions
              defaultSortField='id'
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
                <SubHeaderUser
                  exportToPDF={exportToPDF}
                  exportToExcel={exportToExcel}
                  onChange={onChange}
                  onClear={onClear}
                  searchQuery={searchQuery}
                />
              }
              subHeaderAlign='left'
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Usuarios;
