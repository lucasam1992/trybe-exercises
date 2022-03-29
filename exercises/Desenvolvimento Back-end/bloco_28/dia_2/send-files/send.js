const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');

// stream de um arquivo
const stream = fs.createReadStream('./meu-arquivo.txt');

//criação de um forms com campo chamado file q irá carregar o stream do arquivo
const form = new FormData();
form.append('file', stream);

//esse arquivo nao sera enviado no body da requisição
// em ambientes NodeJS, é preciso setar o valor de boundary no header
// 'Content-Type' chamando o método 'getHeaders'
const formHeaders = form.getHeaders();

axios
    .post('http://localhost:3000/files/upload', form, {
        headers: {
            ...formHeaders,
        },
    })
    .then((response) => {
        console.log(response.status);
    })
    .catch((error) => {
        console.log(error);
    });