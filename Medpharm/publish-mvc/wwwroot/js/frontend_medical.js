$(document).ready(function () {
    fetchMedicalUpdates();
});

function fetchMedicalUpdates() {
    $.ajax({
        url: "http://localhost:5071/api/MedicalUpdate/getallmedicalupdates",
        type: "GET",
        success: function (response) {
            console.log("API Response:", response); // ✅ Debugging API response

            let updates = [];

            if (Array.isArray(response)) {
                updates = response; // Direct array response
            } else if (response && typeof response === "object") {
                updates = response.dataList || response.medicalUpdates || Object.values(response)[0];
            }

            if (!Array.isArray(updates) || updates.length === 0) {
                console.warn("No medical updates found.");
                $("#medicalUpdatesContainer").html("<p>No medical updates available.</p>");
                return;
            }

            console.log("Extracted Medical Updates List:", updates);
            updates.forEach(update => console.log("Update Image Path:", update.imagePath));

            populateMedicalUpdates(updates);
        },
        error: function (xhr, status, error) {
            console.error("Error fetching medical updates:", xhr.status, error);
            alert("Failed to load medical updates. Check API URL.");
        }
    });
}

function populateMedicalUpdates(updates) {
    let container = document.getElementById("medicalUpdatesContainer");
    container.innerHTML = ""; // Clear previous content

    updates.forEach(update => {
        let imageUrl = update.imagePath
            ? `http://localhost:5071${update.imagePath.startsWith('/') ? update.imagePath : '/' + update.imagePath}`
            : "http://localhost:5071/Images/default.png";

        let updateCard = `
            <div class="row mb-4">
                <div class="col-md-4">
                    <img src="${imageUrl}" onerror="this.onerror=null;this.src='/Images/default.png';" class="img-fluid rounded" alt="${update.title}">
                </div>
                <div class="col-md-8">
                    <h3>${update.name}</h3>
                    <p>${update.description || "No summary available."}</p>
                    </p>
                </div>
            </div>
        `;

        container.innerHTML += updateCard; // ✅ Append each medical update
    });
}

// Fetch and populate medical updates when the page loads
fetchMedicalUpdates();