document.addEventListener("DOMContentLoaded", function () {
    const serviceForm = document.getElementById("serviceForm");

    if (serviceForm) {
        serviceForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const formData = new FormData();
            formData.append("serviceName", document.getElementById("ServiceName").value);
            formData.append("description", document.getElementById("Description").value);
            formData.append("ServiceImage", document.getElementById("ServiceImage").files[0]);

            console.log("🔍 FormData contents:");
            for (const [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }

            try {
                const response = await fetch("http://localhost:5071/api/Service/createservice", {
                    method: "POST",
                    body: formData
                });

                const result = await response.json();
                console.log("✅ API Response:", result);

                if (response.ok) {
                    alert("Service added successfully!");
                    serviceForm.reset();
                    setTimeout(() => {
                        window.location.href = "http://localhost:5062/AdminPanel/Home/Services";
                    }, 2000);
                } else {
                    console.error("⚠️ Error:", result);
                    alert(result.message || "Failed to add service.");
                }
            } catch (error) {
                console.error("🚨 Request failed:", error);
                alert("An error occurred while submitting the service.");
            }
        });
    } else {
        console.error("⚠️ Service form not found!");
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
