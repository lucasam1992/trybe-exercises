// A função insertOne() cria tanto o banco de dados nomeDoBanco,
//  como a coleção nomeDaColecao , caso eles não existam

use nomeDoBanco
db.nomeDaColecao.insertOne( { x: 1 })

//criando uma coleção 
// se uma coleção não existe, o MongoDB cria essa coleção no momento do primeiro insert .
// as operações insertOne() e createIndex() criam uma nova coleção (caso ela não exista).

db.nomeDaColecao1.insertOne({ x: 1 })
db.nomeDaColecao2.createIndex({ y: 1 })


// criação explicita
// Você também pode utilizar o método db.createCollection() para criar uma 
//coleção e especificar uma série de parâmetros,
// como o tamanho máximo do documento ou as regras de validação para os documentos .
// Você pode fazer modificações nos parâmetros de uma coleção através do collMod .

db.createCollection( "nomeDaColecao", { collation: { locale: "pt" } } );

//Documentos
//os documentos são equivalentes aos registros ou linhas de uma tabela nos bancos de dados relacionais.
// Sua diferença é que documentos podem conter estruturas mais ricas, diferentes entre documentos,
// e armazenar muito mais informações do que você consegue em uma "linha simples" de uma tabela 
// relacional.

{
    "_id": 1,
    "nome": "Jose",
    "endereco": {
        "logradouro": "Rua 1",
        "regiao": "Zona Norte",
        "cidade": "São Paulo",
        "uf": "SP"
    }
},
{
    "_id": 2,
    "nome": "Maria",
    "endereco": {
        "logradouro": "Rua 2",
        "cidade": "Belo Horizonte",
        "uf": "MG"
    }
}

// BSON Types
// Por mais que o insert ocorra recebendo um documento JSON , internamente, 
// o MongoDB armazena os dados em um formato chamado BSON (ou Binary JSON ).
// Esse formato é uma extensão do JSON e permite que você tenha mais tipos de
// dados armazenados no MongoDB , não somente os tipos permitidos pelo JSON .

//Insert
// Os métodos insertOne() e insertMany() têm suas particularidades e limitações.
// Enquanto um faz a inserção de um único documento por vez, o outro pode inserir
// milhares de documentos em uma única operação. Portanto, saber quando e onde aplicar
// fará toda a diferença quando você estiver codificando.

db.nomeDoBanco.insertOne({productName: "Caixa", price: 20});

// alterando o id 
db.nomeDoBanco.insertOne({_id:1, productName: "Caixa", price: 20});

// inserindo muitos 

db.products.insertMany([
    {"productName": "Caixa", "price": 20},
    { "productName": "Lapis", "stock": 10, "price": 20,"status":"A"},
    { "productName": "Tesoura", "price": 5, "status": "B" },
    { "productName": "Borracha", "price": 15, "status": "A" }
]);

//find()
//Após inserir documentos em seu banco de dados, você vai querer recuperá-los. Certo?
//Assim como nos bancos de dados relacionais, no
// MongoDB temos um método específico para essa operação: o find() .

db.products.find();

//find() parametros

//db.collection.find(query, projection)

//query (opcional):
//Tipo: documento;
//Descrição: especifica os filtros da seleção usando os query operators . 
//Para retornar todos os documentos da coleção, é só omitir esse parâmetro ou 
//passar um documento vazio ({}).

//projection (opcional):
//Tipo: documento;
//Descrição: especifica quais atributos serão retornados nos documentos
// selecionados pelo parâmetro query .
// Para retornar todos os atributos desses documentos, é só omitir esse parâmetro.

//Projection
// determina quais atributos serão retornados dos documentos que atendam aos critérios de filtro.
// O formato recebido por ele é algo como:
// { "atributo1": <valor>, "atributo2": <valor> ... }

// O <valor> pode ser uma das seguintes opções:
// 1 ou true para incluir um campo nos documentos retornados;
// 0 ou false para excluir um campo;

db.movies.insertOne(
    {
        "title" : "Forrest Gump",
        "category" : [ "drama", "romance" ],
        "imdb_rating" : 8.8,
        "filming_locations" : [
            { "city" : "Savannah", "state" : "GA", "country" : "USA" },
            { "city" : "Monument Valley", "state" : "UT", "country" : "USA" },
            { "city" : "Los Anegeles", "state" : "CA", "country" : "USA" }
        ],
        "box_office" : {
            "gross" : 557, "opening_weekend" : 24, "budget" : 55
        }
    }
)


//A operação acima insere um documento na coleção movies com vários atributos.
// Com a operação abaixo, selecionamos esse documento na coleção movies ,
// passando como parâmetro de projeção apenas os atributos title e imdb_rating :

db.movies.findOne(
    { "title" : "Forrest Gump" },
    { "title" : 1, "imdb_rating" : 1 }
)

// COm resultado, teremos:

{
    "_id" : ObjectId("5515942d31117f52a5122353"),
    "title" : "Forrest Gump",
    "imdb_rating" : 8.8
}

// Note que o atributo _id também foi retornado. Isso acontece porque ele é o único
// atributo que você não precisa especificar para que seja retornado.
// O movimento aqui é ao contrário, se você não quiser vê-lo no retorno,
// é só suprimí-lo da seguinte forma:

db.movies.findOne(
    { "title" : "Forrest Gump" },
    { "title" : 1, "imdb_rating" : 1, "_id": 0 }
)

//Agora sim, nosso resultado sera apenas com os atributos devidos:

{
    "title" : "Forrest Gump",
    "imdb_rating" : 8.8
}

// Note que o atributo _id também foi retornado. 
// Isso acontece porque ele é o único atributo que você não precisa especificar para que
// seja retornado. O movimento aqui é ao contrário, se você não quiser vê-lo no retorno,
// é só suprimí-lo da seguinte forma:

db.movies.findOne(
    { "title" : "Forrest Gump" },
    { "title" : 1, "imdb_rating" : 1, "_id": 0 }
)

// Agora sim, nosso resultado será apenas com os atributos devidos:

{
    "title" : "Forrest Gump",
    "imdb_rating" : 8.8
}

// Gerenciamento do cursor
// O método count() retorna o número de documentos de uma coleção, e também pode receber
// um critério de seleção para retornar apenas o número de documentos que atendam a esse critério

db.movies.count()


// Tipos de comparações

{ "_id": "apples", "qty": 5 }
{ "_id": "bananas", "qty": 7 }
{ "_id": "oranges", "qty": { "in stock": 8, "ordered": 12 } }
{ "_id": "avocados", "qty": "fourteen" }

// A operação abaixo usa o operador de comparação $gt( greater than , maior que, >)
// para retornar os documentos em que o valor do atributo qty seja maior do que 4 :

db.collection.find( { qty: { $gt: 4 } } )

// A operação trará como retorno os seguintes documentos:

{ "_id": "apples", "qty": 5 }
{ "_id": "bananas", "qty": 7 }

// O documento com o _id igual a "avocados" não foi retornado porque o valor do campo qty é do
// tipo string , enquanto o operador $gt é do tipo integer .
//O documento com o _id igual a "oranges" também não foi retornado porque qty é do tipo object .

//Selecionando todos os documentos da coleção
db.bios.find()

// Selecionando documentos com critérios de busca

// A operação abaixo retorna os documentos da coleção bios em que o atributo _id é igual a 5 :
db.bios.find( { _id: 5 } )

//Agora, a operação abaixo retorna todos os documentos da coleção bios em que o campo last
// do subdocumento name é igual a "Hopper" :
db.bios.find( { "name.last": "Hopper" } )

//Projetando somente os atributos requeridos

// retorna todos os documentos da coleção bios , trazendo apenas o atributo name de cada documento:
db.bios.find({}, { name: 1 })

// Limitando o número de documentos retornados

//Você pode limitar o número de documentos retornados por uma consulta utilizando o método limit()

db.bios.find().limit(5)

// o método pretty() 
// aplica uma indentação na exibição dos resultados no console, de forma que fica bem melhor de ler.
db.bios.find().limit(5).pretty()

> db.products.find().limit(2).pretty();
{
	"_id" : ObjectId("6111aa673286923f77fa9a0b"),
	"productName" : "Caixa",
	"price" : 20
}
{
	"_id" : ObjectId("6111aa673286923f77fa9a0c"),
	"productName" : "Lapis",
	"stock" : 10,
	"price" : 20,
	"status" : "A"
}


//"Pulando" documentos

// Acione o método skip() para controlar a partir de que ponto o MongoDB começará a retornar
// os resultados.
// Essa abordagem pode ser bastante útil para realizar paginação dos resultados.

db.bios.find().limit(10).skip(5)


> db.products.find().limit(4).skip(1).pretty();
{
	"_id" : ObjectId("6111aa673286923f77fa9a0c"),
	"productName" : "Lapis",
	"stock" : 10,
	"price" : 20,
	"status" : "A"
}
{
	"_id" : ObjectId("6111aa673286923f77fa9a0d"),
	"productName" : "Tesoura",
	"price" : 5,
	"status" : "B"
}
{
	"_id" : ObjectId("6111aa673286923f77fa9a0e"),
	"productName" : "Borracha",
	"price" : 15,
	"status" : "A"
}






