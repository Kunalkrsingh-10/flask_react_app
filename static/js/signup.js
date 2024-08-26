document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;

    if (password !== confirmPassword) {
        const messageElement = document.getElementById('signup-message');
        messageElement.style.color = 'red';
        messageElement.textContent = 'Passwords do not match.';
        return;
    }

    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    })
    .then(response => response.json())
    .then(data => {
        const messageElement = document.getElementById('signup-message');
        if (data.message === 'User created successfully') {
            messageElement.style.color = 'green';
            messageElement.textContent = data.message;
        } else {
            messageElement.style.color = 'red';
            messageElement.textContent = data.message;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        const messageElement = document.getElementById('signup-message');
        messageElement.style.color = 'red';
        messageElement.textContent = 'An error occurred during signup.';
    });
});
