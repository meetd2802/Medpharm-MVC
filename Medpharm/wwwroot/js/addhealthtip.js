document.addEventListener("DOMContentLoaded", function () {
    const healthTipForm = document.getElementById("healthTipForm");

    if (healthTipForm) {
        healthTipForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const formData = new FormData();
            formData.append("category", document.getElementById("Category").value);
            formData.append("title", document.getElementById("Title").value);
            formData.append("description", document.getElementById("Description").value);
            formData.append("author", document.getElementById("Author").value);
            formData.append("datePosted", document.getElementById("DatePosted").value);
            formData.append("HealthTipImage", document.getElementById("HealthTipImage").files[0]);

            console.log("🔍 FormData contents:");
            for (const [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }

            try {
                const response = await fetch("http://localhost:5071/api/HealthTip/createhealthtip", {
                    method: "POST",
                    body: formData
                });

                // Check if the response is successful
                if (response.ok) {
                    const result = await response.json();
                    console.log("✅ API Response:", result);

                    alert("Health Tip added successfully!");
                    healthTipForm.reset();
                    setTimeout(() => {
                        window.location.href = "http://localhost:5062/AdminPanel/Home/HealthTip";
                    }, 2000);
                } else {
                    const result = await response.json();
                    console.error("⚠️ Error:", result);
                    alert(result.message || "Failed to add health tip.");
                }
            } catch (error) {
                console.error("🚨 Request failed:", error);
                alert("An error occurred while submitting the health tip.");
            }
        });
    } else {
        console.error("⚠️ Health tip form not found!");
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
