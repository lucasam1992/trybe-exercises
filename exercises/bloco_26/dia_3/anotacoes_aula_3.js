//Por que testar?

//examples/calculaSituacao.js
function calculaSituacao(media) {
    if (media > 7) {
      return 'aprovado';
    }
  
    return 'reprovado';
  }
  
module.exports = calculaSituacao;

//Agora vamos testar essa função de acordo com os comportamentos que ela deveria ter segundo a proposta, nesse caso precisamos garantir que:
//Se passado um valor menor que 7 , por exemplo 4 , a resposta deve ser "reprovado" ;
//Se passado um valor maior que 7 , por exemplo 9 , a resposta ser "aprovado" ;
//E, não podemos esquecer do "OU", sendo assim, se passado 7 , a resposta deve ser "aprovado" ;


//Para validar esses cenários que pensamos podemos escrever algumas chamadas a nossa função:
const calculaSituacao = require('./examples/calculaSituacao');

console.log(calculaSituacao(4));
// console: reprovado

//Para ficar mais simples, poderíamos adicionar algumas mensagens para nos ajudar e também já verificar se a resposta dada é aquela que esperamos:
const calculaSituacao = require('./examples/calculaSituacao');

console.log('Quando a média for menor que 7, retorna "reprovado":');

const respostaCenario1 = calculaSituacao(4);
if (respostaCenario1 === 'reprovado') {
  console.log(`Ok 🚀`);
} else {
  console.error('Resposta não esperada 🚨');
}
// console:
// Quando a média for menor que 7, retorna "reprovado":
// Ok 🚀

console.log('Quando a média for maior que 7, retorna "aprovado":');

const respostaCenario2 = calculaSituacao(9);
if (respostaCenario2 === 'aprovado') {
  console.log(`Ok 🚀`);
} else {
  console.error('Resposta não esperada 🚨');
}
// console:
// Quando a média for maior que 7, retorna "aprovado":
// Ok 🚀

console.log('Quando a média for igual a 7, retorna "aprovado":');

const respostaCenario3 = calculaSituacao(7);
if (respostaCenario3 === 'aprovado') {
  console.log(`Ok 🚀`);
} else {
  console.error('Resposta não esperada 🚨');
}
// console:
// Quando a média for igual a 7, retorna "aprovado":
// Resposta não esperada 🚨


//Testes automatizados

//Ferramentas
//Para implementar testes no back-end iremos utilizar a dupla mocha e chai . Apesar de serem duas ferramentas diferentes, elas se completam.

//Esses módulos só serão utilizados em fase de desenvolvimento e não serão utilizados para executar nossa aplicação quando ela for publicada

npm install -D mocha chai


//Tipos de teste

//existem algumas divisões arbitrárias que nos ajudam a pensar uma ordem de desenvolvimento de testes, sendo as mais comuns:

//Testes unitários : Trabalham presumindo um escopo limitado a um pequeno fragmento do seu código com interação mínima entre recursos externos. Ex: Uma função com um fim específico, como uma função que soma dois números:

// ./funcoes/calculo/soma.js
// Aqui podemos escrever testes pensando somente o comportamento esperado para função `soma`

const soma = (valorA, valorB) => valorA + valorB;

module.exports = soma;


//Testes de integração : Trabalham presumindo a junção de múltiplos escopos (que tecnicamente devem possuir, cada um, seus próprios testes) com interações entre eles. Ex: Uma função de calculadora que usa funções menores que eu posso testar isoladamente/ de forma unitária:

// ./funcoes/calculadora.js
// Aqui podemos escrever testes pensando o comportamento da função `calculadora` que presume o bom comportamento das funções que integram ela: `soma`, `subtracao`, `multiplicacao`, `divisao`

const { soma, subtracao, multiplicacao, divisao } = require("./calculo");

const calculadora = (valorA, valorB, operacao) => {
  switch(operacao) {
    case "soma":
      soma(valorA, valorB);
      break;
    case "subtracao":
      subtracao(valorA, valorB);
      break;
    case "multiplicacao":
      multiplicacao(valorA, valorB);
      break;
    case "divisao":
      divisao(valorA, valorB);
      break;
    default:
      break;
  }
};

module.exports = calculadora;

// Esse contexto fica mais evidente, quando temos operações mais complexas nos nossos testes, como operações que envolvem leitura de arquivos e consultas no banco de dados para composição de informações

//Testes de Ponto-a-ponto : Chamados também de Fim-a-fim (End-to-End; E2E) , esses testes pressupõe um fluxo de interação completo com a aplicação, de um ponto a outro: Aqui, poderíamos pensar uma API que utiliza 
//nossa calculadora (assim como diversas outras funções mais complexas) na hora de realizar uma operação de venda de produtos. Esse teste é o mais completo pois pressupõe que todos os demais testes estão ou serão desenvolvidos (Pensando na prática do TDD que veremos mais adiante).
//Um exemplo prático disso, são os avaliadores de projetos de front-end.

//no geral, existe sempre uma relação de escopo/interação que é definida durante o desenvolvimento de testes e quanto maior o número de escopos diferentes e situações de interação prevista dentro desses escopos, maior a coesão e a confiabilidade do seu projeto.


//Escrevendo testes
//O primeiro passo é compreender, através dos requisitos, a estrutura que desejamos ter e os comportamentos esperados. Já desenvolvemos esses pensamentos anteriormente, retomando-os temos:
//recebe parametro média - responde aprovado ou reprovado

//Estruturando testes com o Mocha
//O mocha é um framework de testes para JS, isso significa que ele nos ajuda a arquitetar os nossos testes, nos fornecendo a estrutura e interface para escrevermos os nossos testes.

//O mocha reserva as palavras describe e it
//describe permite adicionar uma descrição para um teste especifico ou um grupo de testes
//it permite sinalizar exatamente o cenario de teste q estamos testando naquele ponto



//testando anteriormente
console.log('Quando a média for maior que 7, retorna "aprovado":');

//testando com mocha
describe('Quando a média for menor que 7', () => {
    //
});

//describe aceita dois parâmetros: o primeiro é a descrição e o segundo uma função para executar o cenário de teste.


//Descrito nosso comportamento, vamos adicionar o que será testado de fato, ou seja, o que é esperado. Para isso, temos o it :
describe('Quando a média for menor que 7', () => {
    it('retorna "reprovado"', () => {
      //
    });
});

//Aferindo testes com o Chai

//fornece maneiras de dizermos o q queremos testar e entaõ ele validará se o resultado condiz com o esperado

//Para de fato testar nossa função precisamos chamá-la passando o input desejado e então validar se a resposta é aquela que esperamos.

//Essa validação é o que chamamos de assertion , "asserção" ou, em alguns casos, "afirmação" . Para nos ajudar com essa tarefa temos o chai , que nos fornece diversos tipos de validações diferentes.

//expect - que significa de fato o que é esperado
const resposta = calculaSituacao(4);

expect(resposta).equals('reprovado');

//cenário de teste inteiro com mocha + chai :
const { expect } = require('chai');

const calculaSituacao = require('../examples/calculaSituacao');

describe('Quando a média for menor que 7', () => {
  it('retorna "reprovado"', () => {
    const resposta = calculaSituacao(4);

    expect(resposta).equals('reprovado');
  });
});

//Para tornar nosso teste ainda mais legível e elegante, o chai nos fornece outros getters encadeáveis que possuem um papel puramente estético. 
//Por exemplo o to e o be , que nos permite escrever nossa assertion da seguinte maneira:
//tests/calculaSituacao.js
const { expect } = require('chai');

const calculaSituacao = require('../examples/calculaSituacao');

describe('Quando a média for menor que 7', () => {
  it('retorna "reprovado"', () => {
    const resposta = calculaSituacao(4);

    expect(resposta).to.be.equals('reprovado');
  });
});


//Perceba que o to e o be não alteraram em nada a validação realizada, porém, a leitura fica muito mais fluída e natural, 
//é como se estivéssemos dito que nosso teste "espera a resposta ser igual a "reprovado".


//Executando o teste
npm init # Iniciando o npm

//Teste escrito, vamos ver como executá-lo. Como dito antes, o mocha é o responsável por executar nossos testes. Ele entenderá as palavras reservadas describe e it , assim como a estrutura do nosso teste.

//adicionar um novo script ao nosso package.json , que chama o mocha e informa um arquivo ou diretório de testes:
//package.json
{
    // ...
      "scripts": {
        "start": "node index.js",
        "test": "mocha tests"
      },
    // ...
}

//Dessa forma, não precisamos instalar nada globalmente, e para executar nosso teste basta rodar em nosso terminal o script test , que irá executar =o comando mocha tests utilizando o módulo instalado:
npm run test
//ou
npm test


//Testando todos os cenários

//Adicionando os demais comportamentos, temos:


//tests/calculaSituacao.js
const { expect } = require('chai');

const calculaSituacao = require('../examples/calculaSituacao');

describe('Quando a média for menor que 7', () => {
  it('retorna "reprovado"', () => {
    const resposta = calculaSituacao(4);

    expect(resposta).to.be.equals('reprovado');
  });
});

describe('Quando a média for maior que 7', () => {
  it('retorna "aprovado"', () => {
    const resposta = calculaSituacao(9);

    expect(resposta).to.be.equals('aprovado');
  });
});

describe('Quando a média for igual a 7', () => {
  it('retorna "aprovado"', () => {
    const resposta = calculaSituacao(7);

    expect(resposta).to.be.equals('aprovado');
  });
});

//ultimo cenario quebra, pois nao existe a condição 7 === 7


//TDD - Transformando requisitos em testes
























