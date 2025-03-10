// Wait until the page is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // When page loads, hide all errors
    const passwordError = document.getElementById('password-error');
    passwordError.style.visibility = "hidden";
    const accountError = document.getElementById('account-error');
    accountError.style.visibility = "hidden";
    // Wait until the user submits the form
    document.querySelector("form").addEventListener("submit", async function (event) {
        event.preventDefault();

        // Grab the text input values from the user
        const email = document.getElementById("email").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const confirm_password = document.getElementById("confirm_password").value;
        // API URL for the backend
        const API_URL = "https://run-for-your-life-api.onrender.com";

        // If the passwords match, send a POST request to the API
        if (password === confirm_password) {
            passwordError.style.visibility = "hidden";
            try {
                // Send the above entered data to the database function to create a new user
                const response = await fetch(`${API_URL}/api/users/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    // Send the username, email, passowr
                    body: JSON.stringify({ username, email, password })
                });
    
                // If the account was succesfully created, redirect the user to the map page
                const data = await response.json();
                if (response.ok) {
                    console.log("User created!");
                    window.location.href = "https://run-for-your-life.onrender.com/";
                // If the register account did not work, display error message to the user
                } else {
                    accountError.style.visibility = "visible";
                    console.log("Error creating user");
                }
            // Display any other errors to the console
            } catch (error) {
                console.error("Error:", error);
            }
        // If the two passwords do not match, display an error message
        } else {
            passwordError.style.visibility = "visible";
        }
    });
});