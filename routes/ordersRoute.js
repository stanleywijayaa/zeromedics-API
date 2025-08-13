const express = require('express');
const { getOrder, getAllOrder } = require('../logics/orderLogic');
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const order = await getAllOrder(query);
        res.send(order);
    } catch (error){
        res.status(500).json({ error: 'Failed to fetch customer' });
    }
});

router.get('/?', async (req, res) => {
    const query = req.query
    try {
        const order = await getOrder(query);
        res.send(order);
    } catch (error){
        res.status(500).json({ error: 'Failed to fetch customer' });
    }
});

module.exports = router