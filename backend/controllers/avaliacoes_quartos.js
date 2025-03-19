const { Op } = require('sequelize');
const AvaliacoesQuartos = require('../models/avaliacoes_quartos');
const Usuarios = require('../models/usuarios');
const Quartos = require('../models/quartos');


exports.createAvaliacoes = async (req, res) => {
    try {
        const avaliacoes = await AvaliacoesQuartos.create(req.body)
        return res.send('avaliação adicionada com sucesso')
    } catch (err) {
        return res.status(403).send(err)
    }
}
 
exports.getAllAvaliacoes = async (req, res) => {
    try{

        const { cpf, nota, avaliacao_texto, id_quarto } = req.query || {};

        if (!cpf || !nota || !avaliacao_texto || !id_quarto ) {
            const avaliacoes = await AvaliacoesQuartos.findAll({include: [ {model: Quartos}, {model: Usuarios}]});
            return res.send(avaliacoes)
        }

        const pesquisa = {
            [Op.or]: [
                cpf ? { cpf: { [Op.like]: `%${cpf}%` } } : undefined,
                nota ? { nota: { [Op.like]: `%${nota}%` } } : undefined,
                avaliacao_texto ? { avaliacao_texto: { [Op.like]: `%${avaliacao_texto}%` } } : undefined,
                id_quarto ? { id_quarto: { [Op.like]: `%${id_quarto}%` } } : undefined,
            ].filter(Boolean)
        }

        const avaliacoes = await AvaliacoesQuartos.findAll({ where: pesquisa, limit: 50, include: [ {model: Quartos}, {model: Usuarios}]  })
        return res.send(avaliacoes)

    }catch(error){
        return res.status(500).send('Internal server Error')
    }
}

exports.getAvaliacoesById = async (req, res) => {
    try{
        const encontrarAvaliacao = await AvaliacoesQuartos.findByPk( req.params.id_reclamacao, { include: [ {model: Quartos}, {model: Usuarios}] });
        if (!encontrarAvaliacao) {
            return res.status(404).send("error 404 not found")
        }
        return res.send(encontrarAvaliacao);
    } catch (error) {
        return res.status(500).send('Internal server Error')
    }
}

exports.getAvaliacoesByCpf = async (req, res) => {
    try{
        const encontrarAvaliacao = await AvaliacoesQuartos.findAll({ where: {cpf: req.params.cpf} ,include: [ {model: Quartos}, {model: Usuarios}] });
        if (!encontrarAvaliacao) {
            return res.status(404).send("error 404 not found")
        }
        return res.send(encontrarAvaliacao);
    } catch (error) {
        return res.status(500).send('Internal server Error')
    }
}

exports.getAvaliacoesByQuarto = async (req, res) => {
    try{
        const encontrarAvaliacao = await AvaliacoesQuartos.findAll({ where: {id_quarto: req.params.id_quarto} ,include: [ {model: Quartos}, {model: Usuarios}] });
        if (!encontrarAvaliacao) {
            return res.status(404).send("error 404 not found")
        }
        return res.send(encontrarAvaliacao);
    } catch (error) {
        return res.status(500).send('Internal server Error')
    }
}

exports.updateAvalicoes = async (req, res) => {
    try{
        const id = req.params.id_reclamacao
        const idAvaliacao = await AvaliacoesQuartos.findOne({ where: {id_reclamacao: id}})
        if (idAvaliacao) {
            try {
                const [Updates] = await AvaliacoesQuartos.update(req.body, { where: { id_reclamacao: id }})
                return res.send({message: 'Avaliação atualizada com sucesso',})

            } catch( err) {
                res.status(500).send(err)
            }
        } 
    } catch (error){
        return res.status(500).send('Internal server Error')
    }
}

exports.deleteAvaliacoes = async (req, res) => {
    const encontrarAvaliacao = await AvaliacoesQuartos.findOne({ where: { id_reclamacao: req.params.id_reclamacao } })
    try {
        await encontrarAvaliacao.destroy();
        return res.send('Avaliação apagada deletado')
    } catch (err) {
        return res.send('erro', err)
    }
}