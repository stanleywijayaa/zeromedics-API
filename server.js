const express = require('express');
const path = require('path');
const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json())
app.use(cors())

// routes
const customerRoute = require('./routes/customersRoute');
const orderRoute = require('./routes/ordersRoute')

//static routes
app.use(express.static(path.join(__dirname, 'views')))

app.use('/customer', customerRoute);
app.use('/products', require('./routes/productRoute'));

//Orders routing
app.use('/orders', orderRoute);
//Route to orders homepage
app.get('/search/orders', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'SearchOrders.html'));
});

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);});