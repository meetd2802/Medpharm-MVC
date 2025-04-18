$(document).ready(function () {
    fetchDoctors();
    setupSignalR(); // ✅ Set up real-time updates
});

function fetchDoctors() {
    $.ajax({
        url: "http://localhost:5071/api/Doctor/getalldoctors",
        type: "GET",
        success: function (data) {
            console.log("API Response:", data); // ✅ Log full response

            let doctors = [];

            if (Array.isArray(data)) {
                doctors = data;
            } else if (data && typeof data === "object") {
                doctors = data.doctors || data.list || Object.values(data)[0];
            }

            if (!Array.isArray(doctors)) {
                console.error("Expected an array but received:", data);
                alert("Invalid response format from API.");
                return;
            }

            console.log("Extracted Doctors List:", doctors); // ✅ Log extracted data
            doctors.forEach(doc => console.log("Doctor Image Path:", doc.imagePath)); // ✅ Log image paths

            populateDoctorTable(doctors);
        },
        error: function (xhr, status, error) {
            console.error("Error fetching doctors:", xhr.status, error);
            alert("Failed to load doctors. Check API URL.");
        }
    });
}

function deleteDoctor(doctorId) {
    if (!confirm("Are you sure you want to delete this doctor?")) return;

    $.ajax({
        url: `http://localhost:5071/api/Doctor/deletedoctor/${doctorId}`,
        type: "DELETE",
        success: function () {
            alert("Doctor deleted successfully!");
            fetchDoctors(); // Refresh table after deletion
            notifyDoctorUpdate(); // ✅ Notify frontend to update
        },
        error: function () {
            alert("Failed to delete doctor. Please try again.");
        }
    });
}

function editDoctor(doctorId) {
    window.location.href = `/AdminPanel/Home/UpdateDoctor?id=${doctorId}`;
}

function addDoctor() {
    window.location.href = `/AdminPanel/Home/AddDoctor`;
}

function populateDoctorTable(doctors) {
    let tableBody = $("#doctorsTable");
    tableBody.empty();

    doctors.forEach((doctor) => {
        let imageUrl = doctor.imagePath
            ? `http://localhost:5071${doctor.imagePath.startsWith('/') ? doctor.imagePath : '/' + doctor.imagePath}`
            : "http://localhost:5071/Images/default.png";

        console.log(`Image URL: ${imageUrl}`); // ✅ Debugging
        console.log(`Rendering Image: ${imageUrl}`); // ✅ Debugging Image URL

        let row = `<tr>
            <td>${doctor.id}</td>
            <td><img src="${imageUrl}" onerror="this.onerror=null;this.src='/Images/default.png';" class="card-img-top" alt="${doctor.name}" style="width:50px;height:50px;"></td>
            <td>${doctor.name}</td>
            <td>${doctor.speciality}</td>
            <td>
                <button class="buttondanger" onclick="deleteDoctor(${doctor.id})">DELETE</button>
                <button class="button" onclick="editDoctor(${doctor.id})">Update</button>
            </td>
        </tr>`;
        tableBody.append(row);
    });
}


// ✅ Function to notify frontend about doctor updates
function notifyDoctorUpdate() {
    fetch("http://localhost:5071/api/Doctor/notify", { method: "POST" })
        .catch(error => console.error("Error notifying frontend:", error));
}
