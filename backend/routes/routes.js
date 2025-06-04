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
//  const authenticate = require('../controllers/authenticate');

// função dos usuarios
routes.post('/login', autenticacao.loginJWT); 
routes.post('/usuarios', UsuariosControllers.createUsuario);

routes.get('/usuarios/:cpf', UsuariosControllers.getUsersByCpf);
routes.get('/usuarios', autenticacao.autenticarJWT,
    autenticacao.verificarPapelUsuario([1]), UsuariosControllers.getAllUsers);

routes.delete('/usuarios/:cpf', autenticacao.autenticarJWT,
    autenticacao.verificarPapelUsuario([1]), UsuariosControllers.deleteUsuario);

routes.put('/usuarios/:cpf', UsuariosControllers.updateUsuario);

routes.post('/logout', autenticacao.logout) 

// função do tipos de usuario
routes.post('/tiposusuarios', autenticacao.autenticarJWT,
    autenticacao.verificarPapelUsuario([1]), TiposUsuariosControllers.createTiposUsuarios);

routes.get('/tiposusuarios', autenticacao.autenticarJWT,
    autenticacao.verificarPapelUsuario([1]), TiposUsuariosControllers.getTiposUsuarios);

routes.delete('/tiposusuarios/:id_tipo', autenticacao.autenticarJWT,
    autenticacao.verificarPapelUsuario([1]), TiposUsuariosControllers.deleteTiposUsuarios);

// rotas Fotos_Quartos
routes.post('/fotosquartos', autenticacao.autenticarJWT, Fotos_quartosControllers.AdicionarFoto);

routes.delete('/fotosquartos/:id_foto', autenticacao.autenticarJWT,
    autenticacao.verificarPapelUsuario([1]), Fotos_quartosControllers.ApagarFoto);

routes.get('/fotosquartos', Fotos_quartosControllers.getAllFotos);

// rotas quartos
routes.post('/quartos', autenticacao.autenticarJWT,
    autenticacao.verificarPapelUsuario([1]), QuartosControllers.createQuarto);

routes.delete('/quartos/:id_quarto', autenticacao.autenticarJWT,
    autenticacao.verificarPapelUsuario([1]), QuartosControllers.deleteQuarto);

routes.get('/quartos', QuartosControllers.getAllQuartos);
routes.get('/quartos/:id_quarto', QuartosControllers.getQuartosById);

routes.put('/quartos/:id_quarto', autenticacao.autenticarJWT,
    autenticacao.verificarPapelUsuario([1]), QuartosControllers.updateQuartos);
// rotas avaliacoes
routes.post('/avaliacoes', autenticacao.autenticarJWT, AvaliacoesControllers.createAvaliacoes);

routes.get('/avaliacoes', autenticacao.autenticarJWT, AvaliacoesControllers.getAllAvaliacoes);
routes.get('/avaliacoesNota', autenticacao.autenticarJWT, AvaliacoesControllers.getMediaAvaliacoes);
routes.get('/avaliacoes/:id_avaliacao', autenticacao.autenticarJWT,
    autenticacao.verificarPapelUsuario([1]), AvaliacoesControllers.getAvaliacoesById);

routes.put('/avaliacoes/:id_avaliacao', autenticacao.autenticarJWT, AvaliacoesControllers.UpdateAvaliacoes);

routes.delete('/avaliacoes/:id_avaliacao', autenticacao.autenticarJWT,
    autenticacao.verificarPapelUsuario([1]), AvaliacoesControllers.deleteAvaliacoes);
// rotas avaliacoes_quartos
routes.post('/avaliacoesQuartos', autenticacao.autenticarJWT, Avaliacoes_quartosControllers.createAvaliacoes);
routes.get('/avaliacoesQuartos', autenticacao.autenticarJWT, Avaliacoes_quartosControllers.getAllAvaliacoes);
routes.get('/avaliacoesQuartos/:id_reclamacao', autenticacao.autenticarJWT, Avaliacoes_quartosControllers.getAvaliacoesById);
routes.get('/avaliacoesQuartos/user/:cpf', autenticacao.autenticarJWT, Avaliacoes_quartosControllers.getAvaliacoesByCpf);
routes.get('/avaliacoesQuartos/quarto/:id_quarto', autenticacao.autenticarJWT, Avaliacoes_quartosControllers.getAvaliacoesByQuarto)
routes.delete('/avaliacoesQuartos/:id_reclamacao', autenticacao.autenticarJWT,
    autenticacao.verificarPapelUsuario([1]), Avaliacoes_quartosControllers.deleteAvaliacoes);
routes.put('/avaliacoesQuartos/:id_reclamacao', autenticacao.autenticarJWT, Avaliacoes_quartosControllers.updateAvalicoes);

// rotas reservas
routes.get('/reservas', autenticacao.autenticarJWT, ReservasControllers.getReservas);
routes.get('/reservas/:id_quarto', autenticacao.autenticarJWT, ReservasControllers.getReservasByQuarto);
routes.get('/reservas/user/:cpf', autenticacao.autenticarJWT, ReservasControllers.getReservasByCpf);
routes.get('/reservas/data/:data_inicio/:data_final', autenticacao.autenticarJWT, ReservasControllers.getReservasByDate);
routes.get('/reservas/data/:data_inicio', autenticacao.autenticarJWT, ReservasControllers.getReservasByDate);

routes.post('/reservas', autenticacao.autenticarJWT, ReservasControllers.createReserva);

routes.put('/reservas/:id', autenticacao.autenticarJWT, ReservasControllers.updateReserva);

routes.delete('/reservas/:id', autenticacao.autenticarJWT, ReservasControllers.deleteReserva);

module.exports = routes;
