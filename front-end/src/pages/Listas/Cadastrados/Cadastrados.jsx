import React, { useState, useEffect, useCallback } from 'react';
import "../listas.css";
import api from "../axiosConfig";
import DataTable from 'react-data-table-component';
import { Triangle } from 'react-loader-spinner'
import MenuIcon from '../../HomePage/Menuicon';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import DeleteModal from './DeleteModal';
import DesativarModal from './DesativarModal';
import SubHeaderComponent from './SubHeaderComponent';
import ContextActions from './ContextActions';

const Cadastrados = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [paginationPerPage, setPaginationPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const [ativo, setAtivo] = useState("");
  const navigate = useNavigate();
  const divElement = document.querySelector('.rdt_TableHeader > div > div');
  const [showInactive, setShowInactive] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [showModalDesativar, setShowModalDesativar] = useState(false);
  const [idToDesativar, setIdToDesativar] = useState(null);

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/deletar/${idToDelete}`);
      setShowModalDelete(false);
      setToggleCleared(!toggleCleared);
      toast.success("Registro excluído com sucesso! Recarregando Lista ...");
      setTimeout(() => {
        fetchUsers(page, paginationPerPage, searchQuery);
      }, 4000);
    } catch (error) {
      toast.error("Erro ao excluir o registro");
    }
  };

  const fetchAllData = async () => {
    try {
      const response = await api.get('/imprimir', {
      });

      return response.data.registros;
    } catch (error) {
      console.error('Error fetching all data: ', error);
      return [];
    }
  };

  const exportToPDF = async () => {
    const allData = await fetchAllData();
    const doc = new jsPDF();
    const tableData = allData.map((row) => [row.id, row.nome, row.cpf, tipoEnum[row.tipo], ativoEnum[row.ativo]]);
    doc.autoTable({
      head: [{ id: 'ID', nome: 'Nome', cpf: 'CPF', tipo: 'Tipo', ativo: 'Ativo' }],
      body: tableData,
    });
    doc.save('Cadastrados.pdf');
    toast.info("Download Iniciado");
  };

  const exportToExcel = async () => {
    const allData = await fetchAllData();
    const tableData = allData.map((row) => ({
      ID: row.id,
      Nome: row.nome,
      CPF: row.cpf,
      Tipo: tipoEnum[row.tipo],
      Ativo: ativoEnum[row.ativo],
    }));
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Cadastrados');
    XLSX.writeFile(wb, 'Cadastrados.xlsx');
    toast.info("Download Iniciado");
  };

  const handleConfirmDesativar = async () => {
    try {
      await api.put(`/desativar/${idToDesativar}`, { ativo: ativo === "1" ? 0 : 1 });
      setShowModalDesativar(false);
      setToggleCleared(!toggleCleared);
      toast.success(`Registro ${ativo === "1" ? "desativado" : "ativado"} com sucesso! Recarregando Lista ...`);
      setTimeout(() => {
        fetchUsers(page, paginationPerPage, searchQuery);
      }, 4000);
    } catch (error) {
      toast.error(`Erro ao ${ativo === "1" ? "desativado" : "ativado"} Registro`);
    }
  };

  const handleCancelDelete = () => {
    setShowModalDelete(false);
  };

  const handleCancelDesativar = () => {
    setShowModalDesativar(false);
  };

  if (divElement) {
    const selectedNome = selectedRows.map((r) => r.nome);
    divElement.textContent = selectedNome + '  -  Selecionado';
  }

  const ativoEnum = {
    0: "Não",
    1: "Sim",
  };

  const fetchUsers = useCallback(async (page, perPage, searchQuery) => {
    try {
      let whereClause = {};
      if (!showInactive) {
        whereClause = { ativo: 1 };
      }

      const response = await api.get(`/listar?pagina=${page}&limitePorPagina=${paginationPerPage}&showInactive=${showInactive}&search=${searchQuery}`, {
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

  }, [paginationPerPage, showInactive]);

  const search = async (query) => {
    try {
      const response = await api.get(`/pesquisar?termo=${query}`);
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

  const tipoEnum = {
    0: "Aluno",
    1: "Funcionário",
    2: "Responsável",
    3: "Terceiro",
  };

  const updateTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const handleRowSelected = (state) => {
    setSelectedRows(state.selectedRows);
    if (state.selectedRows.length === 1) {
      setAtivo(state.selectedRows[0].ativo);
    } else {
      setAtivo("");
    }
  };

  const contextActions = React.useMemo(() => {

    const handleDelete = async () => {
      const selectedIds = selectedRows.map((r) => r.id);
      if (selectedIds.length > 0) {
        setShowModalDelete(true);
        setIdToDelete(selectedIds[0]);
      }
    };

    const handleDesativar = async () => {
      const selectedIds = selectedRows.map((r) => r.id);
      if (selectedIds.length > 0) {
        setShowModalDesativar(true);
        setIdToDesativar(selectedIds[0]);
      }
    };

    const handleEditar = async () => {
      if (selectedRows.length === 1) {
        const selectedId = selectedRows[0].id;
        navigate(`/atualiza/${selectedId}`);
      }
    };

    const handleImageChange = async (event) => {
      console.log("Entrou na função handleImageChange");
      let file = event.target.files[0];

      console.log("Arquivo selecionado:", file);

      let selectedNome = selectedRows[0].nome;
      console.log("Nome selecionado:", selectedNome);

      if (file && file.type === 'image/jpeg') {
        let formData = new FormData();
        formData.append('image', file);

        try {
          let headers = new Headers();
          headers.append('nome', selectedNome);

          let response = await fetch('http://localhost:3002/salvar-imagem', {
            method: 'POST',
            headers: {
              'Content-Type': 'image/jpeg',
              'Nome': selectedNome,
            },
            body: file
          });

          if (response.ok) {
            event.target.value = '';
            toast.success('Imagem inserida com Sucesso !');
          } else {
            event.target.value = '';
            toast.error('Erro ao salvar a imagem.');
          }
        } catch (error) {
          console.error('Erro ao enviar a requisição:', error);
          event.target.value = '';
          toast.error('Erro ao salvar a imagem.');
        }
      } else {
        event.target.value = '';
        toast.error('Por favor, selecione um arquivo .jpeg.');
      }
      event.target.value = '';
    };

    return (
      <ContextActions
      selectedRows={selectedRows}
      navigate={navigate}
      handleImageChange={handleImageChange}
      handleDelete={handleDelete}
      handleDesativar={handleDesativar}
      handleEditar={handleEditar}
    />
    );
  }, [selectedRows, navigate]);

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
      name: 'Nome',
      selector: (row) => row.nome,
      sortable: true,
      reorder: true,
    },
    {
      name: 'CPF',
      selector: (row) => row.cpf,
      sortable: true,
      reorder: true,
      width: '120px',
    },
    {
      name: 'Tipo',
      selector: (row) => tipoEnum[row.tipo],
      sortable: true,
      reorder: true,
      width: '120px',
    },
    {
      name: 'Ativo',
      selector: (row) => ativoEnum[row.ativo],
      sortable: true,
      reorder: true,
      width: '80px',
    },
  ];

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      search(searchQuery);
      fetchUsers(page, paginationPerPage, searchQuery);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [page, paginationPerPage, fetchUsers, showInactive, searchQuery]);

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
      <DeleteModal show={showModalDelete} onCancel={handleCancelDelete} onConfirm={handleConfirmDelete} />
      <DesativarModal show={showModalDesativar} onCancel={handleCancelDesativar} onConfirm={handleConfirmDesativar} ativo={ativo} />
      <ToastContainer position="top-center"
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
            <h4 className='text-start text-info m-0 p-2 col align-self-center'>Cadastrados</h4>
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
                <SubHeaderComponent
                  showInactive={showInactive}
                  setShowInactive={setShowInactive}
                  exportToPDF={exportToPDF}
                  exportToExcel={exportToExcel}
                  searchQuery={searchQuery}
                  onChange={onChange}
                  onClear={onClear}
                />
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

export default Cadastrados;
