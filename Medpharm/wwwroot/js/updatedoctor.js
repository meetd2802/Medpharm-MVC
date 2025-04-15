let doctorData = {}; // Store doctor data globally

// ✅ Fetch doctor details (No formData needed here)
function fetchDoctorDetails(doctorId) {
    console.log("🔍 Fetching doctor details for ID:", doctorId);

    $.ajax({
        url: `http://localhost:5071/api/Doctor/getdoctorbyid/${doctorId}`, // ✅ Fixed endpoint
        type: "GET",
        contentType: "application/json",
        success: function (response) {
            console.log("✅ Doctor data received:", response);

            if (response && response.data) {
                doctorData = response.data;

                // Populate form fields
                $("#doctorId").val(doctorData.id);
                $("#doctorName").val(doctorData.name);
                $("#speciality").val(doctorData.speciality);
                $("#existingImagePath").val(doctorData.imagePath || "");

                // ✅ Display existing image
                let imageUrl = doctorData.imagePath && doctorData.imagePath.trim() !== ""
                    ? `http://localhost:5071/${doctorData.imagePath}`
                    : "/Images/default.png";

                $("#doctorImagePreview").attr("src", imageUrl);
            } else {
                console.error("❌ Doctor data not found in response:", response);
            }
        },
        error: function (xhr) {
            console.error("❌ Error fetching doctor details:", xhr.status, xhr.responseText);
        }
    });
}

function updateDoctor() {
    const doctorId = $("#doctorId").val();
    const doctorName = $("#doctorName").val();
    const speciality = $("#speciality").val();
    let imageFile = $("#doctorImage")[0].files[0];

    let formData = new FormData();
    formData.append("id", doctorId);
    formData.append("name", doctorName);
    formData.append("speciality", speciality);

    if (imageFile) {
        formData.append("doctorImage", imageFile);
    }

    $.ajax({
        url: `http://localhost:5071/api/Doctor/updatedoctor`,
        type: "PUT",
        processData: false,
        contentType: false,
        data: formData,
        success: function (response) {
            alert("✅ Doctor updated successfully!");
            window.location.href = "/AdminPanel/Home/Doctor";
        },
        error: function (xhr) {
            alert("❌ Failed to update doctor.");
            console.error("Error Details:", xhr.status, xhr.responseText);
        }
    });
}


// ✅ Auto-fetch doctor details when page loads
$(document).ready(function () {
    console.log("🟢 updateDoctor.js loaded!");

    const urlParams = new URLSearchParams(window.location.search);
    const doctorId = urlParams.get("id");

    if (!doctorId) {
        console.warn("⚠️ No doctor ID found in URL.");
        return;
    }

    console.log("📢 Doctor ID found:", doctorId);
    fetchDoctorDetails(doctorId);
});
