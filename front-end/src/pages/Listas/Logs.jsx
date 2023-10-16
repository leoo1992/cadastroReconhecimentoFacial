import React, { useState, useEffect, useCallback } from 'react';
import "./listas.css";
import api from "./axiosConfig";
import DataTable from 'react-data-table-component';
import { Triangle } from 'react-loader-spinner'
import MenuIcon from '../HomePage/Menuicon';
import 'react-toastify/dist/ReactToastify.css';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const Logs = () => {
  const [theme, setTheme] = useState("dark");
  const [paginationPerPage, setPaginationPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [
        { id: 'ID', nome: 'Nome', tipo: 'Tipo', cpf: 'CPF', data: 'Data', hora: 'Hora', ativo: 'Ativo' },
      ],
      body: formattedData.map((row) => [
        row.id,
        row.pessoaNome,
        row.pessoaTipo,
        row.pessoaCpf,
        row.data,
        row.hora,
        row.pessoaAtivo,
      ]),
    });
    doc.save('Logs.pdf');
  };

  const exportToExcel = () => {
    const tableData = formattedData.map((row) => ({
      ID: row.id,
      Nome: row.pessoaNome,
      Tipo: row.pessoaTipo,
      CPF: row.pessoaCpf,
      Data: row.data,
      Hora: row.hora,
      Ativo: row.pessoaAtivo,
    }));
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Logs');
    XLSX.writeFile(wb, 'Logs.xlsx');
  };

  const printButtonTooltipPDF = (
    <Tooltip id="add-button-tooltip">Imprimir PDF</Tooltip>
  );
  const printButtonTooltipExcel = (
    <Tooltip id="add-button-tooltip">Imprimir Excel</Tooltip>
  );

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
              className=''
              columns={columns}
              striped
              data={formattedData}
              defaultSortField="id"
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
                <div className='d-flex flex-row w-100  justify-content-start nowrap'>
                  <OverlayTrigger placement='bottom' overlay={printButtonTooltipPDF}>
                    <FontAwesomeIcon icon={faFilePdf} onClick={exportToPDF} className='btn btn-sm btn-light text-bg-primary p-1 m-1 fs-5' />
                  </OverlayTrigger>
                  <OverlayTrigger placement='bottom' overlay={printButtonTooltipExcel}>
                    <FontAwesomeIcon icon={faFileExcel} className='btn btn-sm btn-light text-bg-primary p-1 m-1 fs-5' onClick={exportToExcel} />
                  </OverlayTrigger>
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
