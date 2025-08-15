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

// create a new customer
const createCustomer = async (data) => {
    try{
        const response = await api.post('customers', data);
        return response.data;
    }catch(error) {
        console.error("Error creating customer: ", error);
    }
}

// retrieve all customers
const getAllCustomers = async (page = 1, perPage = 20) => {
    try {
        const response = await api.get(`customers?per_page=${perPage}&page=${page}`);

        return {
            customers: response.data, // array of customers for this page
            total: parseInt(response.headers['x-wp-total']) || 0, // total customers
            totalPages: parseInt(response.headers['x-wp-totalpages']) || 1 // total pages
        };
    } catch (error) {
        console.error("Error fetching customers:", error);
        throw error;
    }
};

// retrieve a customer by email or username
const getCustomer = async (email, username) => {
    try{
        //set filters based on provided parameters
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

//update a customer
const updateCustomer = async (email, data) => {
    try{
        //retrieve customer by email
        const customer = await getCustomer(email);
        if (!customer || customer.length === 0) {
            throw new Error("Customer not found");
        }
        //store the customer ID then update with provided data
        const customerId = customer[0].id;
        const response = await api.put(`customers/${customerId}`, data);
        return response.data;
    }catch(error){
        console.error("error updating a customer: ", error);
    }
}
// delete a customer
const deleteCustomer = async (email) => {
    try{
        //retrieve customer by email
        const customer = await getCustomer(email);
        if (!customer || customer.length === 0) {
            throw new Error("Customer not found");
        }
        //store the customer ID then delete respective customer
        const customerId = customer[0].id;
        const response = await api.delete(`customers/${customerId}`, { force: true });
        return response.data;
    }catch(error){
        console.error("error deleting a customer: ", error);
    }
}

module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer
};