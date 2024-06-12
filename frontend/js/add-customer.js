

document.getElementById('addCustomerForm').addEventListener('submit', async function(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            const customer = Object.fromEntries(formData.entries());

            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/api/customers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(customer)
            });

            if (response.ok) {
                alert('Customer added');
                window.location.href = 'customer-list.html';
            } else {
                alert('Failed to add customer');
            }
        });