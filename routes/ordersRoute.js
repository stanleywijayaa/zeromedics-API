const express = require('express');
const { getOrder, getAllOrder } = require('../logics/orderLogic');
const router = express.Router()

router.get('/', async (req, res) => {
    const { query } = req.query
    try {
        console.log('getting an order')
        const order = await getOrder(query);
        res.json(order);
    } catch (error){
        console.log(error)
        res.status(500).json({ error: 'Failed to fetch order' });
    }
});

router.get('/all', async (req,res) => {
    try{
        console.log('getting all orders')
        const order = await getAllOrder()
        res.json(order)
    } catch(error){
        console.log(error)
        res.status(500).json({ error: 'Failed to fetch all order' });
    }
})

module.exports = router