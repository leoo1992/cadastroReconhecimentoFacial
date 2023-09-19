import React, { useState, useRef, useEffect } from "react";
import api from "./axiosConfig";
import { Link, useNavigate, useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import "./cadastro.css";

const Atualiza = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isFormValid, setIsFormValid] = useState(true);
  const errorRef = useRef(null);

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
        alert("Atualizado com Sucesso");
        navigate("/cadastrados");
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
    <div className="p-0 m-0 bg-cadastro w-100 h-100">
      <h3 className="text-center m-0 p-0 pt-2 text-danger">Atualizar Cadastro</h3>
      <div className="d-flex justify-content-center align-items-center fw-bold pt-2">
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
              <label className="pt-2">CPF:</label>
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
              <label className="pt-2">Tipo:</label>
              <select
                name="tipo"
                className="form-control"
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
              <button type="submit" className="btn btn-danger fw-bold">
                Atualizar
              </button>
              <span> </span>
              <Link to="/cadastrados" className="btn btn-success fw-bold">
                Voltar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Atualiza;
