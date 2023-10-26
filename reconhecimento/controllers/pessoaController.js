const fs = require('fs');
const path = require('path');
const Pessoa = require('../../back-end/models/Pessoa');

const filePath = path.join(__dirname, '../RostosConhecidos.txt');
const labels = [];

const salvarImagem = (req, res) => {
    try {
        const nome = req.headers.nome;
        const nomeSemEspacos = nome.trim().replace(/\s+/g, '');
        const pastaDestino = path.join(__dirname, 'assets', 'lib', 'face-api', 'labels', nomeSemEspacos);
        let contador = 1;
        const caminhoImagem = path.join(pastaDestino, `${contador}.jpeg`);

        if (!nome) {
            return res.status(400).send('Nome não fornecido.');
        }

        if (!fs.existsSync(pastaDestino)) {
            fs.mkdirSync(pastaDestino, { recursive: true });
        }

        while (fs.existsSync(path.join(pastaDestino, `${contador}.jpeg`)) && contador <= 5) {
            contador++;
        }

        if (contador > 5) {
            return res.status(400).send('A pasta está cheia (limite de 5 imagens).');
        }

        fs.writeFileSync(caminhoImagem, req.body);

        if (!labels.includes(nomeSemEspacos)) {
            labels.push(nomeSemEspacos);
            fs.appendFileSync(filePath, '\n' + nomeSemEspacos);
        }
        console.log("Op salvar img realizada com sucesso");
        res.status(200).send('Imagem e nome salvos com sucesso.');
        console.log('Nomes carregados:', labels);
    } catch (error) {
        console.error('Erro ao salvar a imagem:', error);
        res.status(500).send('Erro ao salvar a imagem.');
    }
};

const criarPessoa = async (req, res) => {
    try {
        const { nome, cpf, tipo } = req.body;
        const existingPerson = await Pessoa.findOne({ where: { nome, cpf } });

        if (!nome || !cpf || !tipo) {
            return res.status(400).json({ message: 'Campos obrigatórios ausentes' });
        }

        if (existingPerson) {
            return res.status(400).json({ message: 'Uma pessoa com o mesmo Nome ou CPF já existem' });
        }

        return res.status(201).json({ message: 'Pessoa criada com sucesso' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao criar pessoa' });
    }
};

module.exports = {
    salvarImagem,
    criarPessoa,
};
