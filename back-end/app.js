require("dotenv").config();
const express = require("express");
const sequelize = require("./config/sequelize");
const cors = require("cors");
const Pessoa = require("./models/Pessoa");
const app = express();
const port = 3000;
const {validationResult } = require("express-validator");

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

    const { nome, cpf, tipo, ativo } = req.body;

    try {
      const createdUser = await Pessoa.create({
        nome,
        cpf,
        tipo,
        ativo,
      });

      res.status(200).json({ message: "Cadastro realizado com sucesso." });
    } catch (err) {
      console.error("Erro ao inserir os dados: ", err);
      res.status(500).json({ error: "Erro ao realizar o cadastro." });
    }
  }
);


// Rota para listagem
app.get("/listar", async (req, res) => {
  try {
    const totalRegistros = await Pessoa.count();
    const pagina = parseInt(req.query.pagina) || 1;
    const limitePorPagina = parseInt(req.query.limitePorPagina) || 1000000;
    const paginacao = (pagina - 1) * limitePorPagina;
    const numeroDePaginas = Math.ceil(totalRegistros/limitePorPagina) || 1;
    const registros = await Pessoa.findAll({
      limit: limitePorPagina,
      offset: paginacao,
    });

    res.status(200).json({'registros' : registros, 'numerodepaginas' : numeroDePaginas , 'totalregistros': totalRegistros});

  } catch (err) {
    console.error("Erro ao listar os dados: ", err);
    res.status(500).json({ error: "Erro ao listar os dados." });
  }
});
