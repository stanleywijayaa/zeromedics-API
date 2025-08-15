const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
require('dotenv').config()

//Initialize the WooCommerce API
const woocommerce = new WooCommerceRestApi({
    url: 'https://zeromedics.com',
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    version: 'wc/v3'
});

//Get all orders and create pagination
async function getAllOrder(){
    let { orders, page } = getRawOrders()
    return { orders, page }
}

//Get all orders from WooCommerce
async function getRawOrders(){
    let page = 1
    let orders = []
    let data = []

    do{
        const res = await woocommerce.get('orders', {'per_page': 100, page})
        data = res.data
        orders = orders.concat(data)
        page++
    }
    //Iterate to the end of the data
    while (data.length === 100);
    page--

    return { orders, page }
}

//Filter the orders according to the query
async function getOrder(query){
    let {orders, page} = await getRawOrders()
    let filteredOrder = orders.filter(order => {
        return (
            order.id == query ||
            order.customer_id == query ||
            order.billing.first_name.includes(query) ||
            order.billing.last_name.includes(query) ||
            order.billing.email.includes(query)
        )
    })
    return { filteredOrder, page }
}

//Get the number of pages
async function getTotalPage(per_page){

}

module.exports = {getAllOrder, getOrder}