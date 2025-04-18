let patientData = {}; // Store patient data globally

// ✅ Fetch patient details (GET request)
// ✅ Fetch patient details (GET request)
function fetchPatientDetails(patientId) {
    console.log("🔍 Fetching patient details for ID:", patientId);

    $.ajax({
        url: `http://localhost:5071/api/Patient/getpatient/${patientId}`, // Ensure the endpoint is correct
        type: "GET",
        contentType: "application/json",
        success: function (response) {
            console.log("✅ Patient data received:", response);

            // Check if dataList exists and has at least one entry
            if (response && response.dataList && response.dataList.length > 0) {
                let patientData = response.dataList[0]; // Access the first patient in dataList

                // Populate form fields
                $("#patientId").val(patientData.id);
                $("#name").val(patientData.name);
                $("#phone").val(patientData.phone);
                $("#diseases").val(patientData.diseases);
                $("#history").val(patientData.history);
                $("#medicine").val(patientData.medicine);
                $("#surgery").val(patientData.surgery);
                $("#gender").val(patientData.gender);
                $("#weight").val(patientData.weight);
                $("#prescription").val(patientData.prescription);
                $("#reports").val(patientData.reports);

                // Display existing lab report preview if available
                let labReportUrl = patientData.labReport
                    ? `http://localhost:5071/${patientData.labReport}`
                    : "/Images/default_lab.png";

                $("#labReportPreview").attr("src", labReportUrl);

                // Display created date
                $("#createdAt").text(patientData.createdAt);
            } else {
                console.error("❌ Patient data not found in response:", response);
            }
        },
        error: function (xhr) {
            console.error(`❌ Error fetching patient details: Status ${xhr.status}, Message: ${xhr.responseText}`);
        }
    });
}
function updatePatient() {
    const patientId = parseInt($("#patientId").val());
    const createdAtInput = $("#createdAt").val();

    let createdAt = null;
    if (createdAtInput) {
        const parsedDate = new Date(createdAtInput);
        if (!isNaN(parsedDate)) {
            createdAt = parsedDate.toISOString();
        }
    }

    // Build the updated data object without including null `createdAt`
    const updatedData = {
        id: patientId,
        name: $("#name").val(),
        phone: $("#phone").val(),
        diseases: $("#diseases").val(),
        history: $("#history").val(),
        medicine: $("#medicine").val(),
        labReport: $("#labReport").val(),
        surgery: $("#surgery").val(),
        gender: $("#gender").val(),
        weight: parseFloat($("#weight").val()) || null,
        prescription: $("#prescription").val(),
        reports: $("#reports").val(),
    };

    // Include `createdAt` only if valid
    if (createdAt) {
        updatedData.createdAt = createdAt;
    }

    console.log("📤 Sending updated data:", JSON.stringify(updatedData));

    $.ajax({
        url: "http://localhost:5071/api/Patient/updatepatient",
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(updatedData),
        success: function (response) {
            alert("Patient updated successfully!");
            window.location.href = "/AdminPanel/Home/Patient"; // Redirecting to the Patient page
        },
        error: function (xhr, status, error) {
            console.error("Update failed:", xhr.responseText);
            alert("Failed to update patient.");
        }
    });
}

// ✅ Auto-fetch patient details when the page loads
$(document).ready(function () {
    console.log("🟢 updatepatient.js loaded!");

    const urlParams = new URLSearchParams(window.location.search);
    const patientId = urlParams.get("id");

    if (!patientId) {
        console.warn("⚠️ No patient ID found in URL.");
        return;
    }

    console.log("📢 Patient ID found:", patientId);
    fetchPatientDetails(patientId);
});
