const WooCommerceAPI = require('@woocommerce/woocommerce-rest-api').default;
const dotenv = require('dotenv');
dotenv.config();

const api = new WooCommerceAPI({
    url: 'https://zeromedics.com',
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    version: 'wc/v3'
});

const getAllProducts = async (req, res) => {
    try {
        const response = await api.get('products');
        res.json(response.data)
    }
    catch(error){
        console.error(error)
    }
}

const getProducts = async (req, res) => {
    try{
        const {id} = req.params;
        const response = await api.get(`products/${id}`);
        res.json(response.data);
    }
    catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
} 

module.exports = {
    getAllProducts,
    getProducts
}