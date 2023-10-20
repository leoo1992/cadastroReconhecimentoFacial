import React, { useState, useRef, useEffect } from "react";
import api from "./axiosConfig";
import { Link, useNavigate, useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import "./cadastro.css";
import MenuIcon from '../HomePage/Menuicon';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer';

const Atualiza = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isFormValid, setIsFormValid] = useState(true);
  const errorRef = useRef(null);
  const [theme, setTheme] = useState("dark");

  const updateTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    tipo: "",
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    const hasErrors = Object.values(formErrors).some((error) => error !== "");
    setIsFormValid(!hasErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = ["nome", "cpf", "tipo"];

    const errors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors[field] = "Campo obrigatório";
      }
    });

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    api
      .put(`/atualizar/${id}`, formData)
      .then(() => {
        setFormErrors({});
        toast.success("Atualizado com Sucesso");
        setTimeout(() => {
          navigate("/cadastrados");
        }, 4000);
      })
      .catch((error) => {
        toast.error("Erro ao atualizar");
      });
  };

  const [formErrors, setFormErrors] = useState({
    nome: "",
    cpf: "",
    tipo: "",
  });

  useEffect(() => {
    if (errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth" });
    };

    if (id) {
      api.get(`/atualizar/${id}`)
        .then((response) => {
          setFormData(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar detalhes do registro: ", error);
        });
    }
  }, [id, formErrors]);

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
      <div className="text-end bg-fundo d-flex col">
        <h4 className='text-start text-info m-0 p-2 col align-self-center' >Atualizar</h4>
        <MenuIcon updateTheme={updateTheme} />
      </div>

      <div className={`container-fluid mt-0 pt-4 d-flex flex-column align-items-center vh-100 ${theme === "dark" ? "bg-dark" : "bg-fundo2"}`}>

        <Container className='d-flex justify-content-center fw-bold p-0 m-0'>
          <Form onSubmit={handleSubmit} className={`cadastro p-3 rounded-3 border ${theme === "dark" ? "border-white" : "border-black"}`}>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label className={theme === "dark" ? "text-light" : "text-dark"}>Nome:</Form.Label>
                  <Form.Control
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.nome && (
                    <div className="error-message">{formErrors.nome}</div>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label className={theme === "dark" ? "text-light" : "text-dark"}>CPF:</Form.Label>
                  <Form.Control
                    type="text"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.cpf && (
                    <div className="error-message">{formErrors.cpf}</div>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label className={theme === "dark" ? "text-light" : "text-dark"}>Tipo:</Form.Label>
                  <Form.Control
                    as="select"
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    required
                  >
                    <option value=""></option>
                    <option value="0">Aluno</option>
                    <option value="1">Funcionário</option>
                    <option value="2">Responsável</option>
                    <option value="3">Terceiro</option>
                  </Form.Control>
                  {formErrors.tipo && (
                    <div className="error-message">{formErrors.tipo}</div>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="text-center pt-2 ">
                {!isFormValid && (
                  <div className="error-message">
                    Há campos acima para verificar.
                  </div>
                )}
                <Link to="/cadastrados" className={`btn btn-warning fw-bold ${theme === "dark" ? "border-white" : "border-black"}`}>
                  Voltar
                </Link>
                <span> </span>
                <Button type="submit" variant="info" className={`fw-bold ${theme === "dark" ? "border-white" : "border-black"}`}>
                  Cadastrar
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
        <Footer />
      </div>
    </>
  );
};
export default Atualiza;
