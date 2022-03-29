//Callbacks
//toda vez que precisarmos que algo seja processado em segundo plano, devemos registrar uma callback.
// Ela será executada quando a operação que solicitamos for concluída. 

const fs = require('fs');

fs.readFile('./arquivo.txt', (err, content) => {
  if (err) {
    console.error(`Erro ao ler o arquivo: ${err.message}`);
    return;
  }

  console.log(`Arquivo lido com sucesso. Conteúdo: ${content.toString('utf8')}`);
});

//passamos uma função para readFile , à qual damos o nome de callback.
//O que o codigo faz:
//Primeiro, pedimos que o Node.js leia o arquivo, e passamos uma função de callback;
//Quando a leitura do arquivo é concluída ou um erro acontece, nossa função é chamada;
//Dentro dela, a primeira coisa que fazemos é verificar se existe um erro. Caso exista, escrevemos ele no console e encerramos a execução com o return ;
//Caso nenhum erro tenha acontecido, sabemos que nosso arquivo foi lido com sucesso e, portanto, seu conteúdo está no segundo parâmetro, que chamamos de content .

//Callbacks desse tipo são chamadas de node-style callbacks e são, por convenção, a melhor maneira de se estruturar uma callback.
//Toda API de módulos nativos do Node.js utiliza esse mesmo formato de callbacks


// /O lado ruim dos callbacks

//A principal desvantagem das callbacks vem do fato de que o resultado de uma operação só existe dentro daquela callback; ou seja: se precisamos executar uma coisa depois da outra, precisamos colocar uma callback dentro da outra

//aumentamos a dificuldade de ler e até mesmo de dar manutenção no código. Exemplo:
const fs = require('fs');

fs.readFile('file1.txt', (err, file1Content) => {
  if (err) return console.log(`Erro ao ler arquivo 1: ${err.message}`);

  console.log(`Lido file1.txt com ${file1Content.byteLength} bytes`);

  fs.readFile('file2.txt', (err, file2Content) => {
    if (err) return console.log(`Erro ao ler o arquivo 2: ${err.message}`);

    console.log(`Lido file2.txt com ${file2Content.byteLength} bytes`);

    fs.readFile('file3.txt', (err, file3Content) => {
      if (err) return console.log(`Erro ao ler o arquivo 3: ${err.message}`);

      console.log(`Lido file3.txt com ${file3Content.byteLength} bytes`);
    });
  });
});

//Suponhamos que precisamos ler, sequencialmente, três arquivos, e que vamos fazê-lo de forma assíncrona, para não travar nosso servidor. 
//callback hell, quando temos uma sequencia de callbacks uma dentro da outra, tipo cascata


//Solução menos viavel, porém melhor q as callbacks hell:
//quebrar o código em infinitas funções menores, que não fazem nada além de chamar a próxima callback,

const fs = require('fs');

const file3Callback = (err, file3Content) => {
  if (err) return console.log(`Erro ao ler o arquivo 3: ${err.message}`);

  console.log(`Lido file3.txt com ${file3Content.byteLength} bytes`);
};

const file2Callback = (err, file2Content) => {
  if (err) return console.log(`Erro ao ler o arquivo 2: ${err.message}`);

  console.log(`Lido file2.txt com ${file2Content.byteLength} bytes`);

  fs.readFile('file3.txt', file3Callback);
};

const file1Callback = (err, file1Content) => {
  if (err) return console.log(`Erro ao ler arquivo 1: ${err.message}`);

  console.log(`Lido file1.txt com ${file1Content.byteLength} bytes`);

  fs.readFile('file2.txt', file2Callback);
};

fs.readFile('file1.txt', file1Callback);


//Solução definitiva - melhor 
//Promises
//Na verdade, quando utilizamos Promises, ainda estamos utilizando um tipo de callback, mas que possui uma API mais legível e intuitiva.

// Promises no JavaScript funcionam da seguinte maneira: uma promessa é criada, e dentro dela existe código a ser executado. Se o código é executado sem nenhum problema,
// a Promise é resolvida através da função resolve 
//Se algo dá errado durante a execução do código, a Promise é rejeitada através da função reject .

//Enquanto com callbacks temos apenas uma função que recebe tanto o sucesso quanto o erro, nas Promises temos uma forma de registrar uma callback para sucesso e outra forma de registrar uma callback para erros.
//grande vantagem das Promises está no fato de que podemos registrar vários callbacks de sucesso para serem executados um após o outro, sendo que o próximo callback recebe o resultado do callback anterior.
//Utiliza-se o .then para a mesma Promise


// /Exemplo 1: Tratando erros de forma síncrona.
function dividirNumeros(num1, num2) {
    if (num2 == 0) throw new Error("Não pode ser feito uma divisão por zero");
  
    return num1 / num2;
  }
  
  try {
    const resultado = dividirNumeros(2, 1);
    console.log(`resultado: ${resultado}`);
  } catch (e) {
    console.log(e.message);
}


//Exemplo 2: Tratando erros de forma assíncrona.
function dividirNumeros(num1, num2) {
    const promise = new Promise((resolve, reject) => {
      if (num2 == 0) reject(Error("Não pode ser feito uma divisão por zero"));
  
      const resultado = num1 / num2;
      resolve(resultado)
    });
  
    return promise;
}
  
  dividirNumeros(2, 1)
    .then(result => console.log(`sucesso: ${result}`))
    .catch(err => console.log(`erro: ${err.message}`));


//No segundo exemplo acima, a função dividirNumeros retorna uma Promise, ou seja: ela promete que vai dividir os números. Caso não consiga realizar a divisão, ela rejeita essa promessa, utilizando a função reject . 
//Caso dê tudo certo, ela resolve a promessa, utilizando a função resolve 
//Tudo que será realizado de forma assíncrona , ou seja, em segundo plano, pode também ser encarado da mesma forma.

const p = new Promise((resolve, reject) => {
    // Aqui é onde vamos realizar a lógica que precisamos
    // para "tentar cumprir" a promessa
});

//Feito isso, o próximo passo é escrever o código que, de fato, resolve a Promise. Já combinamos que nossa função promete ler um arquivo. Então, agora, vamos colocar dentro da função executor o código que busca resolver essa promessa:
const fs = require('fs');

function readFilePromise (fileName) {
  return new Promise((resolve, reject) => {

    fs.readFile(fileName, (err, content) => {
      if (err) return reject(err);
      resolve(content);
    });

  });
}

//Primeiro:
//Recebemos, como parâmetro, o nome do arquivo que queremos ler, fileName na função readFilePromise(fileName)
//Segundo:
//Criamos e retornamos uma nova Promise, Promise((resolve, reject) => {} ;
//Terceiro:
//Chamamos o módulo nativo do node, fs , para realizar a leitura desse arquivo, fs.readFile(fileName, (err, content) => {});
//Quarto:
//Dentro da callback fs.readFile(fileName, (err, content) => {}) que passamos para a função readFile , verificamos se ocorreu um erro ( if (err) ). Se sim, rejeitamos a Promise e encerramos a execução - reject(err) ;
//Caso não tenha acontecido nenhum erro, resolvemos a Promise com o resultado da leitura do arquivo - resolve(content) .


//exemplo de como podemos consumir a Promise que estamos retornando da nossa função logo acima:
// ...

readFilePromise('./file.txt') // A função me promete que vai ler o arquivo
  .then((content) => { // Caso ela cumpra o que prometeu
    console.log(`Lido arquivo com ${content.byteLength} bytes`); // Escrevo o resultado no console
  })
  .catch((err) => { // Caso ela não cumpra o que prometeu
    console.error(`Erro ao ler arquivo: ${err.message}`); // Escrevo o erro no console
});


//Essa funcionalidade nos permite criar estruturas de pipeline , em que uma operação recebe como entrada o resultado da operação anterior, e esses resultados todos podem ser compostos e formar um único resultado de forma extremamente fácil!

//Reescrevendo o codigo anterior da callback hell
const fs = require('fs');

function readFilePromise (fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, content) => {
      if (err) return reject(err);
      resolve(content);
    });
  });
}

readFilePromise('file1.txt') // A função me promete que vai ler o arquivo
  .then((content) => { // Caso arquivo 1 seja lido,
    console.log(`Lido file1.txt com ${content.byteLength} bytes`); // Escrevo o resultado no console
    return readFilePromise('file2.txt'); // Chamo novamente a função, que me retorna uma nova Promise
  })
  .then(content => { // Caso a Promise retornada pelo `then` anterior seja resolvida,
    console.log(`Lido file2.txt com ${content.byteLength} bytes`); // Escrevemos o resultado no console
    return readFilePromise('file3.txt'); // E chamamos a função novamente, recebendo uma nova promessa
  })
  .then((content) => { // Caso a promessa de leitura do `file3.txt` seja resolvida,
    console.log(`Lido file3.txt com ${content.byteLength} bytes`); // Logamos o resultado no console
  })
  .catch((err) => { // Caso qualquer uma das promessas ao longo do caminho seja rejeitada
    console.log(`Erro ao ler arquivos: ${err.message}`); // Escrevemos o resultado no console
  });


//Lendo arquivos com métodos síncronos
// não precisamos ler arquivos "em segundo plano". Podemos fazer isso de forma síncrona, ou seja: parar a execução de todo o programa até que um arquivo seja lido.

//Os métodos assíncronos não esperam o comando atual terminar para iniciar o próximo

//io-local/readFileSync.js
const fs = require('fs');

const nomeDoArquivo = 'meu-arquivo.txt';

try {
  const data = fs.readFileSync(nomeDoArquivo, 'utf8');
  console.log(data);
} catch (err) {
  console.error(`Erro ao ler o arquivo: ${err.path}`);
  console.log(err);
}

//Logo após importarmos o módulo fs , criamos uma variável chamada nomeDoArquivo , contendo o nome (fixo) do arquivo que vamos ler e, em seguida, chamamos o método fs.readFileSync .


//Método fs.readFileSync
//esponsável por ler arquivos e trazer seu conteúdo para dentro do Node.js. Por ser síncrono , ele espera a leitura do arquivo terminar para, só então, atribuir o resultado à constante data .
//recebe dois parâmetros:
//nome do arquivo;
//Um parâmetro opcional que, quando é uma string, define o encoding que será utilizado durante a leitura do arquivo.


//Mas e se ocorrer um erro na leitura do arquivo?
//Com funções síncronas, como readFileSync , você deve tratar explicitamente os erros que puderem acontecer. Nesse exemplo, usamos um bloco try...catch 
//ara capturar quaisquer erros que possam acontecer durante a leitura do arquivo e imprimimos uma mensagem para o usuário no terminal.



//Lendo arquivos com métodos assíncronos
//O método fornecido pelo módulo fs para leitura assíncrona de arquivos é o fs.readFile 
//io-local/readFile.js
const fs = require('fs');

const nomeDoArquivo = 'meu-arquivo.txt';

fs.readFile(nomeDoArquivo, 'utf8', (err, data) => {
  if (err) {
    console.error(`Não foi possível ler o arquivo ${nomeDoArquivo}\n Erro: ${err}`);
    process.exit(1);
  }
  console.log(`Conteúdo do arquivo: ${data}`);
});

//Método fs.readFile
//recebe três parâmetros:
//nome do arquivo;
//Um parâmetro opcional que, quando é uma string, define o encoding que será utilizado durante a leitura do arquivo;
//Uma callback que permite receber e manipular os dados lidos do arquivo.


//Para utilizar a interface de Promises do fs , precisamos alterar a importação do módulo fs , importando, agora ('fs').promises . 
//Vamos ver como ficaria o código acima se utilizarmos Promises:
const fs = require('fs').promises;

const nomeDoArquivo = 'meu-arquivo.txt';

fs.readFile(nomeDoArquivo, 'utf8')
  .then((data) => {
    console.log(`Conteúdo do arquivo: ${data}`);
  })
  .catch((err) => {
    console.error(`Não foi possível ler o arquivo ${nomeDoArquivo}\n Erro: ${err}`);
    process.exit(1); // Encerra a execução do script e informa ao sistema operacional que houve um erro com código
});


//Escrevendo dados em arquivos
// Assim como o módulo ('fs').promises disponibiliza o método readFile , há também o método writeFile .
const fs = require('fs').promises;

fs.writeFile('./meu-arquivo.txt', 'Meu textão')
  .then(() => {
    console.log('Arquivo escrito com sucesso!');
  })
  .catch((err) => {
    console.error(`Erro ao escrever o arquivo: ${err.message}`);
});


//Utilizando async/await
//foram criadas para trabalhar com Promises como se estivéssemos trabalhando com código síncrono.
//A questão é que toda função na qual utilizamos async , automaticamente passa a retornar uma Promise, que será rejeitada em caso de erro, e resolvida em caso de sucesso.
const fs = require('fs').promises;

async function main() {
  try {
    await fs.writeFile('./meu-arquivo.txt', 'Meu textão');
    console.log('Arquivo escrito com sucesso!');
  } catch (err) {
    console.error(`Erro ao escrever o arquivo: ${err.message}`);
  }
}

main()

//Perceba que, para podermos utilizar o async/await , precisamos criar uma função main e colocar nossa lógica dentro dela. Isso acontece porque, por enquanto, o await só pode ser utilizado dentro de funções async .
const fs = require('fs').promises;

// A flag wx abre o arquivo para escrita **apenas** caso ele não exista. Caso o contrário, um erro será lançado
fs.writeFile('./meu-arquivo.txt', 'Eu estive aqui :eyes:', { flag: 'wx' })
  .then(() => {
    console.log('Arquivo salvo');
  })
  .catch((err) => {
    // Se o arquivo existir, um erro é retornado
    console.error('err');
});

//Note que, quando rodamos o código com a flag wx , tentando escrever no arquivo meu-arquivo.txt , é gerado o seguinte erro:
[...]
[Error: EEXIST: file already exists, open './meu-arquivo.txt'] {
  errno: -17,
  code: 'EEXIST',
  syscall: 'open',
  path: './meu-arquivo.txt'
}


//Rodando tudo junto
//O Promise.all é um método da Promise que nos permite passar um array de Promises e receber, de volta, uma única Promise. 
//Esse método também nos permite utilizar um único catch , que será chamado caso qualquer uma das Promises seja rejeitada.


//Vamos reescrever quase o mesmo código que fizemos lá em cima, que utilizamos para mostrar como Promises evitam o callback hell.
// Desta vez, vamos escrever, no final, a soma do tamanho de todos os arquivos. Além disso, vamos utilizar o módulo ('fs').promises para não precisarmos trabalhar com callbacks manualmente.

const fs = require('fs').promises;

Promise.all([
  fs.readFile('file1.txt'),
  fs.readFile('file2.txt'),
  fs.readFile('file3.txt'),
])
  .then(([file1, file2, file3]) => {
    const fileSizeSum = file1.byteLength + file2.byteLength + file3.byteLength;
    console.log(`Lidos 3 arquivos totalizando ${fileSizeSum} bytes`);
  })
  .catch((err) => {
    console.error(`Erro ao ler arquivos: ${err.message}`);
  });
