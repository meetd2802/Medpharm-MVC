let medicalUpdateData = {}; // Store medical update data globally

// ✅ Fetch medical update details (No formData needed here)
function fetchMedicalUpdateDetails(medicalUpdateId) {
    console.log("🔍 Fetching medical update details for ID:", medicalUpdateId);

    $.ajax({
        url: `http://localhost:5071/api/MedicalUpdate/getmedicalupdatebyid/${medicalUpdateId}`, // ✅ Fixed endpoint
        type: "GET",
        contentType: "application/json",
        success: function (response) {
            console.log("✅ Medical update data received:", response);

            if (response && response.data) {
                medicalUpdateData = response.data;

                // Populate form fields
                $("#medicalUpdateId").val(medicalUpdateData.id);
                $("#medicalUpdateName").val(medicalUpdateData.name);
                $("#medicalUpdateDescription").val(medicalUpdateData.description);
                $("#existingImagePath").val(medicalUpdateData.imagePath || "");

                // ✅ Display existing image
                let imageUrl = medicalUpdateData.imagePath && medicalUpdateData.imagePath.trim() !== ""
                    ? `http://localhost:5071/${medicalUpdateData.imagePath}`
                    : "/Images/default.png";

                $("#medicalUpdateImagePreview").attr("src", imageUrl);
            } else {
                console.error("❌ Medical update data not found in response:", response);
            }
        },
        error: function (xhr) {
            console.error("❌ Error fetching medical update details:", xhr.status, xhr.responseText);
        }
    });
}

function updateMedicalUpdate() {
    const medicalUpdateId = $("#medicalUpdateId").val();
    const medicalUpdateName = $("#medicalUpdateName").val();
    const medicalUpdateDescription = $("#medicalUpdateDescription").val();
    let imageFile = $("#medicalUpdateImage")[0].files[0];

    let formData = new FormData();
    formData.append("id", medicalUpdateId);
    formData.append("name", medicalUpdateName);
    formData.append("description", medicalUpdateDescription);

    if (imageFile) {
        formData.append("medicalUpdateImage", imageFile);
    }

    $.ajax({
        url: `http://localhost:5071/api/MedicalUpdate/updatemedicalupdate`,
        type: "PUT",
        processData: false,
        contentType: false,
        data: formData,
        success: function (response) {
            alert("✅ Medical Update updated successfully!");
            window.location.href = "/AdminPanel/Home/MedicalUpdates";
        },
        error: function (xhr) {
            alert("❌ Failed to update medical update.");
            console.error("Error Details:", xhr.status, xhr.responseText);
        }
    });
}

// ✅ Auto-fetch medical update details when page loads
$(document).ready(function () {
    console.log("🟢 updatemedicalupdate.js loaded!");

    const urlParams = new URLSearchParams(window.location.search);
    const medicalUpdateId = urlParams.get("id");

    if (!medicalUpdateId) {
        console.warn("⚠️ No medical update ID found in URL.");
        return;
    }

    console.log("📢 Medical Update ID found:", medicalUpdateId);
    fetchMedicalUpdateDetails(medicalUpdateId);
});
