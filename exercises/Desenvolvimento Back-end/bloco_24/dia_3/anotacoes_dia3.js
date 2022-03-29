//OPERADOR $all
//O operador $all seleciona todos os documentos em que o valor do campo é um array que contenha 
//todos os elementos especificados
//esse operador é equivalente ao operador $and
//Utiliza-se $all sempre que é preciso passar mais de um valor de comparação, e é irrelevante para a 
//verificação tanto a existência de mais elementos no array quanto a ordem em que esses elementos estão.
db.inventory.find({ tags: ["red", "blank"] });

db.inventory.find({ tags: { $all: ["red", "blank"] } });

//A primeira query retornará somente os documentos em que o array tags seja exatamente igual ao
// passado como parâmetro no filtro, ou seja, contenha apenas esses dois elementos, na mesma ordem.

//Já a segunda analisará o mesmo array , independentemente da existência de outros valores 
//ou a ordem em que os elementos estejam.


//Utilizar o $all poupa um pouco de código. Veja um exemplo utilizando o $all :
db.inventory.find(
    { tags: { $all: [ "ssl", "security" ] } }
  );


//E seu equivalente, utilizando o $and :
db.inventory.find(
    {
  and: [
        { tags: "ssl" },
        { tags: "security" }
      ]
    }
  );


//Operador $elemMatch
//seleciona os documentos que contêm um campo do tipo array com pelo menos um elemento que satisfaça
// todos os critérios de seleção especificados. Ou seja, com esse operador você pode especificar
// várias queries para um mesmo array .
//Veja um exemplo considerando a coleção scores com os seguintes documentos:
{ _id: 1, results: [82, 85, 88] },
{ _id: 2, results: [75, 88, 89] }

//A query abaixo seleciona somente os documentos em que o array results contém ao menos um elemento 
//que seja maior ou igual a 80 e menor que 85 :
db.scores.find(
    { results: { $elemMatch: { $gte: 80, $lt: 85 } } }
  );

//Como resultado, apenas o documento com o _id igual a 1 será retornado, já que o 82 satisfaz 
//as duas verificações.

//Você pode utilizar o operador $elemMatch em arrays que contenham subdocumentos e especificar vários 
//campos desses subdocumentos como filtro. Veja os seguintes documentos na coleção survey :
{
    _id: 1,
    results: [
      { product: "abc", score: 10 },
      { product: "xyz", score: 5 }
    ]
  },
  {
    _id: 2,
    results: [
      { product: "abc", score: 8 },
      { product: "xyz", score: 7 }
    ]
  },
  {
    _id: 3,
    results: [
      { product: "abc", score: 7 },
      { product: "xyz", score: 8 }
    ]
  }

//A query abaixo selecionará apenas os documentos em que o array results contenha ao menos
// um elemento subdocumento com o campo product igual a xyz e o campo score maior ou igual a 8 :
db.survey.find(
    { results: { $elemMatch: { product: "xyz", score: { $gte: 8 } } } }
  );

//Será retornado apenas o documento com o _id igual a 3 .


//Você não precisa utilizar o operador $elemMatch se estiver utilizando uma condição para apenas
// "um" campo do documento embedado . Veja:
db.survey.find(
    { results: { $elemMatch: { product: "xyz" } } }
  );

//Como a operação acima só tem uma condição, o operador $elemMatch não se faz necessário
// e você pode utilizar a query abaixo:
db.survey.find(
    { "results.product": "xyz" }
  );



//OPerador $size
//seleciona documentos em que um array contenha um número de elementos especificado

//Considere a coleção products a seguir, contendo documentos em que o campo tags pode ser um array :
{ _id: 1, tags: ["red", "green"] },
{ _id: 2, tags: ["apple", "lime"] },
{ _id: 3, tags: "fruit" },
{ _id: 4, tags: ["orange", "lemon", "grapefruit"] }

//Ao executar a query abaixo, apenas os documentos com o _id igual 1 e 2 serão retornados, pois seus
// campos tags são arrays e contêm exatamente 2 elementos :
db.products.find(
    { tags: { $size: 2 } }
  );

 //É importante saber que o operador $size aceita apenas valores númericos, não sendo possível, 
 //por exemplo, trazer arrays com comprimento maior do que 2 ($gt: 2) 



//Operador $where
// pode ser utilizado para passar uma string contendo uma expressão ou função JavaScript
//O operador $where não será explorado porque, na versão 3.6 do MongoDB ,existe
// um outro operador, o $expr 



//Operador $expr
//permite que você utilize expressões de agregação e construa queries que 
//comparem campos no mesmo documento
//Considere os documentos abaixo na coleção monthlyBudget :
{ _id: 1, category: "food", budget: 400, spent: 450 },
{ _id: 2, category: "drinks", budget: 100, spent: 150 },
{ _id: 3, category: "clothes", budget: 100, spent: 50 },
{ _id: 4, category: "misc", budget: 500, spent: 300 },
{ _id: 5, category: "travel", budget: 200, spent: 650 }


//A query abaixo utiliza o operador $expr para buscar os documentos em que o valor
// de spent exceda o valor de budget :
db.monthlyBudget.find(
    {
  expr: { $gt: [ "$spent", "$budget" ] }
    }
);


//Apenas os seguintes documentos serão retornados:
{ "_id" : 1, "category" : "food", "budget" : 400, "spent" : 450 }
{ "_id" : 2, "category" : "drinks", "budget" : 100, "spent" : 150 }
{ "_id" : 5, "category" : "travel", "budget" : 200, "spent" : 650 }

//o operador $expr entende que deve comparar os valores dos dois campos.


//Operador $regex
//fornece os "poderes" das expressões regulares ( regular expressions ) para seleção de strings 
//Um uso muito comum para o operador $regex é fazer consultas como o LIKE do SQL .
// Considere os seguintes documentos na coleção products :
{ _id: 100, sku: "abc123", description: "Single line description." },
{ _id: 101, sku: "abc789", description: "First line\nSecond line" },
{ _id: 102, sku: "xyz456", description: "Many spaces before     line" },
{ _id: 103, sku: "xyz789", description: "Multiple\nline description" }

//A query abaixo seleciona todos os documentos em que o campo sku "termine" com "789" :
db.products.find({ sku: { $regex: /789$/ } });

//você pode especificar a opção case-insensitive , fazendo com que o MongoDB ignore 
//letras maiúsculas ou minúsculas. 
//Veja o exemplo abaixo, que retorna palavras "começando" com ABC:
db.products.find({ sku: { $regex: /^ABC/i } });

//apenas os documentos que contenham ABC no campo sku serão retornados, 
//sem se importar se está em maiúsculo ou minúsculo:
{ "_id" : 100, "sku" : "abc123", "description" : "Single line description." }
{ "_id" : 101, "sku" : "abc789", "description" : "First line\nSecond line" }


//Operador $text

//faz uma busca "textual" em um campo indexado por um text index.
//$search : Uma string com os termos que o MongoDB utilizará para fazer 
//o parse e utilizará como filtro

//$language : Opcional. Esse campo determina a lista de stop words que será
// utilizada na tokenização da busca.

//$caseSensitive : Opcional. Recebe um valor booleano para habilitar ou desabilitar
//buscas case sensitive . O valor default é false , o que faz com que as buscas sejam case-insensitive 

//$diacriticSensitive : Opcional. Recebe um valor booleano para habilitar ou desabilitar 
//busca diacritic sensitive . O valor default também é false .


//o comando para criar o índice do tipo text :
db.articles.createIndex({ subject: "text" });

//Tendo os seguintes documentos na coleção articles :
{ _id: 1, subject: "coffee", author: "xyz", views: 50 },
{ _id: 2, subject: "Coffee Shopping", author: "efg", views: 5 },
{ _id: 3, subject: "Baking a cake", author: "abc", views: 90  },
{ _id: 4, subject: "baking", author: "xyz", views: 100 },
{ _id: 5, subject: "Café Com Leite", author: "abc", views: 200 },
{ _id: 6, subject: "Сырники", author: "jkl", views: 80 },
{ _id: 7, subject: "coffee and cream", author: "efg", views: 10 },
{ _id: 8, subject: "Cafe com Leite", author: "xyz", views: 10 }

//Exemplo 1: Procurando um único termo
db.articles.find({ $text: { $search: "coffee" } });

//Exemplo 2: Procurando qualquer um dos termos especificados
db.articles.find({ $text: { $search: "bake coffee cake" } });

//Exemplo 3: Procurando por uma frase
db.articles.find({ $text: { $search: "\"coffee shop\"" } });



//Operador $mod
//seleciona todos os documentos em que o valor do campo dividido
// por um divisor seja igual ao valor especificado 
//Considere os seguintes documentos na coleção inventory :
{ _id: 1, item: "abc123", qty: 0 },
{ _id: 2, item: "xyz123", qty: 5 },
{ _id: 3, item: "ijk123", qty: 12 }

//A query a seguir seleciona todos os documentos da coleção em que
// o valor do campo qty módulo 4 seja 0 :
db.inventory.find({ qty: { $mod: [4, 0] } });

//Então, apenas os seguintes documentos serão retornados:
{ "_id" : 1, "item" : "abc123", "qty" : 0 }
{ "_id" : 3, "item" : "ijk123", "qty" : 12 }
