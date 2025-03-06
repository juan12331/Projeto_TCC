const { Op } = require('sequelize');
const Quartos = require('../models/quartos');
const Reservas = require('../models/reservas');
const Usuarios = require('../models/usuarios');

exports.getReservas = async (req, res) => {
    try{
        const reservas = await Reservas.findAll({ limit: 50, include: [ {model: Quartos}, {model: Usuarios}]  })
        return res.send(reservas)
    }catch(error){
        return res.status(500).send('Internal server Error')
    }
}

exports.getReservasByQuarto = async (req, res) => {}

exports.getQuartosDisponiveis = async (req, res) => {
    // Pegando as datas de início e final da query string da requisição
    const { data_inicio, data_final } = req.query;

    // Verificando se as datas de início e fim foram fornecidas na requisição
    if (!data_inicio || !data_final) {
        return res.status(400).json({ message: "As datas de início e fim são obrigatórias." });
    }

    try {
        // Convertendo as datas recebidas para objetos Date, para poder comparar com as datas das reservas
        const inicio = new Date(data_inicio);
        const fim = new Date(data_final);

        // Verificando se as datas são válidas
        if (isNaN(inicio.getTime()) || isNaN(fim.getTime())) {
            return res.status(400).json({ message: "Datas inválidas." });
        }

        // Buscando as reservas no banco de dados que possuem sobreposição de datas
        const reservas = await Reservas.findAll({
            where: {
                [Op.or]: [ // Usando o operador "OR" para buscar reservas com sobreposição de datas
                    {
                        // Caso a reserva comece antes da data final solicitada e termine depois da data inicial solicitada
                        data_inicio: {
                            [Op.lt]: fim, // A data de início da reserva deve ser antes da data final solicitada
                        },
                        data_final: {
                            [Op.gt]: inicio, // A data de final da reserva deve ser depois da data de início solicitada
                        },
                    },
                    {
                        // Caso a reserva comece depois da data inicial solicitada e termine antes da data final solicitada
                        data_inicio: {
                            [Op.gt]: inicio, // A data de início da reserva deve ser depois da data inicial solicitada
                        },
                        data_final: {
                            [Op.lt]: fim, // A data de final da reserva deve ser antes da data final solicitada
                        },
                    },
                ],
            },
            
        });

    } catch(error) {
        return res.status.send(500).send('error', error);
    }
}

exports.getReservasByCpf = async (req, res) => {}

exports.updateReserva = async (req, res) => {}

exports.createReserva = async (req, res) => {
    try {
        const reservas = await Reservas.create(req.body)
        console.log(reservas)
        return res.send('avaliação adicionada com sucesso')
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

