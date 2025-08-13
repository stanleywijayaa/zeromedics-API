const express = require('express');
const router = express.Router();
const { getCustomer, getAllCustomers } = require('../logics/customerLogic');

router.get('/all', async (req, res) => {
    try {
        const customers = await getAllCustomers();
        res.send(customers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch customers' });
    }
});

router.post('/', async (req, res) => {
    const { email, username } = req.body;
    try {
        const customer = await getCustomer(email, username);
        res.send(customer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch customer' });
    }
});

module.exports = router;