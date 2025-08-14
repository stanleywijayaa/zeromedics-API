const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
require('dotenv').config()

async function getAllOrder(){
    const woocommerce = new WooCommerceRestApi({
        url: 'https://zeromedics.com',
        consumerKey: process.env.CONSUMER_KEY,
        consumerSecret: process.env.COSNUMER_SECRET,
        version: 'wc/v3'
    })

    let res = woocommerce.get('orders')
    const order = res.data
    return order
}

async function getOrder(query){
    console.log(query)
    const woocommerce = new WooCommerceRestApi({
        url: 'https://zeromedics.com',
        consumerKey: process.env.CONSUMER_KEY,
        consumerSecret: process.env.COSNUMER_SECRET,
        version: 'wc/v3'
    })

    let res = woocommerce.get('orders', query)
    const order = res.data
    return order
}

module.exports = {getAllOrder, getOrder}