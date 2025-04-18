$(document).ready(function () {
    fetchMedicalUpdates();
});

function fetchMedicalUpdates() {
    $.ajax({
        url: "http://localhost:5071/api/MedicalUpdate/getallmedicalupdates",
        type: "GET",
        success: function (response) {
            console.log("API Response:", response);

            let updates = [];

            if (response && Array.isArray(response.dataList)) {
                updates = response.dataList;  // ✅ Extract the correct array
            } else {
                console.error("Expected an array but received:", response);
                alert("Invalid response format from API.");
                return;
            }

            console.log("Extracted Medical Updates:", updates);
            populateMedicalUpdatesTable(updates);  // ✅ Pass `updates`, not `response`
        },
        error: function (xhr, status, error) {
            console.error("Error fetching medical updates:", xhr.status, error);
            alert("Failed to load medical updates. Check API URL.");
        }
    });
}

function deleteMedicalUpdate(updateId) {
    if (!confirm("Are you sure you want to delete this medical update?")) return;

    $.ajax({
        url: `http://localhost:5071/api/MedicalUpdate/deletemedicalupdate/${updateId}`,
        type: "DELETE",
        success: function () {
            alert("Medical update deleted successfully!");
            fetchMedicalUpdates(); // Refresh table after deletion
        },
        error: function () {
            alert("Failed to delete medical update. Please try again.");
        }
    });
}

function editMedicalUpdate(updateId) {
    window.location.href = `/AdminPanel/Home/UpdateMedicalUpdate?id=${updateId}`;
}

function addMedicalUpdate() {
    window.location.href = `/AdminPanel/Home/AddMedicalUpdate`;
}

function populateMedicalUpdatesTable(updates) {  // ✅ Pass `updates` here
    let tableBody = $("#medicalUpdatesBody");
    tableBody.empty();

    console.log("Populating table with data:", updates);

    updates.forEach((update) => {
        let imageUrl = update.imagePath
            ? `http://localhost:5071${update.imagePath.startsWith('/') ? update.imagePath : '/' + update.imagePath}`
            : "http://localhost:5071/Images/default.png";

        console.log(`Rendering Image: ${imageUrl}`);

        let row = `<tr>
            <td>${update.id}</td>
            <td>${update.name}</td>
            <td><img src="${imageUrl}" onerror="this.onerror=null;this.src='/Images/default.png';" class="img-card" alt="${update.name}" style="width:50px;height:50px;"></td>
            <td>${update.description}</td>
            <td>
                <button class="buttondanger" onclick="deleteMedicalUpdate(${update.id})">DELETE</button>
                <button class="button" onclick="editMedicalUpdate(${update.id})">Update</button>
            </td>
        </tr>`;

        tableBody.append(row);
    });

    console.log("Table after population:", $("#medicalUpdatesTable").html()); // ✅ Debugging
}
