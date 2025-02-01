const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
const usuarios = require('./models/usuarios');
const cookieParser = require('cookie-parser')

usuarios.sync();

const app = express()

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3001, () => console.log('servidor rodando na porta 3001'));