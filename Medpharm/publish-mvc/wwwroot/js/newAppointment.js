document.addEventListener("DOMContentLoaded", function () {
    const appointmentForm = document.getElementById("appointmentForm");

    if (appointmentForm) {
        appointmentForm.addEventListener("submit", async function (event) {
            event.preventDefault(); // Prevent default form submission

            const formData = new FormData(appointmentForm); // Collect form data

            try {
                const response = await fetch("/AdminPanel/AddAppointment/SubmitAppointment", {
                    method: "POST",
                    body: formData // ✅ FormData automatically handles file uploads
                });

                const result = await response.json();
                
                
                
                if (response.ok && result.success) {
                    showSuccessPopup("Appointment booked successfully!");
                    window.location.href = "AdminPanel/Home/FrontDesk";
                    appointmentForm.reset(); // Reset form after successful submission
                } else {
                    console.error("Error:", result.error);
                    alert("Failed to book appointment. Please try again.");
                }
            } catch (error) {
                console.error("Request failed:", error);
                alert("An error occurred while submitting the appointment.");
            }
        });
    } else {
        console.error("Appointment form not found!");
    }
});

// ✅ Function to show success popup
function showSuccessPopup(message) {
    const successPopup = document.getElementById("successPopup");
    if (successPopup) {
        successPopup.textContent = message;
        successPopup.style.display = "block";
        setTimeout(() => {
            successPopup.style.display = "none";
        }, 3000);
    }
}
