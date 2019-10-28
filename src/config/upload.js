/** 
 * Aqui ficara as configuracoes de upload de imagens;
 */
const multer = require('multer');
const path = require('path'); //Nativo do node 

//Exportar um objeto com as confguracoes do Multer

module.exports = {
    //Salvar as imagens dentro do nosso projeto;
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: function(req, file, cb) {
            cb(null, file.originalname)
        }

    })

};