import React, { useState, useEffect, useCallback } from 'react';
import "./listas.css";
import api from "./axiosConfig";
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimesCircle, faTrash, faPlus, faEye, faEyeSlash, faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import { Triangle } from 'react-loader-spinner'
import MenuIcon from '../HomePage/Menuicon';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Link, useNavigate } from 'react-router-dom';
import Tooltip from 'react-bootstrap/Tooltip';
import { SearchField } from '@aws-amplify/ui-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button } from 'react-bootstrap';

const Cadastrados = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [paginationPerPage, setPaginationPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  // eslint-disable-next-line
  const [setNumerodepaginas] = useState(1);
  const [ativo, setAtivo] = useState("");
  const navigate = useNavigate();
  const divElement = document.querySelector('.rdt_TableHeader > div > div');
  const [showInactive, setShowInactive] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [showModalDesativar, setShowModalDesativar] = useState(false);
  const [idToDesativar, setIdToDesativar] = useState(null);

  // eslint-disable-next-line
  const toggleVisibility = () => {
    setShowInactive(!showInactive);
  };

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


      const { registros, numerodepaginas, totalregistros } = response.data;

      setData(registros);
      setTotalRows(totalregistros);
      setNumerodepaginas(numerodepaginas);
    } catch (error) {
      console.error("Erro ao buscar dados do servidor: ", error);
    }
    // eslint-disable-next-line
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
      debugger
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
      <>
        <div className='p-0 m-0 container-fluid d-flex justify-content-end align-items-center' >

          <label htmlFor="image-upload" className="btn text-bg-light m-1 p-0 btn">
            <OverlayTrigger placement="bottom" overlay={<Tooltip id="edit-image-tooltip">Add Image</Tooltip>}>
              <FontAwesomeIcon icon={faCameraRetro} className='m-0 p-0' />
            </OverlayTrigger>
            <input
              type="file"
              id="image-upload"
              accept=".jpeg"
              style={{ display: 'none' }}
              onChange={handleImageChange}
              className='m-0 p-0 btn-sm btn'
            />
          </label>

          <OverlayTrigger placement="bottom" overlay={<Tooltip id="edit-button-tooltip">Editar</Tooltip>}>
            <FontAwesomeIcon icon={faEdit} className="btn text-bg-primary p-1 m-1" onClick={handleEditar} />
          </OverlayTrigger>

          <OverlayTrigger placement="bottom" overlay={<Tooltip id="times-circle-button-tooltip">Desativar</Tooltip>}>
            <FontAwesomeIcon icon={faTimesCircle} className="btn text-bg-warning p-1 m-1" onClick={handleDesativar} />
          </OverlayTrigger>

          <OverlayTrigger placement="bottom" overlay={<Tooltip id="delete-button-tooltip">Excluir</Tooltip>}>
            <FontAwesomeIcon icon={faTrash} className="btn p-1 m-1 text-bg-danger" key="delete" onClick={handleDelete} />
          </OverlayTrigger>
        </div>
      </>
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


  const addButtonTooltip = (
    <Tooltip id="add-button-tooltip">Novo</Tooltip>
  );

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
      <Modal show={showModalDelete} onHide={handleCancelDelete}>
        <div className={`modal-content text-center w-auto ${theme === "dark" ? "bg-dark text-white fw-bold" : "bg-light"}`}>
          <Modal.Header>
            <Modal.Title className='fs-5'>Exclusão</Modal.Title>
            <Button className='btn btn-info btn-close bg-info btn-sm p-2' onClick={handleCancelDelete}></Button>
          </Modal.Header>
          <Modal.Body className='fs-6'>
            Tem certeza que deseja excluir?
          </Modal.Body>
          <Modal.Footer className='justify-justify-content-evenly'>
            <Button variant="info fw-bold" onClick={handleCancelDelete}>
              Cancelar
            </Button>
            <Button variant="danger fw-bold" onClick={handleConfirmDelete}>
              Confirmar
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
      <Modal show={showModalDesativar} onHide={handleCancelDesativar}>
        <div className={`modal-content text-center w-auto ${theme === "dark" ? "bg-dark text-white fw-bold" : "bg-light"}`}>
          <Modal.Header>
            <Modal.Title className='fs-5'>{ativo === "1" ? "Desativar" : "Ativar"}</Modal.Title>
            <Button className='btn btn-info btn-close bg-info btn-sm p-2' onClick={handleCancelDesativar}></Button>
          </Modal.Header>
          <Modal.Body className='fs-6'>
            Tem certeza que deseja {ativo === "1" ? "desativar" : "ativar"}?
          </Modal.Body>
          <Modal.Footer className='justify-justify-content-evenly'>
            <Button variant="info fw-bold" onClick={handleCancelDesativar}>
              Cancelar
            </Button>
            <Button variant={ativo === "1" ? "danger" : "success"} onClick={handleConfirmDesativar}>
              Confirmar
            </Button>
          </Modal.Footer>
        </div>
      </Modal>

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
                        <FontAwesomeIcon icon={faPlus} className='btn btn-sm btn-light text-bg-primary p-2 m-1 align-items-center text-center align-self-center justify-content-center align-content-center align-middle' />
                      </Link>
                    </OverlayTrigger>

                    {showInactive ? (
                      <OverlayTrigger placement="bottom" overlay={<Tooltip id="ocultar-button-tooltip">Ocultar Inativos</Tooltip>}>
                        <FontAwesomeIcon icon={faEyeSlash} onClick={() => setShowInactive(false)} className='eye-icon btn btn-sm btn-light text-bg-primary p-2 m-1 align-items-center text-center align-self-center justify-content-center align-content-center align-middle' />
                      </OverlayTrigger>
                    ) : (
                      <OverlayTrigger placement="bottom" overlay={<Tooltip id="exibir-button-tooltip">Exibir Inativos</Tooltip>}>
                        <FontAwesomeIcon icon={faEye} onClick={() => setShowInactive(true)} className='eye-icon btn btn-sm btn-light text-bg-primary p-2 m-1 align-items-center text-center align-self-center justify-content-center align-content-center align-middle' />
                      </OverlayTrigger>
                    )}
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
                    className='m-0 p-0 d-flex rounded border-0 text-center fw-bolder'
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

export default Cadastrados;
