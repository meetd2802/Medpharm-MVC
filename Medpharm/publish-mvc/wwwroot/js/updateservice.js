$(document).ready(function () {
    // Extract service ID from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get("id");

    if (!serviceId) {
        console.warn("⚠️ No service ID found in URL.");
        return;
    }

    console.log("📢 Service ID found:", serviceId);
    fetchServiceDetails(serviceId); // Fetch service details using the serviceId
});

function fetchServiceDetails(serviceId) {
    console.log("🔍 Fetching service details for ID:", serviceId);

    // Make an AJAX GET request to fetch the service details
    $.ajax({
        url: `http://localhost:5071/api/Service/getservice/${serviceId}`,
        type: "GET",
        success: function (response) {
            console.log("✅ Service data received:", response); // Log the response

            // Check if response contains the data directly or in dataList
            if (response && response.dataList && response.dataList.length > 0) {
                const service = response.dataList[0]; // Access the first service in dataList

                // Populate the form fields with the service data
                $("#serviceName").val(service.serviceName);
                $("#description").val(service.description);

                // Adjust the image path and show the preview
                let imageUrl = service.imagePath && service.imagePath.trim() !== ""
                    ? `http://localhost:5071/${service.imagePath.replace("~", "wwwroot")}`  // Adjust path
                    : "/Images/default.png";

                $("#serviceImagePreview").attr("src", imageUrl);  // Show image preview
            } else if (response) {
                // If data is not inside dataList, assume it's a direct object
                const service = response; // Assuming service data is directly in response

                $("#serviceName").val(service.serviceName);
                $("#description").val(service.description);

                let imageUrl = service.imagePath && service.imagePath.trim() !== ""
                    ? `http://localhost:5071/${service.imagePath.replace("~", "wwwroot")}`
                    : "/Images/default.png";

                $("#serviceImagePreview").attr("src", imageUrl);
            } else {
                console.error("❌ Service data not found in response:", response);
                alert("Service data not found.");
            }
        },
        error: function (xhr, status, error) {
            console.error("❌ Error fetching service details:", xhr.status, error);
            alert("Failed to load service details.");
        }
    });
}

function updateService() {
    const serviceId = $("#serviceId").val();
    const serviceName = $("#serviceName").val();
    const description = $("#description").val();
    let imageFile = $("#serviceImage")[0].files[0];

    let formData = new FormData();
    formData.append("serviceID", serviceId);
    formData.append("serviceName", serviceName);
    formData.append("description", description);

    if (imageFile) {
        formData.append("serviceImage", imageFile);
    }

    // Send the update request
    $.ajax({
        url: `http://localhost:5071/api/Service/updateservice`,
        type: "PUT",
        processData: false,
        contentType: false,
        data: formData,
        success: function (response) {
            console.log("✅ Service update response:", response);
            if (response && response.status === 1) {  // Check the response status
                alert("✅ Service updated successfully!");

                // Update the service image preview if a new image is provided
                let updatedImagePath = `http://localhost:5071${response.data.imagePath}`;
                $("#serviceImagePreview").attr("src", updatedImagePath).show(); // Show the updated image

                // Optionally, redirect to services page
                window.location.href = "/AdminPanel/Home/Services";
            } else {
                alert("❌ Service update failed.");
                console.error("Error details:", response);
            }
        },
        error: function (xhr) {
            alert("❌ Failed to update service.");
            console.error("Error Details:", xhr.status, xhr.responseText);
        }
    });
}
