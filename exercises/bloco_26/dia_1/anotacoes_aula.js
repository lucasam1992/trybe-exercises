//Exportando e importando de módulos

//Exportando módulos

//Para exportar algo no sistema CommonJS, utilizamos a variável global module.exports , 
//atribuindo a ela o valor que desejamos exportar:

// brlValue.js
const brl = 5.37;

module.exports = brl;

//No arquivo acima estamos exportando do nosso módulo o valor da constante brl , que é 5.37
//Não é comum exportar apenas um valor unico


//caso que acontece com mais frequência:
// brlValue.js
const brl = 5.37;

const usdToBrl = (valueInUsd) => valueInUsd * brl;

module.exports = usdToBrl;
//--------------------------------------------------------------------

// index.js
const convert = require('./brlValue');

const usd = 10;
const brl = convert(usd);

console.log(brl) // 53.7
//---------------------------------------------------------------------


//Suponhamos agora que seja desejável exportar tanto a função de conversão quanto o valor 
//do dólar (a variável brl ). Para isso, podemos exportar um objeto contendo as duas 
//constantes da seguinte forma:
// brlValue.js
const brl = 5.37;

const usdToBrl = (valueInUsd) => valueInUsd * brl;

module.exports = {
  brl,
  usdToBrl,
};

//Dessa forma, ao importarmos o módulo, receberemos um objeto como resposta:
// index.js
const brlValue = require('./brValue');

console.log(brlValue); // { brl: 5.37, usdToBrl: [Function: usdToBrl] }

console.log(`Valor do dólar: ${brlValue.brl}`); // Valor do dólar: 5.37
console.log(`10 dólares em reais: ${brlValue.usdToBrl(10)}`); // 10 dólares em reais: 53.7

//Por último, como estamos lidando com um objeto, podemos utilizar object destructuring 
//para transformar as propriedades do objeto importado em constantes no escopo global:
const { brl, usdToBrl } = require('./brValue');

console.log(`Valor do dólar: ${brl}`); // Valor do dólar: 5.37
console.log(`10 dólares em reais: ${usdToBrl(10)}`); // 10 dólares em reais: 53.7


//Importando módulos

//Quando queremos importar um módulo local, precisamos passar para o require o caminho
// do módulo, seguindo a mesma assinatura. Por exemplo, require('./meuModulo')

//Além de importarmos um arquivo como módulo, podemos importar uma pasta.
//Para importarmos e utilizarmos o módulo meuModulo , basta passar o caminho 
//da pasta como argumento para a função require , assim:
// minha-aplicacao/index.js
const meuModulo = require('./meuModulo');1

console.log(meuModulo); // { funcionalidade1: [Function: funcionalidade1], funcionalidade2: [Function: funcionalidade2] }

meuModulo.funcionalidade1();


//Módulos internos
//Para utilizarmos um módulo interno, devemos passar o nome do pacote como parâmetro para a função require .
// Por exemplo, require('fs') importa o pacote fs , responsável pelo sistema de arquivos.
const fs = require('fs');

fs.readFileSync('./meuArquivo.txt');
//Repare que o nome da variável pode ser qualquer um que escolhermos.
//O importante é o nome do pacote que passamos como parâmetro para o require .



//Módulos de terceiros
//Não são nativos do Node.js
//preicsam ser instalados na pasta do projeto em q será usado.


//NPM
// repositório oficial para publicação de pacotes NodeJS


//npm init - nos permite criar, de forma rápida e simplificada, um novo 
//pacote Node.js na pasta onde é executado.

//npm init -y -Caso desejemos utilizar as respostas padrão para todas essas perguntas

// o npm init simplesmente cria um arquivo chamado package.json com as respostas 
//das perguntas realizadas e mais alguns campos de metadados

//npm run -O comando run faz com que o npm execute um determinado script configurado no package.json

//Por exemplo, para ter um script chamado lint que execute a ferramenta de linter que usamos aqui 
//na Trybe, o ESLint, nossa chave scripts fica assim:
{
    "scripts": {
      "lint": "eslint ."
    }
}

//Agora, com um script criado, podemos utilizar o comando npm run <nome do script> para executá-lo.
npm run lint

//npm start - age como um "atalho" para o comando npm run start , uma vez que sua função é 
//executar o script start definido no package.json .

//Como convenção, todo pacote que pode ser executado pelo terminal (como CLIs, APIs e afins) deve
// ter um script start com o comando necessário para executar a aplicação principal daquele pacote.

//Por exemplo, se tivermos um pacote que calcula o IMC (Índice de Massa Corporal) de uma pessoa cujo 
//código está no arquivo imc.js , é comum criarmos o seguinte script:
{
    // ...
    "scripts": {
      "start": "node imc.js"
    }
    // ...
}
//Dessa forma, qualquer pessoa que for utilizar seu script vai ter certeza de como 
//inicializá-lo, pois só vai precisar executar npm start .


//npm install
//npm install <nome do pacote> : Baixa o pacote do registro do NPM e o adiciona ao objeto dependencies do package.json

//npm install -D <nome do pacote> : É semelhante ao comando anterior. Baixa o pacote do registro do NPM,
// porém o adiciona ao objeto devDependencies do package.json , indicando que o pacote em questão 
//não é necessário para executar a aplicação, mas é necessário para desenvolvimento, ou seja, para
// alterar o código daquela aplicação. Isso é muito útil ao colocar a aplicação no ar, pois pacotes 
//marcados como devDependencies podem ser ignorados, já que vamos apenas executar a aplicação, e 
//não modificá-la.


//npm install : Baixa e instala todos os pacotes listados nos objetos de dependencies e devDependencies
// do package.json . Sempre deve ser executado ao clonar o repositório de um pacote para garantir que 
//todas as dependências desse pacote estão instaladas.



//Criando um script simples
//Uma vez dentro dessa pasta, execute o comando npm init . Deixe todas as perguntas com o valor padrão, a não ser o nome da pessoa autora ( author: ), onde você colocará seu nome.
//Pronto! Nosso pacote está criado. Abra a pasta hello-world no VSCode e vamos começar a criar nosso script.

//Criando o código do Hello, world!
//Dentro da pasta hello-world , crie um arquivo chamado index.js 
//Dentro do index.js , adicione
console.log('Hello, world!');


//Criando o script start
//Como você viu anteriormente, para criar um script, precisamos alterar o package.json da nossa 
//aplicação. Sendo assim, abra o package.json da pasta hello-world e altere a linha destacada para
// criar o script start dessa forma:
{
    "name": "hello-world",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "start": "node index.js"
    },
    "author": "Seu nome",
    "license": "ISC"
}

//Executando o script
//Para isso, navegue até a pasta hello-world no terminal e execute npm start .

//Lendo input do terminal
//pacote de terceiros: o readline-sync .
// comando npm i readline-sync para instalar o pacote acima

//Uma vez instalado o pacote, podemos utilizá-lo em nosso script. Para isso, precisamos, primeiro, importá-lo:
const readline = require('readline-sync');

// console.log('Hello, world!');

//Agora, com o pacote em mãos, podemos utilizar as funções question e questionInt disponibilizadas por ele para perguntar à pessoa usuária seu nome e idade:
// const readline = require('readline-sync');

const name = readline.question('Qual seu nome? ');
const age = readline.questionInt('Qual sua idade? ');

// console.log('Hello, world!');

//Pronto, o próximo e último passo é utilizarmos essas novas variáveis para compor nossa mensagem de olá.
// const readline = require('readline-sync');

// const name = readline.question('What is your name? ');
// const age = readline.questionInt('How old are you? ');

console.log(`Hello, ${name}! You are ${age} years old!`);

//Execute novamente o script com npm start para vê-lo em ação!







