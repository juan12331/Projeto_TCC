const express = require('express')
const routes = express.Router();

const UsuariosControllers = require('../controllers/usuarios');
const AvaliacoesControllers = require('../controllers/avaliacoes');
const Avaliacoes_quartosControllers = require('../controllers/avaliacoes_quartos');
const Fotos_quartosControllers = require('../controllers/fotos_quartos');
const ReservasControllers = require('../controllers/reservas');
const TiposUsuariosControllers = require('../controllers/tipos_usuarios');
const QuartosControllers = require('../controllers/quartos')

// função dos usuarios

routes.post('/login', UsuariosControllers.login);
routes.post('/usuarios', UsuariosControllers.createUsuario);

routes.get('/usuarios/:cpf', UsuariosControllers.getUsersByCpf);
routes.get('/usuarios', UsuariosControllers.getAllUsers);

routes.delete('/usuarios/:cpf', UsuariosControllers.deleteUsuario);

routes.put('/usuarios/:cpf', UsuariosControllers.updateUsuario);

// função do tipos de usuario

routes.post('/tiposusuarios', TiposUsuariosControllers.createTiposUsuarios);

routes.get('/tiposusuarios', TiposUsuariosControllers.getTiposUsuarios);

routes.delete('/tiposusuarios/:id_tipo', TiposUsuariosControllers.deleteTiposUsuarios);

// rotas Fotos_Quartos

routes.post('/fotosquartos', Fotos_quartosControllers.AdicionarFoto);

routes.delete('/fotosquartos/:id_foto', Fotos_quartosControllers.ApagarFoto);

routes.get('/fotosquartos', Fotos_quartosControllers.getAllFotos);

// rotas quartos

routes.post('/quartos', QuartosControllers.createQuarto);

routes.delete('/quartos/:id_quarto', QuartosControllers.deleteQuarto);

routes.get('/quartos', QuartosControllers.getAllQuartos);

// rotas avaliacoes

routes.post('/avaliacoes', AvaliacoesControllers.createAvaliacoes);

routes.get('/avaliacoes', AvaliacoesControllers.getAllAvaliacoes);
routes.get('/avaliacoesNota', AvaliacoesControllers.getMediaAvaliacoes)
routes.get('/avaliacoes/:id', AvaliacoesControllers.getAvaliacoesById)

routes.put('/avaliacoes/:id', AvaliacoesControllers.UpdateAvaliacoes)

routes.delete('/avaliacoes/:id_avaliacao', AvaliacoesControllers.deleteAvaliacoes)

// rotas avaliacoes_quartos

routes.get('/avaliacoesQuartos', Avaliacoes_quartosControllers.get)

module.exports = routes