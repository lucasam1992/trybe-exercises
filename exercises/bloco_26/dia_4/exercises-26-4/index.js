const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(function(err,req,res,next){
    res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`);
});

app.listen(3001, () => console.log('ouvindo na porta 3001!'));

// Exercicio 1
//Crie uma rota GET /ping
//Sua rota deve retornar o seguinte JSON: { message: 'pong' }

app.get('/ping', (_req,res) => res.json({"message": 'pong'}));

//Exercicio 2
//Crie uma rota POST /hello
//Sua rota deve receber, no body da requisição, o seguinte JSON: { "name": "<nome do usuário>" }
//Sua rota deve retornar o seguinte JSON: { "message": "Hello, <nome do usuário>!" } .

app.post('/hello', (req, res) => {
    const { name } = req.body;
    res.status(200).json({"message":`Hello, ${name}!`});
});

//Testar no httpie => http POST :3001/hello name=lucas


//Crie uma rota POST /greetings
//Sua rota deve receber o seguinte JSON: { "name": "<nome do usuário>", "age": <idade do usuário> } .
//Caso a pessoa usuária tenha idade superior a 17 anos, devolva o JSON { "message": "Hello, <nome do usuário>!" } com o status code 200 - OK .
//Caso a pessoa usuária tenha 17 anos ou menos, devolva o JSON { "message": "Unauthorized" } com o status code 401 - Unauthorized .

app.post('/greetings', (req,res) => {
    const {name, age } = req.body;

    if(parseInt(age,10) <= 17){
        return res.status(401).json({message: `Unauthorized` });
    }
    res.status(200).json({message: `Hello, ${name}`});
});
//http POST :3001/greetings name=lucas age=18











