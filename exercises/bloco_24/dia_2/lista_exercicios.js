db.movies.insertMany([
    {
      title: "Batman",
      category: [
        "action",
        "adventure",
      ],
      imdbRating: 7.7,
      budget: 35,
    },
    {
      title: "Godzilla",
      category: [
        "action",
        "adventure",
        "sci-fi",
      ],
      imdbRating: 6.6,
      budget: 1,
    },
    {
      title: "Home Alone",
      category: [
        "family",
        "comedy",
      ],
      imdbRating: 7.4,
    },
  ]);

//Exercício 1: Adicione a categoria "superhero" ao filme Batman .
db.movies.updateOne(
    {title:"Batman"},
    {
      $push:{category:"superhero"}
    }
);

//Exercício 2: Utilizando o modificador $each , adicione as categorias
// "villain" e "comic-based" ao filme Batman .
db.movies.updateOne(
    {title:"Batman"},
    {$push:{
      category:{
        $each:[
        "villain","comic-based"
      ],
      }
    }}
);




















