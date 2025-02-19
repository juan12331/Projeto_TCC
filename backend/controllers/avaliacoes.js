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
        const { cpf, nota, avaliacao_texto } = req.query || {};

        if (!cpf || !nota || !avaliacao_texto ) {
            const avaliacoes = await Avaliacoes.findAll();
            console.log(avaliacoes)
            return res.send(avaliacoes)
        }

        const pesquisa = {
            [Op.or]: [
                cpf ? { cpf: { [Op.like]: `%${cpf}%` } } : undefined,
                nota ? { nota: { [Op.like]: `%${nota}%` } } : undefined,
                avaliacao_texto ? { avaliacao_texto: { [Op.like]: `%${avaliacao_texto}%` } } : undefined,
            ].filter(Boolean)
        }

        const avaliacoes = await Avaliacoes.findAll({ where: pesquisa, limit: 20 })
        return res.send(avaliacoes)

    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
}

exports.getAvaliacoesById = async (req, res) => {
    try {
        const encontrarAvaliacao = await Avaliacoes.findByPk( req.params.id, { include:[{ model: Usuarios}]});
        if (!encontrarAvaliacao) {
            return res.status(404).send("error 404 not found")
        }
        return res.send(encontrarAvaliacao);
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
}

exports.UpdateAvaliacoes = async (req, res) => {
   
        const id = req.params.id_avaliacao
        const idAvaliacao = await Avaliacoes.findOne({ where: {id_avaliacao: id}})
        if (idAvaliacao) {
            try {
                const [Updates] = await Avaliacoes.update(req.body, { where: { id_avaliacao: id }})
                return res.send({message: 'Avaliação atualizada com sucesso',})

            } catch( err) {
                res.status(500).send(err)
            }
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
