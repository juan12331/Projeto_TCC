const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
const usuarios = require('./models/usuarios');
const avaliacoes_quartos = require('./models/avaliacoes_quartos');
const avaliacoes = require('./models/avaliacoes');
const fotos_quartos = require('./models/fotos_quartos');
const quartos = require('./models/quartos');
const reservas = require('./models/reservas');
const tipos_usuarios = require('./models/tipos_usuarios')
const cookieParser = require('cookie-parser')

tipos_usuarios.sync();
usuarios.sync();
quartos.sync();
fotos_quartos.sync();
avaliacoes.sync();
avaliacoes_quartos.sync();
 reservas.sync();


const app = express()

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3001, () => console.log('servidor rodando na porta 3001'));