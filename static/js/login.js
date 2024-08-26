document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        const messageElement = document.getElementById('login-message');
        if (data.access_token) {
            messageElement.style.color = 'green';
            messageElement.textContent = 'Login successful!';
            localStorage.setItem('access_token', data.access_token);
            // Redirect to dashboard or another page
            window.location.href = '/dashboard';
        } else {
            messageElement.style.color = 'red';
            messageElement.textContent = data.error;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        const messageElement = document.getElementById('login-message');
        messageElement.style.color = 'red';
        messageElement.textContent = 'An error occurred during login.';
    });
});

