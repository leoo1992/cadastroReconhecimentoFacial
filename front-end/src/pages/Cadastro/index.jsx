import React, { useState, useRef, useEffect } from "react";
import api from "./axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import "./cadastro.css";
import MenuIcon from '../HomePage/Menuicon';

const Cadastro = () => {
  const navigate = useNavigate();
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
      .post("/cadastro", formData)
      .then(() => {
        setFormErrors({});
        alert("Cadastrado com Sucesso");
        navigate("/");
      })
      .catch((error) => {
        alert("Erro ao cadastrar : " + error);
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
    }
  }, [formErrors]);

  return (
    <>
      <div className="text-end bg-fundo d-flex col">
        <h4 className='text-start text-info m-0 p-1 col align-self-center' >Cadastro</h4>
        <MenuIcon updateTheme={updateTheme} />
      </div>

      <div className={`container-fluid mt-0 pt-5 d-flex flex-column align-items-center vh-100 ${theme === "dark" ? "bg-dark" : "bg-fundo2"}`}>

        <div className="p-0 m-0 bg-cadastro w-100 h-100">
          <div className="d-flex justify-content-center align-items-center fw-bold pt-2">
            <div className="cadastro w-25 border-info rounded-3 p-4">
              <form onSubmit={handleSubmit}>
                <div className="form-group pt-sm-1 pt-md-2 pt-lg-2 text-start">
                  <label className="text-start pb-1">Nome:</label>
                  <input
                    type="text"
                    name="nome"
                    className="rounded p-1 border-info cadastro"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.nome && (
                    <div className="error-message">{formErrors.nome}</div>
                  )}
                </div>

                <div className="form-group pt-sm-1 pt-md-2 pt-lg-2 text-start">
                  <label className="text-start pt-2 pb-1">CPF:</label>
                  <input
                    type="text"
                    name="cpf"
                    className="rounded p-1 border-info cadastro"
                    value={formData.cpf}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.cpf && (
                    <div className="error-message">{formErrors.cpf}</div>
                  )}
                </div>

                <div className="form-group pt-sm-1 pt-md-2 pt-lg-2 text-start">
                  <label className="text-start pt-2 pb-1">Tipo:</label>
                  <select
                    name="tipo"
                    className="rounded p-1 border-info cadastro"
                    value={formData.tipo}
                    onChange={handleChange}
                    required
                  >
                    <option value=""></option>
                    <option value="0">Aluno</option>
                    <option value="1">Funcionário</option>
                    <option value="2">Responsável</option>
                    <option value="3">Terceiro</option>
                  </select>
                  {formErrors.tipo && (
                    <div className="error-message">{formErrors.tipo}</div>
                  )}
                </div>

                <div className="text-center pt-sm-1 pt-2 pt-lg-2">
                  {!isFormValid && (
                    <div className="error-message">
                      Há campos acima para verificar.
                    </div>
                  )}
                  <button type="submit" className="btn btn-info fw-bold">
                    Cadastrar
                  </button>
                  <span> </span>
                  <Link to="/" className="btn btn-warning fw-bold">
                    Voltar
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};
export default Cadastro;
