const Post = require('../models/Post');
//Sharp e uma biblioteca que permite manipular imagens, sera utilizado para 
// redimensionar as imagens carregadas
const sharp = require('sharp');
const path = require('path'); //Biblioteca nativa do nodejs
const fs = require('fs'); //biblioteca nativa do nodejs

module.exports = {

    async index(req, res) {
        // Busco os posts e ordeno por data de ultima criacao
        const posts = await Post.find().sort('-createdAt');

        return res.json(posts);

    },

    async store(req, res) {

        //Recupero as informacoes de dentro do body da requisicao
        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file // Onde tem o conteudo da nossa imagem

        const [name] = image.split('.');
        const fileName = `${name}.jpg`

        //Pego o caminho onde a imagem foi salva, que neste projeto esta sendo salva em uploads/resized
        //Criando um novo aquivo redimensionado;
        await sharp(req.file.path)
            .resize(500) //Max altura max largura 500px 
            .jpeg({ quality: 70 })
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName)
            )

        //Removo a antiga imagem, pois nao faz sentido ela continuar na aplicacao
        fs.unlinkSync(req.file.path);


        // await e utilizado em acoes que podem demorar 
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: fileName,
        });

        //Envia a informacao para todos os usuarios que estao conectados na minha aplicacao
        req.io.emit('post', post);

        return res.json(post);
    }
};