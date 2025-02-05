const { Op } = require('sequelize');
const Usuarios = require('../models/usuarios');

exports.createUsuario = async (req, res) => {
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

exports.login = async (req, res) => {
    try {
        const { cpf, senha } = req.body;
        const usuario = await Usuarios.findOne({ where: { email, senha } })
        if (usuario.cpf == cpf && usuario.senha == senha) {
            return res.send({ user: usuario })
        }
        return res.status(404).send('Usuario not found');
    } catch (error) {
        return res.status(500).send(error)
    }
}


