// index.js

import fetch from 'node-fetch';


// Armazenamos o token numa variável.
// Num ambiente real, esse valor viria do Local Storage, ou de uma variável de ambiente
const API_TOKEN = '2d635ea9b637ea0f27d58985cc161d64';

// Criamos um novo objeto de Headers
const headers = new fetch.Headers({
  Authorization: API_TOKEN,
  // Precisamos adicionar o header `Content-Type` e defini-lo como `application/json`
  'Content-Type': 'application/json',
});

// Depois, criamos o body
// Utilizamos o `stringify` para que possamos enviar esse body como JSON
const body = JSON.stringify({
  name: 'Tryber',
  email: 'tryber@betrybe.com',
  password: 'Tr1b3r'
});


// Para aquecer, vamos começar com uma requisição do tipo `GET`
fetch('https://postman-echo.com/post?param1=teste', {
  // Passamos o objeto de headers como parâmetro para o fetch
//  headers
  method: 'POST',
  // Adicionamos o body às opções da request
  body,
})

  .then((response) => {
    // Ao receber a resposta, verificamos se correu tudo bem
    if (!response.ok) {
      // Caso não, forçamos a Promise a ser rejeitada
      return Promise.reject(response);
    }

    // Caso esteja tudo OK, lemos o body como JSON
    return response.json();
  })
  .then((data) => {
    // Por fim, escrevemos o body no console
    console.log(data);
  })
  .catch((errorOrResponse) => {
    // Em caso de falha simples (a request completou com um status diferente de 2xx)
    // simplesmente logamos o status no console
    if (errorOrResponse.status) {
      return console.error(`Request failed with status ${errorOrResponse.status}`);
    }

    // Caso tenha acontecido um erro de rede (não foi possível completar a request)
    // logamos o erro todo
    console.error(errorOrResponse);
});


//Executando o código acima, temos o seguinte resultado no terminal:
//Repare que a resposta nos entrega os parâmetros que enviamos na query string através da propriedade args , e os headers que enviamos através 
//da propriedade headers . Repare também que não existe uma propriedade body , nem mesmo como um objeto vazio, pois requests do tipo GET não possuem body .

//Basta substituir, na URL, o endpoint da API que queremos chamar, e adicionar a propriedade method com valor POST às opções da request.

//Enviando um Body

//Você vai ver agora como enviar informações no corpo da requisição. Para isso, é importante lembrar que o tipo de conteúdo de uma request é determinado pelo header Content-Type .

//Para utilizar outros verbos HTTP, basta alterar o valor da propriedade method , informando o método desejado, e pronto!

//Pra finalizar, fica o lembrete: Aqui utilizamos o node-fetch e o Node.js para executar os exemplos no terminal, mas o código acima utiliza o fetch, que é compatível com o fetch 
//do navegador. Isso quer dizer que você pode utilizar esse conhecimento para realizar requests no front também, quando estiver integrando front-end e back-end.
