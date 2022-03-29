const express = require('express');
const ProductModel = require('../models/productModel');

const router = express.Router();

        //'/list-products'
router.get('/', async (req, res, next) => {
  const products = await ProductModel.getAll();

 // res.send(products);
 res.status(200).json(products);
});

          // '/get-by-id/:id'
router.get('/:id', async (req, res, next) => {
  const product = await ProductModel.getById(req.params.id);

  if(product === null){
      res.status(404).send({message:'Produto não encontrado'});
  }
 // res.send(product);
 res.status(200).json(product);
});

            //'/add-user'
router.post('/', async (req, res) => {
  const { name, brand } = req.body;

  try{
    const newProduct = await ProductModel.add(name, brand);
   
    res.status(200).json(newProduct);
  }catch(e){
    //res.send(newProduct);
    res.status(500).send({message: 'Algo deu errado'});
  }
});
      //.post //'/delete-user/:id'
router.delete('/:id', async (req, res) => {
    try{
        const products = await ProductModel.exclude(req.params.id);
        res.status(200).json(products);
    }catch(e){
        res.status(500).send({message: 'Algo deu errado'});
        //res.send(products);
    }
});

    //.post //'/update-user/:id'
router.put('/:id', async (req, res) => {
  const { name, brand } = req.body;

  try{
    const products = await ProductModel.update(req.params.id, name, brand);

    res.status(200).json(products);
  }catch(e){
    //res.send(products);
    res.status(500).send({message: 'Algo deu errado'});
  }
  
});

module.exports = router;