let adminData = {}; // Store admin data globally

// ✅ Fetch admin details by ID
function fetchAdminDetails(adminId) {
    console.log("🔍 Fetching admin details for ID:", adminId);

    $.ajax({
        url: `http://localhost:5071/api/Admin/getadmin/${adminId}`,
        type: "GET",
        contentType: "application/json",
        success: function (response) {
            console.log("✅ Admin data received:", response);

            if (response && response.dataList && response.dataList.length > 0) {
                adminData = response.dataList[0];

                // Populate form fields
                $("#adminId").val(adminData.id);
                $("#fname").val(adminData.fullName);
                $("#uname").val(adminData.userName);
                $("#email").val(adminData.email);
                $("#role").val(adminData.role);
                $("#phone").val(adminData.phone);
                $("#password").val("********"); // Static placeholder for password
            } else {
                console.error("❌ Admin data not found in response:", response);
            }
        },
        error: function (xhr) {
            console.error("❌ Error fetching admin details:", xhr.status, xhr.responseText);
        }
    });
}

// ✅ Update admin details
function updateAdmin(event) {
    event.preventDefault(); // Prevent form submission

    // Update the relevant fields
    adminData.fullName = $("#fname").val();
    adminData.userName = $("#uname").val();
    adminData.email = $("#email").val();
    adminData.role = $("#role").val();
    adminData.role = $("#phone").val();

    $.ajax({
        url: "http://localhost:5071/api/Admin/updateadmin",
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(adminData), // Send the full data object (excluding password)
        success: function (response) {
            console.log("Success:", response);
            alert("Admin created successfully!");
            window.location.href = "http://localhost:5062/AdminPanel/Home/Admin"; // Corrected redirect URL
        },
        error: function (xhr) {
            alert("Failed to update admin. Please try again.");
            console.error(xhr.responseText);
        }
    });
}

// ✅ Automatically fetch admin details on page load if ID is present in the URL
$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const adminId = urlParams.get("id");

    if (!adminId) {
        console.warn("⚠️ No admin ID found in the URL.");
        return;
    }

    fetchAdminDetails(adminId);
});
