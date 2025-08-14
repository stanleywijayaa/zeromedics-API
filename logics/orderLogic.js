const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
require('dotenv').config()

const woocommerce = new WooCommerceRestApi({
        url: 'https://zeromedics.com',
        consumerKey: process.env.CONSUMER_KEY,
        consumerSecret: process.env.CONSUMER_SECRET,
        version: 'wc/v3'
    })

async function getAllOrder(){
    console.log('getting all order from wc')
    let page = 1
    let orders = []
    let data = []

    do{
        const res = await woocommerce.get('orders', {'per_page': 100, page})
        data = res.data
        orders = orders.concat(data)
        page++
    }
    while (data.length === 100);

    return orders
}

async function getOrder(query){
    console.log('getting an order from wc')
    console.log(query)
    let orders = await getAllOrder()
    let filteredOrder = orders.filter(order => {
        return (
            order.id == query ||
            order.customer_id == query ||
            order.billing.first_name.includes(query) ||
            order.billing.last_name.includes(query) ||
            order.billing.email.includes(query)
        )
    })
    return filteredOrder
}

module.exports = {getAllOrder, getOrder}