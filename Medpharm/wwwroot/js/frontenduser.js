$(document).ready(function () {
    // Check if the user is logged in
    function checkLoginStatus() {
        let userName = sessionStorage.getItem("userName"); // ✅ Only sessionStorage
        if (userName) {
            $("#loginBtn").hide();
            $("#logoutBtn").show();
            $(".btn-primary").prop("disabled", false); // Enable booking
        } else {
            $("#loginBtn").show();
            $("#logoutBtn").hide();
            $(".btn-primary").prop("disabled", true); // Disable booking
        }
    }

    checkLoginStatus(); // Run on page load

    // Handle login form submission
    $("#loginForm").submit(function (event) {
        event.preventDefault();

        let loginData = {
            username: $("#name").val(),
            password: $("#password").val()
        };

        console.log("🔐 Sending login data:", loginData);

        $.ajax({
            url: "http://localhost:5071/api/Admin/login",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(loginData),
            success: function (response) {
                console.log("✅ Login API response:", response);

                if (response.success && response.admin) {
                    const { id, userName, email, role, phone } = response.admin; // ✅ include phone

                    // ✅ Store all required info in sessionStorage
                    sessionStorage.setItem("adminId", id);
                    sessionStorage.setItem("userName", userName);
                    sessionStorage.setItem("email", email);
                    sessionStorage.setItem("phone", phone);


                    // Update UI
                    $("#loginBtn").hide();
                    $("#logoutBtn").show();

                    alert("Login Successful!");
                    window.location.href = "/Home/Index";
                } else {
                    alert("Invalid username or password.");
                }
            },
        });
    });

    // Handle Logout
    $("#logoutBtn").click(function () {
        // ✅ Clear sessionStorage only
        sessionStorage.clear();

        // Call logout API
        $.ajax({
            url: "http://localhost:5071/api/Admin/logout",
            type: "POST",
            success: function() {
                console.log("✅ Logged out successfully");
            },
            error: function() {
                console.error("❌ Logout API error");
            },
            complete: function() {
                // Redirect regardless of API success
                window.location.href = "/Home/Login";
            }
        });
    });

    // Prevent appointment booking if not logged in
    $("#appointmentForm").submit(function (event) {
        if (!sessionStorage.getItem("userName")) {
            alert("You must be logged in to book an appointment.");
            event.preventDefault();
        }
    });

    // Handle Forgot Password
    $("#forgotPasswordLink").click(function(event) {
        event.preventDefault();

        let username = $("#name").val();
        if (!username) {
            alert("Please enter your username first.");
            return;
        }

        $.ajax({
            url: "http://localhost:5071/api/Admin/forgotpassword",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ username: username }),
            success: function(response) {
                if (response.success) {
                    alert("Password has been sent to your registered email.");
                } else {
                    alert("Failed to process request: " + (response.message || "Unknown error"));
                }
            },
            error: function(xhr) {
                console.error("❌ Forgot password error:", xhr.responseText);
                alert("Failed to process request. Please try again.");
            }
        });
    });
});
