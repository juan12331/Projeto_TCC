const express = require('express');
const routes = express.Router();

const UsuariosControllers = require('../controllers/usuarios');
const AvaliacoesControllers = require('../controllers/avaliacoes');
const Avaliacoes_quartosControllers = require('../controllers/avaliacoes_quartos');
const Fotos_quartosControllers = require('../controllers/fotos_quartos');
const ReservasControllers = require('../controllers/reservas');
const TiposUsuariosControllers = require('../controllers/tipos_usuarios');
const QuartosControllers = require('../controllers/quartos');
const autenticacao = require('../controllers/authenticate');
// const authenticate = require('../controllers/authenticate');





// função dos usuarios
routes.post('/login', autenticacao.loginJWT);
routes.post('/usuarios', UsuariosControllers.createUsuario);

routes.get('/usuarios/:cpf', UsuariosControllers.getUsersByCpf);
routes.get('/usuarios', UsuariosControllers.getAllUsers);

routes.delete('/usuarios/:cpf', UsuariosControllers.deleteUsuario);

routes.put('/usuarios/:cpf', UsuariosControllers.updateUsuario);

// função do tipos de usuario

routes.post('/tiposusuarios', autenticacao.autenticarJWT,
    autenticacao.verificarPapelUsuario([4]), TiposUsuariosControllers.createTiposUsuarios);

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
routes.get('/quartos/:id_quarto', QuartosControllers.getQuartosById);

routes.put('/quartos/:id_quarto', QuartosControllers.updateQuartos);

// rotas avaliacoes

routes.post('/avaliacoes', AvaliacoesControllers.createAvaliacoes);

routes.get('/avaliacoes', AvaliacoesControllers.getAllAvaliacoes);
routes.get('/avaliacoesNota', AvaliacoesControllers.getMediaAvaliacoes);
routes.get('/avaliacoes/:id_avaliacao', AvaliacoesControllers.getAvaliacoesById);

routes.put('/avaliacoes/:id_avaliacao', AvaliacoesControllers.UpdateAvaliacoes);

routes.delete('/avaliacoes/:id_avaliacao', AvaliacoesControllers.deleteAvaliacoes);

// rotas avaliacoes_quartos

routes.post('/avaliacoesQuartos', Avaliacoes_quartosControllers.createAvaliacoes);

routes.get('/avaliacoesQuartos', Avaliacoes_quartosControllers.getAllAvaliacoes);
routes.get('/avaliacoesQuartos/:id_reclamacao', Avaliacoes_quartosControllers.getAvaliacoesById);
routes.get('/avaliacoesQuartos/user/:cpf', Avaliacoes_quartosControllers.getAvaliacoesByCpf);
routes.get('/avaliacoesQuartos/quarto/:id_quarto', Avaliacoes_quartosControllers.getAvaliacoesByQuarto);

routes.delete('/avaliacoesQuartos/:id_reclamacao', Avaliacoes_quartosControllers.deleteAvaliacoes);

routes.put('/avaliacoesQuartos/:id_reclamacao', Avaliacoes_quartosControllers.updateAvalicoes);

// rotas reservas

routes.get('/reservas', ReservasControllers.getReservas);
routes.get('/reservas/:id_quarto', ReservasControllers.getReservasByQuarto);
routes.get('/reservas/user/:cpf', ReservasControllers.getReservasByCpf);
routes.get('/reservas/data', ReservasControllers.getReservasByDate);


routes.post('/reservas', ReservasControllers.createReserva);

routes.put('/reservas/:id', ReservasControllers.updateReserva);

routes.delete('/reservas/:id', ReservasControllers.deleteReserva);

module.exports = routes