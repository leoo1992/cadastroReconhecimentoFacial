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
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

const FormLogin = () => {
  // eslint-disable-next-line
  const [theme, setTheme] = useState("dark"),
    [isFormValid, setIsFormValid] = useState(true),
    [showInactive, setShowInactive] = useState(true),
    [passwordType, setPasswordType] = useState("password"),
    [isUserFilled, setIsUserFilled] = useState(false),
    [isPasswordFilled, setIsPasswordFilled] = useState(false),
    errorRef = useRef(null),
    [formData, setFormData] = useState({
      usuario: "",
      senha: "",
    }),
    [formErrors, setFormErrors] = useState({
      usuario: "",
      senha: "",
    });

  useEffect(() => {
    setPasswordType(showInactive ? "password" : "text");
  }, [showInactive]);

  useEffect(() => {
    if (errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [formErrors]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    const hasErrors = Object.values(formErrors).some((error) => error !== "");
    setIsFormValid(!hasErrors);

    if (name === "usuario") {
      setIsUserFilled(!!value);
    }

    if (name === "senha") {
      setIsPasswordFilled(!!value);
    }
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
      .post("/login", formData)
      .then((response) => {
        if (response.data.token) {

          localStorage.setItem("token", response.data.token);
          Cookies.set('token', response.data.token, { expires: 1 / 24, secure: true, sameSite: 'strict' });

          setFormErrors({});

          toast.success("Login efetuado com sucesso...Redirecionando");

          setTimeout(() => {
            window.location.href = "/home";
          }, 5000);

        } else {
          toast.error("Usuário ou senha incorretos");
        }
      })
      .catch(() => {
        toast.error("Ocorreu um erro ao fazer login. Tente novamente mais tarde.");
      });
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
                <div className="container d-flex m-0 p-0 justify-content-end">
                  <OverlayTrigger placement="bottom" overlay={<Tooltip id="ocultar-button-tooltip">Mostrar / Ocultar Senha</Tooltip>}>
                    <FontAwesomeIcon
                      icon={showInactive ? faEye : faEyeSlash}
                      onClick={() => setShowInactive(!showInactive)}
                      className={`p-1 mt-3 d-flex btn btn-info fw-bold border-1 ${theme === "dark" ? "border-white" : "border-black"}`}
                    />
                  </OverlayTrigger>
                </div>
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
                  Usuário ou senha incorretos.
                </div>
              )}
              <Link to="/cadastrousers" className={`btn btn-warning fw-bold ${theme === "dark" ? "border-white" : "border-black"}`}>
                Cadastrar
              </Link>
              <span> </span>
              <Button
                type="submit"
                variant="info"
                className={`fw-bold ${theme === "dark" ? "border-white" : "border-black"}`}
                disabled={!isUserFilled || !isPasswordFilled}
              >
                Entrar
              </Button>

            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default FormLogin;