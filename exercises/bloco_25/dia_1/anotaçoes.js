//Aggregation Pipeline

db.orders.aggregate([
    { $match: { status: "A" } },
    { $group: { _id: "$cust_id", total: { $sum: "$amount" } } }
]);

//Há dois estagios:
//Primeiro Estágio : O estágio $match filtra os documentos pelo campo status , e passam para o
// próximo estágio somente os documentos que têm status igual a "A" .

//Segundo Estágio : O estágio $group agrupa os documentos pelo campo cust_id para calcular a soma 
//dos valores do campo amount para cada cust_id único.

//Operador $match
//filtra os documentos da mesma maneira que os filtros no metodo find({$match})
db.articles.insertMany([
    { _id: ObjectId("512bc95fe835e68f199c8686"), author: "dave", score: 80, views: 100 },
    { _id: ObjectId("512bc962e835e68f199c8687"), author: "dave", score: 85, views: 521 },
    { _id: ObjectId("55f5a192d4bede9ac365b257"), author: "ahn", score: 60, views: 1000 },
    { _id: ObjectId("55f5a192d4bede9ac365b258"), author: "li", score: 55, views: 5000 },
    { _id: ObjectId("55f5a1d3d4bede9ac365b259"), author: "annT", score: 60, views: 50 },
    { _id: ObjectId("55f5a1d3d4bede9ac365b25a"), author: "li", score: 94, views: 999 },
    { _id: ObjectId("55f5a1d3d4bede9ac365b25b"), author: "ty", score: 95, views: 1000 }
]);

//Exemplo 1: Igualdade simples
db.articles.aggregate(
    [{ $match : { author : "dave" } }]
);

//Note que a sintaxe do filtro é exatamente igual à utilizada como filtro no método find() 

//Exemplo 2: Igualdade complexa
//É possível, dentro do match , utilizar operadores como or , and , in etc.
db.articles.aggregate(
    [
      {
  match: {
  or: [
            { score: { $gt: 70, $lt: 90 } },
            { views: { $gte: 1000 } }
          ]
        }
      }
    ]
  );

//Resultado
{ "_id" : ObjectId("512bc95fe835e68f199c8686"), "author" : "dave", "score" : 80, "views" : 100 }
{ "_id" : ObjectId("512bc962e835e68f199c8687"), "author" : "dave", "score" : 85, "views" : 521 }
{ "_id" : ObjectId("55f5a192d4bede9ac365b257"), "author" : "ahn", "score" : 60, "views" : 1000 }
{ "_id" : ObjectId("55f5a192d4bede9ac365b258"), "author" : "li", "score" : 55, "views" : 5000 }
{ "_id" : ObjectId("55f5a1d3d4bede9ac365b25b"), "author" : "ty", "score" : 95, "views" : 1000 }


//Operador $limit
//O operador $limit limita o número de documentos que será passado para o próximo estágio do pipeline.
// Ele sempre recebe um valor do tipo inteiro e positivo.
db.articles.aggregate(
    [
      { $limit : 5 }
    ]
  );

//Exercicio de Fixação
use agg_example;
db.transactions.insertMany([
  { value: 5900, from: "Dave America", to: "Ned Flanders", bank: 'International' },
  { value: 1000, from: "Mark Zuck", to: "Edna Krabappel", bank: 'FloridaBank' },
  { value: 209, from: "Lisa Simpson", to: "Dave America", bank: 'bankOfAmerica' },
  { value: 10800, from: "Arnold Schuz", to: "Mark Zuck", bank: 'JPMorgan' },
  { value: 850, from: "Barney Gumble", to: "Lisa Simpson", bank: 'Citigroup' },
  { value: 76000, from: "Ned Flanders", to: "Edna Krabappel", bank: 'JPMorgan' },
  { value: 1280, from: "Dave America", to: "Homer Simpson", bank: 'Citigroup' },
  { value: 7000, from: "Arnold Schuz", to: "Ned Flanders", bank: 'International' },
  { value: 59020, from: "Homer Simpson", to: "Lisa Simpson", bank: 'International' },
  { value: 100, from: "Mark Zuck", to: "Barney Gumble", bank: 'FloridaBank' },
]);

//Exercicio 1:Selecione todas as transações feitas pelo cliente chamado "Dave America".
db.transactions.aggregate(
    {$match:{
        from:"Dave America"
    }}
);

//Exercicio 2:Selecione todas as transações com o valor entre 700 e 6000, ou que sejam 
//recebidas pela cliente "Lisa Simpson".
db.transactions.aggregate(
    {$match:{
        $or:[
        {value:{$gte:700, $lte:6000}},
        {to:"Lisa Simpson"}
        ]
    }}
);

//Exercicio 3:Selecione três transações com o valor acima de 1000.
db.transactions.aggregate(
    {$match:{
        value:{$gt:1000}
    }},
    {$limit:3}
);














