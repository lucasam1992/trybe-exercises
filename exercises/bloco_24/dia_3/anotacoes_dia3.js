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
























