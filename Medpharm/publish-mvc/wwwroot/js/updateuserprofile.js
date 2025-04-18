$(document).ready(function () {
    console.log("🚀 User Profile Page Loaded!");

    let adminId = getAdminId();
    if (adminId) {
        fetchAdminProfile(adminId);
    } else {
        showProfileAlert("⚠️ No Admin ID found!", "danger");
        return;
    }

    // ✅ Edit Button Click
    $("#editButton").click(function () {
        console.log("📝 Edit button clicked!");

        let adminId = getAdminId();
        if (!adminId) {
            showProfileAlert("⚠️ Cannot edit. Admin ID missing!", "warning");
            return;
        }

        $(".profile-field-value").attr("contenteditable", true).addClass("editable");
        $("#adminRole").attr("contenteditable", false); // Keep role non-editable

        $("#editButton").hide();
        $("#saveButton, #undoButton").show();
    });

    // ✅ Undo Button Click
    $("#undoButton").click(function () {
        console.log("↩️ Undo button clicked!");

        let adminId = getAdminId();
        if (adminId) {
            fetchAdminProfile(adminId);
        }

        $(".profile-field-value").attr("contenteditable", false).removeClass("editable");
        $("#saveButton, #undoButton").hide();
        $("#editButton").show();
    });

    // ✅ Save Button Click
    // ✅ Save Button Click
    $("#saveButton").click(function () {
        console.log("💾 Save button clicked!");

        let adminId = getAdminId();
        if (!adminId) {
            showProfileAlert("⚠️ Cannot update. Admin ID missing!", "danger");
            return;
        }

        updateUserProfile(adminId); // ✅ Call the correct function
    });
});

// ✅ Function to get Admin ID
function getAdminId() {
    // Check both localStorage and sessionStorage
    let adminIdFromSession = sessionStorage.getItem("adminId");
    let adminIdFromStorage = localStorage.getItem("adminId");
    let adminIdFromUrl = new URLSearchParams(window.location.search).get("id");

    console.log("🔍 Admin ID from Session:", adminIdFromSession);
    console.log("🔍 Admin ID from Local Storage:", adminIdFromStorage);
    console.log("🔍 Admin ID from URL:", adminIdFromUrl);

    // Return the first available ID
    return adminIdFromSession || adminIdFromStorage || adminIdFromUrl;
}

// ✅ Fetch Admin Profile
function fetchAdminProfile(adminId) {
    let apiUrl = `http://localhost:5071/api/Admin/getadmin/${adminId}`;
    console.log("📢 Fetching admin profile from:", apiUrl);
    
    // Show loading alert
    showProfileAlert("🔄 Loading profile data...", "info");
    
    $.ajax({
        url: apiUrl,
        type: "GET",
        success: function (response) {
            console.log("✅ API Response:", response);
            
            if (!response || !response.dataList || response.dataList.length === 0) {
                showProfileAlert("⚠️ No admin data found!", "warning");
                return;
            }
            
            let admin = response.dataList[0]; // Extract admin data
            console.log("✅ Extracted Admin Data:", admin);
            
            // Populate profile fields dynamically
            $("#adminFullName").text(admin.fullName || "N/A");
            $("#adminUserName").text(admin.userName || "N/A");
            $("#adminEmail").text(admin.email || "N/A");
            $("#adminPhone").text(admin.phone || "N/A");
            $("#adminRole").text(admin.role || "N/A").attr("contenteditable", false);
            
            $("#lastPasswordChange").text("Not available"); // Placeholder
            
            // Hide loading alert
            $("#profileAlert").addClass("d-none");
        },
        error: function (xhr, status, error) {
            console.error("❌ Error Fetching Admin Profile:", error, "Status:", status, "XHR:", xhr);
            showProfileAlert("❌ Error loading profile!", "danger");
        }
    });
}

// ✅ Update Admin Profile
function updateUserProfile(adminId) {
    let existingPassword = sessionStorage.getItem("adminPassword") || localStorage.getItem("adminPassword") || "Meet@123"; // ✅ FIX: Ensure password is available

    let updatedData = {
        id: parseInt(adminId), // ✅ Ensure ID is a number
        fullName: $("#adminFullName").text().trim(),
        userName: $("#adminUserName").text().trim(),
        email: $("#adminEmail").text().trim(),
        phone: $("#adminPhone").text().trim(),
        role: $("#adminRole").text().trim(),
        password: existingPassword // ✅ Ensure password is not null
    };

    console.log("📤 Sending Data to API:", JSON.stringify(updatedData));

    // ✅ Validate required fields before sending
    if (!updatedData.fullName || !updatedData.userName || !updatedData.email || !updatedData.phone || !updatedData.password) {
        showProfileAlert("⚠️ Missing required fields!", "warning");
        return;
    }

    // Show loading alert
    showProfileAlert("🔄 Saving profile changes...", "info");

    $.ajax({
        url: "http://localhost:5071/api/Admin/updateadmin",
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(updatedData),
        success: function (response) {
            console.log("✅ Update Success:", response);
            
            if (response.success) {
                showProfileAlert("✅ Profile updated successfully!", "success");
                $(".profile-field-value").attr("contenteditable", false).removeClass("editable");
                $("#editButton").show();
                $("#saveButton, #undoButton").hide();
            } else {
                showProfileAlert("❌ Failed to update profile: " + (response.message || "Unknown error"), "danger");
            }
        },
        error: function (xhr) {
            console.error("❌ API Error:", xhr.responseText);

            let errorMessage = "Unknown error";
            try {
                const response = JSON.parse(xhr.responseText);
                errorMessage = response.message || response.error || errorMessage;
            } catch (e) {
                errorMessage = xhr.responseText || errorMessage;
            }

            showProfileAlert("❌ Failed to update: " + errorMessage, "danger");
        }
    });
}


// ✅ Show alerts
function showProfileAlert(message, type) {
    let alertBox = $("#profileAlert");
    
    // Remove all alert classes and add the new one
    alertBox.removeClass("d-none alert-info alert-danger alert-warning alert-success")
            .addClass(`alert-${type}`);
    
    // Set the message
    alertBox.html(`<i class="fas fa-info-circle me-2"></i>${message}`);
    
    // Show the alert
    alertBox.removeClass("d-none");
    
    // Auto-hide after 4 seconds (unless it's an error)
    if (type !== "danger") {
        setTimeout(() => {
            alertBox.addClass("d-none");
        }, 4000);
    }
}

