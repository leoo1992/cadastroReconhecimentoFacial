const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const port = 3002;
const filePath = path.join(__dirname, 'RostosConhecidos.txt');
const labels = [];

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.listen(port, () => {
    console.log('Servidor rodando na porta ' + port);
});

app.get('/obter-nomes', (req, res) => {
    res.json(labels);
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

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Erro ao ler o arquivo RostosConhecidos.txt:', err);
        return;
    }

    const lines = data.trim().split('\n');

    lines.forEach(line => {
        labels.push(line.trim());
    });

    console.log('Nomes carregados:', labels);
});

app.post('/salvar-imagem', (req, res) => {
    const nome = req.headers.nome;

    if (!nome) {
        return res.status(400).send('Nome não fornecido.');
    }

    const imageData = req.body;

    const pastaDestino = path.join(__dirname, 'assets', 'lib', 'face-api', 'labels', nome);
    if (!fs.existsSync(pastaDestino)) {
        fs.mkdirSync(pastaDestino, { recursive: true });
    }

    let contador = 1;
    while (fs.existsSync(path.join(pastaDestino, `${contador}.jpg`)) && contador <= 5) {
        contador++;
    }

    if (contador > 5) {
        return res.status(400).send('A pasta está cheia (limite de 5 imagens).');
    }

    const caminhoImagem = path.join(pastaDestino, `${contador}.jpg`);
    fs.writeFileSync(caminhoImagem, imageData);

    if (!labels.includes(nome)) {
        labels.push(nome);
        fs.appendFileSync(filePath, '\n' + nome);
    }

    res.status(200).send('Imagem e nome salvos com sucesso.');
});



