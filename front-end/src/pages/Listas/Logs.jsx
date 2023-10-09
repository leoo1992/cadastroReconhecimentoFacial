import React, { useState, useEffect, useCallback } from 'react';
import "./listas.css";
import api from "./axiosConfig";
import DataTable from 'react-data-table-component';
import { Triangle } from 'react-loader-spinner'
import MenuIcon from '../HomePage/Menuicon';
import { SearchField } from '@aws-amplify/ui-react';
import 'react-toastify/dist/ReactToastify.css';

const Logs = () => {
  const [theme, setTheme] = useState("dark");
  const [paginationPerPage, setPaginationPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const [setNumerodepaginas] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const moment = require('moment-timezone');

  const fetchUsers = useCallback(async (page, perPage, searchQuery) => {
    try {
      let whereClause = {};

      const response = await api.get(`/listarlogs?pagina=${page}&limitePorPagina=${paginationPerPage}&search=${searchQuery}`, {
        params: {
          where: whereClause,
        },
      });

      const { registros, numerodepaginas, totalregistros } = response.data;

      setData(registros);
      setTotalRows(totalregistros);
      setNumerodepaginas(numerodepaginas);
    } catch (error) {
      console.error("Erro ao buscar dados do servidor: ", error);
    }
    // eslint-disable-next-line
  }, [paginationPerPage]);

  const search = async (query) => {
    try {
      const response = await api.get(`/pesquisarlogs?termo=${query}`);
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


  const customText = {
    rowsPerPage: 'Linhas por página:',
    previous: 'Anterior',
    next: 'Próxima',
    loading: 'Carregando',
    noMatch: 'Nenhum registro encontrado',
    page: 'Página',
    of: 'de',
  };

  const formattedData = data.flatMap(log => {
    const ativoEnum = {
      0: "Não",
      1: "Sim",
    };
    const tipoEnum = {
      0: "Aluno",
      1: "Funcionário",
      2: "Responsável",
      3: "Terceiro",
    };

    return log.Pessoas.map(pessoa => {
      const dataEntrada = new Date(log.data + 'Z');
      const dataEntradaUTC = moment.utc(log.data);
      const dataFormatada = dataEntradaUTC.tz('America/Sao_Paulo').format('MM/DD/YYYY');
      const horaFormatada = dataEntrada.toLocaleTimeString('pt-BR', { timeZone: 'UTC' });

      return {
        id: pessoa.id,
        pessoaNome: pessoa.nome,
        pessoaTipo:  tipoEnum[pessoa.tipo],
        pessoaCpf: pessoa.cpf,
        data: dataFormatada,
        hora: horaFormatada,
        pessoaAtivo: ativoEnum[pessoa.ativo],
      };
    });
  });


  const columns = [
    {
      name: 'Id',
      selector: (row) => row.id,
      width: '65px',
      sortable: true,
      reorder: true,
    },
    {
      name: 'Nome',
      selector: (row) => row.pessoaNome,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Tipo',
      selector: (row) => row.pessoaTipo,
      sortable: true,
      reorder: true,
      width: '115px',
    },
    {
      name: 'CPF',
      selector: (row) => row.pessoaCpf,
      sortable: true,
      reorder: true,
      width: '115px',
    },
    {
      name: 'Data Entrada',
      selector: (row) => row.data,
      sortable: true,
      reorder: true,
      width: '120px',
    },
    {
      name: 'Hora Entrada',
      selector: (row) => row.hora,
      sortable: true,
      reorder: true,
      width: '120px',
    },
    {
      name: 'Ativo',
      selector: (row) => row.pessoaAtivo,
      sortable: true,
      reorder: true,
      width: '75px',
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
            <h4 className='text-start text-info m-0 p-2 col align-self-center'>Logs</h4>
            <MenuIcon updateTheme={updateTheme} />
          </div>
          <div className={`container-fluid m-0 p-0 vh-100 ${theme === "dark" ? "bg-dark" : "bg-light"}`}>
            <DataTable
              className=''
              columns={columns}
              striped
              data={formattedData}
              actions
              defaultSortField="id"
              defaultSortAsc
              pagination
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
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handlePerRowsChange}
              text={customText}
              highlightOnHover
              pointerOnHover
              theme={theme}
              dense
              subHeader
              subHeaderComponent={
                <div className='container-fluid d-flex m-0 p-0 justify-content-end'>
                  <SearchField
                    placeholder="Procurar"
                    size="small"
                    hasSearchButton={false}
                    hasSearchIcon={false}
                    labelHidden={false}
                    onChange={(event) => onChange(event)}
                    onClear={onClear}
                    value={searchQuery}
                    className='m-0 p-0 rounded border-0 text-center fw-bolder'
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
      )}
    </>
  );
};

export default Logs;
