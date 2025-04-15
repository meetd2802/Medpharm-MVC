$(document).ready(function () {
    fetchAppointments();
});

function fetchAppointments() {
    $.ajax({
        url: "http://localhost:5071/api/Appointment/getallappointments", // API URL
        type: "GET",
        success: function (data) {
            console.log("API Response:", data); // Debug response

            let appointments = [];

            if (Array.isArray(data)) {
                appointments = data; // If API returns an array, use it
            } else if (data && typeof data === "object") {
                appointments = data.appointments || data.list || Object.values(data)[0];
            }

            if (!Array.isArray(appointments)) {
                console.error("Expected an array but received:", data);
                alert("Invalid response format from API.");
                return;
            }

            populateTable(appointments); // Call function to display data
        },
        error: function (xhr, status, error) {
            console.error("Error fetching appointments:", xhr.status, error);
            alert("Failed to load appointments. Check API URL.");
        }
    });
}

function deleteAppointment(appointmentId) {
    if (!confirm("Are you sure you want to delete this appointment?")) return;

    $.ajax({
        url: `http://localhost:5071/api/Appointment/deleteappointment/${appointmentId}`, // API URL
        type: "DELETE",
        success: function (response) {
            alert("Appointment deleted successfully!");
            fetchAppointments(); // Refresh table after deletion
        },
        error: function () {
            alert("Failed to delete appointment. Please try again.");
        }
    });
}

function editAppointment(appointmentId) {
    // Redirect to UpdateAppointment page with appointmentId in the query string
    window.location.href = `/AdminPanel/Home/UpdateAppointment?id=${appointmentId}`;
}

function addAppointment() {
    // Redirect to AddAppointment page
    window.location.href = `/AdminPanel/Home/AddAppointment`;
}

function populateTable(appointments) {
    let tableBody = $("#appointmentsTable");
    tableBody.empty(); // Clear old data

    appointments.forEach((appointment) => {
        let row = `<tr>
            <td>${appointment.appointmentId}</td>
            <td>${appointment.name}</td>
            <td>${appointment.diseases}</td>
            <td>${new Date(appointment.appointmentTime).toLocaleString()}</td>
            <td>
                <button class="buttondanger" onclick="deleteAppointment(${appointment.appointmentId})">DELETE</button>
                <button class="button" onclick="editAppointment(${appointment.appointmentId})">Update</button>
            </td>
        </tr>`;
        tableBody.append(row);
    });
}
