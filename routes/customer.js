const express = require('express');
const router = express.Router();
const { createCustomer, getAllCustomers, getCustomer } = require('../logics/customerLogic');

router.post('/', async(req,res) => {
    const customerData = req.body;
    try {
        const newCustomer = await createCustomer(customerData);// need to create html & php to retrieve data from user
        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create customer' });
    }
});

//thinking of retrieving customer data by amount & page bcs only shows 10 customers bcs of pagination
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