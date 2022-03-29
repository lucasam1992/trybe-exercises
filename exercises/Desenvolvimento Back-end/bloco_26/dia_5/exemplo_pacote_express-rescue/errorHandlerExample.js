//O pacote express-rescue está disponível no npm e nos ajuda com a tarefa de garantir que os erros sempre sejam tratados.

// Essa função vai gerar um novo middleware que vai fazer o tratameto de erros da middleware sem precisarmos escrever o try/catch . Vamos refatorar o exemplo da seção anterior para usar o express-rescue .

/* errorHandlerExample.js */
const express = require('express');
const rescue = require('express-rescue');
const fs = require('fs/promises');

const app = express();

app.get(
  '/:fileName',
  rescue(async (req, res) => {
    const file = await fs.readFile(`./${req.params.fileName}`);
    res.send(file.toString('utf-8'));
  })
);

app.use((err, req, res, next) => {
  res.status(500).json({ error: `Erro: ${err.message}` });
});

app.listen(3002);

//O que o novo middleware faz é simplesmente executar nosso middleware original dentro de um bloco de try ... catch . Caso ocorra qualquer erro no nosso middleware, esse erro é capturado pelo catch e passado para o next , dando início ao fluxo de erro do Express.

