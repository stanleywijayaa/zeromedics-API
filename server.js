const express = require('express');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json())

// routes
const customerRoute = require('./routes/customer');

app.use('/customer', customerRoute);

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);});