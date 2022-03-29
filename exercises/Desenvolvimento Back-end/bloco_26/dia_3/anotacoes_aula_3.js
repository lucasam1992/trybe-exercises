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

//E se formos pelo caminho contrário? Se antes de tentarmos implementar o código já 
//começarmos traduzindo as especificações em testes e então já desenvolver pensando neles?


// conceito de TDD (Test Driven Development), em tradução livre, Desenvolvimento Orientado a Testes . Esse metodologia é bastante difundida e pode trazer muitos benefícios para o desenvolvimento.

//Passo a passo para um TDD
//analisar o que vai ter no codigo: funções, modulos, inputs ...
//cria-se a estrutura principal: describe e it
//criar as asserções 
//com os testes criados, inicia-se a criação do código


//Um pouco mais de testes

//Outro exemplo:

//Escreveremos uma função que lê o conteúdo de um arquivo. Essa função:

//Receberá um parâmetro com o nome do arquivo a ser lido. Esse arquivo deverá estar na pasta io-files ;
//Caso o arquivo solicitado exista, responderá uma string com o conteúdo do arquivo;
//Caso o arquivo solicitado não exista, deverá responder null .

//Antes de mais nada, vamos criar um novo diretório raiz para receber o nosso pacote node e instalar nossas ferramentas de testes:
mkdir examples2

cd examples2

mkdir io-test && cd io-test # Criando e entrando no diretório do nosso projeto

npm init # Iniciando o npm

npm install --save-dev mocha chai # Instalando as ferramentas de testes


//io-test/package.json
{
    //
    "scripts": {
      "start": "node index.js",
      "test": "mocha test.js"
    },
    //
}


//Mocha

//vamos escrever nosso arquivo test.js . Começaremos estruturando os requisitos em forma de testes com o mocha :
//io-test/test.js

describe('leArquivo', () => {
    describe('Quando o arquivo existe', () => {
      describe('a resposta', () => {
        it('é uma string', () => {
          //
        });
  
        it('é igual ao conteúdo do arquivo', () => {
          //
        });
      });
    });
  
    describe('Quando o arquivo não existe', () => {
      describe('a resposta', () => {
        it('é igual a "null"', () => {
          //
        });
      });
    });
});


//Chai
//adicionar as asserções com o chai:

//io-test/test.js
const { expect } = require('chai');

const leArquivo = require('./leArquivo');

const CONTEUDO_DO_ARQUIVO = 'VQV com TDD';

describe('leArquivo', () => {
  describe('Quando o arquivo existe', () => {
    describe('a resposta', () => {
      const resposta = leArquivo('arquivo.txt');

      it('é uma string', () => {
        expect(resposta).to.be.a('string');
      });

      it('é igual ao conteúdo do arquivo', () => {
        expect(resposta).to.be.equals(CONTEUDO_DO_ARQUIVO);
      });
    });
  });

  describe('Quando o arquivo não existe', () => {
    it('a resposta é igual a "null"', () => {
      const resposta = leArquivo('arquivo_que_nao_existe.txt');

      expect(resposta).to.be.equal(null);
    });
  });
});

//Aqui utilizamos uma nova asserção do chai , o a , que validará o "tipo" daquele retorno. Como se tivéssemos escrito: "espera a resposta ser uma string" (ou expect response to be a string ).


//Para que o teste seja executado, precisamos criar o arquivo que irá conter a função. Vamos começar com uma função vazia apenas para conseguir importá-la no arquivo de teste:
//io-test/leArquivo.js
module.exports = () => {
    //
}


//Agora vamos rodar o teste e ver o resultado: NAO PASSOU NADA
npm test # 
ou 
npm run test



//io-test/leArquivo.js
const fs = require('fs');

function leArquivo(nomeDoArquivo) {
  try {
    const conteudoDoArquivo = fs.readFileSync(nomeDoArquivo, 'utf8');

    return conteudoDoArquivo;
  } catch (err) {
    return null;
  }
}

module.exports = leArquivo;



//Isolando nossos testes
//nossos testes não devem realizar operações de IO ( input / output ), ou seja, não devem acessar nem o disco, nem a rede.


//Sendo assim, ao escrever testes, será muito comum precisarmos testar códigos que fazem esse tipo de operação de integração , o que pode adicionar complexidade aos nossos testes.


//Vejamos o exemplo que estamos construíndo: para garantir nossos cenários, precisaríamos, além de criar o teste e realizar a chamada à nossa função leArquivo , preparar um arquivo para ser lido com o conteúdo que esperamos ler.

//Sinon
//é uma ferramenta que fornece funções para diversos tipos dos Test Doubles ou, numa tradução livre, Dublês de Testes (remetendo aos dublês de filmes).


//Stubs são objetos que podemos utilizar para simular interações com dependências externas ao que estamos testando de fato (na literatura, é comum referir-se ao sistema sendo testado como SUT , que significa System under Test).
// instalação do Sinon:
npm install --save-dev sinon


//como podemos criar um stub para a função de leitura do fs :
const fs = require('fs');
const sinon = require('sinon');

sinon.stub(fs, 'readFileSync')
.returns('Valor a ser retornado');

//Perceba que precisamos importar o módulo fs e, então, falamos para o sinon criar um stub para a função readFileSync que retornará 'Valor a ser retornado' , conforme especificamos na chamada para returns .


//Vamos modificar nosso teste para utilizar o stub:
//io-test/test.js
const fs = require('fs');
const sinon = require('sinon');
const { expect } = require('chai');

const leArquivo = require('./leArquivo');

const CONTEUDO_DO_ARQUIVO = 'VQV com TDD';

sinon.stub(fs, 'readFileSync').returns(CONTEUDO_DO_ARQUIVO);

describe('leArquivo', () => {
  describe('Quando o arquivo existe', () => {
    describe('a resposta', () => {
      const resposta = leArquivo('arquivo.txt');

      it('é uma string', () => {
        expect(resposta).to.be.a('string');
      });

      it('é igual ao conteúdo do arquivo', () => {
        expect(resposta).to.be.equals(CONTEUDO_DO_ARQUIVO);
      });
    });
  });

  describe('Quando o arquivo não existe', () => {
    it('a resposta é igual a "null"', () => {
      const resposta = leArquivo('arquivo_que_nao_existe.txt');

      expect(resposta).to.be.equal(null);
    });
  });
});

//os testes que esperavam o valor retornados pelo stub funcionaram
//Porém, onde o valor esperado era outro, o teste passou a quebrar.

//Isso aconteceu porque criamos um comportamento falso único para a função, que é aplicado para todos os testes. Entretanto, em cada situação é esperado um valor diferente:
//Quando o arquivo passado existe é esperado que ela retorne o valor;
//Quando o arquivo passado não existe é esperado um erro;

//usa-se funções before e after do mocha

//Vamos adicionar esse conceito ao nosso teste:
const fs = require('fs');
const sinon = require('sinon');
const { expect } = require('chai');

const leArquivo = require('./leArquivo');

const CONTEUDO_DO_ARQUIVO = 'VQV com TDD';

describe('leArquivo', () => {
  describe('Quando o arquivo existe', () => {
    before(() => {
      sinon.stub(fs, 'readFileSync').returns(CONTEUDO_DO_ARQUIVO);
    });

    after(() => {
      fs.readFileSync.restore();
    });

    describe('a resposta', () => {
      it('é uma string', () => {
        const resposta = leArquivo('arquivo.txt');

        expect(resposta).to.be.a('string');
      });

      it('é igual ao conteúdo do arquivo', () => {
        const resposta = leArquivo('arquivo.txt');

        expect(resposta).to.be.equals(CONTEUDO_DO_ARQUIVO);
      });
    });
  });

  describe('Quando o arquivo não existe', () => {
    before(() => {
      sinon
        .stub(fs, 'readFileSync')
        .throws(new Error('Arquivo não encontrado'));
    });

    after(() => {
      fs.readFileSync.restore();
    });

    describe('a resposta', () => {
      it('é igual a "null"', () => {
        const resposta = leArquivo('arquivo_que_nao_existe.txt');

        expect(resposta).to.be.equal(null);
      });
    });
  });
});

//Perceba que antes de cada cenário de teste nós alteramos o comportamento do método do fs criando um stub e, depois da execução do teste, utilizamos a função restore() que o sinon atribui aos stubs para retornarmos o comportamento padrão daquela função.






