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
    res.json(labels.trim());
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

    const nomeSemEspacos = nome.trim().replace(/\s+/g, '');

    const pastaDestino = path.join(__dirname, 'assets', 'lib', 'face-api', 'labels', nomeSemEspacos);

    if (!fs.existsSync(pastaDestino)) {
        fs.mkdirSync(pastaDestino, { recursive: true });
    }

    let contador = 1;
    while (fs.existsSync(path.join(pastaDestino, `${contador}.jpeg`)) && contador <= 5) {
        contador++;
    }

    if (contador > 5) {
        return res.status(400).send('A pasta está cheia (limite de 5 imagens).');
    }

    const caminhoImagem = path.join(pastaDestino, `${contador}.jpeg`);
    fs.writeFileSync(caminhoImagem, req.body);

    if (!labels.includes(nomeSemEspacos)) {
        labels.push(nomeSemEspacos);
        fs.appendFileSync(filePath, '\n' + nomeSemEspacos);
    }
    console.log("Op salvar img realizada com sucesso");
    res.status(200).send('Imagem e nome salvos com sucesso.');
    console.log('Nomes carregados:', labels);
});






