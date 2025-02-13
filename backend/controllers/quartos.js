const { Op } = require('sequelize');
const Quartos = require('../models/quartos');
const reservas = require('../models/reservas');
const fotos_quartos = require('../models/fotos_quartos');
const avaliacoes_quartos = require('../models/avaliacoes_quartos');

exports.createQuarto = async (req, res) => {
    try {
        const verificacao = await Quartos.findByPk(req.params.id_quarto);
        if (verificacao) {
            return res.send('quarto ja foi cadastrado')
        }

        const quartoCriado = await Quartos.create(req.body)
        console.log(quartoCriado)
        return res.send('quarto cadastrado com sucesso')
    } catch (err) {
        return res.status(403).send('erro')
    }
}

exports.deleteQuarto = async (req, res) => {
    const encontrarQuarto = await Quartos.findOne({ where: { id_quarto: req.params.id_quarto } })
    try {
        await encontrarQuarto.destroy();
        return res.send('Quarto deletado')
    } catch (err) {
        return res.send('erro ==>', err)
    }
}

exports.getAllQuartos = async (req, res) => {
    try {
        const encontrarQuartos = await Quartos.findAll({ include: [{model: fotos_quartos}, {model: reservas}, {model: avaliacoes_quartos}] });
        return res.send(encontrarQuartos);
    } catch (error) {
        return res.status(500).send('Internal Server Erro');
    }
}