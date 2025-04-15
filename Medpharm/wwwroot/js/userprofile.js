$(document).ready(function () {
    console.log("🚀 User Profile Page Loaded!");

    // Get admin ID from session storage
    let adminId = getAdminId();
    if (adminId) {
        fetchAdminProfile(adminId);
    } else {
        console.error("❌ No Admin ID found!");
    }

    // Edit Button Click
    $("#editButton").click(function () {
        console.log("📝 Edit button clicked!");
        
        // Make fields editable except role
        $(".profile-field-value").attr("contenteditable", true).addClass("editable");
        $("#adminRole").attr("contenteditable", false); // Keep role non-editable
        
        // Show/hide buttons
        $("#editButton").hide();
        $("#saveButton, #undoButton").show();
    });

    // Undo Button Click
    $("#undoButton").click(function () {
        console.log("↩️ Undo button clicked!");
        
        // Reload profile data
        let adminId = getAdminId();
        if (adminId) {
            fetchAdminProfile(adminId);
        }
        
        // Make fields non-editable
        $(".profile-field-value").attr("contenteditable", false).removeClass("editable");
        
        // Show/hide buttons
        $("#saveButton, #undoButton").hide();
        $("#editButton").show();
    });

    // Save Button Click
    $("#saveButton").click(function () {
        console.log("💾 Save button clicked!");
        
        let adminId = getAdminId();
        if (!adminId) {
            alert("⚠️ Cannot update. Admin ID missing!");
            return;
        }
        
        updateUserProfile(adminId);
    });
});

// Function to get admin ID from session storage
function getAdminId() {
    return sessionStorage.getItem("adminId") || localStorage.getItem("adminId");
}

// Fetch admin profile data
function fetchAdminProfile(adminId) {
    let apiUrl = `http://localhost:5071/api/Admin/getadmin/${adminId}`;
    console.log("📢 Fetching admin profile from:", apiUrl);
    
    $.ajax({
        url: apiUrl,
        type: "GET",
        success: function (response) {
            console.log("✅ API Response:", response);
            
            if (!response || !response.dataList || response.dataList.length === 0) {
                console.warn("⚠️ No admin data found!", response);
                return;
            }
            
            let admin = response.dataList[0]; // Extract admin data
            console.log("✅ Extracted Admin Data:", admin);
            
            // Populate profile fields
            $("#adminFullName").text(admin.fullName || "");
            $("#adminUserName").text(admin.userName || "");
            $("#adminEmail").text(admin.email || "");
            $("#adminPhone").text(admin.phone || "");
            $("#adminRole").text(admin.role || "").attr("contenteditable", false);
            
            $("#lastPasswordChange").text("Not available"); // Placeholder
        },
        error: function (xhr, status, error) {
            console.error("❌ Error Fetching Admin Profile:", error, "Status:", status, "XHR:", xhr);
        }
    });
}

// Update user profile data
function updateUserProfile(adminId) {
    let updatedData = {
        id: adminId,
        fullName: $("#adminFullName").text(),
        email: $("#adminEmail").text(),
        phone: $("#adminPhone").text()
    };
    
    $.ajax({
        url: `http://localhost:5071/api/Admin/updateadmin`,
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(updatedData),
        success: function (response) {
            if (response.success) {
                alert("✅ Profile updated successfully!");
                $(".profile-field-value").attr("contenteditable", false).removeClass("editable");
                $("#editButton").show();
                $("#saveButton, #undoButton").hide();
            } else {
                alert("❌ Failed to update profile.");
            }
        },
        error: function (xhr, status, error) {
            console.error("❌ Error updating profile:", error);
            alert("❌ Error updating profile: " + error);
        }
    });
}
