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

//Operador $project
//O operador $project tem como uma de suas funções passar adiante no pipeline apenas alguns campos
// dos documentos vindos do estágio anterior, fazendo isso por meio de uma "projeção", como no método
// find({}, { $project }) 
//esses campos podem ser novos, sendo resultado de um cálculo ou de uma concatenação.
//Se você especificar um campo que não existe, o $project simplesmente ignorará esse campo, sem afetar 
//em nada a projeção.
db.books.insertOne(
    {
      _id: 1,
      title: "A Fundação",
      isbn: "0001122223334",
      author: { last: "Asimov", first: "Isaac" },
      copies: 5
    }
);

//Exemplo 1: Incluindo campos específicos
db.books.aggregate(
    [
      {
  project : {
          title : 1,
          author : 1
        }
      }
    ]
);

//Exemplo 2: Excluindo o campo _id
db.books.aggregate([
    {
  project : {
        _id: 0,
        title : 1,
        author : 1
      }
    }
]);

//Exemplo 3: Excluindo outros campos
db.books.aggregate([
    {
  project : {
        copies: 0
      }
    }
  ]);

//Exemplo 4: Excluindo campos em subdocumentos
db.books.aggregate([
    {
  project : {
        "author.first": 0,
        copies: 0
      }
    }
]);

//Exemplo 5: Incluindo campos calculados
//Podemos usar uma string iniciada com o caractere 
//$ para indicar que queremos projetar um campo, assim: "$nomeDoCampo".
db.books.aggregate([
    {
  project: {
        title: 1,
        isbn: {
          prefix: { $substr: ["$isbn", 0, 3] },
          group: { $substr: ["$isbn", 3, 2] },
          publisher: { $substr: ["$isbn", 5, 4] },
          title: { $substr: ["$isbn", 9, 3] },
          checkDigit: { $substr: ["$isbn", 12, 1] }
        },
        lastName: "$author.last",
        copiesSold: "$copies"
      }
    }
]);

//Resultado
{
    "_id" : 1,
    "title" : "A Fundação",
    "isbn" : {
      "prefix" : "000",
      "group" : "11",
      "publisher" : "2222",
      "title" : "333",
      "checkDigit" : "4"
    },
    "lastName" : "Asimov",
    "copiesSold" : 5
  }
//Lembre-se: esses novos campos são apenas adicionados para a visualização final,
// não serão salvos no banco.


//Operador $group
//O principal parâmetro do $group é o _id (que não tem nada a ver com o campo _id das coleções)

//Para fazer operações sobre os campos de documentos agrupados usamos operadores de acumulação.
//$addToSet : retorna um array com os valores únicos da expressão para cada grupo;
//$avg : retorna a média de valores numéricos. Valores não numéricos são ignorados;
//$first : retorna um valor do primeiro documento de cada grupo;
//$last : retorna um valor do último documento de cada grupo;
//$max : retorna o maior valor de cada grupo;
//$sum : retorna a soma de valores numéricos. Valores não numéricos são ignorados.

//Exemplo 1: Contando o número de documentos
db.sales.aggregate([
    {
  group: {
        _id: null,
        count: { $sum: 1 }
      }
    }
]);

//Resultado
{ "_id" : null, "count" : 8 }
//_id:null pq são todos os documentos

//Exemplo 2: Retornando valores distintos
//se quiser saber todos os valores únicos do campo item e quantos são:
db.sales.aggregate([
    {
  group : {
        _id : "$item",
        count: { $sum: 1}
      }
    }
]);

//Resultado
{ "_id" : "A Coragem de Ser Imperfeito", "count" : 2 }
{ "_id" : "O Homem e Seus Símbolos", "count" : 1 }
{ "_id" : "Código Limpo", "count" : 3 }
{ "_id" : "Comunicação Não-Violenta", "count" : 2 }


//Exemplo 3: Somando valores
db.sales.aggregate([
    {
  group : {
        _id : "$item",
        totalSaleAmount: {
  sum: {
  multiply: ["$price", "$quantity"]
          }
        }
      }
    }
]);

//Resultado
{ "_id" : "A Coragem de Ser Imperfeito", "totalSaleAmount" : NumberDecimal("112.5") }
{ "_id" : "O Homem e Seus Símbolos", "totalSaleAmount" : NumberDecimal("20") }
{ "_id" : "Código Limpo", "totalSaleAmount" : NumberDecimal("170") }
{ "_id" : "Comunicação Não-Violenta", "totalSaleAmount" : NumberDecimal("150") }


//Exemplo 4: Having (do Mysql), combinando estágios no aggregate
db.sales.aggregate([
    // Primeiro Estágio
    {
  group: {
        _id : "$item",
        totalSaleAmount: {
  sum: {
  multiply: ["$price", "$quantity"]
          }
        }
      }
    },
    // Segundo Estágio
    {
  match: { "totalSaleAmount": { $gte: 100 } }
    }
]);

//Resultado
{ "_id" : "A Coragem de Ser Imperfeito", "totalSaleAmount" : NumberDecimal("112.5") }
{ "_id" : "Código Limpo", "totalSaleAmount" : NumberDecimal("170") }
{ "_id" : "Comunicação Não-Violenta", "totalSaleAmount" : NumberDecimal("150") }


//Exemplo 5: Agrupando por null
db.sales.aggregate([
    {
  group : {
        _id : null,
        totalSaleAmount: {
  sum: { $multiply: ["$price", "$quantity"] }
        },
        averageQuantity: { $avg: "$quantity" },
        count: { $sum: 1 }
      }
    }
]);

//Resultado
{
    "_id" : null,
    "totalSaleAmount" : NumberDecimal("452.5"),
    "averageQuantity" : 7.875,
    "count" : 8
}


//EXERCICIOS DE FIXAÇÃO
//EXERCICIO 1:Selecione todos os bancos, ou seja, valores do campo bank ;
db.transactions.aggregate([
    {
        $group:{
            _id:'$bank',
            bank:{$sum:1}
        }
    }   
]);
//EXERCICIO 2:Selecione o valor total das transações em cada banco e quantas são;
db.transactions.aggregate([
    {
        $group:{
            _id:'$bank',
            total:{$sum:'$value'},
            transações:{$sum:1}
        }
    }
]);
//EXERCICIO 3:Selecione o valor total de transações;
db.transactions.aggregate([
    {
        $group:{
            _id:'$bank',
            total:{$sum:'$value'}
        }
    }
]);
//EXERCICIO 4:Selecione os bancos que têm o valor total de transações maior que 1000.
db.transactions.aggregate([
    {
      $match:{
        value:{$gt:1000}
      }
    },
    {
        $group:{
            _id:'$bank',
            total:{$sum:'$value'}   
        }
    }
]);


//Operador $unwind
//operador $unwind "desconstrói" um campo array do documento de entrada e gera como saída um documento
// para cada elemento do array . Cada documento de saída é o documento de entrada com o valor do campo 
//array substituído por um elemento do array .

//Exemplo:
db.inventory.insertOne({ _id: 7, item: "ABC1", sizes: ["S", "M", "L"] });
//usando $unwind
db.inventory.aggregate([{ $unwind : "$sizes" }]);
//resultado
{ "_id" : 7, "item" : "ABC1", "sizes" : "S" }
{ "_id" : 7, "item" : "ABC1", "sizes" : "M" }
{ "_id" : 7, "item" : "ABC1", "sizes" : "L" }


//Operador $lookup
//juntar documentos de outra coleção ( join ).
//Existem quatro parâmetros básicos para montar um $lookup :
//from : uma coleção no mesmo database para executar o join ;
//localField : o campo da coleção de onde a operação de agregação está sendo executada. 
//Será comparado por igualdade com o campo especificado no parâmetro foreingField ;
//foreingField : o campo da coleção especificada no parâmetro from que será comparado com o campo 
//localField por igualdade simples;
//as : o nome do novo array que será adicionado.

//Exemplo
// orders
db.orders.insertMany([
    { _id: 1, item: "almonds", price: 12, quantity: 2 },
    { _id: 2, item: "pecans", price: 20, quantity: 1 },
    { _id: 3 }
]);

//// inventory
db.inventory.insertMany([
    { _id: 1, sku: "almonds", description: "product 1", instock: 120 },
    { _id: 2, sku: "bread", description: "product 2", instock: 80 },
    { _id: 3, sku: "cashews", description: "product 3", instock: 60 },
    { _id: 4, sku: "pecans", description: "product 4", instock: 70 },
    { _id: 5, sku: null, description: "Incomplete" },
    { _id: 6 }
]);

//primeira coisa é encontrar um campo em comum entre elas. Nesse caso, seriam os campos
// item (coleção orders ) e sku (coleção inventory ).
db.orders.aggregate([
    {
  $lookup: {
        from: "inventory",
        localField: "item",
        foreignField: "sku",
        as: "inventory_docs"
      }
    }
]);

//resultado
{
    "_id" : 1,
    "item" : "almonds",
    "price" : 12,
    "quantity" : 2,
    "inventory_docs" : [
      {
        "_id" : 1,
        "sku" : "almonds",
        "description" : "product 1",
        "instock" : 120
      }
    ]
  }
  {
    "_id" : 2,
    "item" : "pecans",
    "price" : 20,
    "quantity" : 1,
    "inventory_docs" : [
      {
        "_id" : 4,
        "sku" : "pecans",
        "description" : "product 4",
        "instock" : 70
      }
    ]
  }
  {
    "_id" : 3,
    "inventory_docs" : [
      {
        "_id" : 5,
        "sku" : null,
        "description" : "Incomplete"
      },
      {
        "_id" : 6
      }
    ]
}


//Exercicios FIxação
use agg_example;
db.clients.insertMany([
  { name: "Dave America", State: "Florida" },
  { name: "Ned Flanders", State: "Alasca" },
  { name: "Mark Zuck", State: "Texas" },
  { name: "Edna Krabappel", State: "Montana" },
  { name: "Arnold Schuz", State: "California" },
  { name: "Lisa Simpson", State: "Florida" },
  { name: "Barney Gumble", State: "Texas" },
  { name: "Homer Simpson", State: "Florida" },
]);

//EXERCICIO1 -Selecione todos os clientes com as suas respectivas transações feitas;
db.clients.aggregate([
    {
        $lookup:{
            from:"transactions",
            localField:"name",
            foreignField:"from",
            as: "transactions_history"
        }
    }
]);

//EXERCICIO2 -Selecione quatro clientes com as suas respectivas transações recebidas;
db.clients.aggregate([
    {
        $lookup:{
            from:"transactions",
            localField:"name",
            foreignField:"to",
            as: "transactions_history"
        }
    },
    {
        $limit:4,
    }
]);

//EXERCICIO3 -Selecione todos os cliente do estado da "Florida" e suas respectivas transações recebidas.
db.clients.aggregate([
    {
        $match:{ State: 'Florida'},
    },
    {
        $lookup:{
            from:"transactions",
            localField:"name",
            foreignField:"to",
            as:"transactions_history"
        }
    }
]);


