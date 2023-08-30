import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "./axiosConfig";
import { Link } from "react-router-dom";
import "./styles.css";

const Cadastro = () => {
  const [isFormValid, setIsFormValid] = useState(true);
  const navigate = useNavigate();
  const errorRef = useRef(null);
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    tipo: "",
    ativo: "",
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    const hasErrors = Object.values(formErrors).some((error) => error !== "");
    setIsFormValid(!hasErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = ["nome", "cpf", "tipo", "ativo"];

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
        alert("Cadastrado com Sucesso");
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        alert("Erro ao cadastrar : " + error);
        navigate("/");
      });
  };

  const [formErrors, setFormErrors] = useState({
    nome: "",
    cpf: "",
    tipo: "",
    ativo: "",
  });

  useEffect(() => {
    if (errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [formErrors]);

  return (
    <div className="p-0 m-0 bg-cadastro">
      <h3 className="text-center m-0 p-0 pt-4 text-danger">Cadastro</h3>
      <div className="d-flex justify-content-center align-items-center p-md-5 p-lg-5 p-sm-2 fw-bold">
        <div className="cadastro w-25 border-success rounded-3 p-4">
          <form onSubmit={handleSubmit}>
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
              <label>CPF:</label>
              <input
                type="text"
                name="cpf"
                className="form-control"
                value={formData.cpf}
                onChange={handleChange}
                required
              />
              {formErrors.cpf && (
                <div className="error-message">{formErrors.cpf}</div>
              )}
            </div>

            <div className="form-group pt-sm-1 pt-md-2 pt-lg-2">
              <label>Tipo:</label>
              <input
                type="text"
                name="tipo"
                className="form-control"
                value={formData.tipo}
                onChange={handleChange}
                required
              />
              {formErrors.tipo && (
                <div className="error-message">{formErrors.tipo}</div>
              )}
            </div>

            <div className="form-group pt-sm-1 pt-md-2 pt-lg-2">
              <label>Ativo:</label>
              <input
                type="text"
                name="ativo"
                className="form-control"
                value={formData.ativo}
                onChange={handleChange}
                required
              />
              {formErrors.ativo && (
                <div className="error-message">{formErrors.ativo}</div>
              )}
            </div>

            <div className="text-center pt-sm-1 pt-md-2 pt-lg-2">
              {!isFormValid && (
                <div className="error-message">
                  Há campos acima para verificar.
                </div>
              )}
              <button type="submit" className="btn btn-danger fw-bold">
                Cadastrar
              </button>
            </div>
          </form>
          <Link to="/" className="btn btn-danger fw-bold">
            Voltar
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Cadastro;
