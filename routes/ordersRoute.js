const express = require('express');
const { getOrder, getAllOrder } = require('../logics/orderLogic');
const router = express.Router()

router.get('/search', async (req, res) => {
    const query = req.query.query
    if(!query){
        console.log('getting all order')
        getAllOrder()
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