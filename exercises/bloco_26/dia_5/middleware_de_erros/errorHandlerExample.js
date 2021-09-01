//A diferença de um middleware de erro para um middleware comum é que a assinatura dele recebe quatro parâmetros ao invés de três, ficando assim: function (err, req, res, next) {} .
app.use(middleware1);
app.get('/', */ ... */);
app.use(function (err, req, res, next) {
  res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`);
});

//Middlewares de erro sempre devem vir depois de rotas e outros middlewares ;
//Middlewares de erro sempre devem receber quatro parâmetros .

//O Express utiliza a quantidade de parâmetros que uma função recebe para determinar se ela é um middleware de erro ou um middleware comum. 
//Ou seja, mesmo que você não vá utilizar os parâmetros req , res ou next , seu middleware de erro precisa recebê-los .
//exemplo: function (err, _req, res, _next) {} .


//Também é possível encadear middlewares de erro, no mesmo esquema dos outros middlewares, simplesmente colocando-os na sequência em que devem ser executados.
app.use(function logErrors(err, req, res, next) {
    console.error(err.stack);
    /* passa o erro para o próximo middleware */
    next(err);
  });
  
  app.use(function (err, req, res, next) {
    res.status(500);
    res.json({ error: err });
});

//Repare que estamos fazendo next(err) na linha 4. Isso diz ao Express que ele não deve continuar executando nenhum middleware ou rota que não seja de erro. 
//Ou seja, quando passamos qualquer parâmetro para o next , o Express entende que é um erro e deixa de executar middlewares comuns , passando a execução para 
//o próximo middleware de erro registrado para aquela rota, router ou aplicação.
//lembre-se: Sempre realize tratamento de erros nas suas rotas e middlewares, passando o erro para a função next , caso necessário.

//Um exemplo onde o erro fica "flutuando" e não existe resposta do servidor é quando utilizamos um middleware async . Como o Express não faz .catch na Promise retornada pelo middleware,
// ele não sabe que ocorreu um erro, a não ser que nós capturamos esse erro e o passemos para a função next .

//Vamos usar como exemplo um método que lê um arquivo baseado em um parâmetro de rota enviado na requisição. Vamos fazer isso em um arquivo separado diferente dos exemplos anteriores que fizemos até agora.


/* errorHandlerExample.js */
const express = require('express');
const fs = require('fs/promises');

const app = express();

app.get('/:fileName', async (req, res, next) => {
    try {
        const file = await fs.readFile(`./${req.params.fileName}`);
        res.send(file.toString('utf-8'));
    } catch (e) {
        next(e); 
    }
});

app.use(function (err, req, res, next) { 
  res.status(500).json({ error: `Erro: ${err.message}` });
});

app.listen(3002);


//Nesse caso, tivemos que colocar as duas linhas que executam a leitura do arquivo dentro de uma estrutura try/catch , caso seja disparada alguma excessão, como no exemplo quando o arquivo não existe,o código cai dentro do catch, que por sua vez redireciona para o middleware de erro.

{
    "error": "Erro: ENOENT: no such file or directory, open './abc'"
}