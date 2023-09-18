import React, { useState, useEffect } from 'react';
import "./relatorio.css";
import api from "./axiosConfig";
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimesCircle, faTrash, faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Triangle } from 'react-loader-spinner'
import MenuIcon from '../HomePage/Menuicon';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const Cadastrados = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [theme, setTheme] = useState("default");
  const divElement = document.querySelector('.sc-dIEoRj.FTDsi');
  const divElement2 = document.querySelector('.sc-ktwNLz.cpNOok');

  if (divElement) {
    divElement.textContent = '1 item selecionado';
  }
  if (divElement2) {
    divElement2.textContent = '1 item selecionado';
  }

  const ativoEnum = {
    0: "Sim",
    1: "Não",
  };

  const tipoEnum = {
    0: "Aluno",
    1: "Professor",
    2: "Responsável",
    3: "Terceiro",
  };

  const updateTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const [pagination, setPagination] = useState({
    page: 1,
    totalRecords: 1,
    totalPages: 1,
  });

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleRowSelected = React.useCallback(state => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      const selectedIds = selectedRows.map(r => r.id);
      if (window.confirm(`Você tem certeza que deseja deletar o(s) registro(s) selecionado(s) com IDs: ${selectedIds.join(', ')}?`)) {
        setToggleCleared(!toggleCleared);
        setData((data, selectedRows, 'id'));
      }
    };

    return (
      <div className='p-0 m-0'>
        <OverlayTrigger placement="bottom" overlay={<Tooltip id="edit-button-tooltip">Editar</Tooltip>}>
          <Button className="btn btn-light text-bg-primary p-1 m-0">
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        </OverlayTrigger>
        <span> </span>
        <OverlayTrigger placement="bottom" overlay={<Tooltip id="times-circle-button-tooltip">Desativar</Tooltip>}>
          <Button className="btn btn-light text-bg-warning p-1 m-0">
            <FontAwesomeIcon icon={faTimesCircle} />
          </Button>
        </OverlayTrigger>
        <span> </span>
        <OverlayTrigger placement="bottom" overlay={<Tooltip id="delete-button-tooltip">Excluir</Tooltip>}>
          <Button className="btn btn-light p-1 m-0 text-bg-danger" key="delete" onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </OverlayTrigger>
      </div>
    );
  }, [data, selectedRows, toggleCleared]);

  const customText = {
    rowsPerPage: 'Linhas por página:',
    previous: 'Anterior',
    next: 'Próxima',
    loading: 'Carregando...',
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

  const customSelectedMessage = (selectedCount, selectedRows) => {
    return `${selectedCount} ${selectedCount === 1 ? 'selecionado' : 'selecionados'}`;
  };

  const columns = [
    {
      name: 'Id',
      selector: row => row.id,
      sortable: true,
      reorder: true,
      width: '28px',
      center: true,
      compact: true,
    },
    {
      name: 'Nome',
      selector: row => row.nome,
      sortable: true,
      reorder: true,
      wrap: true,
      compact: true,
    },
    {
      name: 'CPF',
      selector: row => row.cpf,
      sortable: true,
      reorder: true,
      width: '110px',
      compact: true,
      hide: 'sm',
    },
    {
      name: 'Tipo',
      selector: row => tipoEnum[row.tipo],
      sortable: true,
      reorder: true,
      width: '120px',
      compact: true,
    },
    {
      name: 'Ativo',
      selector: row => ativoEnum[row.ativo],
      sortable: true,
      reorder: true,
      width: '60px',
      center: true,
      compact: true,
      hide: 'sm',
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/listar', {
          params: {
            pagina: pagination.page,
          },
        });

        const formattedData = response.data.registros.map((registro) => ({
          id: registro.id,
          nome: registro.nome,
          cpf: registro.cpf,
          tipo: registro.tipo,
          ativo: registro.ativo,
        }));

        setTimeout(() => {
          setData(formattedData);

          setPagination((prevPagination) => ({
            ...prevPagination,
            totalRecords: response.data.totalRegistros,
            totalPages: response.data.numeroDePaginas,
          }));

          setLoading(false);
        }, 3000);
      } catch (error) {
        console.error('Erro ao buscar dados do servidor:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [pagination.page]);

  const handlePageChange = (page) => {
    setPagination({ ...pagination, page });
  };

  const addButtonTooltip = (
    <Tooltip id="add-button-tooltip">Novo</Tooltip>
  );

  const searchButtonTooltip = (
    <Tooltip id="search-button-tooltip">Pesquisar</Tooltip>
  );


  return (
    <>
      {loading ? (
        <div className='container-fluid text-center m-0 p-0 d-flex flex-column justify-content-center align-items-center vh-100 vw-100 bg-fundo'>
          <Triangle
            color='cyan'
            className='vh-100 vw-100 c-info'
            ariaLabel="triangle-loading"
            visible={true}
          />
          <h1 className='text-center text-info mt-3 pt-3'>{customText.loading}</h1>
        </div>
      ) : (
        <>
          <div className="top-0 text-end bg-fundo col d-flex">
            <h4 className='text-start text-info m-0 p-2 col align-self-center' >Cadastrados</h4>
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
              defaultSortAsc
              contextActions={contextActions}
              onSelectedRowsChange={handleRowSelected}
              clearSelectedRows={toggleCleared}
              pagination
              selectableRows
              selectableRowsSingle
              paginationServer
              progressPending={loading}
              paginationTotalRows={pagination.totalRecords}
              paginationPerPage={10}
              paginationRowsPerPageOptions={[10, 20, 30]}
              paginationComponentOptions={{
                rowsPerPageText: 'Linhas por página:',
                rangeSeparatorText: 'de',
                noRowsPerPage: false,
              }}
              customSelectedMessage={customSelectedMessage}
              onChangePage={handlePageChange}
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
                      <Button className="btn btn-sm btn-light text-bg-primary p-0 m-0 text-center align-items-center">
                        <FontAwesomeIcon icon={faPlus} className='p-2 m-0 align-items-center text-center align-self-center justify-content-center align-content-center align-middle' />
                      </Button>
                    </OverlayTrigger>
                  </div>

                  <div className='text-end d-flex col m-0 p-0 input-group-sm justify-content-end'>
                    <input
                      className='text-center rounded p-0 m-0'
                      type="text"
                      placeholder="Pesquisar"
                      value={searchText}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                    <span> </span>
                    <OverlayTrigger placement="bottom" overlay={searchButtonTooltip}>
                      <Button className="btn btn-light text-bg-secondary btn-sm ml-1">
                        <FontAwesomeIcon icon={faSearch} />
                      </Button>
                    </OverlayTrigger>
                  </div>
                </div>
              }
              subHeaderAlign="left"
              onSearch={handleSearch}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Cadastrados;