const { Op } = require('sequelize');
const TiposUsuarios = require('../models/tipos_usuarios');

exports.createTiposUsuarios = async (req, res) => {
    try {
        const verificacao = await TiposUsuarios.findByPk(req.params.cpf);
        if (verificacao) {
            return res.send('Tipo de usuario ja foi cadastrado')
        }

        const Tipo = await TiposUsuarios.create(req.body)
        console.log(Tipo)
        return res.send('tipo de usuario cadastrado com sucesso')
    } catch (err) {
        return res.status(403).send('erro')
    }
}