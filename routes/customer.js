const express = require('express');
const router = express.Router();
const { 
    createCustomer, 
    getAllCustomers, 
    getCustomer, 
    updateCustomer, 
    deleteCustomer 
} = require('../logics/customerLogic');

router.post('/', async(req,res) => {
    const customerData = req.body;
    try {
        const newCustomer = await createCustomer(customerData);
        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create customer' });
    }
});

router.get('/all', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.per_page) || 20;

        const { customers, total, totalPages } = await getAllCustomers(page, perPage);

        res.json({
            customers,
            total,
            totalPages
        });
    } catch (error) {
        console.error("Error in /customer/all route:", error);
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

router.put("/", async (req,res) => {
    const { email, data } = req.body;
    try {
        const updatedCustomer = await updateCustomer(email, data);
        res.status(200).json(updatedCustomer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update customer' });
    }
})

router.delete("/", async (req, res) => {
    const { email } = req.body;
    try{
        const customerToDelete = await getCustomer(email);
        if (!customerToDelete || customerToDelete.length === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        const customerId = customerToDelete[0].id;
        await deleteCustomer(customerId);
        res.status(200).json({ message: 'Customer deleted successfully' });
    }catch(error){
        console.error("error deleting a customer: ", error);
    }
});

module.exports = router;