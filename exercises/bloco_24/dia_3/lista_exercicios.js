db.movies.drop();
db.movies.insertMany([
  {
    title: "Batman",
    category: [
      "action",
      "adventure"
    ],
    imdbRating: 7.7,
    budget: 35
  },
  {
    title: "Godzilla",
    category: [
      "action",
      "adventure",
      "sci-fi"
    ],
    imdbRating: 6.6,
    budget: 10
  },
  {
    title: "Home Alone",
    category: [
      "family",
      "comedy"
    ],
    imdbRating: 7.4
  }
]);

//EXERCICIO 1:Utilizando o operador $all , retorne todos os filmes que contenham action e adventure no array category .
db.movies.find(
    {category:{$all:["action","adventure"]}}
);

//EXERCICIO 2:Agora retorne os filmes que contenham action no array category e possuem nota do IMDB maior do que 7 .
db.movies.find(
    {category:{$all:["action"]},
    imdbRating:{$gt:7}}
);



















