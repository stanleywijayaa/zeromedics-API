window.onload = function() {
    fetchAllCustomers();
};

document.getElementById('customerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const response = await fetch('http://localhost:3000/customer/get', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username })
    });
    const data = await response.json();
    renderTable(Array.isArray(data) ? data : []);
});

document.getElementById('showAllBtn').addEventListener('click', function() {
    document.getElementById('email').value = '';
    document.getElementById('username').value = '';
    fetchAllCustomers();
});

async function fetchAllCustomers() {
    const response = await fetch('http://localhost:3000/customer/all');
    const data = await response.json();
    renderTable(data);
}

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