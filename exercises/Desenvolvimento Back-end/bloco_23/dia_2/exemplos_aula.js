// Operadores de Comparação
// servem para que você execute consultas comparando os
// valores de atributos dos documentos de uma coleção.

//Operador $lt

//é menor do que (<) o valor especificado.

db.inventory.find({ qty: { $lt: 20 } })

// Operador $lte

// menor ou igual (<=) ao valor especificado.

db.inventory.find({ qty: { $lte: 20 } })

//Operador $gt

// maior do que (>) o valor especificado.

db.inventory.find({ qty: { $gt: 20 } })

//Operador $gte

//  maior ou igual (>=) ao valor especificado.

db.inventory.find({ qty: { $gte: 20 } })

//Operador $eq

//O operador $eq seleciona os documentos em que o valor do atributo filtrado é igual ao valor especificado.
// Esse operador é equivalente ao filtro { campo: <valor> } e não tem nenhuma diferença de performance.

db.inventory.find({ qty: { $eq: 20 } })

db.inventory.find({ qty: 20 })


// Operador $ne

// seleciona os documentos em que o valor do atributo filtrado não é igual ao valor especificado.

db.inventory.find({ qty: { $ne: 20 } })

//Operador $in

//A consulta abaixo retorna todos os documentos da coleção inventory em que o valor do 
//atributo qty é 5 ou 15 . E embora você também possa executar essa consulta utilizando o 
//operador $or , que você verá mais à frente no conteúdo, escolha o operador $in para executar 
//comparações de igualdade com mais de um valor no mesmo atributo.

db.inventory.find({ qty: { $in: [ 5, 15 ] } })

//Operador $nin

//O operador $nin seleciona os documentos em que o valor do atributo filtrado 
//não é igual ao especificado no array , ou o campo não existe.

db.inventory.find( { qty: { $nin: [ 5, 15 ] } } )

//EXERCICIO 1
//Selecione e faça a contagem dos restaurantes
// presentes nos bairros Queens , Staten Island e Bronx . (utilizando o atributo borough )

db.restaurants.find({borough: {$in: ["Queens","Staten Island","Bronx"]} }).count()

//EXERCICIO 2
// Selecione e faça a contagem dos restaurantes que não possuem culinária do tipo American . 
//(utilizando o atributo cuisine )

db.restaurants.find({cuisine:{$ne:["American"]}}).count()

//EXERCICIO 3
//Selecione e faça a contagem dos restaurantes que 
//possuem avaliação maior ou igual a 8 . (utilizando o atributo rating )

db.restaurants.find({rating:{$gte: 8}}).count()

// EXERCICIO 4
//Selecione e faça a contagem dos restaurantes que possuem avaliação menor que 4 .

db.restaurants.find({rating:{$lt:4}}).count()

// EXERCICIO 5
// Selecione e faça a contagem dos restaurantes que não possuem as avaliações 5 , 6 e 7 .

db.restaurants.find({rating:{$nin:[5,6,7]}}).count()



// OPERADORES LÓGICOS

//Operador $not

db.inventory.find({ price: { $not: { $gt: 1.99 } } })

//Operador $or

db.inventory.find({ $or: [{ qty: { $lt: 20 } }, { price: 10 }] })

//Operador $nor

db.inventory.find({ $nor: [{ price: 1.99 }, { sale: true }] })

//Operador $and

db.inventory.find({
    $and: [
            { price: { $ne: 1.99 } },
            { price: { $exists: true } }
        ]
    })



// EXERCICIO 1
//Selecione e faça a contagem dos restaurantes que não possuem 
//avaliação menor ou igual a 5 , essa consulta também deve 
//retornar restaurantes que não possuem o campo avaliação.

db.restaurants.find({rating:{$not: {$lte: 5} }}).count()

//EXERCICIO 2
// Selecione e faça a contagem dos restaurantes em que a avaliação seja maior ou igual a 6 , 
//ou restaurantes localizados no bairro Brooklyn 

db.restaurants.find(
    { $or: [
        {rating: {$gte:6 }},
        {borough:"Brooklyn"} 
    ]}
).count()


//EXERCICIO 3
//Selecione e faça a contagem dos restaurantes localizados nos bairros Queens ,
// Staten Island e Broklyn e possuem avaliação maior que 4 .

db.restaurants.find(
    { $and: [
        {borough:{$in:["Queens","Staten Island","Brooklyn"]}},
        {rating: {$gt:4}}
    ]}
).count()


//EXERCICIO 4
// Selecione e faça a contagem dos restaurantes onde nem o campo avaliação seja igual a 1 , 
//nem o campo culinária seja do tipo American .

db.restaurants.find(
    {$nor: [
        {rating:1},
        {cuisine:'American'}
    ]}
).count()


//EXERCICIO 5
//Selecione e faça a contagem dos resturantes em que a avaliação seja maior que 6 ou menor que 10 
//, E esteja localizado no bairro Brooklyn , OU não possuem culinária do tipo Delicatessen .

db.restaurants.find(
    {$and: [
        {$or:[{rating:{$gte:6,$lt:10}}]},
        {$or:[{borough:'Brooklyn'}, {cuisine: {$ne:'Delicatessen'}}]}
    ]}
).count()



//OPERADOR $exists
//Quando o <boolean> é verdadeiro ( true ), o operador $exists encontra os documentos que contêm 
//o atributo , incluindo os documentos em que o valor do atributo é igual a null . 
//Se o <boolean> é falso ( false ), a consulta retorna somente os documentos que não contêm o atributo.

db.inventory.find({ qty: { $exists: true } })

db.inventory.find({ qty: { $exists: true, $nin: [ 5, 15 ] } })


// Metodo SORT()

db.colecao.find().sort({ "campo": "1 ou -1"})

//Quando existe a necessidade de ordenar os documentos por algum atributo, o método sort() 
//se mostra muito útil. Usando um valor positivo ( 1 ) como valor do atributo, os documentos
// da consultas são ordenados de forma crescente ou alfabética (também ordena por campos com strings ).
// Em complemento, usando um valor negativo ( -1 ), os documentos de saída estarão em ordem decrescente
// ou contra alfabética.

//Ele pode ser combinado com o método find() :
db.example.find({}, { value, name }).sort({ value: -1 }, { name: 1 })

//O sort() só pode ser usado se tiver algum resultado de busca antes:

db.colecao.find().sort({ nomeDoAtributo: 1 }) // certo
db.colecao.sort({ nomeDoAtributo: 1 }) // errado

//EXERCICIO 1
//Ordene alfabeticamente os restaurantes pelo nome (atributo name ).

db.restaurants.find().sort({'name':1})

//EXERCICIO 2
//Ordene os restaurantes de forma descrescente baseado nas avaliações.
db.restaurants.find().sort({rating:-1}).pretty()

//Removendo documentos

//Para remover documentos de uma coleção temos dois métodos que são utilizados
// para níveis de remoção diferentes: o deleteOne() e o deleteMany() .

//O exemplo abaixo remove o primeiro documento da coleção inventory em 
//que o atributo status é igual a D :
db.inventory.deleteOne({ status: "D" })

//O exemplo abaixo remove todos os documentos da coleção inventory em que o atributo
//status é igual a A :
db.inventory.deleteMany({ status : "A" })


//Para remover todos os documentos da coleção, basta não passar nenhum parâmetro 
//para o método deleteMany() :
db.inventory.deleteMany({})

//EXERCICIO 1
//Remova o primeiro restaurante que possua culinária do tipo Ice Cream, Gelato, Yogurt, Ices 
db.restaurants.deleteOne({cuisine: "Ice Cream, Gelato, Yogurt, Ices"})

//EXERCICIO 2
//Remova todos os restaurantes que possuem culinária do tipo American .
db.restaurants.deleteMany({cuisine:"American"})

//Exclua o banco de dados 
db.dropDatabase()






