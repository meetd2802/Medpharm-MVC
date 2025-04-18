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

function populateDoctorTable(doctors) {
    let doctorContainer = document.getElementById("doctorCards");
    doctorContainer.innerHTML = ""; // Clear existing content

    doctors.forEach(doctor => {
        let imageUrl = doctor.imagePath
            ? `http://localhost:5071${doctor.imagePath.startsWith('/') ? doctor.imagePath : '/' + doctor.imagePath}`
            : "http://localhost:5071/Images/default-doctor.png";

        let doctorCard = `
            <div class="card">
                <img src="${imageUrl}" onerror="this.onerror=null;this.src='/Images/default-doctor.png';" class="card-img-top" alt="${doctor.name}">
                <div class="card-body">
                    <h5 class="card-title">${doctor.name}</h5>
                    <p class="card-text"><strong>Specialty:</strong> ${doctor.speciality}</p>
                    <p class="card-text">${doctor.description || "Expert in their field with years of experience."}</p>
                    <button class="btn btn-primary">Book Appointment</button>
                </div>
            </div>
        `;

        doctorContainer.innerHTML += doctorCard;
    });
}