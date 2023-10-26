import React, { useState, useRef, useEffect } from "react";
import api from "./axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import "./cadastro.css";
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputMask from 'react-input-mask';


const FormCadastroFaces = () => {
  const navigate = useNavigate(),
    [isFormValid, setIsFormValid] = useState(true),
    errorRef = useRef(null),
    // eslint-disable-next-line
    [theme, setTheme] = useState("dark"),
    [isImageUploaded, setIsImageUploaded] = useState(false),
    [isNameEntered, setIsNameEntered] = useState(false),
    [isSelfieButtonDisabled, setIsSelfieButtonDisabled] = useState(false),
    [formData, setFormData] = useState({
      nome: "",
      cpf: "",
      tipo: "",
    }),
    [formErrors, setFormErrors] = useState({
      nome: "",
      cpf: "",
      tipo: "",
    });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    setIsNameEntered(!!value);

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

    if (!isImageUploaded) {
      toast.error('Uma selfie é requerida');
      setIsImageUploaded(false);
      return;
    }

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
        setIsImageUploaded(false);
      })
      .catch((error) => {
        toast.error("Erro ao cadastrar : " + error);
      });
  };

  useEffect(() => {
    if (errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [formErrors]);

  const handleImageChange = async (event) => {
    console.log("Entrou na função handleImageChange");
    let file = event.target.files[0];

    if (!formData.nome.trim()) {
      toast.error('O nome é requerido antes da imagem');
      setIsImageUploaded(false);
      return;
    }

    console.log("Arquivo selecionado:", file);

    let selectedNome = formData.nome.trim();
    console.log("Nome selecionado:", selectedNome.trim());

    if (file && file.type === 'image/jpeg') {
      let formData = new FormData();
      formData.append('image', file);

      try {
        let headers = new Headers();
        headers.append('nome'.trim(), selectedNome.trim());

        let response = await fetch('http://localhost:3002/salvar-imagem', {
          method: 'POST',
          headers: {
            'Content-Type': 'image/jpeg',
            'Nome': selectedNome.trim(),
          },
          body: file
        });

        if (response.ok) {
          event.target.value = '';
          toast.success('Imagem inserida com Sucesso !');
          setIsImageUploaded(true);
          setIsSelfieButtonDisabled(true);
        } else {
          event.target.value = '';
          toast.error('Erro ao salvar a imagem.');
          setIsImageUploaded(false);
        }
      } catch (error) {
        console.error('Erro ao enviar a requisição:', error);
        event.target.value = '';
        toast.error('Erro ao salvar a imagem.');
        setIsImageUploaded(false);
      }
    } else {
      event.target.value = '';
      toast.error('Por favor, selecione um arquivo .jpeg.');
      setIsImageUploaded(false);
    }
    event.target.value = '';
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
      <Container className='d-flex justify-content-center fw-bold p-0 m-0'>
        <Form onSubmit={handleSubmit} className={`cadastro p-3 rounded-3 border ${theme === "dark" ? "border-white" : "border-black"}`}>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label className={theme === "dark" ? "text-light" : "text-dark"} htmlFor="nome">Nome:</Form.Label>
                <Form.Control
                  id="nome"
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
              <Form.Label className={` pt-2 ${theme === "dark" ? "text-light" : "text-dark"}`} htmlFor="cpf">CPF:</Form.Label>
              <Form.Group className="">
                <InputMask
                  mask="999.999.999-99"
                  maskChar={null}
                  type="text"
                  id="cpf"
                  name="cpf"
                  value={formData.cpf}
                  alwaysShowMask={false}
                  onChange={handleChange}
                  required
                  className="rounded p-2 w-100"
                />
                {formErrors.cpf && (
                  <div className="error-message">{formErrors.cpf}</div>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="pt-2">
                <Form.Label className={theme === "dark" ? "text-light" : "text-dark"} htmlFor="tipo">Tipo:</Form.Label>
                <Form.Control
                  id="tipo"
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
            <Col >
              <Button
                disabled={!isNameEntered || isSelfieButtonDisabled}
                className="btn btn-warning mt-4 mb-3">
                <label htmlFor="foto"
                  disabled={!isNameEntered || isSelfieButtonDisabled}
                >
                  Insira uma Selfie
                  <input
                    type="file"
                    id="foto"
                    name="foto"
                    accept="image/jpeg"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    disabled={!isNameEntered || isSelfieButtonDisabled}
                  />
                </label>
              </Button>
              {formErrors.tipo && (
                <div className="error-message">{formErrors.foto}</div>
              )}
            </Col>
          </Row>
          <Row>
            <Col className="text-center pt-2 ">
              {!isFormValid && (
                <div className="error-message">
                  Há campos acima para verificar.
                </div>
              )}
              <Link to="/home" className={`btn btn-warning fw-bold ${theme === "dark" ? "border-white" : "border-black"}`}>
                Voltar
              </Link>
              <span> </span>
              <Button
                type="submit"
                disabled={!isNameEntered || !formData.cpf || !formData.tipo || !isImageUploaded || !isFormValid}
                variant="info"
                className={`fw-bold ${theme === "dark" ? "border-white" : "border-black"}`}>
                Cadastrar
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default FormCadastroFaces;
