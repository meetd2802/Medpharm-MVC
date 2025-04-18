document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const formData = {
                fullName: document.getElementById("contactName").value,
                email: document.getElementById("contactEmail").value,
                subject: document.getElementById("contactSubject").value,
                message: document.getElementById("contactMessage").value
            };

            console.log("🔍 Form Data:", formData);

            try {
                const response = await fetch("http://localhost:5071/api/ContactForm/createcontactform", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();
                console.log("✅ API Response:", result);

                if (response.ok) {
                    alert("Message sent successfully!");
                    contactForm.reset();
                } else {
                    console.error("⚠️ Error:", result);
                    alert(result.message || "Failed to send message.");
                }
            } catch (error) {
                console.error("🚨 Request failed:", error);
                alert("An error occurred while submitting the form.");
            }
        });
    } else {
        console.error("⚠️ Contact form not found!");
    }
});
