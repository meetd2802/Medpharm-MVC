document.addEventListener("DOMContentLoaded", function () {
    const patientForm = document.getElementById("patientForm");

    if (patientForm) {
        
            let createdAtField = document.getElementById("created_at");
            let now = new Date();
            let formattedDate = now.toISOString().slice(0, 19).replace("T", " "); // Format as "YYYY-MM-DD HH:MM:SS"
            createdAtField.value = formattedDate;
        
        patientForm.addEventListener("submit", async function (event) {
            event.preventDefault(); // Prevent default form submission

            const formData = {
                name: document.getElementById("name").value,
                phone: document.getElementById("phone").value,
                diseases: document.getElementById("diseases").value,
                history: document.getElementById("history").value,
                medicine: document.getElementById("medicine").value,
                surgery: document.getElementById("surgery").value,
                gender: document.getElementById("gender").value,
                weight: parseFloat(document.getElementById("weight").value),
                prescription: document.getElementById("prescription").value,
                reports: document.getElementById("reportsText").value,
                created_at: document.getElementById("created_at").value
            };

            try {
                const response = await fetch("http://localhost:5071/api/Patient/createpatient", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    let errorMessage = await response.text();
                    throw new Error(errorMessage || "Failed to submit data.");
                }

                const result = await response.json();
                alert(result.message || "Patient added successfully!");
                window.location.href = "/AdminPanel/Home/Patient"; // Redirect after success
                patientForm.reset(); // Reset form
            } catch (error) {
                console.error("Request failed:", error);
                alert("Error: " + error.message);
            }
        });
    } else {
        console.error("Patient form not found!");
    }
});


// ✅ Function to show success popup
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