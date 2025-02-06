const { Op } = require('sequelize');
const TiposUsuarios = require('../models/tipos_usuarios');

exports.createTiposUsuarios = async (req, res) => {
    try {
        console.log('sla')
        const verificacao = await TiposUsuarios.findByPk(req.params.permissao);
        console.log('sla')
        if (verificacao) {
            console.log('sla2')
            return res.send('Tipo de usuario ja foi cadastrado')
        }
        console.log('sla')
        const Tipo = await TiposUsuarios.create(req.body)
        console.log('sla')
        console.log(Tipo)
      
        
        return res.send('tipo de usuario cadastrado com sucesso')
    } catch (err) {
        return res.status(403).send('erro')
    }
}

exports.getUsuarios = async (req, res) => {
    try{

    } catch (err) {
        return res.status(403).send('error')
    }
}