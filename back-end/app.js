require("dotenv").config();
const express = require("express");
const sequelize = require("./config/sequelize");
const cors = require("cors");
const Controlador = require("./models/Controlador");
const Log = require("./models/Log");
const Pessoa = require("./models/Pessoa");
const PessoaResponsabilidade = require("./models/PessoaResponsabilidade");
const cadastroRoutes = require("./routes/cadastroPessoa");
const { body, validationResult } = require("express-validator");
const sanitizeHtml = require("sanitize-html");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Conexão com o banco de dados
console.log("Tentando conectar ao banco de dados...");
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida.");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
  });
console.log("Tentando sincronizar os modelos com o banco de dados...");
sequelize
  .sync()
  .then(() => {
    console.log("Modelos sincronizados com o banco de dados.");
    app.listen(port, () => {
      console.log(`Servidor em execução na porta ${port}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao sincronizar os modelos com o banco de dados:", err);
  });

// Rota para cadastro
app.post(
  "/cadastro",

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const formData = {
      nome: sanitizeHtml(req.body.nome),
      cpf: sanitizeHtml(req.body.cpf),
      tipo: sanitizeHtml(req.body.tipo),
      ativo: sanitizeHtml(req.body.ativo),
    };

    try {
      const createdUser = await Pessoa.create({
        nome: formData.nome,
        cpf: formData.cpf,
        tipo: formData.tipo,
        ativo: formData.ativo,
      });

      res.status(200).json({ message: "Cadastro realizado com sucesso." });
    } catch (err) {
      console.error("Erro ao inserir os dados: ", err);
      res.status(500).json({ error: "Erro ao realizar o cadastro." });
    }
  }
);
