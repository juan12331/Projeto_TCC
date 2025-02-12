const { Op } = require('sequelize');
const Fotos_quartos = require('../models/fotos_quartos');
const Quartos = require('../models/quartos');

exports.AdicionarFoto = async (req, res) => {
    try {
        const fotos_quartos = await Fotos_quartos.create(req.body)
        console.log(fotos_quartos)
        return res.send('Foto adicionada com sucesso')
    } catch (err) {
        return res.status(403).send('erro')
    }
}

exports.ApagarFoto = async (req, res) => {
    const encontrarFoto = await Fotos_quartos.findOne({ where: { id_foto: req.params.id_foto } })
    try {
        await encontrarFoto.destroy();
        return res.send('usuario deletado')
    } catch (err) {
        return res.send('aqui deu erro mn se liga', err)
    }
}


exports.getAllFotos = async (req, res) => {
    try {
        const encontrarFotros = await Fotos_quartos.findAll({ include: Quartos });
        return res.send(encontrarFotros);
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
}