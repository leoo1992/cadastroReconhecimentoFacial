import React, { useState, useEffect } from 'react';
import "./styles.css";
import api from "./axiosConfig";
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faArrowLeft, faEdit, faTimesCircle, faTrash, faSearch} from "@fortawesome/free-solid-svg-icons";

const Cadastrados = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [theme, setTheme] = useState("default");
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

  const [pagination, setPagination] = useState({
    page: 1,
    totalRecords: 1,
    totalPages: 1,
  });

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("default");
    } else {
      setTheme("dark");
    }
  };

  const handleRowSelected = React.useCallback(state => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      if (window.confirm(`Voce tem certeza que deseja deletar o(s) registro(s) selecionados ${selectedRows.map(r => r.title)}?`)) {
        setToggleCleared(!toggleCleared);
        setData((data, selectedRows, 'title'));
      }
    };

    return (
      <div className='p-0 m-0'>
        <button className="btn btn-primary p-1 m-0">
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <span> </span>
        <button className="btn btn-warning p-1 m-0">
          <FontAwesomeIcon icon={faTimesCircle} />
        </button>
        <span> </span>
        <button className="btn btn-danger p-1 m-0" key="delete" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
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
    selected: 'selecionado',
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

        setData(formattedData);

        setPagination((prevPagination) => ({
          ...prevPagination,
          totalRecords: response.data.totalRegistros,
          totalPages: response.data.numeroDePaginas,
        }));

        setLoading(false);
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

  return (
    <html>
      {loading ? (
        <p>{customText.loading}</p>
      ) : (
        <div>
          <div className="top-0 text-end bg-fundo flex-container">
            <h4 className='text-start text-info m-0 p-0' >Relatório de Cadastrados</h4>
            <div>
              <button onClick={handleGoBack} className='btn btn-danger p-0 m-0'><FontAwesomeIcon icon={faArrowLeft} /></button>
              <span> </span>
              <button onClick={toggleTheme} className='btn btn-info p-0 m-0'>
                {theme === "dark" ? (
                  <FontAwesomeIcon icon={faSun} />
                ) : (
                  <FontAwesomeIcon icon={faMoon} />
                )}
              </button>
              <span> </span>
            </div>
          </div>
          <DataTable
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
            onChangePage={handlePageChange}
            text={customText}
            highlightOnHover
            pointerOnHover
            theme={theme}
            dense
            subHeader
            subHeaderComponent={
              <div className='text-end container-fluid'>
                <input
                  className='text-center rounded-2'
                  type="text"
                  placeholder="Pesquisar"
                  value={searchText}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <span> </span>
                <button className="btn btn-outline-secondary m-0 p-0">
                  <FontAwesomeIcon icon={faSearch} className='p-1' />
                </button>
              </div>
            }
            subHeaderAlign="left"
            onSearch={handleSearch}
          />
        </div>
      )}
    </html>
  );
};

export default Cadastrados;