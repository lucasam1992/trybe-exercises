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

//EXERCICIO 3:Adicione um array chamado ratings ao filme Batman com os seguintes valores: [85, 100, 102, 105] .
// Dica: lembre-se do operador $each visto no dia anterior.
db.movies.updateOne(
    {title:"Batman"},
    {$push:{
      ratings:{
        $each:[85,100,102,105]
      }
    }}
);

//EXERCICIO 4:Adicione um array chamado ratings ao filme Godzilla com os seguintes valores: [78, 52, 95, 102] .
db.movies.updateOne(
    {title:"Godzilla"},
    {$push:{
      ratings:{
        $each:[78,52,95,102]
      }
    }}
);

//EXERCICIO 5:Adicione um array chamado ratings ao filme Home Alone com os seguintes valores: [200, 99, 65] .
db.movies.updateOne(
    {title:"Home Alone"},
    {$push:{
      ratings:{
        $each:[200,99,65]
      }
    }}
);

//EXERCICIO 6:Retorne todos os filmes com ratings maior do que 103 , exibindo apenas os campos title e ratings .
db.movies.find(
    {ratings:{$elemMatch:{$gt:103}}},
    {title:1,ratings:1, _id:0}
);
  
//EXERCICIO7:Retorne todos os filmes com ratings entre 100 e 105 , exibindo apenas os campos title e ratings .
db.movies.find(
    {ratings:{$elemMatch:{$gte:100,$lte:105}}},
    {title:1,ratings:1, _id:0}
);
  
//EXERCICIO 8:Retorne todos os filmes com ratings entre 64 e 105 e divisíveis por 9 , exibindo apenas os campos title e ratings .
db.movies.find(
    {ratings:{$elemMatch:{$gte:64,$lte:105,$mod:[9,0]}}},
    {title:1,ratings:1, _id:0}
);







