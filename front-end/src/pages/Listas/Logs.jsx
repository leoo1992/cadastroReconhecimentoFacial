import React, { useState, useEffect, useCallback } from 'react';
import "./listas.css";
import api from "./axiosConfig";
import DataTable from 'react-data-table-component';
import { Triangle } from 'react-loader-spinner'
import MenuIcon from '../HomePage/Menuicon';
import 'react-toastify/dist/ReactToastify.css';

const Logs = () => {
  const [theme, setTheme] = useState("dark");
  const [paginationPerPage, setPaginationPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);

  const fetchUsers = useCallback(async (page) => {
    try {
      const response = await api.get(`/listarlogs?pagina=${page}&limitePorPagina=${paginationPerPage}`, {
      });

      const { registros, totalregistros } = response.data;

      setData(registros);
      setTotalRows(totalregistros);
    } catch (error) {
      console.error("Erro ao buscar dados do servidor: ", error);
    }
  }, [paginationPerPage]);

  useEffect(() => {
    fetchUsers(page, paginationPerPage);
    setLoading(false);
  }, [page, paginationPerPage, fetchUsers]);

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

  const formattedData = data ? data.flatMap(log => {
    if (!log.Pessoas || !Array.isArray(log.Pessoas)) {
      return [];
    }

    return log.Pessoas.map(pessoa => {
      const dataEntrada = new Date(log.data);
      dataEntrada.setHours(dataEntrada.getHours() + 3);
      const dataFormatada = `${dataEntrada.getDate().toString().padStart(2, '0')}-${(dataEntrada.getMonth() + 1).toString().padStart(2, '0')}-${dataEntrada.getFullYear()}`;
      const horaFormatada = `${dataEntrada.getHours().toString().padStart(2, '0')}:${dataEntrada.getMinutes().toString().padStart(2, '0')}`;
      return {
        id: pessoa.id,
        pessoaNome: pessoa.nome,
        pessoaTipo: tipoEnum[pessoa.tipo],
        pessoaCpf: pessoa.cpf,
        data: dataFormatada,
        hora: horaFormatada,
        pessoaAtivo: ativoEnum[pessoa.ativo],
      };
    });
  }) : [];


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
              className='pt-4'
              columns={columns}
              striped
              data={formattedData}
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
            />
          </div>
        </>
      )}
    </>
  );
};

export default Logs;
