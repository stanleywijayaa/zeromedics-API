// Read URL param if present
const urlParams = new URLSearchParams(window.location.search);
const queryParam = urlParams.get("query");
if (queryParam) {
    document.getElementById("query").value = queryParam;
    fetchOrders(queryParam);
}

document.getElementById("searchForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const query = document.getElementById("query").value.trim();
    if (query) {
        // Change URL without reloading
        window.history.pushState({}, "", `/orders?query=${encodeURIComponent(query)}`);
        fetchOrders(query);
    }
    else {
        fetchOrders(query);
    }
});

async function fetchOrders(query) {
    let fetchUrl = `/search/orders?query=${encodeURIComponent(query)}`
    if (!query) {
        fetchUrl = `/search/orders/all`
    }
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "Searching...";

    try {
        const res = await fetch(fetchUrl);

        if (!res.ok || !res) {
            resultsDiv.innerHTML = "No order found";
            return;
        }

        const data = await res.json();
        resultsDiv.innerHTML = "";

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