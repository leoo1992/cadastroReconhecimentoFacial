const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const port = 3002;
const filePath = path.join(__dirname, 'RostosConhecidos.txt');
const labels = [];
const { exec } = require('child_process');
app.use(cors());

app.get('/obter-nomes', (req, res) => {
    res.json(labels);
});

app.use(express.static('public'));

const bodyParser = require('body-parser');
app.use(bodyParser.raw({ type: 'image/jpeg', limit: '10mb' }));

app.post('/salvar-imagem', (req, res) => {
    const nome = req.headers.nome;

    if (!nome) {
        return res.status(400).send('Nome não fornecido.');
    }

    const imageData = req.body;

    const pastaDestino = path.join(__dirname, 'reconhecimento' ,'assets', 'lib', 'face-api', 'labels', nome);
    if (!fs.existsSync(pastaDestino)) {
        fs.mkdirSync(pastaDestino, { recursive: true });
    }

    const caminhoImagem = path.join(pastaDestino, '1.jpg');
    fs.writeFileSync(caminhoImagem, imageData);

    fs.appendFileSync(filePath, '\n' + nome);

    res.status(200).send('Imagem e nome salvos com sucesso.');

    exec('npm start', (error, stdout, stderr) => {
        if (error) {
            console.error('Erro ao reiniciar o servidor:', error);
        }
    });
});

app.listen(port, () => {
    console.log('Servidor rodando na porta ' + port);
});


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
