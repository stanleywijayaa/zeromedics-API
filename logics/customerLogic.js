// WooCommerce customer API 
const WooCommerceAPI = require('@woocommerce/woocommerce-rest-api').default;
const dotenv = require('dotenv');
dotenv.config();

const api = new WooCommerceAPI({
    url: 'https://zeromedics.com',
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    version: 'wc/v3'
});

const getAllCustomers = async () => {
    try {
        const response = await api.get('customers');
        return response.data;
    }
    catch(error){
        console.error(error)
    }
}

const getCustomer = async (email, username) => {
    try{
        // Set filters based on provided parameters
        const params = {};
        if (email) params.email = email;
        if (username) params.search = username;

        const response = await api.get('customers', params);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching customer:", error);
        throw error;
    }
} 

module.exports = {
    getAllCustomers,
    getCustomer
};