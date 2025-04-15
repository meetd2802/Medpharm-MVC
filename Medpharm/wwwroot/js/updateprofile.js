let existingPassword = ""; // Store the original password

$(document).ready(function () {
    fetchAdminDetails(); // Fetch admin details on page load

    // ✅ Attach event listeners
    $("#editButton").click(enableEditing);
    $("#saveButton").click(saveAdminDetails);
});

// ✅ Enable editing fields
function enableEditing() {
    let storedAdminId = sessionStorage.getItem("adminId");

    if (!storedAdminId || isNaN(storedAdminId)) {
        alert("⚠️ No valid Admin ID found. Cannot edit profile.");
        return;
    }

    console.log("✏️ Editing profile for Admin ID:", storedAdminId);

    // ✅ Convert text fields into input fields (except Role)
    $("#adminFullName").html(`<input type="text" class="form-control" value="${$("#adminFullName").text().trim()}">`);
    $("#adminUserName").html(`<input type="text" class="form-control" value="${$("#adminUserName").text().trim()}">`);
    $("#adminEmail").html(`<input type="text" class="form-control" value="${$("#adminEmail").text().trim()}">`);
    $("#adminPhone").html(`<input type="text" class="form-control" value="${$("#adminPhone").text().trim()}">`);

    // Role should remain unchanged
    $("#adminRole").text($("#adminRole").text().trim());

    $("#editButton").hide();
    $("#saveButton").show();
}

// ✅ Save updated details
function saveAdminDetails() {
    let storedAdminId = sessionStorage.getItem("adminId");
    if (!storedAdminId || isNaN(storedAdminId)) {
        alert("⚠️ Invalid admin ID! Please refresh the page.");
        return;
    }

    let adminData = {
        id: parseInt(storedAdminId),
        fullName: $("#adminFullName input").val()?.trim(),
        userName: $("#adminUserName input").val()?.trim(),
        email: $("#adminEmail input").val()?.trim(),
        phone: $("#adminPhone input").val()?.trim(),
        role: $("#adminRole").text().trim(), // Role is not editable
        password: existingPassword // ✅ Send stored password
    };

    console.log("🔍 Debug - Admin Data Before Save:", adminData);

    // ✅ Validate required fields
    if (!adminData.fullName || !adminData.userName || !adminData.email || !adminData.phone || !adminData.role) {
        alert("⚠️ Please fill in all required fields before saving.");
        return;
    }

    $.ajax({
        url: "http://localhost:5071/api/Admin/updateadmin",
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(adminData),
        success: function (response) {
            console.log("✅ Admin updated successfully:", response);
            alert("Admin details updated successfully!");

            // ✅ Update text fields with saved values
            $("#adminFullName").text(adminData.fullName);
            $("#adminUserName").text(adminData.userName);
            $("#adminEmail").text(adminData.email);
            $("#adminPhone").text(adminData.phone);

            $("#saveButton").hide();
            $("#editButton").show();
        },
        error: function (xhr) {
            console.error("❌ Error updating admin:", xhr.responseText);
            alert("❌ Failed to update admin. Please check required fields and try again.");
        }
    });
}

// ✅ Fetch admin details from API
function fetchAdminDetails() {
    let storedAdminId = sessionStorage.getItem("adminId");
    if (!storedAdminId || isNaN(storedAdminId)) {
        console.error("❌ No valid Admin ID found in session storage!");
        alert("Error: No Admin ID found!");
        return;
    }

    let adminId = parseInt(storedAdminId);

    $.ajax({
        url: `http://localhost:5071/api/Admin/getadmin/${adminId}`,
        type: "GET",
        success: function (response) {
            if (response && response.dataList && response.dataList.length > 0) {
                let adminData = response.dataList[0];

                $("#adminFullName").text(adminData.fullName);
                $("#adminUserName").text(adminData.userName);
                $("#adminEmail").text(adminData.email);
                $("#adminPhone").text(adminData.phone);
                $("#adminRole").text(adminData.role); // Role is non-editable

                existingPassword = adminData.password; // ✅ Store original password
            }
        },
        error: function (xhr) {
            console.error("❌ Error fetching admin:", xhr.responseText);
        }
    });
}
