document.addEventListener("DOMContentLoaded", function () {
    const doctorForm = document.getElementById("doctorForm");

    if (doctorForm) {
        doctorForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const formData = new FormData();
            formData.append("name", document.getElementById("DoctorName").value);
            formData.append("speciality", document.getElementById("Speciality").value);
            formData.append("DoctorImage", document.getElementById("DoctorImage").files[0]); // File input

            console.log("🔍 FormData contents:");
            for (const [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }

            try {
                const response = await fetch("http://localhost:5071/api/Doctor/createdoctor", {
                    method: "POST",
                    body: formData
                });

                const result = await response.json();
                console.log("✅ API Response:", result);

                if (response.ok && result.success) {
                    alert("Doctor added successfully!");
                    doctorForm.reset();
                    setTimeout(() => {
                        window.location.href = "/AdminPanel/Home/Doctor";
                    }, 2000);
                } else {
                    console.error("⚠️ Error:", result);
                    alert(result.message || "Failed to add doctor.");
                }
            } catch (error) {
                console.error("🚨 Request failed:", error);
                alert("An error occurred while submitting the doctor.");
            }
        });
    } else {
        console.error("⚠️ Doctor form not found!");
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
