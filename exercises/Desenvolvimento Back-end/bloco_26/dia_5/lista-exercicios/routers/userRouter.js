const router = require('express').Router();
const {
    isValidEmail,
    isValidPassword,
    isValidUsername,
} = require('../middlewares/validations');

//Crie uma rota POST /user/register que receba uma requisição que envie username , email e password no body da requisição,
router.post('/register', isValidUsername, isValidEmail, isValidPassword, (_req, res) =>
    res.status(201).json({message: 'user created'}),
);

//Crie uma rota POST /user/login que receba uma requisição que envie email / password no body da requisição e devolva um token como resposta,
router.post('/login', isValidUsername, isValidEmail, isValidPassword, (_req, res) =>
    res.status(200).json({token:'86567349784e'}),
);

module.exports = router;