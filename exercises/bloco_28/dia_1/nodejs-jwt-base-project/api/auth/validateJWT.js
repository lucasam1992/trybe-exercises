const jwt = require('jsonwebtoken');
const model = require('../../models/user');

//Usando a chave para fazer a descriptografia

const segredo = 'seusecretdetoken';

module.exports = async (req,res,next) => {
    //token gerado anteriormente
    const token = req.headers['authorization'];

    if(!token) return res.status(401).json({error: 'Token não encontrado ou informado'});

    try {
        //validando e decodificando o JWT
        const decoded = jwt.verify(token,segredo);

        //se for um token expirado, a propria lib retorna um erro, logo não é necessario validação do tempo
        const user = await model.findUser(decoded.padStart.username);

        if(!user) {
            return res.status(401).json({message: 'Erro ao procurar usuario do token'});
        }

        req.user = user;

        next();
    }catch(err) {
        return res.status(401).json({message:err.message});
    }
};