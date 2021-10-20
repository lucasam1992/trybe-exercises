const express = require('express');

const authorController = require('./controllers/authorController');

const app = express();

app.set('view engine', 'ejs'); //configura o express para utilizar o EJS por padrão como template engine . Dessa forma, 
// não precisamos especificar a extensão do arquivo que queremos utilizar.

app.set('views', './views'); //adiciona o diretório /views à lista de diretórios em que o expresss vai procurar um arquivo 
//com o nome especificado pelo método render . Assim, não precisamos especificar o caminho completo do arquivo em todos os momentos.

app.get('/authors', authorController.listAuthors);

// exemplo pagina de detalhes de um escritor 
app.get('/authors/:id', authorController.showAuthor);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});