const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const routes = new express.Router();

//Multer serve para realizar a "leitura" do body quando 'e utilizado o formato multipart, 
const upload = multer(uploadConfig);

routes.get('/posts', PostController.index);
//Passamos por parametro o metodo uploag.single() passando por parametro o campo que estamos armazendo a imagem;
routes.post('/posts', upload.single('image'), PostController.store);
routes.post('/posts/:id/like', LikeController.store);

module.exports = routes;