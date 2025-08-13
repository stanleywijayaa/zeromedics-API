const express = require('express');
const { getOrder } = require('../logics/orderLogic');
const router = express.Router()

router.get('/search?', async (req, res) => {
    const params = req.query
    try {
        const order = await getOrder(params);
        res.send(order);
    } catch (error){
        res.status(500).json({ error: 'Failed to fetch customer' });
    }
});

module.exports = router