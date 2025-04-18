document.addEventListener("DOMContentLoaded", function () {
    let adminId = getAdminId();

    if (!adminId) {
        alert("❌ No Admin ID found! Cannot proceed.");
        return;
    }

    console.log("🔍 Using Admin ID:", adminId);
    document.getElementById("adminId").value = adminId;

    const changePasswordForm = document.getElementById("changePasswordForm");
    if (changePasswordForm) {
        changePasswordForm.addEventListener("submit", function (event) {
            event.preventDefault();
            changePassword(adminId);
        });
    }
});

function getAdminId() {
    let urlParams = new URLSearchParams(window.location.search);
    let adminIdFromUrl = urlParams.get("id");
    let adminIdFromSession = sessionStorage.getItem("adminId");
    let adminIdFromStorage = localStorage.getItem("adminId");

    return adminIdFromUrl || adminIdFromSession || adminIdFromStorage;
}

async function forgotPassword() {
    const username = prompt("Enter your username to retrieve your password:");

    if (!username) {
        alert("Username is required.");
        return;
    }

    try {
        // Call the Forgot Password API
        const response = await fetch("http://localhost:5071/api/Admin/forgotpassword", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: username })
        });

        if (!response.ok) {
            throw new Error("Failed to retrieve password. Please check the username.");
        }

        const result = await response.json();
        alert(result.message); // Success message from the API
    } catch (error) {
        console.error("Error:", error);
        alert("Error fetching password. Please try again.");
    }
}

// Close Modal Function
function closeModal() {
    document.getElementById("forgotPasswordModal").style.display = "none";
}
