const readline = require('readline-sync');

const scripts = [
    {nome:"imc",script:"./imc.js"},
    {nome:"velocidade",script:"./velocidade.js"},
    {nome:"sorteio",script:"./sorteio.js"},
];

let mensagem = scripts.map((script,index) =>`${index+1}-${script.nome}`);

const scriptNumber = readline.questionInt(mensagem)-1;

const script = scripts[scriptNumber];

require(script.script);






