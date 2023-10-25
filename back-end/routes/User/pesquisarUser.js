const express = require('express');
const router = express.Router();
const Users = require("../../models/Users");
const { Op } = require('sequelize');

// rota pesquisar usuario
router.get("/pesquisaruser", async (req, res) => {
  try {
    const { termo } = req.query;

    if (!termo || termo.length < 3) {
      return res.status(200).json({ resultados: [] });
    }

    console.log("Termo de pesquisa:", termo);

    const resultados = await Users.findAll({
      where: {
        [Op.or]: [
          { usuario: { [Op.like]: `%${termo}%` } },
          { id: { [Op.eq]: termo } },
        ],
      },
    });

    res.status(200).json({ resultados });
  } catch (err) {
    console.error("Erro ao realizar pesquisa geral: ", err);
    res.status(500).json({ error: "Erro ao realizar pesquisa geral." });
  }
});

module.exports = router;