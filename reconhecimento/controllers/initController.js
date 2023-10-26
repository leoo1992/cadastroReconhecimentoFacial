const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../RostosConhecidos.txt');
const labels = [];

const initApp = (app) => {
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

    app.use(bodyParser.raw({
        type: 'image/jpeg',
        limit: '5mb',
        verify: (req, res, buf, encoding) => {
            if (buf.length > 5 * 1024 * 1024) {
                res.status(400).send('A imagem enviada é maior do que 5MB.');
            }
        }
    }));
};

const obterNomes = (req, res) => {
    res.json(labels);
};

module.exports = {
    initApp,
    obterNomes,
};
