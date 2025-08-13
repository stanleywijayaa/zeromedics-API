const express = require('express');
const { getOrder } = require('../logics/orderLogic');
const router = express.Router()

router.get('/', async (req, res) => {
    const { params } = ''
    try {
        const order = await getOrder(params);
        res.send(order);
    } catch (error){
        res.status(500).json({ error: 'Failed to fetch customer' });
    }
})