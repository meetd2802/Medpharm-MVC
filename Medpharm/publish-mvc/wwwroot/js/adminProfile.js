$(document).ready(function () {
    let adminId = getAdminId(); // Get the dynamic admin ID
    if (adminId) {
        fetchAdminProfile(adminId);
    } else {
        console.error("❌ No Admin ID found! Profile cannot be loaded.");
    }
});

function getAdminId() {
    let urlParams = new URLSearchParams(window.location.search);
    let adminIdFromUrl = urlParams.get("id");
    console.log("🔍 Checking URL for Admin ID:", adminIdFromUrl);

    let adminIdFromStorage = localStorage.getItem("adminId");
    console.log("🔍 Checking Local Storage for Admin ID:", adminIdFromStorage);

    let adminIdFromSession = sessionStorage.getItem("adminId");
    console.log("🔍 Checking Session Storage for Admin ID:", adminIdFromSession);

    if (adminIdFromUrl) return adminIdFromUrl;
    if (adminIdFromStorage) return adminIdFromStorage;
    if (adminIdFromSession) return adminIdFromSession;

    console.warn("❌ No Admin ID found!");
    return null;
}



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

            // Populate profile fields dynamically
            $("#adminFullName").text(admin.fullName || "");
            $("#adminUserName").text(admin.userName || "");
            $("#adminEmail").text(admin.email || "");
            $("#adminPhone").text(admin.phone || "");
            $("#adminRole").text(admin.role || "");

            $("#lastPasswordChange").text("Not available"); // Placeholder
        },
        error: function (xhr, status, error) {
            console.error("❌ Error Fetching Admin Profile:", error, "Status:", status, "XHR:", xhr);
        }
    });
}
