document.addEventListener("DOMContentLoaded", function () {
    const testimonialForm = document.getElementById("testimonialForm");

    if (!testimonialForm) {
        console.error("⚠️ Testimonial form not found!");
        return;
    }

    testimonialForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Grab and sanitize input
        const name = document.getElementById("Name").value.trim();
        const rating = parseInt(document.getElementById("Rating").value);
        const content = document.getElementById("Content").value.trim();

        // Client-side validation
        if (!name || isNaN(rating) || !content) {
            showErrorPopup("Please fill in all required fields.");
            return;
        }

        // Prepare payload (avoid sending nulls or unexpected types)
        const testimonialData = {
            name,
            rating,
            content,
            createdAt: new Date().toISOString() // Add current timestamp
        };

        console.log("📤 Submitting:", testimonialData);

        try {
            // First, submit the testimonial
            const response = await fetch("http://localhost:5071/api/Testimonial/createtestimonial", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(testimonialData)
            });

            console.log("📥 Response Status:", response.status);
            
            // Try to parse the response
            const responseText = await response.text();
            console.log("📥 Response Text:", responseText);
            
            let responseData;
            try {
                responseData = JSON.parse(responseText);
            } catch (e) {
                console.error("Failed to parse response:", e);
            }

            // Check if the operation was successful based on the response format
            if (responseData && (responseData.status === 1 || responseData.message?.includes("success"))) {
                showSuccessPopup("Testimonial added successfully!");
                testimonialForm.reset();
                setTimeout(() => {
                    window.location.href = "/AdminPanel/Home/Testimonial";
                }, 2000);
            } else {
                // If we get a 500 error, try to verify if the testimonial was created
                if (response.status === 500) {
                    try {
                        const verifyResponse = await fetch("http://localhost:5071/api/Testimonial/getalltestimonials");
                        const verifyData = await verifyResponse.json();
                        
                        if (verifyData && verifyData.dataList) {
                            const isCreated = verifyData.dataList.some(t => 
                                t.name === name && 
                                t.rating === rating && 
                                t.content === content
                            );

                            if (isCreated) {
                                showSuccessPopup("Testimonial added successfully!");
                                testimonialForm.reset();
                                setTimeout(() => {
                                    window.location.href = "/AdminPanel/Home/Testimonial";
                                }, 2000);
                                return;
                            }
                        }
                    } catch (verifyError) {
                        console.error("Verification error:", verifyError);
                    }
                }
                
                showErrorPopup("Failed to add testimonial. Please try again.");
            }
        } catch (error) {
            console.error("🚨 Request failed:", error);
            showErrorPopup("An error occurred while submitting the testimonial.");
        }
    });
});

// Success popup
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

// Error popup
function showErrorPopup(message) {
    const errorPopup = document.getElementById("errorPopup");
    if (errorPopup) {
        errorPopup.textContent = message;
        errorPopup.style.display = "block";
        setTimeout(() => {
            errorPopup.style.display = "none";
        }, 3000);
    }
}