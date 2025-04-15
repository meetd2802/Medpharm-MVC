$(document).ready(function () {
    $("#appointmentForm").submit(function (event) {
        event.preventDefault(); // Prevent page reload

        var formData = new FormData(this); // Capture form data

        $.ajax({
            url: "/Appointment/BookAppointment", // Your MVC Controller Action
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response.success) {
                    $("#successPopup").fadeIn().delay(3000).fadeOut(); // Show popup for 3s
                    $("#appointmentForm")[0].reset(); // Reset form fields
                } else {
                    alert(response.message); // Show error message
                }
            },
            error: function () {
                alert("Error submitting the form. Please try again.");
            }
        });
    });
});
