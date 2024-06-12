document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Ensure elements with the specified IDs exist
    const usernameElement = document.getElementById('username');
    const passwordElement = document.getElementById('password');

    // Check if elements exist and then get their values
    if (usernameElement && passwordElement) {
        const username = usernameElement.value;
        const password = passwordElement.value;

        fetch('http://localhost:8080/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.token) {
                // Save the token in localStorage or cookie
                localStorage.setItem('token', data.token);
                window.location.href = 'customer-list.html'; // Redirect to customer list page
            } else {
                document.getElementById('errorMessage').textContent = 'Login failed';
            }
        })
        .catch(error => {
            document.getElementById('errorMessage').textContent = 'An error occurred';
            console.error('Error:', error);
        });
    } else {
        console.error('Username or Password input field not found.');
    }
});
