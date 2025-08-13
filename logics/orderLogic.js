import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

export async function getAllOrder(){
    const woocommerce = new WooCommerceRestApi({
        url: 'https://zeromedics.com',
        consumerKey: consumer_key,
        consumerSecret: consumer_secret,
        version: 'wc/v3'
    })

    let res = woocommerce.get('orders')
    const order = res.data
    return order
}

export async function getOrder(query){

}