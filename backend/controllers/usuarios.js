const { Op } = require('sequelize');
const Usuarios = require('../models/usuarios');
const tipos_usuarios = require('../models/tipos_usuarios');
const bcrypt = require('bcrypt');


exports.createUsuario = async (req, res) => {
    try {
        const {cpf, nome, email, senha, telefone} = req.body
        const verificacao = await Usuarios.findOne({ where: {cpf}});
        if (verificacao) {
            return res.send('usuario ja foi cadastrado')
        }
        const senhaNova = await bcrypt.hash(senha, 10)
        const usuarioCriado = await Usuarios.create({cpf, nome, email, senha: senhaNova, telefone})
        return res.send('usuario cadastrado com sucesso')
    } catch (err) {
        return res.status(403).send(err)
    }
}


// exports.login = async (req, res) => {
//     try {
//         const { cpf, senha } = req.body;
//         const usuario = await Usuarios.findOne({ where: { cpf } })
//         const verificarSenha = bcrypt.compare(senha, usuario.senha)
//         if (usuario.cpf == cpf && verificarSenha) {
//             res.clearCookie('authenticated');
//             res.cookie('authenticated', true);
           
//             return res.send({ user: usuario })
//         }
//         return res.status(404).send('Usuario not found');
//     } catch (error) {
//         return res.status(500).send(error)
//     }
// }

exports.getUsersByCpf = async (req, res) => {
    try {
        const {cpf} = req.params

        console.log(req.params.cpf)
        const encontrarUsuario = await Usuarios.findByPk(req.params.cpf, { include: tipos_usuarios });
        if (!encontrarUsuario) {
            return res.status(404).send('Usuario not found');
        }

        return res.send(encontrarUsuario);
    } catch (error) {
        return res.status(500).send('Internal Server Error', error);
    }
}


exports.deleteUsuario = async (req, res) => {
    try {
        const encontrarUsuario = await Usuarios.findOne({ where: { cpf: req.params.cpf } })
        await encontrarUsuario.destroy();
        return res.send('usuario deletado')
    } catch (err) {
        return res.send('aqui deu erro mn se liga', err)
    }
}

exports.updateUsuario = async (req, res) => {
    const Cpf = req.params.cpf
    const CpfUsuario = await Usuarios.findOne({ where: { cpf: Cpf } })

    if (CpfUsuario) {
        try {
            const [Updates] = await Usuarios.update(req.body, { where: { cpf: req.params.cpf } }) // verifica se tem alguma alteração
            return res.send({ message: 'Usuario foi atualizado ;P', })

        } catch (error) {
            return res.send('deu erro aqui meu mano ==> ', error)

        }
    }
    return res.send('usuario not found!!!')
}


exports.getAllUsers = async (req, res) => {
    try {
        const encontrarUsuario = await Usuarios.findAll({ include: {model: tipos_usuarios} });
        return res.send(encontrarUsuario);
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
}
