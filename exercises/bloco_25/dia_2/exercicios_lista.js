//Exercício 1 : Utilize uma combinação das expressões aritméticas e adicione um campo chamado idade à coleção clientes . Algumas dicas:
db.clientes.aggregate([
    {
      $addFields:{
        idade:{
          $floor:{
            $divide:[
              {$subtract:["$$NOW","$dataNascimento"]},
              {$multiply:[86400000,365]}
            ]
          }
        }
      }
    }
]);
  
//Exercício 2 : Utilizando o novo campo idade , conte quantos clientes têm entre 18 e 25 anos.
db.clientes.aggregate([
    {
    $addFields:{
        idade:{
          $floor:{
            $divide:[
              {$subtract:["$$NOW","$dataNascimento"]},
              {$multiply:[86400000,365]}
            ]
          }
        }
      }
    },
    {
      $match:{
        idade:{
          $gte:18,
          $lte:25
        }
      }
    },
    {
     $count:'totalCl'
    }
]);


//Exercício 3 : Remova os estágios $count e $match do exercício anterior e adicione um estágio no pipeline que coloque as compras do cliente no campo compras .
db.clientes.aggregate([
    {
      $addFields:{
        idade:{
          $floor:{
            $divide:[
              {$subtract:["$$NOW","$dataNascimento"]},
              {$multiply:[86400000,365]}
            ]
          }
        }
      }
    },
    {
      $lookup:{
        from:"vendas",
        localField:"clienteId",
        foreignField:"clienteId",
        as: "compras"
      }
    }
]);


//Exercício 4 : Selecione TODOS os clientes que compraram entre Junho de 2019 e Março de 2020 .
db.clientes.aggregate([
    {
      $addFields:{
        idade:{
          $floor:{
            $divide:[
              {$subtract:["$$NOW","$dataNascimento"]},
              {$multiply:[86400000,365]}
            ]
          }
        }
      }
    },
    {
      $lookup:{
        from:'vendas',
        localField:'clienteId',
        foreignField:'clienteId',
        as: 'compras'
      }
    },
    {
      $match:{
        "compras.dataVenda":{
          $gte:ISODate('2019-06-01'),
          $lte:ISODate('2020-03-31')
        }
      }
    }
]);










































































