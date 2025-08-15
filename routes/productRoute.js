const express = require('express');
const router = express.Router();
const productController = require('../logics/productLogic');

router.route('/')
    .get(productController.getAllProducts)

router.route('/:id')
    .get(productController.getProducts)

module.exports = router;