import React, { useState, useEffect, useCallback } from 'react';
import "./listas.css";
import api from "./axiosConfig";
import DataTable from 'react-data-table-component';
import { Triangle } from 'react-loader-spinner'
import MenuIcon from '../HomePage/Menuicon';
import 'react-toastify/dist/ReactToastify.css';
import Tooltip from 'react-bootstrap/Tooltip';
import { SearchField } from '@aws-amplify/ui-react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faFileExcel, faChartBar } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from 'react-toastify';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import casual from 'casual-browserify';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import {
  Chart as ChartJS,
  LinearScale,
  RadialLinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  Title,
  Filler,
} from 'chart.js';
import { Line, Bar, Pie, Doughnut, PolarArea, Radar } from 'react-chartjs-2';

const Logs = () => {
  const [theme, setTheme] = useState("dark");
  const [paginationPerPage, setPaginationPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showChart, setShowChart] = useState(false);
  const [activeChart, setActiveChart] = useState('bar');
  const [activeButton, setActiveButton] = useState('bar');

  const handleButtonClick = (chartType) => {
    setActiveButton(chartType);
  };

  // eslint-disable-next-line
  const toggleChart = (chartType) => {
    setActiveChart(chartType);
  };

  const toggleChartVisibility = () => {
    setShowChart(!showChart);
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    RadialLinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Filler,
    Legend,
    ArcElement
  );


  const exportToPDF = async () => {
    try {
      const allData = await fetchAllData();
      const formattedData = formatData(allData);

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
      toast.info("Download Iniciado");
    } catch (error) {
      console.error('Error exporting to PDF: ', error);
    }
  };

  const exportToExcel = async () => {
    try {
      const allData = await fetchAllData();
      const formattedData = formatData(allData);

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
      toast.info("Download Iniciado");
    } catch (error) {
      console.error('Error exporting to Excel: ', error);
    }
  };

  const fetchAllData = async () => {
    try {
      const response = await api.get('/imprimirlogs', {
        params: {
          where: {},
        },
      });

      return response.data.registros;
    } catch (error) {
      console.error('Error fetching all data: ', error);
      return [];
    }
  };

  const formatData = (data) => {
    return data.flatMap((log) => {
      if (!log.Pessoas || !Array.isArray(log.Pessoas)) {
        return [];
      }

      return log.Pessoas.map((pessoa) => {
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
    });
  };

  const printButtonTooltipPDF = (
    <Tooltip id="add-button-tooltip">Imprimir PDF</Tooltip>
  );
  const printButtonTooltipExcel = (
    <Tooltip id="add-button-tooltip">Imprimir Excel</Tooltip>
  );
  const geraGraficoButtonTooltip = (
    <Tooltip id="add-button-tooltip">Mostrar / Ocultar Grafico</Tooltip>
  );

  const fetchUsers = useCallback(async (page, perPage, searchQuery) => {
    try {
      setData([]);
      let whereClause = {};
      const response = await api.get(`/listarlogs?pagina=${page}&limitePorPagina=${paginationPerPage}&search=${searchQuery}`, {
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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      search(searchQuery);
      fetchUsers(page, paginationPerPage, searchQuery);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [page, paginationPerPage, fetchUsers, searchQuery, showChart]);

  const onClear = () => {
    setSearchQuery('');
    search('');
  };

  const onChange = (event) => {
    const newValue = event.target.value;
    setSearchQuery(newValue);
  };

  const chartData = {
    labels: formattedData.map((data) => data.pessoaNome),
    color: theme === 'dark' ? 'cyan' : 'gray',
    datasets: [
      {
        label: 'Tipo',
        data: formattedData.map(() => casual.integer(0, 6)),
        backgroundColor: [
          'rgba(255, 99, 132, 0.75)',
          'rgba(54, 162, 235, 0.75)',
          'rgba(255, 206, 86, 0.75)',
          'rgba(75, 192, 192, 0.75)',
          'rgba(153, 102, 255, 0.75)',
          'rgba(255, 159, 64, 0.75)',
          'rgba(128, 0, 128, 0.75)',
          'rgba(0, 128, 128, 0.75)',
          'rgba(255, 69, 0, 0.75)',
          'rgba(46, 139, 87, 0.75)',
          'rgba(255, 215, 0, 0.75)',
          'rgba(0, 255, 0, 0.75)',
          'rgba(255, 0, 0, 0.75)',
          'rgba(0, 0, 255, 0.75)',
          'rgba(255, 165, 0, 0.75)',
          'rgba(75, 0, 130, 0.75)',
          'rgba(255, 192, 203, 0.75)',
          'rgba(0, 255, 255, 0.75)',
          'rgba(255, 255, 0, 0.75)',
        ],
        borderColor: [
          theme === 'dark' ? 'white' : 'black',
        ],
        borderWidth: 1,
        color: theme === 'dark' ? 'cyan' : 'gray',
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: theme === 'dark' ? 'cyan' : 'gray',
        },
      },
      title: {
        display: false,
        color: theme === 'dark' ? 'cyan' : 'gray',
      },
      tooltips: {
        enabled: true,
        mode: 'index',
        callbacks: {
          label: (tooltipItem, data) => {
            const label = data.labels[tooltipItem.index];
            const value = data.datasets[0].data[tooltipItem.index];
            return `${label}: ${value}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: theme === 'dark' ? 'gray' : 'gray',
        },
        title: {
          display: true,
          text: 'Pessoa Nome',
          color: theme === 'dark' ? 'cyan' : 'gray',
        },
      },
      y: {
        min: 0,
        max: 6,
        ticks: {
          stepSize: 1,
        },
        grid: {
          color: theme === 'dark' ? 'gray' : 'gray',
        },
        title: {
          display: true,
          text: 'Pessoa Tipo',
          color: theme === 'dark' ? 'cyan' : 'gray',
        },
      },
    },
    tooltips: {
      enabled: true,
      mode: 'index',
      callbacks: {
        label: (tooltipItem, data) => {
          const label = data.labels[tooltipItem.index];
          const value = data.datasets[0].data[tooltipItem.index];
          return `${label}: ${value}`;
        },
      },
    },
  };

  return (
    <>
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
      {
        loading ? (
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
              <MenuIcon updateTheme={updateTheme} className='p-0 m-0 bg-info text-info' />
            </div>
            <div className={`container-fluid m-0 p-0 vh-100 ${theme === "dark" ? "bg-dark" : "bg-light"}`}>
              <div className='d-flex justify-content-end'>
                <OverlayTrigger placement='bottom' overlay={geraGraficoButtonTooltip}>
                  <FontAwesomeIcon icon={faChartBar} className='btn btn-sm btn-light text-bg-primary p-1 m-1 fs-5' onClick={toggleChartVisibility} />
                </OverlayTrigger>
              </div>
              {!showChart ? (
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
                    <div className='d-flex flex-row m-0 p-0 w-100  justify-content-between flex-wrap'>
                      <div className='m-0 p-0 d-flex nowrap'>
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
                        className={`m-0 p-0 rounded border-0 text-center fw-bolder fs-6 input-group-sm flex-wrap ${showChart ? 'd-none' : 'd-flex'}`}
                        style={{
                          textAlign: "center",
                          borderRadius: "8px",
                          lineHeight: "29px",
                          width: '150px'
                        }}
                      />
                    </div>
                  }
                  subHeaderAlign="left"
                  style={{
                    width: '100%',
                    height: '100%',
                    display: showChart ? 'none' : 'flex',
                  }}
                />
              ) : (
                <div className="d-none p-0 m-0"></div>
              )}
              {showChart ? (
                <>
                  <div className='d-flex flex-column justify-content-center align-content-center align-items-center p-0 m-0 h-75 w-100'>
                    <h5 className={`text-${theme === 'dark' ? 'light' : 'dark'}`}>Gráficos de Logs</h5>
                    <Nav variant="pills" defaultActiveKey="/home">
                      <Nav.Item className='mb-4'>
                        <Button
                          className={`m-1 btn ${activeButton === 'bar' ? 'btn-primary' : 'btn-info'} btn-sm`}
                          onClick={() => handleButtonClick('bar')}
                        >Barras
                        </Button>
                      </Nav.Item>
                      <Nav.Item>
                        <Button
                          className={`m-1 btn ${activeButton === 'line' ? 'btn-primary' : 'btn-info'} btn-sm`}
                          onClick={() => handleButtonClick('line')}
                        >Linha
                        </Button>
                      </Nav.Item>
                      <Nav.Item>
                        <Button
                          className={`m-1 btn ${activeButton === 'pie' ? 'btn-primary' : 'btn-info'} btn-sm`}
                          onClick={() => handleButtonClick('pie')}
                        >Rosca
                        </Button>
                      </Nav.Item>
                      <Nav.Item>
                        <Button
                          className={`m-1 btn ${activeButton === 'polar' ? 'btn-primary' : 'btn-info'} btn-sm`}
                          onClick={() => handleButtonClick('polar')}
                        >Polar
                        </Button>
                      </Nav.Item>
                      <Nav.Item>
                        <Button
                          className={`m-1 btn ${activeButton === 'area' ? 'btn-primary' : 'btn-info'} btn-sm`}
                          onClick={() => handleButtonClick('area')}
                        >Area
                        </Button>
                      </Nav.Item>
                    </Nav>
                    <Bar
                      data={chartData}
                      options={options}
                      className={`border border-1 border-black text-info p-3 m-0 ${activeChart === 'bar' ? 'd-flex' : 'd-none'}`}
                    />
                    <Line
                      data={chartData} options={options}
                      className={`border border-1 border-black text-info p-3 m-0 ${activeChart === 'line' ? 'd-flex' : 'd-none'}`}
                    />
                    <Pie
                      data={chartData}
                      options={options}
                      className={`border border-1 border-black text-info p-3 m-0 ${activeChart === 'pie' ? 'd-flex' : 'd-none'}`}
                    />
                    <Doughnut
                      data={chartData}
                      options={options}
                      className={`border border-1 border-black text-info p-3 m-0 ${activeChart === 'doughnut' ? 'd-flex' : 'd-none'}`}
                    />
                    <PolarArea
                      data={chartData}
                      options={options}
                      className={`border border-1 border-black text-info p-3 m-0 ${activeChart === 'polar' ? 'd-flex' : 'd-none'}`}
                    />
                    <Radar
                      data={chartData}
                      options={options}
                      className={`border border-1 border-black text-info p-3 m-0 ${activeChart === 'area' ? 'd-flex' : 'd-none'}`}
                    />
                  </div>
                </>
              ) : (
                <div className="d-none p-0 m-0"></div>
              )}
            </div>
          </>
        )
      }
    </>
  );
};

export default Logs;
