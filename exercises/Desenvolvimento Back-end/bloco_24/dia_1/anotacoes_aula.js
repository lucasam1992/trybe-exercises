//Alterando os dados dos documentos

// arquivo BSON para testes
use conteudo_trybe;
db.inventory.insertMany([
{ "item": "journal", "qty": 25, "size": { "h": 14, "w": 21, "uom": "cm" }, "status": "A" },
{ "item": "notebook", "qty": 50, "size": { "h": 8.5, "w": 11, "uom": "in" }, "status": "A" },
{ "item": "paper", "qty": 100, "size": { "h": 8.5, "w": 11, "uom": "in" }, "status": "D" },
{ "item": "planner", "qty": 75, "size": { "h": 22.85, "w": 30, "uom": "cm" }, "status": "D" },
{ "item": "postcard", "qty": 45, "size": { "h": 10, "w": 15.25, "uom": "cm" }, "status": "A" }
]);

// updateOne()
//permite alterar um unico documento
//Existem dois parametros
// o primeiro é o filtro
//o segundo parametro é a atualização do valor

db.inventory.updateOne(
    { item: "paper" },
    { $set: { "size.uom": "cm", status: "P" } }
  );


// updateMany()
//permite que vários documentos que satisfaçam o critério de filtro sejam alterados de uma única vez.
//filtra os documentos dos quais possuem campo qty menor q 50, depois faz a alteração usando $set

db.inventory.updateMany(
    { "qty": { $lt: 50 } },
    { $set: { "size.uom": "in", status: "P" } }
  );

//Operador %$set
//$set altera o valor de um campo específico.
//Se o campo não existir, o operador $set adiciona um novo campo com o valor 
//especificado. Se você especificar campos com dot notation , os documentos embedados necessários serão criados para suprir o caminho do campo.

//Você pode especificar múltiplos pares de campos-valores que o operador $set
// alterará ou criará cada um desses campos.

use conteudo_trybe;
db.products.insertOne({
  _id: 100,
  sku: "abc123",
  quantity: 250,
  instock: true,
  reorder: false,
  details: { model: "14Q2", make: "xyz" },
  tags: [ "apparel", "clothing" ],
  ratings: [ { by: "ijk", rating: 4 } ]
})


//Exemplo 1: Alterando campos no primeiro nível (top-level)
//Para o documento que corresponder ao critério de filtro em que o campo _id seja igual a 100
// , a operação a seguir altera o valor dos campos quantity , details e tags :

db.products.update(
    { _id: 100 },
    { $set: {
        quantity: 500,
        details: { model: "14Q3", make: "xyz" },
        tags: [ "coats", "outerwear", "clothing" ]
      }
    }
  );

//Exemplo 2: Alterando campos em documentos embedados
//Para alterar campos dentro de subdocumentos, você deve utilizar o mesmo conceito 
//de dot notation visto durante as operações de find() .
//A operação abaixo altera o valor do campo make dentro do subdocumento details em que o 
//campo _id seja igual a 100 :

db.products.update(
    { _id: 100 },
    { $set: { "details.make": "zzz" } }
);

//Exemplo 3: Alterando valores em arrays
//A query abaixo tem como critério de seleção o campo _id igual a 100 . Ela altera o
// segundo elemento (índice 1 ) do array tags e o campo rating no primeiro elemento (índice 0 )
// do array ratings :

db.products.update(
    { _id: 100 },
    { $set: {
        "tags.1": "rain gear",
        "ratings.0.rating": 2
      }
    }
  );


//Operador $mul
//O operador $mul multiplica o valor de um campo por um número especificado, 
//persistindo o resultado dessa operação sem a necessidade do operador $set .


//Considere a coleção products com o novo documento descrito abaixo:
db.products.insertOne(
    { "_id": 1, "item": "ABC", "price": NumberDecimal("10.99"), "qty": 25 }
  );

//A query abaixo altera esse documento, utilizando o operador $mul para multiplicar 
//os valores dos campos price e qty :

db.products.update(
    { _id: 1 },
    { $mul: { price: NumberDecimal("1.25"), qty: 2 } }
  );

//O resultado dessa operação é o documento abaixo, em que o novo valor do campo price é o 
//valor original 10.99 multiplicado por 1.25 , e o valor do campo qty , que originalmente era 25 , 
//é multiplicado por 2 :

{ "_id": 1, "item": "ABC", "price": NumberDecimal("13.7375"), "qty": 50 }

//Você pode utilizar o $mul em um campo que não exista no documento. Nesse caso, o operador
// criará o campo e atribuirá a ele o valor zero do mesmo tipo numérico do multiplicador .
//Considerando um outro documento na coleção products :

db.products.insertOne(
    { _id: 2, item: "Unknown" }
  );

//A query abaixo faz um update no documento, aplicando o operador $mul no campo price , 
//que não existe neste documento:

db.products.update(
    { _id: 2 },
    { $mul: { price: NumberLong("100") } }
  );

//Como resultado, temos o campo price criado no documento com valor zero do mesmo 
//tipo numérico do multiplicador. 
//Nesse caso, o tipo é NumberLong :

{ "_id": 2, "item": "Unknown", "price": NumberLong(0) }

//Você também pode multiplicar valores com tipos diferentes. Veja o documento abaixo:

db.products.insertOne(
    { _id: 3,  item: "XYZ", price: NumberLong("10") }
  );

//A query abaixo faz um update , multiplicando o valor do campo price , que é do 
//tipo NumberLong("10") , por NumberInt(5) :

db.products.update(
    { _id: 3 },
    { $mul: { price: NumberInt(5) } }
);

//E como resultado temos o seguinte:

{ "_id": 3, "item": "XYZ", "price": NumberLong(50) }


//Operador $inc
//Com o operador $inc , você pode incrementar ou decrementar valores em um campo específico, 
//utilizando tanto valores positivos quanto negativos.

//Considere que você tenha o seguinte documento na coleção increment :

db.increment.insertOne(
    {
      _id: 1,
      sku: "abc123",
      quantity: 10,
      metrics: {
        orders: 2,
        ratings: 3.5
      }
    }
)

//Na operação de update a seguir, o operador $inc é utilizado para decrementar o 
//valor do campo qty em 2 (incrementa em -2 ) e incrementar o valor do campo metrics.orders em 1 :

db.increment.update(
    { sku: "abc123" },
    { $inc: { quantity: -2, "metrics.orders": 1 } }
  );

 //O  documento alterado ficará assim:

{
  "_id": 1,
  "sku": "abc123",
  "quantity": 8,
  "metrics": {
    "orders": 3,
    "ratings": 3.5
  }
}

//Operadores $min e $max
//$min : altera o valor do campo para o valor 
//especificado se esse valor especificado é menor do que o atual valor do campo;

//$max : faz o mesmo, porém altera o valor do campo se o valor especificado é maior 
//do que o atual valor do campo.

[
    { _id: 1, campo: 25 },
    { _id: 2, campo: 50 },
    { _id: 3, campo: 100 }
]

//A seguir, vamos aplicar um update utilizando o operador $max . Nosso intuito é atingir 
//todos os documentos com o atributo campo que possuem um valor de no máximo 75 . 
//Nesse caso, o operador não só define o escopo máximo, como também o conteúdo que o campo deve
// passar a ter :

db.collection.updateMany({}, { $max: { campo: 75 } });
// Atualizando todos os valores do atributo "campo"
// para 75 caso sejam menores

//Resultado

[
    { _id: 1, campo: 75 }, // valor anterior: 25
    { _id: 2, campo: 75 }, // valor anterior: 50
    { _id: 3, campo: 100 }, // não encontrou no escopo
]
//teremos os ids 1 e 2 atingidos, alterando o atributo campo para 75.


//Com o operador $min é praticamente a mesma coisa, porém na direção inversa :
db.collection.updateMany({}, { $min: { campo: 42 } });
// Atualizando todos os valores do atributo "campo"
// para 42 caso sejam maiores

//RESULTADO
[
    { _id: 1, campo: 42 }, // valor anterior: 75
    { _id: 2, campo: 42 }, // valor anterior: 75
    { _id: 3, campo: 42 }, // valor anterior: 100
]

//Aqui atingimos todas os ids , justamente pelo fato de termos definido um escopo que 
//é de no mínimo, 42. Dessa forma, todos os documentos com atributos campo que tivessem 
//um valor superior, foram redefinidos.


//Exemplo 2: Comparando datas
//Você pode utilizar os operadores $min e $max para comparar valores do tipo Date .
//Considere o seguinte documento da coleção tags :
use conteudo_trybe;
db.tags.insertOne(
  {
    _id: 1,
    desc: "crafts",
    dateEntered: ISODate("2019-10-01T05:00:00Z"),
    dateExpired: ISODate("2019-10-01T16:38:16Z")
  }
);

//A operação abaixo utiliza o operador $min para comparar o valor do campo dateEntered e 
//altera seu valor porque 25/09/2019 é uma data menor (anterior) do que o valor atual, ao 
//mesmo tempo em que o operador $max também é usado para comparar o valor do campo dateExpired 
//e altera esse valor porque 02/10/2019 é uma data maior (posterior) do que o valor atual:
db.tags.update(
    { _id: 1 },
    {
  min: { dateEntered: new Date("2019-09-25") },
  max: { dateExpired: new Date("2019-10-02") }
    }
  );

//Resultado
db.tags.find();
{ "_id": 1, 
"min": { "dateEntered": ISODate("2019-09-25T00:00:00Z") }, 
"max": { "dateExpired": ISODate("2019-10-02T00:00:00Z") } }
 

//Operador $currentDate
//O operador $currentDate atribui ao valor de um campo a data corrente ,
// utilizando um tipo Date ou timestamp . Se você não especificar o tipo, por padrão,
// o MongoDB atribuirá o valor do tipo Date . O operador $currentDate tem a seguinte forma:

db.customers.insertOne(
    { _id: 1, status: "a", lastModified: ISODate("2013-10-02T01:11:18.965Z") }
);

db.customers.updateOne(
    { _id: 1 },
    { $currentDate: {
        lastModified: true,
        "cancellation.date": { $type: "timestamp" }
      }, $set: {
        "cancellation.reason": "user request",
        status: "D"
      }
    }
  );

//RESULTADO

{
    "_id": 1,
    "status": "D",
    "lastModified": ISODate("2020-01-22T21:21:41.052Z"),
    "cancellation": {
      "date": Timestamp(1579728101, 1),
      "reason": "user request"
    }
  }


//Renomeando campos com o operador $rename
//Você pode querer renomear um determinado atributo de um ou mais documentos.
// Para isso, utilize o operador $rename .
//Pode ser utilizado com os métodos updateOne() ou updateMany() , 
//e também pode receber um critério de seleção de documentos.

use conteudo_trybe;
db.fruits.insertOne(
  { _id: 100, name: "Banana", quantity: 100, inStock: true }
);

//A operação a seguir altera o nome do campo name para productName no documento em 
//que o valor do campo name seja igual a Banana :

db.fruits.updateOne(
  { name: "Banana" },
  { $rename: {
      "name": "productName"
    }
  }
);

//Resultado
{ _id: 100, quantity: 100, inStock: true, productName: 'Banana' }


//Removendo campos com o operador $unset

{
  _id: 100,
  productName: "Banana",
  quantity: 100,
  inStock: true
}

//remove o campo quantity do documento em que o valor do campo productName seja igual a Banana :

db.fruits.updateMany(
  { productName: "Banana" },
  { $unset: { quantity: "" } }
);

//resultado
{
  _id: 100,
  productName: "Banana",
  inStock: true
}


























