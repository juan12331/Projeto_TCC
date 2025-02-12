const { Op } = require('sequelize');
const Avaliacoes = require('../models/avaliacoes');
const Usuarios = require('../models/usuarios');


exports.createAvaliacoes = async (req, res) => {
    try {
        const avaliacoes = await Avaliacoes.create(req.body)
        console.log(avaliacoes)
        return res.send('avaliação adicionada com sucesso')
    } catch (err) {
        return res.status(403).send(err)
    }
}

exports.deleteAvaliacoes = async (req, res) => {
    const encontrarAvaliacao = await Avaliacoes.findOne({ where: { id_avaliacao: req.params.id_avaliacao } })
    try {
        await encontrarAvaliacao.destroy();
        return res.send('Avaliação apagada deletado')
    } catch (err) {
        return res.send('erro', err)
    }
}


exports.getAllAvaliacoes = async (req, res) => {
    try {
        const encontrarAvaliacoes = await Avaliacoes.findAll({ include: Usuarios });
        return res.send(encontrarAvaliacoes);
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
}

exports.getAvaliacoesByCpf = async (req, res) => {
    try {
        const encontrarAvaliacao = await Avaliacoes.findOne({ include: Usuarios });
        return res.send(encontrarAvaliacao);
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
}

exports.UpdateAvaliacoes = async (req, res) => {
    try {
        const encontrarAvaliacoes = await Avaliacoes.findAll({ include: Usuarios });
        return res.send(encontrarAvaliacoes);
    } catch (error) {
        return res.status(500).send('Internal Server Error');
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

function TirarMedia(numeros) {
    let media = 0;
    let contador = 0;

    for (let i = 0; i < numeros.length; i++) {
        media += numeros[i].nota;
        contador++;
    }

    if (contador === 0) return 0; // Evita divisão por zero

    media = media / contador;
    media = arredondarPara0_5(media);

    return media;
}

function arredondarPara0_5(numero) {
    return Math.round(numero * 2) / 2;
}
