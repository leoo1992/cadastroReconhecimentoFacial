import React, { useState, useRef, useEffect } from "react";
import "./login.css";
import api from "./axiosConfig";
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Link, useNavigate } from "react-router-dom";

const FormCadastroUser = () => {
  const navigate = useNavigate(),
    // eslint-disable-next-line
    [theme, setTheme] = useState("dark"),
    // eslint-disable-next-line
    [isFormValid, setIsFormValid] = useState(true),
    [showInactive, setShowInactive] = useState(true),
    [passwordType, setPasswordType] = useState("password"),
    [isUserFilled, setIsUserFilled] = useState(false),
    [isPasswordFilled, setIsPasswordFilled] = useState(false),
    errorRef = useRef(null),
    [isConfirmPasswordFilled, setIsConfirmPasswordFilled] = useState(false),
    [confirmSenha, setConfirmSenha] = useState("");

  useEffect(() => {
    setPasswordType(showInactive ? "password" : "text");
  }, [showInactive]);

  const [formData, setFormData] = useState({
    usuario: "",
    senha: "",
  });

  const [formErrors, setFormErrors] = useState({
    usuario: "",
    senha: "",
    confirmSenha: ''
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    const hasErrors = Object.values(formErrors).some((error) => error !== "");

    if (name === "usuario") {
      setIsUserFilled(!!value);
    }

    if (name === "senha") {
      setIsPasswordFilled(!!value);
      if (value !== formData.confirmSenha) {
        setFormErrors({ ...formErrors, confirmSenha: "As senhas não coincidem" });
        setIsFormValid(false);
      } else {
        setFormErrors({ ...formErrors, confirmSenha: "" });
        setIsFormValid(true);
      }
    }

    if (name === "confirmSenha") {
      setIsConfirmPasswordFilled(!!value);
      setConfirmSenha(value);

      if (value !== formData.senha) {
        setFormErrors({ ...formErrors, confirmSenha: "As senhas não coincidem" });
        setIsFormValid(false);
      } else {
        setFormErrors({ ...formErrors, confirmSenha: "" });
        setIsFormValid(true);
      }
    }

    setIsFormValid(!hasErrors && isUserFilled && isPasswordFilled && isConfirmPasswordFilled);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = ["usuario", "senha", "confirmSenha"];
    const errors = {};

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors[field] = "Campo obrigatório";
      } else {
        errors[field] = "";
      }
    });

    if (formData.senha !== confirmSenha) {
      errors.confirmSenha = "As senhas não coincidem";
    } else {
      errors.confirmSenha = "";
    }

    setFormErrors(errors);

    const hasErrors = Object.keys(errors).some((key) => key !== "confirmSenha" && errors[key] !== "");

    if (hasErrors) {
      return;
    }

    const cleanFormData = { ...formData };
    delete cleanFormData.confirmSenha;

    api
      .post("/cadastrousuarios", cleanFormData)
      .then((response) => {
        if (response.data.message) {
          setFormErrors({});
          toast.success("Cadastro efetuado com sucesso...Redirecionando");
          setTimeout(() => {
            navigate("/");
          }, 4000);
        } else {
          toast.error("Verifique os requerimentos de cadastro");
        }
      })
      .catch(() => {
        toast.error("Ocorreu um erro ao cadastrar. Tente novamente mais tarde.");
      });
  };


  useEffect(() => {
    if (errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [formErrors]);

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
      <Container className='d-flex justify-content-center fw-bold p-0 mt-2'>
        <Form onSubmit={handleSubmit} className={`cadastro p-4 rounded-3 border ${theme === "dark" ? "border-white" : "border-black"}`}>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label className={`d-flex ${theme === "dark" ? "text-light" : "text-dark"}`}>Usuário:</Form.Label>
                <Form.Control
                  type="text"
                  name="usuario"
                  value={formData.usuario}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  className={`${theme === "dark" ? "border-white" : "border-black"}`}
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
                <Form.Label className={`mt-3 d-flex ${theme === "dark" ? "text-light" : "text-dark"}`}>Senha:</Form.Label>
                <Form.Control
                  type={passwordType}
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  className={`${theme === "dark" ? "border-white" : "border-black"}`}
                />
                {formErrors.senha && (
                  <div className="error-message">{formErrors.senha}</div>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label className={`mt-3 d-flex ${theme === "dark" ? "text-light" : "text-dark"}`}>Confirmar Senha:</Form.Label>
                <Form.Control
                  type={passwordType}
                  name="confirmSenha"
                  value={confirmSenha}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  className={`${theme === "dark" ? "border-white" : "border-black"}`}
                />
                {formErrors.confirmSenha && (
                  <div className="error-message">{formErrors.confirmSenha}</div>
                )}
              </Form.Group>
            </Col>
          </Row>
          <div className="container d-flex m-0 p-0 justify-content-end">
            <OverlayTrigger placement="bottom" overlay={<Tooltip id="ocultar-button-tooltip">Mostrar / Ocultar Senha</Tooltip>}>
              <FontAwesomeIcon
                icon={showInactive ? faEye : faEyeSlash}
                onClick={() => setShowInactive(!showInactive)}
                className={`p-1 mt-3 d-flex btn btn-info fw-bold border-1 ${theme === "dark" ? "border-white" : "border-black"}`}
              />
            </OverlayTrigger>
          </div>
          <Row>
            <Col className="text-center pt-4 ">
              <Link to="/" className={`btn btn-warning p-2 m-0 fw-bold ${theme === "dark" ? "border-white" : "border-black"}`}>
                Voltar
              </Link>
              <span> </span>
              <Button
                type="submit"
                variant="info"
                className={`fw-bold p-2 ${theme === "dark" ? "border-white" : "border-black"}`}
                disabled={!isUserFilled || !isPasswordFilled || !isConfirmPasswordFilled}
              >
                Cadastrar
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default FormCadastroUser;