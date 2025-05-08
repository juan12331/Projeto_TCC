const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuarios = require('../models/usuarios');
const tipos_usuarios = require('../models/tipos_usuarios');

const CHAVE_SECRETA = process.env.TOKEN_SECRETO_JWT;

// Middleware de autenticação JWT
const autenticarJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).send('Token de autenticação não fornecido');
    }

    try {
        const decoded = jwt.verify(token, CHAVE_SECRETA);
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(403).send('Token inválido ou expirado');
    }
};


// Middleware para verificar permissões de usuário
const verificarPapelUsuario = (papeisPermitidos) => {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(401).send('Não autenticado');
        }

        if (!papeisPermitidos.includes(req.usuario.tipoUsuario)) {
            console.log(req.usuario.tipoUsuario)
            return res.status(403).send('Acesso negado');
        }

        next();
    };
};

// Função de login com JWT
const loginJWT = async (req, res) => {
    try {
        const { cpf, senha } = req.body;

        const usuario = await Usuarios.findOne({
            where: { cpf },
            include: [{ model: tipos_usuarios }]
        });

        if (!usuario) {
            return res.status(404).send('Usuário não encontrado');
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).send('Senha incorreta');
        }

        console.log(usuario.cpf, usuario.nome, usuario.id_tipo)

        const token = jwt.sign(
            {
                cpf: usuario.cpf,
                nome: usuario.nome,
                tipoUsuario: usuario.id_tipo
            },
            CHAVE_SECRETA,
            { expiresIn: '24h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 86400000
        });

        return res.json({
            mensagem: 'Login realizado com sucesso',
            token: token,
            usuario: {
                cpf: usuario.cpf,
                nome: usuario.nome,
                email: usuario.email,
                tipoUsuario: usuario.id_tipo
            }
        });
    } catch (error) {
        console.error('Erro no login:', error);
        return res.status(500).send('Erro interno do servidor');
    }
};

// Função de logout
const logout = (req, res) => {
    res.clearCookie('token');
    return res.json({ mensagem: 'Logout realizado com sucesso' });
};

// CORREÇÃO IMPORTANTE: Exportação direta
module.exports = {
    autenticarJWT,
    verificarPapelUsuario,
    loginJWT,
    logout
};