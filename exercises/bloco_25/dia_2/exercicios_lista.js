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


//Exercício 5 : Confira o número de documentos retornados pelo pipeline com o método itcount() . Até aqui, você deve ter 486 documentos sendo retornados.
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
    },
]).itcount();
  
//Exercício 6 : Ainda nesse pipeline , descubra os 5 estados com mais compras.
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
    },
    {
      $addFields:{
        totalCompras:{
          $size:"$compras"
        }
      }
    },
    {
      $sort:{totalCompras:-1}
    },
    {
      $limit:10
    },
    {
      $unwind:"$compras"
    },
    {
      $addFields:{
        "compras.valorComDesconto":{
          $subtract:[
            "$compras.valorTotal",
            {$multiply:["$compras.valorTotal",0.10]}
          ]
        }
      }
    },
    {
      $group:{
        _id:"$endereco.uf",
        totalCompras:{
          $sum:1
        }
      }
    },
    {
    $sort: {
      totalCompras: -1
    }
  },
  { $limit: 5 }
]);


//Exercício 7 : Descubra o cliente que mais consumiu QUEIJO PRATO . Retorne um documento com a seguinte estrutura:
db.vendas.aggregate([
    {
      $match:{
        "itens.nome":"QUEIJO PRATO"
      }
    },
    {
      $unwind:"$itens"
    },
    {
      $match:{
        "itens.nome":"QUEIJO PRATO"
      }
    },
    {
      $group:{
        _id:"$clienteId",
        totalConsumo:{
          $sum:"$itens.quantidade"
        }
      }
    },
    {
      $sort:{
        totalConsumo:-1
      }
    },
    {
      $limit: 1
    },
    {
      $lookup:{
        from:"clientes",
        localField:"_id",
        foreignField:"clienteId",
        as: "cliente"
      }
    },
    {
      $unwind:"$cliente"
    },
    {
      $project:{
        nomeCliente:"$cliente.nome",
        uf:"$cliente.endereco.uf",
        totalConsumo:"$totalConsumo",
        _id:0
      }
    }  
]);

//Exercício 8 : Selecione todas as vendas do mês de Março de 2020 , com status EM SEPARACAO . Acrescente um campo chamado dataEntregaPrevista com valor igual a três dias após a data da venda. Retorne apenas os campos clienteId , dataVenda e dataEntregaPrevista .































































