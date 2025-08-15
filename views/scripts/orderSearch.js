// Read URL param if present
const urlParams = new URLSearchParams(window.location.search);
const queryParam = urlParams.get("query");

//Directly fetch data when there is query in the url
if (queryParam) {
    document.getElementById("query").value = queryParam;
    fetchOrders(queryParam);
}

//Search button event handler
document.getElementById("searchForm").addEventListener("submit", function (e) {
    e.preventDefault();
    //Get the search value
    const query = document.getElementById("query").value.trim();
    //Change the url
    if (query) {
        // Change URL without reloading
        window.history.pushState({}, "", `/search/orders?query=${encodeURIComponent(query)}`);
        fetchOrders(query);
    }
    //Dont change the url when showing all orders
    else {
        fetchOrders(query);
    }
});

//Fetch the orders
async function fetchOrders(query) {
    //Assign the url with query
    let fetchUrl = `/orders?query=${encodeURIComponent(query)}`
    //Fetch all orders when the query is empty
    if (!query) {
        fetchUrl = `/orders/all`
    }

    const resultsDiv = document.getElementById("results");
    //Show searching text
    resultsDiv.innerHTML = "Searching...";

    try {
        //Get the order list
        const res = await fetch(fetchUrl);

        //Check for empty list (no order found)
        if (!res.ok || !res) {
            resultsDiv.innerHTML = "No order found";
            return;
        }

        //Retrieve the data into json
        const data = await res.json();
        resultsDiv.innerHTML = "";

        //Iterate through the order list and make html format
        (Array.isArray(data) ? data : [data]).forEach(order => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                        <h3>Order ID: ${order.id}</h3>
                        <p><strong>Customer:</strong> ${order.billing.first_name + ' ' + order.billing.last_name}</p>
                        <p><strong>Email:</strong> ${order.billing.email}</p>
                        <p><strong>Items:</strong></p>
                        <ul class="items">
                            ${order.line_items.map(item => `<li>${item.name}</li>`).join("")}
                        </ul>
                    `;
            resultsDiv.appendChild(card);
        });

    } catch (err) {
        resultsDiv.innerHTML = `<p style="color:red;">${err.message}</p>`;
    }
}