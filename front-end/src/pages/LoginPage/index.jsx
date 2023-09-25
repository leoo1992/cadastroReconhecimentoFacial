import React, { useState, useRef, useEffect } from "react";
import "./login.css";
import api from "./axiosConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import 'react-toastify/dist/ReactToastify.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Link, useNavigate } from "react-router-dom";
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(true);
  const errorRef = useRef(null);
  const [theme, setTheme] = useState("dark");

  const [formData, setFormData] = useState({
    usuario: "",
    senha: "",
  });


  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    const hasErrors = Object.values(formErrors).some((error) => error !== "");
    setIsFormValid(!hasErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = ["usuario", "senha"];

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
      .post("/cadastro", formData)
      .then(() => {
        setFormErrors({});
        toast.success("Cadastrado com Sucesso");
        setTimeout(() => {
          navigate("/home");
        }, 4000);
      })
      .catch((error) => {
        toast.error("Erro ao cadastrar : " + error);
      });
  };

  const [formErrors, setFormErrors] = useState({
    usuario: "",
    senha: "",
  });

  useEffect(() => {
    if (errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [formErrors]);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("default");
    } else {
      setTheme("dark");
    }
  };

  const toggleThemeTooltip = (
    <Tooltip id="toggle-theme-tooltip">
      {theme === "dark" ? "Modo Claro" : "Modo Escuro"}
    </Tooltip>
  );

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
      <div className="text-end bg-fundo d-flex sombra-baixo">
        <h5 className='text-start text-info m-0 p-2 col align-self-center fw-bold'>
          Face-ID
        </h5>

        <div className="d-flex m-1 p-0 align-items-center">
          <OverlayTrigger placement="bottom" overlay={toggleThemeTooltip}>
            <Button onClick={toggleTheme} className='btn-tamanho btn btn-info p-0 m-1'>
              {theme === "dark" ? (
                <FontAwesomeIcon icon={faSun} className='text-white p-0 m-0' />
              ) : (
                <FontAwesomeIcon icon={faMoon} className='text-black  m-0 p-0 ' />
              )}
            </Button>
          </OverlayTrigger>
        </div>
      </div>
      <div className={`mt-0 p-0 d-flex flex-column align-items-center vh-100 ${theme === "dark" ? "bg-dark" : "bg-fundo2"}`}>
        <h3 className='text-info fw-bold pt-3 mt-3'>Login</h3>
      <Container className='d-flex justify-content-center fw-bold p-0 mt-5'>
        <Form onSubmit={handleSubmit} className={`cadastro p-4 rounded-3 border ${theme === "dark" ? "border-white" : "border-black"}`}>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label className={theme === "dark" ? "text-light" : "text-dark"}>Usuário:</Form.Label>
                <Form.Control
                  type="text"
                  name="usuario"
                  value={formData.usuario}
                  onChange={handleChange}
                  required
                />
                {formErrors.usuario && (
                  <div className="error-message">{formErrors.usuario}</div>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label className={theme === "dark" ? "text-light" : "text-dark"}>Senha:</Form.Label>
                <Form.Control
                  type="password"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                />
                {formErrors.senha && (
                  <div className="error-message">{formErrors.senha}</div>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="text-center pt-4 ">
              {!isFormValid && (
                <div className="error-message">
                  Há campos acima para verificar.
                </div>
              )}
              <Link to="/home" className={`btn btn-warning fw-bold ${theme === "dark" ? "border-white" : "border-black"}`}>
                Teste
              </Link>
              <span> </span>
              <Button type="submit" variant="info" className={`fw-bold ${theme === "dark" ? "border-white" : "border-black"}`}>
                Cadastrar
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
      </div>
    </>
  );
};

export default LoginPage;