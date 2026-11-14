// Demo Login Credentials
const demoUsername = "student";
const demoPassword = "libfind123";

// Get HTML Elements
const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const eyeIcon = document.getElementById("eyeIcon");

// Show / Hide Password
togglePassword.addEventListener("click", function () {

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.textContent = "🙈";
        togglePassword.setAttribute("aria-label", "Hide password");
        togglePassword.setAttribute("aria-pressed", "true");
    } else {
        passwordInput.type = "password";
        eyeIcon.textContent = "👁️";
        togglePassword.setAttribute("aria-label", "Show password");
        togglePassword.setAttribute("aria-pressed", "false");
    }

});

// Login Validation
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = passwordInput.value;

    if (username === demoUsername && password === demoPassword) {

        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("username", username);


        window.location.href = "dashboard.html";

    } else {

        errorMessage.classList.remove("d-none");
        errorMessage.textContent =
            "Invalid username or password. Please try again.";

    }
});
