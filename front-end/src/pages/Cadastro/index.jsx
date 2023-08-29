import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "./axiosConfig";
import { Link } from "react-router-dom";

import "./styles.css";

const Cadastro = () => {
  const [isFormValid, setIsFormValid] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nome: "",
    idade: "",
    profissao: "",
    descricao: "",
    endereco: "",
    bairro: "",
    cidade: "",
    estado: "",
    telefone: "",
    nome_empresa: "",
    prestador_cliente: "",
    cpf_cnpj: "",
    linkedin: "",
    instagram: "",
    whatsapp: "",
    telegram: "",
    facebook: "",
    youtube: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nome: "",
    idade: "",
    profissao: "",
    descricao: "",
    endereco: "",
    bairro: "",
    cidade: "",
    estado: "",
    telefone: "",
    nome_empresa: "",
    prestador_cliente: "",
    cpf_cnpj: "",
    linkedin: "",
    instagram: "",
    whatsapp: "",
    telegram: "",
    facebook: "",
    youtube: "",
  });

  const errorRef = useRef(null);

  useEffect(() => {
    if (errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [formErrors]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === "confirmPassword") {
      // Lógica para verificar a confirmação de senha...
    } else if (!value) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Campo obrigatório",
      }));
    } else if (
      name === "email" &&
      formErrors.email === "O email já está cadastrado."
    ) {
      // Não limpar a mensagem de erro se o campo de email já está cadastrado
      return;
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }

    const hasErrors = Object.values(formErrors).some((error) => error !== "");
    setIsFormValid(!hasErrors);
  };

  const handleEmailBlur = async () => {
    try {
      if (!formData.email) {
        // Não faz nada se o campo de e-mail estiver vazio
        return;
      }

      const response = await api.get(`/consultaEmail/${formData.email}`);
      if (response.data.error === "O email já está cadastrado.") {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          email: "O email já está cadastrado.",
        }));
      } else {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          email: "",
        }));
      }

      const hasErrors = Object.values(formErrors).some((error) => error !== "");
      setIsFormValid(!hasErrors);
    } catch (error) {
      console.error(error);
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: "Erro ao verificar o email.",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      "email",
      "password",
      "confirmPassword",
      // ...resto dos campos obrigatórios
    ];

    if (formErrors.email === "O email já está cadastrado.") {
      setIsFormValid(false); // Define o formulário como inválido
      return; // Encerra o método sem fazer a requisição de cadastro
    }

    if (
      formData.password.length !== 6 ||
      formData.confirmPassword.length !== 6
    ) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password: "A senha deve ter exatamente 6 caracteres.",
        confirmPassword:
          "A confirmação de senha deve ter exatamente 6 caracteres.",
      }));
      return;
    }

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

    const dataToSubmit = {
      ...formData,
      confirmPassword: undefined, // Removendo o campo confirmPassword do objeto enviado
    };

    api
      .post("/cadastro", dataToSubmit)
      .then(() => {
        setFormErrors({});
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container-fluid w-100 p-0 m-0 bg-cadastro">
      <Link to="/" className="btn btn-danger fw-bold">
        Voltar
      </Link>
      <h1 className="text-center m-0 p-0 pt-4 text-danger">Cadastro</h1>
      <div className="bg-cadastro d-flex justify-content-center align-items-center p-md-5 p-lg-5 p-sm-2 fw-bold">
        <div className="cadastro  w-100 border-success rounded-3 p-4">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleEmailBlur}
                required
              />
              {formErrors.email && (
                <div className="error-message">{formErrors.email}</div>
              )}
              {!formErrors.email && (
                <div className="error-message">
                  {formErrors.email === "O email já está cadastrado."
                    ? formErrors.email
                    : null}
                </div>
              )}
            </div>
            <div className="form-group pt-sm-1 pt-md-2 pt-lg-2">
              <label>Senha:</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                maxLength={6}
                required
              />
              {formErrors.password && (
                <div className="error-message">{formErrors.password}</div>
              )}
              {formData.password.length !== 6 && (
                <div className="error-message">
                  A senha deve ter exatamente 6 caracteres.
                </div>
              )}
            </div>
            <div className="form-group pt-sm-1 pt-md-2 pt-lg-2">
              <label>Confirmar Senha:</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                value={formData.confirmPassword}
                maxLength={6}
                onChange={handleChange}
                required
                onCopy={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
              />
              {formErrors.confirmPassword && (
                <div className="error-message" ref={errorRef}>
                  {formErrors.confirmPassword}
                </div>
              )}
              {formData.confirmPassword.length !== 6 && (
                <div className="error-message">
                  A confirmação de senha deve ter exatamente 6 caracteres.
                </div>
              )}
              {formData.password !== formData.confirmPassword && (
                <div className="error-message">As senhas não coincidem.</div>
              )}
            </div>
            <div className="form-group pt-sm-1 pt-md-2 pt-lg-2">
              <label>Nome:</label>
              <input
                type="text"
                name="nome"
                className="form-control"
                value={formData.nome}
                onChange={handleChange}
                required
              />
              {formErrors.nome && (
                <div className="error-message">{formErrors.nome}</div>
              )}
            </div>
            <div className="form-group pt-sm-1 pt-md-2 pt-lg-2">
              <label>Idade:</label>
              <input
                type="number"
                name="idade"
                className="form-control"
                value={formData.idade}
                min="1"
                max="200"
                step="1"
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const intValue = parseInt(inputValue);

                  if (inputValue === "" || (intValue >= 1 && intValue <= 200)) {
                    handleChange(e);
                  }
                }}
                required
              />

              {formErrors.idade && (
                <div className="error-message">{formErrors.idade}</div>
              )}
            </div>
            <div className="form-group pt-sm-1 pt-md-2 pt-lg-2">
              <label>Profissão:</label>
              <input
                type="text"
                name="profissao"
                className="form-control"
                value={formData.profissao}
                onChange={handleChange}
                required
              />
              {formErrors.profissao && (
                <div className="error-message">{formErrors.profissao}</div>
              )}
            </div>
            <div className="form-group pt-sm-1 pt-md-2 pt-lg-2">
              <label>Descrição:</label>
              <input
                type="text"
                name="descricao"
                className="form-control"
                value={formData.descricao}
                onChange={handleChange}
                required
              />
              {formErrors.descricao && (
                <div className="error-message">{formErrors.descricao}</div>
              )}
            </div>
            <div className="form-group pt-sm-1 pt-md-2 pt-lg-2">
              <label>Endereço:</label>
              <input
                type="text"
                name="endereco"
                className="form-control"
                value={formData.endereco}
                onChange={handleChange}
                required
              />
              {formErrors.endereco && (
                <div className="error-message">{formErrors.endereco}</div>
              )}
            </div>
            <div className="form-group pt-sm-1 pt-md-2 pt-lg-2">
              <label>Bairro:</label>
              <input
                type="text"
                name="bairro"
                className="form-control"
                value={formData.bairro}
                onChange={handleChange}
                required
              />
              {formErrors.bairro && (
                <div className="error-message">{formErrors.bairro}</div>
              )}
            </div>
            <div className="form-group pt-sm-1 pt-md-2 pt-lg-2">
              <label>Cidade:</label>
              <input
                type="text"
                name="cidade"
                className="form-control"
                value={formData.cidade}
                onChange={handleChange}
                required
              />
              {formErrors.cidade && (
                <div className="error-message">{formErrors.cidade}</div>
              )}
            </div>
            <div className="form-group pt-sm-1 pt-md-2 pt-lg-2">
              <label>Estado:</label>
              <input
                type="text"
                name="estado"
                className="form-control"
                value={formData.estado}
                onChange={handleChange}
                required
              />
              {formErrors.estado && (
                <div className="error-message">{formErrors.estado}</div>
              )}
            </div>
            <div className="form-group pt-sm-1 pt-md-2 pt-lg-2">
              <label>Telefone:</label>
              <input
                type="text"
                name="telefone"
                className="form-control"
                value={formData.telefone}
                onChange={handleChange}
                required
              />
              {formErrors.telefone && (
                <div className="error-message">{formErrors.telefone}</div>
              )}
            </div>
            <div className="form-group pt-sm-1 pt-md-2 pt-lg-2">
              <label>Nome da Empresa:</label>
              <input
                type="text"
                name="nome_empresa"
                className="form-control"
                value={formData.nome_empresa}
                onChange={handleChange}
                required
              />
              {formErrors.nome_empresa && (
                <div className="error-message">{formErrors.nome_empresa}</div>
              )}
            </div>
            <div className="form-group pt-sm-1 pt-md-2 pt-lg-2">
              <label>Prestador/Cliente:</label>
              <input
                type="text"
                name="prestador_cliente"
                className="form-control"
                value={formData.prestador_cliente}
                onChange={handleChange}
                required
              />
              {formErrors.prestador_cliente && (
                <div className="error-message">
                  {formErrors.prestador_cliente}
                </div>
              )}
            </div>
            <div className="form-group pt-sm-1 pt-md-2 pt-lg-2">
              <label>CPF/CNPJ:</label>
              <input
                type="text"
                name="cpf_cnpj"
                className="form-control"
                value={formData.cpf_cnpj}
                onChange={handleChange}
                required
              />
              {formErrors.cpf_cnpj && (
                <div className="error-message">{formErrors.cpf_cnpj}</div>
              )}
            </div>
            <div className="form-group pt-sm-1 pt-md-2 pt-lg-2">
              <label>LinkedIn:</label>
              <input
                type="text"
                name="linkedin"
                className="form-control"
                value={formData.linkedin}
                onChange={handleChange}
                required
              />
              {formErrors.linkedin && (
                <div className="error-message">{formErrors.linkedin}</div>
              )}
            </div>
            <div className="form-group pt-sm-1 pt-md-2 pt-lg-2">
              <label>Instagram:</label>
              <input
                type="text"
                name="instagram"
                className="form-control"
                value={formData.instagram}
                onChange={handleChange}
                required
              />
              {formErrors.instagram && (
                <div className="error-message">{formErrors.instagram}</div>
              )}
            </div>
            <div className="form-group pt-sm-1 pt-md-2 pt-lg-2">
              <label>WhatsApp:</label>
              <input
                type="text"
                name="whatsapp"
                className="form-control"
                value={formData.whatsapp}
                onChange={handleChange}
                required
              />
              {formErrors.whatsapp && (
                <div className="error-message">{formErrors.whatsapp}</div>
              )}
            </div>
            <div className="form-group pt-sm-1 pt-md-2 pt-lg-2">
              <label>Telegram:</label>
              <input
                type="text"
                name="telegram"
                className="form-control"
                value={formData.telegram}
                onChange={handleChange}
                required
              />
              {formErrors.telegram && (
                <div className="error-message">{formErrors.telegram}</div>
              )}
            </div>
            <div className="form-group pt-sm-1 pt-md-2 pt-lg-2">
              <label>Facebook:</label>
              <input
                type="text"
                name="facebook"
                className="form-control"
                value={formData.facebook}
                onChange={handleChange}
                required
              />
              {formErrors.facebook && (
                <div className="error-message">{formErrors.facebook}</div>
              )}
            </div>
            <div className="form-group pt-sm-1 pt-md-2 pt-lg-2">
              <label>YouTube:</label>
              <input
                type="text"
                name="youtube"
                className="form-control"
                value={formData.youtube}
                onChange={handleChange}
                required
              />
              {formErrors.youtube && (
                <div className="error-message">{formErrors.youtube}</div>
              )}
            </div>
            <div className="text-center pt-sm-1 pt-md-2 pt-lg-2">
              {!isFormValid && (
                <div className="error-message">
                  {formErrors.email === "O email já está cadastrado."
                    ? formErrors.email
                    : "Há campos a serem verificados."}
                </div>
              )}
              <button type="submit" className="btn btn-danger fw-bold">
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;