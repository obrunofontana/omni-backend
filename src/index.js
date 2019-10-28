const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

//Faco a conexao com o banco de dados NoSQL MongoDB na nuvem
mongoose.connect('mongodb+srv://db2sel:4nh4m81@cluster0-vyrpp.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

const app = express();

//Desta forma dividimos nossa aplicacao para que recebe as requisicoes http
// e tambem requisicoes web socket
const server = require('http').Server(app);
const io = require('socket.io')(server);

//Deixando a constante io vista para todas as rotas da aplicacao, para que
//consigamos trabalhar em real time, todos os usuarios receberem a informacao atualizada
app.use((req, res, next) => {
    req.io = io;

    //Necessario para que as proximas rotas nao deixem de ser executadas/
    next();
});

// Vulgo cors paulera, permite que qualer aplicacao acesso o nosso backend
app.use(cors());

//Rota para acessar aquivos staticos, que neste caso sao os uploads das imagens
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes'));



server.listen(3333);