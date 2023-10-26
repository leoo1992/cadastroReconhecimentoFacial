const moment = require('moment-timezone');
const Pessoa = require('../../back-end/models/Pessoa');
const Log = require('../../back-end/models/Log');
const Associations = require("../../back-end/models/associations");

const salvarOuAtualizarLog = async (req, res) => {
    try {
        const { nome } = req.body;
        const dataAtual = moment().subtract(3, 'hours').local().format();
        const MinutesAgo = moment().subtract(3, 'hours').subtract(1, 'minutes').toDate();
        const pessoa = await Pessoa.findOne({
            where: { nome },
        });

        const ultimoLog = await pessoa.getLogs({
            limit: 1,
            order: [['data', 'DESC']],
        });

        if (!pessoa) {
            return res.status(200).json({ message: 'Pessoa não encontrada ou aguardando' });
        }

        if (ultimoLog.length === 0 || ultimoLog[0].data < MinutesAgo) {
            const novoLog = await Log.create({
                data: dataAtual,
            });
            
            await pessoa.addLog(novoLog);

            res.status(200).json({ message: 'Log salvo/atualizado com sucesso' });
        } else {
            res.status(200).json({ message: 'Log não precisa ser atualizado' });
        }
    } catch (error) {
        res.status(200).json({ message: 'aguardando salvar/atualizar log', error });
    }
};

module.exports = {
    salvarOuAtualizarLog,
};
