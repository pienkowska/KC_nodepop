'use strict';

const express = require('express');
const createError = require('http-errors');
const router = require('..');
const Product = require('../../models/Product');
const Products = require('../../models/Product');

// return list of products

router.get('/', async (req, res, next) =>{
    try {
        const name = req.query.name;
        const venta = req.query.venta;
        const precio = req.query.precio;
        const foto = req.query.foto;
        const tags = req.query.tags;

        const skip = req.query.skip;
        const limit = req.query.limit;

        const campos = req.query.campos;

        const sort = req.query.sort;
        const filtro = {};

        if (name) {
            filtro.name = name;
        }

        if (venta) {
            filtro.venta = venta;
        }

        const products = await Products.list( filtro, skip, limit, campos, sort);
        res.json({results: products})

    } catch (error) {
        next(error);
    }
});


//create new product
router.post('/', async (req, res, next) => {
    try {
  
      const productData = req.body;
      const product = new Product(productData);
      const productSaved = await product.save(); 
      res.json({ result: productSaved });
  
    } catch (err) {
      next(err);
    }
  });

router.get('/tags', async (req, res, next) => {
    try {
        const existingTags = await Products.tagsList();
        res.json({tags: existingTags});
        
    } catch (error) {
        next(error);
    }
});


module.exports = router;