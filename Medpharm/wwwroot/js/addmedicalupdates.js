document.addEventListener("DOMContentLoaded", function () {
    const medicalUpdateForm = document.getElementById("medicalUpdateForm");

    if (medicalUpdateForm) {
        medicalUpdateForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const formData = new FormData();
            formData.append("name", document.getElementById("MedicalUpdateName").value);
            formData.append("description", document.getElementById("Description").value);
            formData.append("MedicalUpdateImage", document.getElementById("MedicalUpdateImage").files[0]); // File input

            console.log("🔍 FormData contents:");
            for (const [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }

            try {
                const response = await fetch("http://localhost:5071/api/MedicalUpdate/createmedicalupdate", {
                    method: "POST",
                    body: formData
                });

                const result = await response.json();
                console.log("✅ API Response:", result);

                if (response.ok && result.success) {
                    alert("Medical update added successfully!");
                    medicalUpdateForm.reset();
                    setTimeout(() => {
                        window.location.href = "/AdminPanel/Home/MedicalUpdates";
                    });
                } else {
                    console.error("⚠️ Error:", result);
                    alert(result.message || "Failed to add medical update.");
                }
            } catch (error) {
                console.error("🚨 Request failed:", error);
                alert("An error occurred while submitting the medical update.");
            }
        });
    } else {
        console.error("⚠️ Medical update form not found!");
    }
});

// ✅ Success popup function
function showSuccessPopup(message) {
    const successPopup = document.getElementById("successPopup");
    if (successPopup) {
        successPopup.textContent = message;
        successPopup.style.display = "block";
        setTimeout(() => {
            successPopup.style.display = "none";
        }, 3000);
    }
}
