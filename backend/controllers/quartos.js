const { Op } = require('sequelize');
const Quartos = require('../models/quartos');

exports.createQuarto = async (req, res) => {
    try {
        const verificacao = await Usuarios.findByPk(req.params.cpf);
        if (verificacao) {
            return res.send('usuario ja foi cadastrado')
        }

        const usuarioCriado = await Usuarios.create(req.body)
        console.log(usuarioCriado)
        return res.send('usuario cadastrado com sucesso')
    } catch (err) {
        return res.status(403).send('erro')
    }
}