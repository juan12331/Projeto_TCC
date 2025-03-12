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

        // Pegando os IDs dos quartos que estão reservados, para poder excluí-los da busca
        const quartosReservados = reservas.map(reserva => reserva.id_quarto);

        // Buscando todos os quartos que não estão reservados durante o período solicitado
        const quartosDisponiveis = await Quartos.findAll({
            where: {
                id_quarto: {
                    [Op.notIn]: quartosReservados, // Excluindo os quartos que estão reservados
                },
            },
        });

        // Retornando a lista de quartos disponíveis no formato JSON
        return res.status(200).json(quartosDisponiveis);

    } catch (error) {
        // Caso aconteça algum erro, retornando uma mensagem de erro
        console.error(error);
        return res.status(500).json({ message: "Erro ao buscar quartos disponíveis.", error });
    }
};


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

