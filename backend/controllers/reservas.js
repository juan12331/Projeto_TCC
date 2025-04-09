const { Op } = require('sequelize');
const Quartos = require('../models/quartos');
const Reservas = require('../models/reservas');
const Usuarios = require('../models/usuarios');
var moment = require('moment-timezone');

const timeZone = "America/Sao_Paulo";


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
        return res.send('reserva adicionada com sucesso')
    } catch (err) {
        return res.status(403).send(err)
    }
}


exports.getReservasByDate = async (req, res) => {
    try {
        console.log("Parâmetros recebidos:", req.params);
        
        // Capturar as datas dos parâmetros
        const dataInicio = req.params.data_inicio;
        const dataFinal = req.params.data_final; // Precisamos adicionar este parâmetro na rota
        
        console.log("Buscando reservas entre:", dataInicio, "e", dataFinal);
        
        // Se não tiver data final, use a mesma data de início
        const dataFimConsulta = dataFinal || dataInicio;
        
        // Converter para objetos Date
        const dataInicioObj = new Date(dataInicio);
        const dataFinalObj = new Date(dataFimConsulta);
        
        // Buscar todas as reservas
        const todas = await Reservas.findAll({
            include: [
                { model: Quartos },
                { model: Usuarios }
            ]
        });
        
        console.log("Total de reservas encontradas:", todas.length);
        
        // Filtrar as reservas que se sobrepõem ao período
        const filtradas = todas.filter(reserva => {
            // Converter para objetos Date
            const reservaInicio = new Date(reserva.data_inicio);
            const reservaFim = new Date(reserva.data_final);
            
            // Uma reserva se sobrepõe ao período se:
            // 1. A data de início da reserva está dentro do período de consulta, OU
            // 2. A data de fim da reserva está dentro do período de consulta, OU
            // 3. A reserva engloba todo o período de consulta
            
            const inicioNoPeriodo = reservaInicio >= dataInicioObj && reservaInicio <= dataFinalObj;
            const fimNoPeriodo = reservaFim >= dataInicioObj && reservaFim <= dataFinalObj;
            const englobaPeriodo = reservaInicio <= dataInicioObj && reservaFim >= dataFinalObj;
            
            return inicioNoPeriodo || fimNoPeriodo || englobaPeriodo;
        });
        
        console.log("Reservas encontradas no período:", filtradas.length);
        return res.json(filtradas);
    } catch (err) {
        console.error("Erro:", err);
        return res.status(500).json({ error: err.message });
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

