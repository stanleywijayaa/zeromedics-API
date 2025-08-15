// Read URL param if present
const urlParams = new URLSearchParams(window.location.search);
const queryParam = urlParams.get("query");
const perPageParam = urlParams.get("per_page");
let orders = []
let currentPage = 1
let perPage = document.getElementById("per_page").value

//Directly fetch data when there is query in the url
if (queryParam) {
    document.getElementById("query").value = queryParam;
    fetchOrders(queryParam);
}
if (perPageParam) {
    document.getElementById("per_page").value = perPageParam;
    perPage = perPageParam
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
    const currentPage = 1
    //Show searching text
    const loader = document.getElementById("loader");
    loader.classList.remove("hidden"); // show loader

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
        orders = data.orders
        resultsDiv.innerHTML = "";

        //Iterate through the order list and output html list
        Array.isArray(orders) ? orders : [orders];
        renderPage(currentPage)
        renderPagination(currentPage)
        loader.classList.add("hidden");
    } catch (err) {
        resultsDiv.innerHTML = `<p style="color:red;">${err.message}</p>`;
    }
}

function renderPage(currentPage) {
    const per_page = parseInt(document.getElementById("per_page").value, 10); // force number
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    const start = (currentPage - 1) * per_page;
    const end = start + per_page;
    const pageItems = orders.slice(start, end);

    pageItems.forEach(order => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h3>Order ID: ${order.id}</h3>
            <p><strong>Customer:</strong> ${order.billing.first_name} ${order.billing.last_name}</p>
            <p><strong>Email:</strong> ${order.billing.email}</p>
            <p><strong>Items:</strong></p>
            <ul class="items">
                ${order.line_items.map(item => `<li>${item.name}</li>`).join("")}
            </ul>
        `;
        resultsDiv.appendChild(card);
    });

    renderPagination(currentPage, per_page); // keep pagination in sync
}

function renderPagination(currentPage, per_page) {
    const paginationDiv = document.getElementById("pagination");
    const paginationDiv2 = document.getElementById("pagination_bot");
    paginationDiv.innerHTML = "";
    paginationDiv2.innerHTML = "";
    const totalPages = Math.ceil(orders.length / per_page);

    const createButton = (label, page, disabled = false, active = false) => {
        const btn = document.createElement("button");
        btn.textContent = label;
        if (active) btn.classList.add("active");
        if (disabled) btn.disabled = true;
        btn.addEventListener("click", () => renderPage(page));
        return btn;
    };

    // Prev button
    paginationDiv.appendChild(createButton("Prev", currentPage - 1, currentPage === 1));
    paginationDiv2.appendChild(createButton("Prev", currentPage - 1, currentPage === 1));

    // Calculate start/end range for page numbers
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    // Always show first page + ellipses if needed
    if (startPage > 1) {
        paginationDiv.appendChild(createButton(1, 1, false, currentPage === 1));
        paginationDiv2.appendChild(createButton(1, 1, false, currentPage === 1));
        if (startPage > 2) {
            const dots = document.createElement("span");
            dots.textContent = "...";
            paginationDiv.appendChild(dots);
            const dots2 = document.createElement("span");
            dots2.textContent = "...";
            paginationDiv2.appendChild(dots2);
        }
    }

    // Middle page numbers
    for (let i = startPage; i <= endPage; i++) {
        paginationDiv.appendChild(createButton(i, i, false, i === currentPage));
        paginationDiv2.appendChild(createButton(i, i, false, i === currentPage));
    }

    // Always show last page + ellipses if needed
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const dots = document.createElement("span");
            dots.textContent = "...";
            paginationDiv.appendChild(dots);
            const dots2 = document.createElement("span");
            dots2.textContent = "...";
            paginationDiv2.appendChild(dots2);
        }
        paginationDiv.appendChild(createButton(totalPages, totalPages, false, currentPage === totalPages));
        paginationDiv2.appendChild(createButton(totalPages, totalPages, false, currentPage === totalPages));
    }

    // Next button
    paginationDiv.appendChild(createButton("Next", currentPage + 1, currentPage === totalPages));
    paginationDiv2.appendChild(createButton("Next", currentPage + 1, currentPage === totalPages));
}