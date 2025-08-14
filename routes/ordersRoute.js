const express = require('express');
const { getOrder, getAllOrder } = require('../logics/orderLogic');
const router = express.Router()

router.get('/search', async (req, res) => {
    const query = req.query.query
    if(!query){
        try {
            console.log('getting all order')
            const order = await getAllOrder()
            res.send(order)
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch order' });
        }
    }
    else{
        try {
            console.log('getting an order')
            const order = await getOrder(query);
            res.send(order);
        } catch (error){
            res.status(500).json({ error: 'Failed to fetch order' });
        }
    }
});

module.exports = router