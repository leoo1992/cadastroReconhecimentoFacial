const { validationResult } = require("express-validator"),
    Pessoa = require("../models/Pessoa"),
    { validationResult } = require("express-validator");

const cadastrarPessoa = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const formData = {
            nome: req.body.nome,
            cpf: req.body.cpf,
            tipo: req.body.tipo,
            ativo: req.body.ativo,
            dataNascimento: req.body.dataNascimento,
        };

        const existingUser = await Pessoa.findOne({
            where: {
                cpf: formData.cpf,
            },
        });

        if (existingUser) {
            return res.status(400).json({ error: "O cpf já está cadastrado." });
        } else {
            const createdUser = await Pessoa.create({
                nome: formData.nome,
                cpf: formData.cpf,
                tipo: formData.tipo,
                ativo: formData.ativo,
                dataNascimento: formData.dataNascimento,
            });

            res.status(200).json({ message: "Cadastro realizado com sucesso." });
        }
    } catch (err) {
        console.error("Erro ao inserir os dados: ", err);
        res.status(500).json({ error: "Erro ao realizar o cadastro." });
    }
};

module.exports = {
    cadastrarPessoa,
};