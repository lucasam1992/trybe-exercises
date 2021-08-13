//Operador $push
//$push adiciona um valor a um array 
//Se o campo não existir no documento, um novo array com o valor em um elemento será adicionado.

// Modificadores, usados juntamente com o $push
//$each : Adiciona múltiplos valores a um array ;
//$slice : Limita o número de elementos do array . Requer o uso do modificador $each ;
//$sort : Ordena os elementos do array . Requer o uso do modificador $each ;
//$position : Especifica a posição do elemento que está sendo inserido no array . 
//Também requer o modificador $each . Sem o modificador $position , o operador $push adiciona o 
//elemento no final do array .


//Adicionando um valor a um Array
//upsert não influencia a forma como o $push funciona.

db.supplies.updateOne(
  { _id: 1 },
  {
push: {
      items: {
        "name": "notepad",
        "price":  35.29,
        "quantity": 2,
      },
    },
  },
  { upsert: true },
);

//Resultado
{
    _id : 1,
    items : [
        {
            "name" : "notepad",
            "price" : 35.29,
            "quantity" : 2,
        },
    ],
}

//Adicionando múltiplos valores a um array
//será necessário adicionar o modificador $each .
//A operação abaixo adicionará mais dois produtos ao array items do primeiro
// documento na coleção supplies :

db.supplies.updateOne(
    {},
    {
  push: {
        items: {
  each: [
            {
              "name": "pens",
              "price": 56.12,
              "quantity": 5,
            },
            {
              "name": "envelopes",
              "price": 19.95,
              "quantity": 8,
            },
          ],
        },
      },
    },
    { upsert: true },
  );

//Resultado

{
    _id : 1,
    items : [
        {
            "name" : "notepad",
            "price" : 35.29,
            "quantity" : 2,
        },
        {
            "name" : "pens",
            "price" : 56.12,
            "quantity" : 5,
        },
        {
            "name" : "envelopes",
            "price" : 19.95,
            "quantity" : 8,
        },
    ],
}


//Multiplos modificadores
//O $push pode ser utilizado com múltiplos modificadores, fazendo várias operações ao mesmo tempo 
//em um array .
//Desconsidere as últimas alterações com $push (se quiser acompanhar, você pode utilizar 
//db.dropDatabase() para remover as alterações anteriores) e veja a realização dele abaixo, 
//com ainda mais opções!

db.supplies.updateOne(
    { _id: 1 },
    {
  push: {
        items: {
  each: [
            {
              "name" : "notepad",
              "price" : 35.29,
              "quantity" : 2,
            },
            {
              "name": "envelopes",
              "price": 19.95,
              "quantity": 8,
            },
            {
              "name": "pens",
              "price": 56.12,
              "quantity": 5,
            },
          ],
  sort: { quantity: -1 },
  slice: 2,
        },
      },
    },
    { upsert: true },
  );


//O modificador $each para adicionar múltiplos documentos ao array items ;

//O modificador $sort para ordenar todos os elementos alterados no array items pelo campo 
//quantity em ordem descendente;

//E o modificador $slice para manter apenas os dois primeiros elementos ordenados no array items .

//Resultado

{
    _id : 1,
    items : [
      {
        "name" : "envelopes",
        "price" : 19.95,
        "quantity" : 8,
      },
      {
        "name" : "pens",
        "price" : 56.12,
        "quantity" : 5,
      },
    ],
  }


//OPERADOR $pop
//Remove o primeiro ou ultimo elemento de um array
// passando o valor -1 ao operador, será removido o primeiro elemento
//passando o valor 1 ao operador, será removido o ultimo elemento do array

//Dado seguinte documento: 
{
    _id: 1,
    items: [
      {
        "name" : "notepad",
        "price" : 35.29,
        "quantity" : 2,
      },
      {
        "name": "envelopes",
        "price": 19.95,
        "quantity": 8,
      },
      {
        "name": "pens",
        "price": 56.12,
        "quantity": 5,
      },
    ],
  }


//Removendo o primeiro item de um array
db.supplies.updateOne({ _id: 1 }, { $pop: { items: -1 } });

//Resultado
{
    _id: 1,
    items: [
      {
        "name": "envelopes",
        "price": 19.95,
        "quantity": 8,
      },
      {
        "name": "pens",
        "price": 56.12,
        "quantity": 5,
      },
    ],
  }

//Removendo o último item de um array
db.supplies.updateOne({ _id: 1 }, { $pop: { items: 1 } });

//Resultado
{
    _id: 1,
    items: [
      {
        "name" : "notepad",
        "price" : 35.29,
        "quantity" : 2,
      },
      {
        "name": "envelopes",
        "price": 19.95,
        "quantity": 8,
      },
    ],
}


//Operador $pull
//Remove todos os elementos do array com um ou mais valores que atendam a condição especificada
//Dado o seguinte documento
{
    _id: 1,
    items: [
      {
        "name" : "notepad",
        "price" : 35.29,
        "quantity" : 2,
      },
      {
        "name": "envelopes",
        "price": 19.95,
        "quantity": 8,
      },
      {
        "name": "pens",
        "price": 56.12,
        "quantity": 5,
      },
    ],
  },
  {
    _id: 2,
    items: [
      {
        "name" : "pencil",
        "price" : 5.29,
        "quantity" : 2,
      },
      {
        "name": "envelopes",
        "price": 19.95,
        "quantity": 8,
      },
      {
        "name": "backpack",
        "price": 80.12,
        "quantity": 1,
      },
      {
        "name": "pens",
        "price": 56.12,
        "quantity": 5,
      },
    ],
  }

//REmovendo todos os itens iguais a um valor especificado
// removendo os elementos pens e envelopes do array

db.supplies.updateMany(
    {},
    {
  pull: {
        items: {
          name: { $in: ["pens", "envelopes"] },
        },
      },
    },
);

//resultado
{
    _id : 1,
    items : [
      {
        "name" : "notepad",
        "price" : 35.29,
        "quantity" : 2,
      },
    ],
  },
  {
    _id : 2,
    items : [
      {
        "name" : "pencil",
        "price" : 5.29,
        "quantity" : 2,
      },
      {
        "name" : "backpack",
        "price" : 80.12,
        "quantity" : 1,
      },
    ],
  }


//Removendo todos os itens que atendem a uma condição diretamente no $pull

{ _id: 1, votes: [3, 5, 6, 7, 7, 8] }

//Você pode remover todos os elementos do array votes que sejam maiores ou iguais a ( $gte ) 6 .
// Por exemplo:

db.profiles.updateOne(
    { _id: 1 },
    {
  pull: {
        votes: { $gte: 6 },
      },
    },
  );

//resultado

{ _id: 1, votes: [3,  5] }


//Removendo itens em um array de Documentos

{
    _id: 1,
    results: [
      { item: "A", score: 5 },
      { item: "B", score: 8, comment: "Strongly agree" },
    ],
  },
  {
    _id: 2,
    results: [
      { item: "C", score: 8, comment: "Strongly agree" },
      { item: "B", score: 4 },
    ],
}

//Os documentos têm um array chamado results que armazena documentos.
//Com a operação abaixo, você consegue remover do array results todos os elementos que 
//contenham o campo score igual a 8 e o campo item igual a "B" . Ou seja, o documento deve 
//atender a ambas as condições.

db.survey.updateMany(
    {},
    {
  pull: {
        results: { score: 8 , item: "B" },
      },
    },
);

//A expressão do operador $pull aplica as condições a cada elemento do array results como 
//se estivesse no primeiro nível, isso porque os documentos dentro do array results não contêm
// outros campos com mais arrays . Se isso acontecer, você deve utilizar uma outra abordagem, 
//que será detalhada mais à frente.
//Após essa operação, os documentos ficarão assim:

{
    _id: 1,
    results: [ { "item": "A", "score": 5 } ],
  },
  {
    _id: 2,
    results: [
      { "item": "C", "score": 8, "comment": "Strongly agree" },
      { "item": "B", "score": 4 },
    ],
  }


//Operador $addToSet
//$addToSet é utilizado quando você precisa garantir que os valores de um array não sejam duplicados
//apenas valores únicos estejam presentes no array 

//três aspectos sobre o $addToSet:
// Se você utilizá-lo em um campo que não existe no documento alterado, ele criará um campo do 
//tipo array com o valor especificado na operação;

//Se você utilizá-lo em um campo já existente no documento, mas esse campo não for um 
//array , a operação não funcionará;

//Se o valor passado for um documento, o MongoDB o considerará como duplicado se um documento
// existente no array for exatamente igual ao documento a ser adicionado, ou seja, possui os mesmos 
//campos com os mesmos valores, e esses campos estão na mesma ordem.

{
    _id: 1,
    item: "polarizing_filter",
    tags: ["electronics", "camera"],
  }


//Add ao array
//A operação abaixo adiciona o elemento "accessories" ao array tags desde que "accessories" 
//não exista no array :
db.inventory.updateOne(
    { _id: 1 },
    { $addToSet: { tags: "accessories" } },
  );

//Resultado
{
    _id: 1,
    item: "polarizing_filter",
    tags: [
      "electronics",
      "camera",
      "accessories",
    ],
  }

//Se o valor existir
//A operação abaixo tenta adicionar o elemento "camera" ao array tags. Porém, esse elemento
// já existe e a operação não surtirá efeito:
db.inventory.updateOne(
    { _id: 1 },
    { $addToSet: { tags: "camera"  } },
);

//Como resultado dessa operação, é retornada uma mensagem dizendo que o MongoDB encontrou 
//um documento com o _id igual a 1 , mas não fez nenhuma alteração:
{ "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 0 }


//COm o modificador $each
//operador $addToSet combinado com o modificador $each 
//permite que você adicione múltiplos valores a um array .
{ _id: 2, item: "cable", tags: ["electronics", "supplies"] }


//A operação abaixo utiliza o operador $addToSet e o modificador $each para adicionar alguns elementos 
//a mais no array tags :
db.inventory.updateOne(
    { _id: 2 },
    {
  addToSet: {
        tags: {
  each: ["camera", "electronics", "accessories"],
        },
      },
    },
);


//Como resultado, a operação adicionará ao array tags somente os elementos
// "camera" e "accessories" , uma vez que o elemento "electronics" já existia
// no array . Veja abaixo:
{
    _id: 2,
    item: "cable",
    tags: ["electronics", "supplies", "camera", "accessories"],
  }




//Array FIlter
db.recipes.insertMany([
  {
    title: "Panqueca Simples",
    ingredients: [
      { name: "Farinha", quantity: 2},
      { name: "Oleo", quantity: 4 },
      { name: "Leite", quantity: 1 },
    ],
  },
  {
    title: "Bolo de Cenoura",
    ingredients: [
      { name: "Farinha", quantity: 2},
      { name: "Oleo", quantity: 1, unit: "xícara" },
      { name: "Ovo", quantity: 3},
      { name: "Cenoura", quantity: 3},
      { name: "Fermento", quantity: 1},
    ],
  },
]);

//Caso você saiba o index exato do elemento em que deseja-se alterar alguma propriedade,
//, pode-se fazer algo como:
db.recipes.updateOne( { title: "Panqueca Simples" }, { $set: { "ingredients.1.unit": "xícara" } } );


//Mas, e se você não soubesse qual posição do array que gostaria de alterar um objeto? Ou melhor, 
//e se quisesse alterar dinamicamente todas as receitas que usam farinha, para usarem 
//farinha integral e que a unit seja xícara?
db.recipes.updateOne(
    { title: "Panqueca Simples" },
    {
  set : {
        "ingredients.$[elemento].name": "Farinha Integral",
      },
    },
    { arrayFilters: [ { "elemento.name": "Farinha" } ] },
);

//Achamos um documento com title igual a "Panqueca Simples" e atualizamos o objeto com propriedade
// name igual a "Farinha" do array ingredients, alterando o valor do campo name 
//para "Farinha Integral" .
//Agora, vamos adicionar "xícara" ao campo unit do objeto com name igual a "Farinha Integral" !
db.recipes.updateOne(
    { title: "Panqueca Simples" },
    {
  set : {
        "ingredients.$[elemento].unit": "xícara",
      },
    },
    { arrayFilters: [ { "elemento.name": "Farinha Integral" } ] },
  );


//Precisamos mudar o arrayFilter de "Farinha" para "Farinha Integral" ,
// pois na query anterior alteramos o name desse ingrediente.
//Se quiséssemos trocar todos os ingredientes da coleção que são "Farinha" por 
//"Farinha Integral" e colocar "xícara" como valor de unit , poderíamos seguir o seguinte exemplo:

db.recipes.updateMany( // Passamos de updateOne para updateMany.
    {}, // Retiramos a restrição do título.
    {
  set : {
        "ingredients.$[elemento].unit": "xícara", // Setamos `unit` como "xícara",
        "ingredients.$[elemento].name": "Farinha Integral", // `name` como "Farinha Integral".
      },
    },
    { arrayFilters: [ { "elemento.name": "Farinha" } ] }, // Filtramos os arrays que o valor da propriedade `name` seja "Farinha".
  );






