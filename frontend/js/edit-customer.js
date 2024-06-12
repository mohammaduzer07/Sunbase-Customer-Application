

document.addEventListener('DOMContentLoaded', async function() {
            const params = new URLSearchParams(window.location.search);
            const id = params.get('id');
            const token = localStorage.getItem('token');

            const response = await fetch(`/api/customers/${id}`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

            if (response.ok) {
                const customer = await response.json();
                document.getElementById('customerId').value = customer.id;
                document.getElementById('firstName').value = customer.firstName;
                document.getElementById('lastName').value = customer.lastName;
                document.getElementById('street').value = customer.street;
                document.getElementById('address').value = customer.address;
                document.getElementById('city').value = customer.city;
                document.getElementById('state').value = customer.state;
                document.getElementById('email').value = customer.email;
                document.getElementById('phone').value = customer.phone;
            } else {
                alert('Failed to fetch customer details');
            }
        });

        document.getElementById('editCustomerForm').addEventListener('submit', async function(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            const customer = Object.fromEntries(formData.entries());

            const token = localStorage.getItem('token');
            const response = await fetch(`/api/customers/${customer.customerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(customer)
            });

            if (response.ok) {
                alert('Customer updated');
                window.location.href = 'customer-list.html';
            } else {
                alert('Failed to update customer');
            }
        });