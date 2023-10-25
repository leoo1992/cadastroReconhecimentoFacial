require("dotenv").config();
const express = require('express');
const sequelize = require("./config/sequelize");
const cors = require('cors');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const moment = require('moment-timezone');
const port = 3002;
const Pessoa = require("../back-end/models/Pessoa");
const Log = require("../back-end/models/Log");
const filePath = path.join(__dirname, 'RostosConhecidos.txt');
const labels = [];
const Associations = require("../back-end/models/associations");

console.log(moment());

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// CONEXÃO **********************************
sequelize.authenticate()
sequelize.sync().then(() => {
    app.listen(port);
    console.log('Servidor rodando na porta ' + port);
});

fs.readFile(filePath, 'utf8', (err, data) => {
    const lines = data.trim().split('\n');

    if (err) {
        console.error('Erro ao ler o arquivo RostosConhecidos.txt:', err);
        return;
    }

    lines.forEach(line => {
        labels.push(line.trim());
    });

    console.log('Nomes carregados:', labels);
});

app.use(bodyParser.raw({
    type: 'image/jpeg',
    limit: '5mb',
    verify: (req, res, buf, encoding) => {
        if (buf.length > 5 * 1024 * 1024) {
            res.status(400).send('A imagem enviada é maior do que 5MB.');
        }
    }
}));

app.get('/obter-nomes', (req, res) => {
    res.json(labels);
});

app.post('/salvar-imagem', (req, res) => {
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
});

app.post('/salvar-ou-atualizar-log', async (req, res) => {
    try {
        const { nome } = req.body,
            dataAtual = moment().subtract(3, 'hours').local().format(),
            fiveMinutesAgo = moment().subtract(3, 'hours').subtract(1, 'minutes').toDate(),
            pessoa = await Pessoa.findOne({
                where: { nome },
            }),
            ultimoLog = await pessoa.getLogs({
                limit: 1,
                order: [['data', 'DESC']],
            });

        if (!pessoa) {
            return res.status(200).json({ message: 'Pessoa não encontrada ou aguardando' });
        }

        if (ultimoLog.length === 0 || ultimoLog[0].data < fiveMinutesAgo) {
            const novoLog = await Log.create({
                data: dataAtual,
            });

            await pessoa.addLog(novoLog);

            res.status(200).json({ message: 'Log salvo/atualizado com sucesso' });
        } else {
            res.status(200).json({ message: 'Log não precisa ser atualizado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao salvar/atualizar log' });
    }
});

app.post('/criar-pessoa', async (req, res) => {
    try {
        const { nome, cpf, tipo } = req.body,
            existingPerson = await Pessoa.findOne({ where: { nome, cpf } });

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
});

module.exports = app;








