$(document).ready(function () {
    fetchAppointments();
});

let currentPage = 1;
const itemsPerPage = 10;
let allAppointments = [];

function fetchAppointments() {
    $.ajax({
        url: "http://localhost:5071/api/Appointment/getallappointments",
        type: "GET",
        success: function (data) {
            console.log("API Response:", data);

            if (Array.isArray(data)) {
                allAppointments = data;
            } else if (data && typeof data === "object") {
                allAppointments = data.appointments || data.list || Object.values(data)[0];
            }

            if (!Array.isArray(allAppointments)) {
                console.error("Expected an array but received:", data);
                alert("Invalid response format from API.");
                return;
            }

            // Sort appointments by status
            allAppointments.sort(function(a, b) {
                const statusPriority = {
                    'booked': 2,
                    'pending': 1,
                    'done': 10
                };
                
                const statusA = (a.status || 'done').toLowerCase();
                const statusB = (b.status || 'done').toLowerCase();
                
                const priorityA = statusPriority[statusA] || 10;
                const priorityB = statusPriority[statusB] || 10;
                
                return priorityA - priorityB;
            });

            setupPagination();
            displayPage(currentPage);
        },
        error: function (xhr, status, error) {
            console.error("Error fetching appointments:", xhr.status, error);
            alert("Failed to load appointments. Check API URL.");
        }
    });
}

function setupPagination() {
    const totalPages = Math.ceil(allAppointments.length / itemsPerPage);
    const pagination = $("#pagination");
    pagination.empty();

    // Previous button
    pagination.append(`
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage - 1})" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
    `);

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        pagination.append(`
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
            </li>
        `);
    }

    // Next button
    pagination.append(`
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage + 1})" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    `);
}

function changePage(page) {
    if (page < 1 || page > Math.ceil(allAppointments.length / itemsPerPage)) return;
    currentPage = page;
    displayPage(currentPage);
    setupPagination();
}

function displayPage(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageAppointments = allAppointments.slice(startIndex, endIndex);
    populateTable(pageAppointments);
}

function deleteAppointment(appointmentId) {
    if (!confirm("Are you sure you want to delete this appointment?")) return;

    $.ajax({
        url: `http://localhost:5071/api/Appointment/deleteappointment/${appointmentId}`,
        type: "DELETE",
        success: function (response) {
            alert("Appointment deleted successfully!");
            fetchAppointments();
        },
        error: function () {
            alert("Failed to delete appointment. Please try again.");
        }
    });
}

function editAppointment(appointmentId) {
    window.location.href = `/AdminPanel/Home/UpdateAppointment?id=${appointmentId}`;
}

function addAppointment() {
    window.location.href = `/AdminPanel/Home/AddAppointment`;
}

function populateTable(appointments) {
    let tableBody = $("#appointmentsTable");
    tableBody.empty();

    appointments.forEach((appointment) => {
        let row = `<tr>
            <td>${appointment.appointmentId}</td>
            <td>${appointment.name}</td>
            <td>${appointment.diseases}</td>
            <td>${new Date(appointment.appointmentTime).toLocaleString()}</td>
            <td>${appointment.status || 'N/A'}</td>
            <td class="action-buttons">
                <button class="buttondanger" onclick="deleteAppointment(${appointment.appointmentId})">DELETE</button>
                <button class="button" onclick="editAppointment(${appointment.appointmentId})">Update</button>
            </td>
        </tr>`;
        tableBody.append(row);
    });
}
