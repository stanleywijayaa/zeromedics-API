const express = require('express');
const path = require('path');
const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json())
app.use(cors())

// routes
const customerRoute = require('./routes/customer');
const orderRoute = require('./routes/ordersRoute')

app.use('/customer', customerRoute);
app.use('/products', require('./routes/product'));

app.use('/orders', orderRoute);

app.get('/zeromedics/orders', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'SearchOrders.html'));
});


app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);});