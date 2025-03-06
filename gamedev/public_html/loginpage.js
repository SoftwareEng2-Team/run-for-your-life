// Dotenv configuration for storing the API url in an env file
import dotenv from 'dotenv';
dotenv.config({ path: '../public_html/.env' });

// Wait until the page is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // When page loads, hide error message regarding incorrect email / password
    const errorMessage = document.getElementById('login-error-message');
    errorMessage.style.visibility = "hidden";
    // Wait until the user submits the form
    document.querySelector("form").addEventListener("submit", async function (event) {
        event.preventDefault();

        // Grab the email and password text input values from the user
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        // API URL for the backend
        const API_URL = 'https://run-for-your-life-api.onrender.com';

        // Send a POST request to the API to login the user
        try {
            const response = await fetch(`${API_URL}/api/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // Send the email and password to the backend
                body: JSON.stringify({ email, password })
            });
    
            // If the login is successful (email and password match), redirect the user to the map page
            const data = await response.json();
            if (response.ok) {
                console.log("Successful login! Redirecting...");
                localStorage.setItem('user_id', data.user_id);
                window.location.href = "https://run-for-your-life.onrender.com/profile.html";
            // If login is not successful, display an error message to the user via HTML
            } else {
                errorMessage.style.visibility = "visible";
                console.log("Login failed: Incorrect Credentials");
            }
        // Display any other errors to the console
        } catch (error) {
            console.error("Error:", error);
        }
    });
});