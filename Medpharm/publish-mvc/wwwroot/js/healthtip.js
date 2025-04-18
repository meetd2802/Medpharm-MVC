$(document).ready(function () {
    fetchHealthTips();  // ✅ Fetch health tips data
    setupSignalR();     // ✅ Set up real-time updates for health tips
});

function fetchHealthTips() {
    $.ajax({
        url: "http://localhost:5071/api/HealthTip/getallhealthtips", // Adjust API endpoint accordingly
        type: "GET",
        success: function (data) {
            console.log("API Response:", data); // ✅ Log full response

            let healthTips = [];

            if (Array.isArray(data)) {
                healthTips = data;
            } else if (data && typeof data === "object") {
                healthTips = data.healthTips || data.list || Object.values(data)[0];
            }

            if (!Array.isArray(healthTips)) {
                console.error("Expected an array but received:", data);
                alert("Invalid response format from API.");
                return;
            }

            console.log("Extracted Health Tips List:", healthTips); // ✅ Log extracted data

            populateHealthTipsTable(healthTips);
        },
        error: function (xhr, status, error) {
            console.error("Error fetching health tips:", xhr.status, error);
            alert("Failed to load health tips. Check API URL.");
        }
    });
}

function deleteHealthTip(healthTipID) {
    console.log("Attempting to delete health tip with ID:", healthTipID);
    if (!confirm("Are you sure you want to delete this health tip?")) {
        console.log("User canceled the deletion.");
        return;
    }

    $.ajax({
        url: `http://localhost:5071/api/HealthTip/deletehealthtip/${healthTipID}`,
        type: "DELETE",
        success: function (response) {
            console.log("Delete response:", response); // Debugging response
            alert("Health tip deleted successfully!");
            fetchHealthTips(); // Refresh table after deletion
            notifyHealthTipUpdate(); // Notify frontend to update
        },
        error: function (xhr, status, error) {
            console.error("Error during delete operation:", xhr.responseText, error); // Detailed error
            alert("Failed to delete health tip. Please try again.");
        }
    });
}



function editHealthTip(healthTipID) {
    window.location.href = `/AdminPanel/Home/UpdateHealthTips?id=${id}`;
}

function addHealthTip() {
    window.location.href = `/AdminPanel/Home/AddHealthTip`;
}

function populateHealthTipsTable(healthTips) {
    let tableBody = $("#healthTipsTableBody");
    tableBody.empty();

    healthTips.forEach((healthTip) => {
        let imageUrl = healthTip.imagePath
            ? `http://localhost:5071${healthTip.imagePath.startsWith('/') ? healthTip.imagePath : '/' + healthTip.imagePath}`
            : "http://localhost:5071/Images/default.png";

        console.log(`Image URL: ${imageUrl}`); // ✅ Debugging
        console.log(`Rendering Image: ${imageUrl}`); // ✅ Debugging Image URL

        let row = `<tr>
            <td>${healthTip.id}</td>
            <td><img src="${imageUrl}" onerror="this.onerror=null;" class="card-img-top" alt="${healthTip.title}" style="width:50px;height:50px;"></td>
            <td>${healthTip.category}</td>
            <td>${healthTip.title}</td>
            <td>${healthTip.description}</td>
            <td>${healthTip.datePosted}</td>
            <td>
                <!-- Use healthTip.healthTipID instead of healthTip.id -->
                <button class="buttondanger" onclick="deleteHealthTip(${healthTip.healthTipID})">DELETE</button>
                <button class="button" onclick="editHealthTip(${healthTip.healthTipID})">Update</button>
            </td>
        </tr>`;
        tableBody.append(row);
    });
}

// ✅ Function to notify frontend about health tip updates
function notifyHealthTipUpdate() {
    fetch("http://localhost:5071/api/HealthTips/notify", { method: "POST" })
        .catch(error => console.error("Error notifying frontend:", error));
}
