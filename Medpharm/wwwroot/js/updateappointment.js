let appointmentData = {}; // Store full appointment data

function fetchAppointmentDetails(appointmentId) {
    $.ajax({
        url: `http://localhost:5071/api/Appointment/getappointment/${appointmentId}`,
        type: "GET",
        success: function (data) {
            if (!data || !data.dataList || data.dataList.length === 0) {
                alert("Appointment not found.");
                return;
            }

            appointmentData = data.dataList[0]; // Store full object

            $("#appointmentId").val(appointmentData.appointmentId);
            $("#name").val(appointmentData.name);
            $("#diseases").val(appointmentData.diseases);
            $("#appointmentTime").val(new Date(appointmentData.appointmentTime).toISOString().slice(0, 16));
            $("#status").val(appointmentData.status); // Set the status in dropdown
        },
        error: function () {
            alert("Error fetching appointment details.");
        }
    });
}

function updateAppointment() {
    // Update only the necessary fields while keeping others unchanged
    appointmentData.name = $("#name").val();
    appointmentData.diseases = $("#diseases").val();
    appointmentData.status = $("#status").val(); // Get status from dropdown
    appointmentData.appointmentTime = $("#appointmentTime").val()
        ? new Date($("#appointmentTime").val()).toISOString()
        : appointmentData.appointmentTime;

    $.ajax({
        url: "http://localhost:5071/api/Appointment/updateappointment",
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(appointmentData), // Send full data object
        success: function (response) {
            alert("Appointment updated successfully!");
            window.location.href = "/AdminPanel/Home/FrontDesk";
        },
        error: function (xhr) {
            alert("Failed to update appointment. Please try again.");
            console.error(xhr.responseText);
        }
    });
}
