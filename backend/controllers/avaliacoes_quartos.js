const { Op } = require('sequelize');
const AvaliacoesQuartos = require('../models/avaliacoes_quartos');


exports.createAvaliacoes = async (req, res) => {
    try {
        const avaliacoes = await AvaliacoesQuartos.create(req.body)
        return res.send('avaliação adicionada com sucesso')
    } catch (err) {
        return res.status(403).send(err)
    }
}


exports.getMediaAvaliacoes = async (req, res) => {
    try {
        const AvaliacoesNumeros = await Avaliacoes.findAll();
        const MediaAvaliacoes = TirarMedia(AvaliacoesNumeros);

        return res.status(200).json({ media: MediaAvaliacoes });
    } catch (error) {
        console.error("Erro ao obter média das avaliações:", error);
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
};

 
