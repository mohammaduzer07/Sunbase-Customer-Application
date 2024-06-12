//
//document.addEventListener('DOMContentLoaded', async function() {
//            const token = localStorage.getItem('token');
//            const response = await fetch('/api/customers', {
//                headers: {
//                    'Authorization': 'Bearer ' + token
//                }
//            });
//
//            if (response.ok) {
//                const customers = await response.json();
//                const customerTable = document.getElementById('customerTable');
//
//                customers.forEach(customer => {
//                    const row = document.createElement('tr');
//                    row.innerHTML = `
//                        <td>${customer.firstName}</td>
//                        <td>${customer.lastName}</td>
//                        <td>${customer.address}</td>
//                        <td>${customer.city}</td>
//                        <td>${customer.state}</td>
//                        <td>${customer.email}</td>
//                        <td>${customer.phone}</td>
//                        <td>
//                            <button onclick="editCustomer(${customer.id})">Edit</button>
//                            <button onclick="deleteCustomer(${customer.id})">Delete</button>
//                        </td>
//                    `;
//                    customerTable.appendChild(row);
//                });
//            } else {
//                alert('Failed to fetch customers!');
//            }
//        });
//
//        async function editCustomer(id) {
//            window.location.href = `edit-customer.html?id=${id}`;
//        }
//
//        async function deleteCustomer(id) {
//            const token = localStorage.getItem('token');
//            const response = await fetch(`/api/customers/${id}`, {
//                method: 'DELETE',
//                headers: {
//                    'Authorization': 'Bearer ' + token
//                }
//            });
//
//            if (response.ok) {
//                alert('Customer deleted');
//                window.location.reload();
//            } else {
//                alert('Failed to delete customer');
//            }
//        }
//
//        document.getElementById('syncButton').addEventListener('click', async function() {
//            const token = localStorage.getItem('token');
//            const response = await fetch('https://qa.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list', {
//                method: 'GET',
//                headers: {
//                    'Authorization': 'Bearer ' + token
//                }
//            });
//
//            if (response.ok) {
//                const customers = await response.json();
//                for (const customer of customers) {
//                    await fetch('/api/customers', {
//                        method: 'POST',
//                        headers: {
//                            'Content-Type': 'application/json',
//                            'Authorization': 'Bearer ' + token
//                        },
//                        body: JSON.stringify(customer)
//                    });
//                }
//                alert('Customers synchronized');
//                window.location.reload();
//            } else {
//                alert('Failed to sync customers');
//            }
//        });

document.addEventListener('DOMContentLoaded', async function() {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('No token found. Please log in.');
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/api/customers', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        if (response.ok) {
            const page = await response.json(); // Parse the response as JSON
            console.log('Page fetched:', page);

            const customers = page.content; // Extract the customer list from the page

            const customerTable = document.getElementById('customerTable');
            customers.forEach(customer => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${customer.firstName}</td>
                    <td>${customer.lastName}</td>
                    <td>${customer.address}</td>
                    <td>${customer.city}</td>
                    <td>${customer.state}</td>
                    <td>${customer.email}</td>
                    <td>${customer.phone}</td>
                    <td>
                        <button onclick="editCustomer(${customer.id})">Edit</button>
                        <button onclick="deleteCustomer(${customer.id})">Delete</button>
                    </td>
                `;
                customerTable.appendChild(row);
            });
        } else {
            console.error('Failed to fetch customers', response.status, response.statusText);
            alert('Failed to fetch customers!');
        }
    } catch (error) {
        console.error('Error fetching customers', error);
        alert('Error fetching customers');
    }
});

async function editCustomer(id) {
    window.location.href = `edit-customer.html?id=${id}`;
}

async function deleteCustomer(id) {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/api/customers/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    if (response.ok) {
        alert('Customer deleted');
        window.location.reload();
    } else {
        alert('Failed to delete customer');
    }
}

document.getElementById('syncButton').addEventListener('click', async function() {
    const token = localStorage.getItem('token');
    const response = await fetch('https://qa.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    if (response.ok) {
        const customers = await response.json();
        for (const customer of customers) {
            await fetch('http://localhost:8080/api/customers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(customer)
            });
        }
        alert('Customers synchronized');
        window.location.reload();
    } else {
        alert('Failed to sync customers');
    }
});

