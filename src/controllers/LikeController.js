const Post = require('../models/Post');

module.exports = {


    async store(req, res) {

        //Busco o post pelo id dele e somo +1
        const post = await Post.findById(req.params.id);

        post.likes += 1;

        //Salvo o post, sempre utilizando await para acoes que possam demorar
        await post.save();

        //Envia a informacao para todos os usuarios que estao conectados na minha aplicacao
        req.io.emit('like', post);

        //Retorno o posto atualizado 
        return res.json(post);
    }
};