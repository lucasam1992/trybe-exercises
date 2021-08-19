//Aplicando condições ao Join com $lookup

//let : define as variáveis que serão utilizadas no estágio pipeline dentro do $lookup
//pipeline : define as condições ou o pipeline que será executado na coleção de junção.
// Se você quiser todos os documentos da coleção de junção, é só especificá-lo como vazio ( [] ).

//Considere os seguintes documentos na coleção orders :
use example_db;
db.orders.insertMany([
  { _id: 1, item: "almonds", price: 12, ordered: 2 },
  { _id: 2, item: "pecans", price: 20, ordered: 1 },
  { _id: 3, item: "cookies", price: 10, ordered: 60 }
]);

//E  os seguintes documentos na coleção warehouses :
use example_db;
db.warehouses.insertMany([
  { _id: 1, stock_item: "almonds", warehouse: "A", instock: 120 },
  { _id: 2, stock_item: "pecans", warehouse: "A", instock: 80 },
  { _id: 3, stock_item: "almonds", warehouse: "B", instock: 60 },
  { _id: 4, stock_item: "cookies", warehouse: "B", instock: 40 },
  { _id: 5, stock_item: "cookies", warehouse: "A", instock: 80 }
]);

//A operação a seguir junta todos os documentos da coleção orders com a coleção warehouse através do 
//campo item se a quantidade em estoque ( instock ) for suficiente para cobrir a quantidade
// vendida ( ordered ). Os documentos que dão match são colocados no campo stockdata .
db.orders.aggregate([
    {
  lookup: {
        from: "warehouses",
        let: { order_item: "$item", order_qty: "$ordered" },
        pipeline: [
          {
  match: {
  expr: {
  and: [
                  { $eq: [ "$stock_item",  "$$order_item" ] }, //variaveis definida no let, logo $$
                  { $gte: [ "$instock", "$$order_qty" ] } //apenas um $ significa q se refere a coleção de junção
                ]
              }
            }
          },
          { $project: { stock_item: 0, _id: 0 } }
        ],
        as: "stockdata"
      }
    }
]);

//resultado
{
    "_id" : 1,
    "item" : "almonds",
    "price" : 12,
    "ordered" : 2,
    "stockdata" : [
      {
        "warehouse" : "A",
        "instock" : 120
      },
      {
        "warehouse" : "B",
        "instock" : 60
      }
    ]
  }
  {
    "_id" : 2,
    "item" : "pecans",
    "price" : 20,
    "ordered" : 1,
    "stockdata" : [
      {
        "warehouse" : "A",
        "instock" : 80
      }
    ]
  }
  {
    "_id" : 3,
    "item" : "cookies",
    "price" : 10,
    "ordered" : 60,
    "stockdata" : [
      {
        "warehouse" : "A",
        "instock" : 80
      }
    ]
  }

//Exercicio fixação
//1.Selecione todos os clientes com as suas respectivas transações feitas;
db.clients.aggregate([
    {
        $lookup:{
            from:"transactions",
            let: {user_name: "$name"},
            pipeline:[
                {
                    $match:{
                        $expr:{
                            $eq:["$from","$$user_name"],
                        }
                    }
                }
            ],
            as: "transactions"
        }
    }
]);

//2. Selecione os quatro primeiros clientes com as suas respectivas transações recebidas 
//ordenados pelo estado em ordem alfabética;
db.clients.aggregate([
    {
        $lookup:{
            from:"transactions",
            let:{user_name:"$name"},
            pipeline:[
                {
                    $match:{
                        $expr:{
                            $eq:["$to","$$user_name"],
                        }
                    }
                }
            ],
            as: "received_transactions"
        }
    },
    {
        $sort:{State:1}
    },
    {
        $limit:4
    }
]).pretty();


//3.Selecione todos os cliente do estado da "Florida" e suas respectivas transações recebidas.
db.clients.aggregate([
    {
        $match:{State:"Florida"}
    },
    {
        $lookup:{
            from:"transactions",
            let:{ user_name:"$name"},
            pipeline:[
                {
                    $match:{
                        $expr:{
                            $eq:["$to","$$user_name"]
                        }
                    }
                }
            ],
            as:"received_transactions"
        }
    }
]);


//Expressão $add
//Com a expressão $add , é possível somar valores numéricos ou datas. Se um dos argumentos 
//for do tipo date , o outro argumento será tratado como milissegundos e adicionado à data.

//Considere os seguintes documentos na coleção sales :
{ _id: 1, item: "abc", price: 10, fee: 2, date: ISODate("2014-03-01T08:00:00Z") },
{ _id: 2, item: "jkl", price: 20, fee: 1, date: ISODate("2014-03-01T09:00:00Z") },
{ _id: 3, item: "xyz", price: 5,  fee: 0, date: ISODate("2014-03-15T09:00:00Z") }

//Utilizando a expressão $add no estágio $project , você pode criar um novo campo com 
//o valor total somando os campos price e fee :
db.sales.aggregate([
    { $project: { item: 1, total: { $add: ["$price", "$fee"] } } }
]);

//resultado
{ "_id" : 1, "item" : "abc", "total" : 12 }
{ "_id" : 2, "item" : "jkl", "total" : 21 }
{ "_id" : 3, "item" : "xyz", "total" : 5 }


//Para valores do tipo date , um dos argumentos sempre será tratado como milissegundos.
db.sales.aggregate([
    { $project: { item: 1, billing_date: { $add: ["$date", 2.592e+8] } } }
]);

db.sales.aggregate([
    { $project: { item: 1, billing_date: { $add: ["$date", 3 * 24 * 60 * 60000] } } }
]);

//EXERCICIO DE FIXAÇÃO
//Calcule qual o custo total de cada produto, considerando o preço de compra e os impostos.
db.products.aggregate([
    {
        $project:{
            custo_total:{$add:["$taxes","$purchase_price"]}
        }
    }
]);


//Expressão $subtract
//podemos subtrair dois valores numéricos para retornar a diferença entre eles, ou duas datas
// para retornar a diferença entre elas em milissegundos. O segundo argumento sempre será
// subtraído do primeiro .
//Considere os seguintes documentos na coleção sales :
{
    _id: 1,
    item: "abc",
    price: 10,
    fee: 2,
    discount: 5,
    date: ISODate("2014-03-01T08:00:00Z")
  },
  {
    _id: 2,
    item: "jkl",
    price: 20,
    fee: 1,
    discount: 2,
    date: ISODate("2014-03-01T09:00:00Z")
}

//Em uma única operação no estágio $project , podemos montar uma expressão um pouco mais 
//complexa, utilizando $add para calcular o total e o $subtract para aplicar um desconto no subtotal:
db.sales.aggregate([
    {
  project: {
        item: 1,
        total: {
  subtract: [
            { $add: ["$price", "$fee"] },
            "$discount"
          ]
        }
      }
    }
]);

//resultado
{ "_id" : 1, "item" : "abc", "total" : 7 }
{ "_id" : 2, "item" : "jkl", "total" : 19 }


//A operação a seguir utiliza a expressão
// $subtract para subtrair o valor do campo date da data corrente, utilizando a variável 
//de sistema NOW (disponível a partir da versão 4.2 do MongoDB ) e retorna a diferença em milissegundos:
db.sales.aggregate([
    {
  project: {
        item: 1,
        dateDifference: {
  subtract: ["$$NOW", "$date"]
        }
      }
    }
]);

//Alternativamente, você pode utilizar a função Date() para obter a data corrente:
db.sales.aggregate([
    {
  project: {
        item: 1,
        dateDifference: {
  subtract: [new Date(), "$date"]
        }
      }
    }
]);

//A operação seguinte subtrai 5 minutos do campo date :
db.sales.aggregate([
    {
  project: {
        item: 1,
        dateDifference: {
  subtract: ["$date", 5 * 60 * 1000]
        }
      }
    }
]);


//Exercicio fixação
//Calcule qual o lucro total de cada produto, considerando o preço de compra,
// os impostos e seu valor de venda.
db.products.aggregate([
    {
        $project:{
            _id:0,
            name:1,
            total_profit:{
                $subtract:[
                    "$sale_price",
                    {$add:["$taxes","$purchase_price"]}
                ]
            }
        }
    }
]);


//Expressão $ceil
// arredonda o número especificado para "cima".

{ _id: 1, value: 9.25 },
{ _id: 2, value: 8.73 },
{ _id: 3, value: 4.32 },
{ _id: 4, value: -5.34 }

//utiliza a expressão $ceil no estágio $project para retornar um novo campo chamado ceilingValue :
db.samples.aggregate([
    { $project: { value: 1, ceilingValue: { $ceil: "$value" } } }
]);

//resultado
{ "_id" : 1, "value" : 9.25, "ceilingValue" : 10 }
{ "_id" : 2, "value" : 8.73, "ceilingValue" : 9 }
{ "_id" : 3, "value" : 4.32, "ceilingValue" : 5 }
{ "_id" : 4, "value" : -5.34, "ceilingValue" : -5 }



//Expressão $floor
//faz um arredondamento para baixo.
db.samples.aggregate([
    { $project: { value: 1, floorValue: { $floor: "$value" } } }
]);

//resultado
{ "_id" : 1, "value" : 9.25, "floorValue" : 9 }
{ "_id" : 2, "value" : 8.73, "floorValue" : 8 }
{ "_id" : 3, "value" : 4.32, "floorValue" : 4 }
{ "_id" : 4, "value" : -5.34, "floorValue" : -6 }


//Expressão $round
//retorna o número inteiro mais próximo do valor atual e também permite 
//definir a quantidade de casas decimais que você quer manter ao arredondar.
db.samples.aggregate([
    { $project: { value: 1, roundedValue: { $round: ["$value"] } } }
]);

//resultado
{ "_id" : 1, "value" : 9.25, "roundedValue" : 9 }
{ "_id" : 2, "value" : 8.73, "roundedValue" : 9 }
{ "_id" : 3, "value" : 4.32, "roundedValue" : 4 }
{ "_id" : 4, "value" : -5.34, "roundedValue" : -5 }
//para todos os valores, o $round arredondou os valores para o mais próximo, podendo ser maior ou menor

//exemplo quando é passado um numero de casas decimais depois da virgula
db.samples.aggregate([
    { $project: { value: 1, roundedValue: { $round: ["$value", 1] } } }
]);

//resultado
{ "_id" : 1, "value" : 9.25, "roundedValue" : 9.2 }
{ "_id" : 2, "value" : 8.73, "roundedValue" : 8.7 }
{ "_id" : 3, "value" : 4.32, "roundedValue" : 4.3 }
{ "_id" : 4, "value" : -5.34, "roundedValue" : -5.3 }


//EXERCICIOS DE FIXAÇÃO
//1.Retorne o menor número inteiro relativo ao preço de venda de cada produto;
db.products.aggregate([
    {$project:{ preco_arredondado:{$floor:"$sales_price"}}}
]);

//2.Retorne o maior número inteiro relativo ao lucro total sobre cada produto.
db.products.aggregate([
    {
    $project: {
        ceiling_price:{
            $ceil:{
                $subtract:["$sale_price","$purchase_price"]
            }
        }
    }}
]);


//Expressão $abs
//retorna o valor absoluto de um número.
//muito útil para encontrar a diferença entre dois valores
{ _id: 1, start: 5, end: 8 },
{ _id: 2, start: 4, end: 4 },
{ _id: 3, start: 9, end: 7 },
{ _id: 4, start: 6, end: 7 }

//aplicando a expressão $abs
db.ratings.aggregate([
    {
  project: {
        delta: {
  abs: { $subtract: ["$start", "$end"] }
        }
      }
    }
]);

//resultado
{ "_id" : 1, "delta" : 3 }
{ "_id" : 2, "delta" : 0 }
{ "_id" : 3, "delta" : 2 }
{ "_id" : 4, "delta" : 1 }


//EXERCICIO FIXAÇÃO
//1.Calcule o valor absoluto do lucro total de cada produto.
db.products.aggregate([
    {
        $project:{
            delta:{
                $abs:{
                    $subtract:[
                        "$sale_price",
                        {$add:["$taxes","purchase_price"]}
                    ]
                }
            }
        }
    }
]);

//Expressão $multiply
//multiplica dois valores numéricos.
{ _id: 1, item: "abc", price: 10, quantity: 2, date: ISODate("2014-03-01T08:00:00Z") },
{ _id: 2, item: "jkl", price: 20, quantity: 1, date: ISODate("2014-03-01T09:00:00Z") },
{ _id: 3, item: "xyz", price: 5, quantity: 10, date: ISODate("2014-03-15T09:00:00Z") }

//Na agregação a seguir, utilizamos o $multiply no estágio $project para projetar um novo 
//campo chamado total , que conterá o valor da multiplicação entre os campos price e quantity :

db.sales.aggregate([
    {
  project: {
        date: 1,
        item: 1,
        total: {
  multiply: ["$price", "$quantity"]
        }
      }
    }
]);

//resultado
{ "_id" : 1, "item" : "abc", "date" : ISODate("2014-03-01T08:00:00Z"), "total" : 20 }
{ "_id" : 2, "item" : "jkl", "date" : ISODate("2014-03-01T09:00:00Z"), "total" : 20 }
{ "_id" : 3, "item" : "xyz", "date" : ISODate("2014-03-15T09:00:00Z"), "total" : 50 }


//EXERCICIOS DE FIXAÇÃO
//1.Calcule qual o valor total em estoque de cada produto, considerando o preço de venda e a quantidade;
db.products.aggregate([
    {
        $project:{
            total:{
                $multiply:["$sale_price","$quantity"]
            }
        }
    }
]);
//2.Calcule qual será o lucro total de cada produto caso todo o estoque seja vendido.
db.products.aggregate([
    {
        $project:{
            total:{
                $multiply:[
                    {
                        $subtract:[
                            "$sale_price",
                            {$add:["$taxes","$purchase_price"]}
                        ]
                    },
                    "$quantity"
                ]
            }
        }
    }
]);



//Expressão $divide
//divide dois valores
{ _id: 1, name: "A", hours: 80, resources: 7 },
{ _id: 2, name: "B", hours: 40, resources: 4 }

//A agregação abaixo utiliza o $divide para dividir o valor do campo hours por 8 e 
//calcular o número de dias de trabalho ( workdays ):
db.planning.aggregate([
    {
  project: {
        name: 1,
        workdays: {
  divide: ["$hours", 8]
        }
      }
    }
]);

//resultado
{ "_id" : 1, "name" : "A", "workdays" : 10 }
{ "_id" : 2, "name" : "B", "workdays" : 5 }


//EXERICICO DE FIXAÇÃO
//Calcule qual será o preço de venda de cada produto caso haja uma promoção de 50% de desconto.
db.products.aggregate([
    {
        $project:{
            prec_novo:{
                $subtract:[
                    "$sale_price",{
                        $multiply:[{$divide:[50,100]},"$sale_price"]
                    }
                ]
            }
        }
    }
])


//Estágio $addFields
//é um estágio que adiciona novos campos aos documentos.
// A saída desse estágio conterá todos os campos existentes nos documentos de entrada e 
//adicionará os novos campos especificados.
{
    _id: 1,
    student: "Maya",
    homework: [10, 5, 10],
    quiz: [10, 8],
    extraCredit: 0
  },
  {
    _id: 2,
    student: "Ryan",
    homework: [5, 6, 5],
    quiz: [8, 8],
    extraCredit: 8
}



//A operação de agregação abaixo utiliza o $addFields duas vezes para incluir 
//três novos campos nos documentos de saída:
db.scores.aggregate([
    {
  addFields: {
        totalHomework: { $sum: "$homework" } ,
        totalQuiz: { $sum: "$quiz" }
      }
    },
    {
  addFields: {
        totalScore: {
  add: [ "$totalHomework", "$totalQuiz", "$extraCredit" ]
        }
      }
    }
]);
//O primeiro estágio adiciona o campo totalHomework somando os valores contidos no array homework . 
//Também adiciona outro campo chamado totalQuiz somando os valores do array quiz .

//O segundo estágio adiciona o campo totalScore , que, por sua vez, soma os valores dos campos 
//totalHomework , totalQuiz e extraCredit .

//resultado
{
    "_id" : 1,
    "student" : "Maya",
    "homework" : [ 10, 5, 10 ],
    "quiz" : [ 10, 8 ],
    "extraCredit" : 0,
    "totalHomework" : 25,
    "totalQuiz" : 18,
    "totalScore" : 43
  }
  {
    "_id" : 2,
    "student" : "Ryan",
    "homework" : [ 5, 6, 5 ],
    "quiz" : [ 8, 8 ],
    "extraCredit" : 8,
    "totalHomework" : 16,
    "totalQuiz" : 16,
    "totalScore" : 40
}


//EXERCICIO DE FIXAÇÃO
//1.Calcule o valor total do estoque, considerando que cada produto valha o mesmo que seu preço de 
//venda. Lembre-se da quantidade.
db.products.aggregate([
    {
        $addFields:{
            stock_tot_valores:{
                $multiply:["$sale_price","$quantity"]
            }
        }
    }
]);
