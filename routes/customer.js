const express = require('express');
const router = express.Router();
const { createCustomer, getAllCustomers, getCustomer } = require('../logics/customerLogic');

router.post('/', async(req,res) => {
    const customerData = req.body;
    try {
        const newCustomer = await createCustomer(customerData);//need to create UI
        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create customer' });
    }
});

//thinking of retrieving customer data by amount & page bcs only shows 10 customers bcs of pagination
router.get('/all', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.per_page) || 25;

        const { customers, total, totalPages } = await getAllCustomers(page, perPage);

        res.send({
            customers,
            total,
            totalPages
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch customers' });
    }
});

router.post('/get', async (req, res) => {
    const { email, username } = req.body;
    try {
        const customer = await getCustomer(email, username);
        res.send(customer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch customer' });
    }
});

module.exports = router;