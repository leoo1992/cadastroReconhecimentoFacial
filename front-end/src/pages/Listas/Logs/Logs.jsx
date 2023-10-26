import {
  React, useState, useEffect, useCallback, api, DataTable, Triangle, MenuIcon, OverlayTrigger, FontAwesomeIcon,
  faChartBar, toast, ToastContainer, jsPDF, XLSX, casual, SubHeaderLogs, ChartSection,
  ativoEnum, tipoEnum, geraGraficoButtonTooltip, customText, columns
} from './LogsImports'

const Logs = () => {
  const [theme, setTheme] = useState("dark"),
    [paginationPerPage, setPaginationPerPage] = useState(10),
    [data, setData] = useState([]),
    [loading, setLoading] = useState(true),
    [totalRows, setTotalRows] = useState(0),
    [page, setPage] = useState(1),
    [searchQuery, setSearchQuery] = useState(''),
    [showChart, setShowChart] = useState(false),
    [activeChart, setActiveChart] = useState('bar'),
    [activeButton, setActiveButton] = useState('bar'),
    [quantidadePessoasHoje, setQuantidadePessoasHoje] = useState(null);

  const handleButtonClick = (chartType) => {
    setActiveChart(chartType);
    setActiveButton(chartType)
  };

  // eslint-disable-next-line
  const toggleChart = (chartType) => {
    setActiveChart(chartType);
  };

  const toggleChartVisibility = () => {
    setShowChart(!showChart);
  };

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

  useEffect(() => {
    const fetchQuantidadePessoasHoje = async () => {
      try {
        const response = await api.get('/logs-hoje');
        const { totalPessoasHoje } = response.data;
        setQuantidadePessoasHoje(totalPessoasHoje);
      } catch (error) {
        console.error('Erro ao buscar quantidade de pessoas que fizeram log hoje: ', error);
      }
    };
    fetchQuantidadePessoasHoje();

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
          'rgba(255, 99, 132, 0.75)', 'rgba(54, 162, 235, 0.75)', 'rgba(255, 206, 86, 0.75)', 'rgba(75, 192, 192, 0.75)',
          'rgba(153, 102, 255, 0.75)', 'rgba(255, 159, 64, 0.75)', 'rgba(128, 0, 128, 0.75)', 'rgba(0, 128, 128, 0.75)',
          'rgba(255, 69, 0, 0.75)', 'rgba(46, 139, 87, 0.75)', 'rgba(255, 215, 0, 0.75)', 'rgba(0, 255, 0, 0.75)',
          'rgba(255, 0, 0, 0.75)', 'rgba(0, 0, 255, 0.75)', 'rgba(255, 165, 0, 0.75)', 'rgba(75, 0, 130, 0.75)',
          'rgba(255, 192, 203, 0.75)', 'rgba(0, 255, 255, 0.75)', 'rgba(255, 255, 0, 0.75)',
        ],
        borderColor: [
          theme === 'dark' ? 'cyan' : 'black',
        ],
        borderWidth: 1,
        pointBackgroundColor: "rgba(0, 255, 255)",
        pointBorderColor: "rgba(0, 0, 255)",
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
                <div className='d-inline text-center'>
                  <p className="text-info m-1 p-1 fw-bold fs-5 text-center">Acessos Hoje:<span className="text-warning m-1 p-1 fw-bold fs-5">{quantidadePessoasHoje}</span></p>
                </div>
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
                    <SubHeaderLogs
                      exportToPDF={exportToPDF}
                      exportToExcel={exportToExcel}
                      onClear={onClear}
                      onChange={onChange}
                      searchQuery={searchQuery}
                      showChart={showChart}
                    />
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
                <ChartSection
                  theme={theme}
                  chartData={chartData}
                  options={options}
                  activeChart={activeChart}
                  activeButton={activeButton}
                  handleButtonClick={handleButtonClick}
                />
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
