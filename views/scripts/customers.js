let currentPage = 1;
let totalPages = 1;
const rowsPerPage = 20;

window.onload = function () {
    fetchCustomers(currentPage);
};

// Search form
document.getElementById('customerForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const username = document.getElementById('username').value.trim();
    //empty search fields show all customers
    if (!email && !username) {
        currentPage = 1;
        fetchCustomers(currentPage);
        return;
    }
    const response = await fetch(`http://localhost:3000/customer/get`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username })
    });

    const data = await response.json();
    renderTable(Array.isArray(data) ? data : []);
    document.getElementById('pagination').style.display = 'none'; // Hide pagination when searching
});

// Show All button
document.getElementById('showAllBtn').addEventListener('click', function () {
    document.getElementById('email').value = '';
    document.getElementById('username').value = '';
    currentPage = 1;
    fetchCustomers(currentPage);
});

// Fetch customers from backend (server-side pagination)
async function fetchCustomers(page) {
    try {
        const response = await fetch(`http://localhost:3000/customer/all?page=${page}&per_page=${rowsPerPage}`);
        const data = await response.json();

        renderTable(data.customers);
        totalPages = data.totalPages;
        updatePagination();
    } catch (err) {
        console.error("Failed to fetch customers:", err);
    }
}

// Render table rows
function renderTable(customers) {
    const tbody = document.getElementById('customerTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    if (!customers || customers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5">No customers found</td></tr>';
        return;
    }

    customers.forEach(customer => {
        const row = `<tr>
            <td>${customer.id}</td>
            <td>${customer.first_name}</td>
            <td>${customer.last_name}</td>
            <td>${customer.username}</td>
            <td>${customer.email}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

// Update pagination controls
function updatePagination() {
    document.getElementById('pageInfo').innerText = `Page ${currentPage} of ${totalPages}`;
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === totalPages;
    document.getElementById('pagination').style.display = totalPages > 1 ? 'block' : 'none';
}

// Pagination buttons
document.getElementById('prevPage').addEventListener('click', function () {
    if (currentPage > 1) {
        currentPage--;
        fetchCustomers(currentPage);
    }
});

document.getElementById('nextPage').addEventListener('click', function () {
    if (currentPage < totalPages) {
        currentPage++;
        fetchCustomers(currentPage);
    }
});