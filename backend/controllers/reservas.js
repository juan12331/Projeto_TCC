const { Op } = require('sequelize');
const Quartos = require('../models/quartos');
const Reservas = require('../models/reservas');
const Usuarios = require('../models/usuarios');

exports.getReservas = async (req, res) => {
    try{
        const reservas = await Reservas.findAll({ limit: 200, include: [ {model: Quartos}, {model: Usuarios}]  })
        return res.send(reservas)
    }catch(error){
        return res.status(500).send('Internal server Error')
    }
}

exports.getReservasByQuarto = async (req, res) => {
    try{
        const encontrarReserva = await Reservas.findAll({ where: {id_quarto: req.params.id_quarto} ,include: [ {model: Quartos}, {model: Usuarios}] });
        if (!encontrarReserva) {
            return res.status(404).send("error 404 not found")
        }
        return res.send(encontrarReserva);
    } catch(error) {
        return res.status(500).send('Internal server Error', error)
    }
}


exports.getReservasByCpf = async (req, res) => {
    try{
        const encontrarReserva = await Reservas.findAll({ where: {cpf: req.params.cpf} ,include: [ {model: Quartos}, {model: Usuarios}] });
        if (!encontrarReserva) {
            return res.status(404).send("error 404 not found")
        }
        return res.send(encontrarReserva);
    } catch(error) {
        return res.status(500).send('Internal server Error', error)
    }
}

exports.updateReserva = async (req, res) => {
    const id = req.params.id
    const Id_confirmation = await Reservas.findOne({ where: { id: id } })

        if (Id_confirmation) {
            try {
                const [Updates] = await Reservas.update(req.body, { where: { id: req.params.id } }) // verifica se tem alguma alteração
                return res.send({ message: 'Usuario foi atualizado ;P', })
    
            } catch (error) {
                return res.send('deu erro aqui meu mano ==> ', error)
    
            }
        }
        return res.status(404).send('usuario not found!!!')
    }


exports.createReserva = async (req, res) => {
    try {
        const reservas = await Reservas.create(req.body)
        console.log(reservas)
        return res.send('reserva adicionada com sucesso')
    } catch (err) {
        return res.status(403).send(err)
    }
}

exports.getReservasByDate = async (req, res) => {
    try {
        const reservas = await Reservas.create(req.body)
        console.log(reservas)
        return res.send('reserva adicionada com sucesso')
    } catch (err) {
        return res.status(403).send(err)
    }
}

exports.deleteReserva = async (req, res) => {
    const encontrarReserva = await Reservas.findOne({ where: { id: req.params.id } })
    try {
        await encontrarReserva.destroy();
        return res.send('Avaliação apagada deletado')
    } catch (err) {
        return res.send('erro', err)
    }
}

