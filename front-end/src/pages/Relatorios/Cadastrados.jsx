import React, { useState, useEffect, useCallback } from 'react';
import "./relatorio.css";
import api from "./axiosConfig";
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimesCircle, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Triangle } from 'react-loader-spinner'
import MenuIcon from '../HomePage/Menuicon';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Link, useNavigate } from 'react-router-dom';
import Tooltip from 'react-bootstrap/Tooltip';

const Cadastrados = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [theme, setTheme] = useState("default");
  const [paginationPerPage, setPaginationPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  // eslint-disable-next-line
  const [perPage, setPerPage] = useState(10);
  // eslint-disable-next-line
  const [numerodepaginas, setNumerodepaginas] = useState(1);
  const [ativo, setAtivo] = useState("");
  const navigate = useNavigate();
  const divElement = document.querySelector('.rdt_TableHeader > div > div');
  if (divElement) {
    const selectedNome = selectedRows.map((r) => r.nome);
    divElement.textContent = selectedNome+ '  -  Selecionado';
  }

  const ativoEnum = {
    0: "Não",
    1: "Sim",
  };

  const fetchUsers = useCallback(async (page, perPage) => {
    setLoading(true);
    try {
      const response = await api.get(`/listar?pagina=${page}&limitePorPagina=${paginationPerPage}`);
      const { registros, numerodepaginas, totalregistros } = response.data;

      setData(registros);
      setTotalRows(totalregistros);
      setNumerodepaginas(numerodepaginas);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar dados do servidor: ", error);
      setLoading(false);
    }
  }, [paginationPerPage]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePerRowsChange = async (newPerPage) => {
    setPerPage(newPerPage);
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
    const handleDelete = () => {
      const selectedIds = selectedRows.map((r) => r.id);
      if (window.confirm(`Você tem certeza que deseja deletar o registro selecionado(s) com ID: ${selectedIds.join(', ')}?`)) {
        selectedIds.forEach(async (id) => {
          try {
            await api.delete(`/deletar/${id}`);
            alert("Registro excluido com sucesso");
            window.location.reload();
          } catch (error) {
            alert("Erro ao excluir registro");
          }
        });

        setToggleCleared(!toggleCleared);
      }
    };

    const handleDesativar = async () => {
      const selectedIds = selectedRows.map((r) => r.id);
      if (window.confirm(`Você tem certeza que deseja ${ativo === "1" ? "desativar" : "ativar"} o registro selecionado com ID: ${selectedIds.join(', ')}?`)) {
        selectedIds.forEach(async (id) => {
          try {
            await api.put(`/desativar/${id}`, { ativo: ativo === "1" ? 0 : 1 });
            alert(`Registro ${ativo === "1" ? "desativado" : "ativado"} com sucesso`);
            window.location.reload();
          } catch (error) {
            alert("Erro ao Ativar/Desativar registro");
          }
        });

        setToggleCleared(!toggleCleared);
      }
    };

    const handleEditar = async () => {
      if (selectedRows.length === 1) {
        const selectedId = selectedRows[0].id;
        navigate(`/atualiza/${selectedId}`);
      }
    };

    return (
      <div className='p-0 m-0'>
        <OverlayTrigger placement="bottom" overlay={<Tooltip id="edit-button-tooltip">Editar</Tooltip>}>
          <Button className="btn btn-light text-bg-primary p-1 m-0" onClick={handleEditar}>
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        </OverlayTrigger>
        <span> </span>
        <OverlayTrigger placement="bottom" overlay={<Tooltip id="times-circle-button-tooltip">Desativar</Tooltip>}>
          <Button className="btn btn-light text-bg-warning p-1 m-0" onClick={handleDesativar}>
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
  }, [selectedRows, toggleCleared, ativo]);

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
      width: '28px',
      center: true,
      compact: true,
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
      width: '110px',
      compact: true,
    },
    {
      name: 'Tipo',
      selector: (row) => tipoEnum[row.tipo],
      sortable: true,
      reorder: true,
      width: '120px',
      compact: true,
    },
    {
      name: 'Ativo',
      selector: (row) => ativoEnum[row.ativo],
      sortable: true,
      reorder: true,
      width: '60px',
      center: true,
      compact: true,
    },
  ];

  useEffect(() => {
    setLoading(true);
    fetchUsers(page, paginationPerPage);
  }, [page, paginationPerPage, fetchUsers]);


  const addButtonTooltip = (
    <Tooltip id="add-button-tooltip">Novo</Tooltip>
  );

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
                      <Link to="/cadastro">
                        <FontAwesomeIcon icon={faPlus} className='btn btn-sm btn-light text-bg-primary p-2 m-0 align-items-center text-center align-self-center justify-content-center align-content-center align-middle' />
                      </Link>
                    </OverlayTrigger>
                  </div>
                  {/* <div className='text-end d-flex col m-0 p-0 input-group-sm justify-content-end'>
                    <input
                      type="text"
                      placeholder="Pesquisar"
                    />
                  </div> */}
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

export default Cadastrados;
