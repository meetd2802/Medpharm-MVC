$(document).ready(function () {
    $("form").submit(function (event) {
        event.preventDefault();

        // Gather form data
        let adminData = {
            fullName: $("#fname").val(),
            userName: $("#uname").val(),
            email: $("#email").val(),
            role: $("#role").val(),
            phone: $("#phone").val(),
            password: $("#password").val(),
        };
        
        // Log form data
        console.log("Form Data:", adminData);

        // AJAX request
        $.ajax({
            url: "http://localhost:5071/api/Admin/createadmin", // API endpoint
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(adminData), // Send as JSON string
            success: function (response) {
                console.log("Success:", response);
                alert("Admin created successfully!");
                window.location.href = "http://localhost:5062/Home/Admin"; // Redirect after success
            },
            error: function (xhr, status, error) {
                console.error("Error Status:", status);
                console.error("Error Message:", error);
                console.log("Response Text:", xhr.responseText);
                alert("An error occurred: " + xhr.responseText);
            }
        });
    });
});
