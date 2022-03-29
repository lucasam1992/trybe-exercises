/* index.js */
const express = require('express');
const rescue = require('express-rescue');
const errorMiddleware = require('./errorMiddleware');

const app = express();

app.get('/:fileName', [
  rescue(async (req, res) => {
    const file = await fs.readFile(`./${req.params.fileName}`);
    res.send(file.toString('utf-8'));
  })
  (err, req, res, next) => {
    if (err.code ==- 'ENOENT') {
      const newError = new Error(err.message);
      newError.code = 'file_not_found';
      newError.status = 404;
      return next(newError);
    }

    return next(err);
  },
]);

app.use(errorMiddleware);


//Nesse trecho de código, convertemos um erro de leitura de arquivo para um erro que nosso middleware de erros conhece e sabe formatar. Dessa forma, nos middlewares comuns, precisamos nos preocupar apenas com o caminho feliz ao passo que, nos middlewares de erro, nos preocupamos apenas com o fluxo de erros.