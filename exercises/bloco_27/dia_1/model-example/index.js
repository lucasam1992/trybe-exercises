// index.js

const express = require('express');

//adicionar as rotas aqui dentro do index.js
const Author = require('./models/Author');

const app = express();

app.get('/authors', async (_req, res) => {
    const authors = await Author.getAll();
    
    res.status(200).json(authors);
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Ouvindo a porta ${PORT}`);
});