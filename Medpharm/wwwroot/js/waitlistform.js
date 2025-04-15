document.addEventListener("DOMContentLoaded", function () {
    const waitlistForm = document.getElementById("waitlistForm");

    if (waitlistForm) {
        waitlistForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            // Basic form validation check
            if (!waitlistForm.checkValidity()) {
                alert("Please fill in all required fields correctly.");
                return;
            }

            const formData = {
                fullName: document.getElementById("waitlistName").value.trim(),
                email: document.getElementById("waitlistEmail").value.trim(),
                phoneNumber: document.getElementById("waitlistPhone").value.trim(),
                preferredDoctor: document.getElementById("waitlistDoctor").value,
                preferredTimeframe: document.getElementById("waitlistTimeframe").value
            };

            console.log("🔍 Form Data:", formData);

            try {
                const response = await fetch("http://localhost:5071/api/Waitlist/createwaitlist", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();
                console.log("✅ API Response:", result);

                if (response.ok) {
                    alert("Successfully added to the waitlist!");
                    waitlistForm.reset();
                } else {
                    console.error("⚠️ Error:", result);
                    alert(result.message || "Failed to join the waitlist.");
                }
            } catch (error) {
                console.error("🚨 Request failed:", error);
                alert("An error occurred while submitting the waitlist form.");
            }
        });
    } else {
        console.error("⚠️ Waitlist form not found!");
    }
});
