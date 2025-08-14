const express = require('express');
const path = require('path');
require('dotenv').config()
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json())

// routes
const customerRoute = require('./routes/customer');
const orderRoute = require('./routes/ordersRoute')

app.use('/customer', customerRoute);
app.use('/products', require('./routes/product'));

app.use('/orders', orderRoute);

app.get('/orders', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'SearchOrders.html'));
});

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);});