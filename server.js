const express = require('express');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json())

// routes
const customerRoute = require('./routes/customer');
const orderROute = require('./routes/orders')

app.use('/customer', customerRoute);

app.use('/orders', orderRoute);

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);});