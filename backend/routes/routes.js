const express = require('express')
const routes = express.Router();

const UsuariosControllers = require('../controllers/usuarios');
const AvaliacoesControllers = require('../controllers/avaliacoes');
const Avaliacoes_quartosControllers = require('../controllers/avaliacoes_quartos');
const Fotos_quartosControllers = require('../controllers/fotos_quartos');
const ReservasControllers = require('../controllers/reservas')

// função dos usuarios

routes.post('/login', UsuariosControllers.login);
routes.post('/usuarios', UsuariosControllers.createUsuario);

module.exports = routes