$(document).ready(function () {
    console.log("🟢 updatehealthtip.js loaded!");

    // Extract Health Tip ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const healthTipId = urlParams.get("id");

    if (!healthTipId) {
        console.warn("⚠️ No Health Tip ID found in URL.");
        return;
    }

    console.log("📢 Health Tip ID found:", healthTipId);

    // Fetch Health Tip details and populate form
    $.ajax({
        url: `http://localhost:5071/api/HealthTip/gethealthtip/${healthTipId}`,
        type: "GET",
        success: function (response) {
            console.log("✅ Health Tip data received:", response);

            if (!response || !response.dataList || response.dataList.length === 0) {
                console.error("❌ Invalid API response structure.");
                return;
            }

            let healthTip = response.dataList[0];

            // Populate form fields
            $("#healthTipId").val(healthTip.id);
            $("#Title").val(healthTip.title);
            $("#Description").val(healthTip.description);
            $("#Category").val(healthTip.category);
            $("#Author").val(healthTip.author);
            $("#DatePosted").val(healthTip.datePosted ? healthTip.datePosted.split('T')[0] : "");

            // Handle Image URL
            if (healthTip.imageUrl) {
                let imageUrl = healthTip.imageUrl.replace("~", ""); // Remove '~' from path if exists
                let fullImageUrl = `http://localhost:5071${imageUrl}`;
                $("#healthTipImagePreview").attr("src", fullImageUrl).show();
            }
        },
        error: function (xhr) {
            console.error("❌ Failed to fetch Health Tip details.", xhr.status, xhr.responseText);
        }
    });
});

function updateHealthTip() {
    const healthTipId = $("#healthTipId").val();
    const title = $("#Title").val();
    const description = $("#Description").val();
    const category = $("#Category").val();
    const author = $("#Author").val();
    const datePosted = $("#DatePosted").val();
    let imageFile = $("#HealthTipImage")[0].files[0];  // Get the image file from the input

    let formData = new FormData();
    formData.append("id", healthTipId);          // Health tip ID
    formData.append("title", title);             // Health tip title
    formData.append("description", description); // Health tip description
    formData.append("category", category);      // Health tip category
    formData.append("author", author);          // Health tip author
    formData.append("datePosted", datePosted);  // Health tip date posted

    if (imageFile) {
        formData.append("HealthTipImage", imageFile);  // Append the image file
    }

    // Send the update request
    $.ajax({
        url: `http://localhost:5071/api/HealthTip/updatehealthtip`,
        type: "PUT",
        processData: false,  // Don't process the FormData
        contentType: false,  // Let jQuery set the content-type as multipart/form-data
        data: formData,
        success: function(response) {
            console.log("✅ Health Tip updated successfully", response);

            if (response && response.message === "Health tip updated successfully.") {
                alert("Health Tip updated successfully!");

                // Update image preview if new image uploaded
                if (response.data.imageUrl) {
                    let imageUrl = `http://localhost:5071${response.data.imageUrl}`;
                    $("#healthTipImagePreview").attr("src", imageUrl).show();
                }

                // Redirect after update
                window.location.href = "/AdminPanel/Home/HealthTip";
            }
        },
        error: function(xhr) {
            alert("❌ Failed to update Health Tip.");
            console.error("Error Details:", xhr.status, xhr.responseText);
        }
    });
}
