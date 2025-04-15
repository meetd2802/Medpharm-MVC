$(document).ready(function () {
    // Only run this script on the UpdateAppointment page
    if (!window.location.pathname.includes("UpdateAppointment")) {
        return; // Stop script execution if it's not the correct page
    }

    const urlParams = new URLSearchParams(window.location.search);
    const appointmentId = urlParams.get("id");

    if (!appointmentId) {
        console.warn("No appointment ID found in URL."); // Use console.warn instead of alert
        return;
    }

    fetchAppointmentDetails(appointmentId);
});

function fetchAppointmentDetails(appointmentId) {
    $.ajax({
        url: `http://localhost:5071/api/Appointment/getappointment/${appointmentId}`,
        type: "GET",
        success: function (data) {
            console.log("API Response:", data);

            if (!data) {
                alert("Appointment not found.");
                return;
            }

            $("#appointmentId").val(data.appointmentId);
            $("#name").val(data.name);
            $("#diseases").val(data.diseases);

            console.log("Raw appointmentTime from API:", data.appointmentTime);

            if (!data.appointmentTime || isNaN(new Date(data.appointmentTime))) {
                console.error("Invalid appointmentTime received:", data.appointmentTime);
                alert("Error: Appointment time is invalid.");
                return;
            }

            $("#appointmentTime").val(new Date(data.appointmentTime).toISOString().slice(0, 16));
        },
        error: function () {
            alert("Error fetching appointment details.");
        }
    });
}


function updateAppointment() {
    const appointmentId = $("#appointmentId").val();
    const updatedData = {
        appointmentId: appointmentId,
        name: $("#name").val(),
        diseases: $("#diseases").val(),
        appointmentTime: new Date($("#appointmentTime").val()).toISOString(),
    };

    $.ajax({
        url: `http://localhost:5071/api/Appointment/updateappointment/${appointmentId}`,
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(updatedData),
        success: function (response) {
            alert("Appointment updated successfully!");
            window.location.href = "/AdminPanel/FrontDesk"; // Redirect back to list
        },
        error: function (xhr, status, error) {
            console.error("Update failed:", xhr.responseText);
            alert("Failed to update appointment.");
        }
    });
}

