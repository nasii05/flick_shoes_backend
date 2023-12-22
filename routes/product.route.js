const express = require('express');
const router = express.Router();

const Products = require('../models/product.model');

router.get('/', async(req, res)=>{
    try {
        const products = await Products.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

router.get('/:id', async(req, res)=>{
    try {
        const product = await Products.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

router.post('/', async(req, res)=>{
    try {
       const product = new Products(req.body);
       const {name} = product;
       const existingProduct = await Products.findOne({name});
       if(existingProduct){
           return res.status(400).json({message: "product already exists"});
       }
       const result = await product.save();
       res.status(201).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

router.put('/:id', async(req, res)=>{
  try{
    const {id} = req.params;
    const product = await Products.findByIdAndUpdate(id, req.body);
    if(!product){
        return res.status(404).json({message: 'product not found'});
    }
    const updatedProduct = await Products.findById(id);
    res.status(200).json(updatedProduct);
  }catch(error){
    res.status(500).json({message: error.message});
  }
});

router.delete('/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const product = await Products.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: 'product not found'});
        }
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

module.exports = router;
