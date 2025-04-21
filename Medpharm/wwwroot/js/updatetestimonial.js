$(document).ready(function () {
    console.log("🟢 updateTestimonial.js loaded!");

    // Extract testimonial ID from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const testimonialId = urlParams.get("id");

    if (!testimonialId) {
        console.warn("⚠️ No testimonial ID found in URL.");
        return;
    }

    console.log("📢 Testimonial ID found:", testimonialId);

    // Fetch testimonial details and populate form
    $.ajax({
        url: `http://localhost:5071/api/Testimonial/gettestimonial/${testimonialId}`,
        type: "GET",
        success: function (response) {
            console.log("✅ Testimonial data received:", response);

            if (response && response.dataList && response.dataList.length > 0) {
                let testimonial = response.dataList[0];

                // Populate form with existing data
                $("#testimonialId").val(testimonial.id);
                $("#name").val(testimonial.name);
                $("#rating").val(testimonial.rating);
                $("#content").val(testimonial.content);
            } else if (response) {
                // If data is not inside dataList, assume it's a direct object
                $("#testimonialId").val(response.id);
                $("#name").val(response.name);
                $("#rating").val(response.rating);
                $("#content").val(response.content);
            } else {
                console.error("❌ Testimonial data not found in response:", response);
                alert("Testimonial data not found.");
            }
        },
        error: function (xhr) {
            console.error("❌ Failed to fetch testimonial details.", xhr.status, xhr.responseText);
            alert("Failed to load testimonial details.");
        }
    });
});

function updateTestimonial() {
    const testimonialId = $("#testimonialId").val();
    const name = $("#name").val();
    const rating = $("#rating").val();
    const content = $("#content").val();

    // Validate form
    if (!name || !rating || !content) {
        alert("Please fill in all required fields.");
        return;
    }

    const testimonialData = {
        id: testimonialId,
        name: name,
        rating: parseInt(rating),
        content: content
    };

    console.log("📤 Sending update data:", testimonialData);

    // Send the update request
    $.ajax({
        url: `http://localhost:5071/api/Testimonial/updatetestimonial`,
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(testimonialData),
        success: function (response) {
            console.log("✅ Testimonial update response:", response);

            // Check for success in different response formats
            if ((response && response.status === 1) || 
                (response && response.message && response.message.includes("success")) ||
                (response && response.success === true)) {
                
                // Show success message
                alert("Testimonial updated successfully!");
                
                // Redirect immediately
                window.location.href = "/AdminPanel/Home/Testimonial";
            } else {
                console.error("❌ Update failed. Response:", response);
                alert("Failed to update testimonial. Please try again.");
            }
        },
        error: function (xhr, status, error) {
            console.error("❌ Update error:", xhr.status, error);
            console.error("Response text:", xhr.responseText);
            
            // Try to parse the error response
            let errorMessage = "Failed to update testimonial. Please try again.";
            try {
                const errorResponse = JSON.parse(xhr.responseText);
                if (errorResponse.message) {
                    errorMessage = errorResponse.message;
                }
            } catch (e) {
                console.error("Could not parse error response:", e);
            }
            
            alert(errorMessage);
        }
    });
} 