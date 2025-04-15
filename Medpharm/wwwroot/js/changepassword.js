// Ensure the DOM is fully loaded before attaching event listeners
document.addEventListener("DOMContentLoaded", function () {
    // Set Admin ID from URL if available
    const urlParams = new URLSearchParams(window.location.search);
    const adminId = urlParams.get("id");
    if (adminId) document.getElementById("adminId").value = adminId;

    // Attach submit event to the form
    const changePasswordForm = document.getElementById("changePasswordForm");
    if (changePasswordForm) {
        changePasswordForm.addEventListener("submit", function (event) {
            event.preventDefault();
            changePassword();
        });
    }

    // Attach event listener for the forgot password button only once
    const forgotPasswordBtn = document.getElementById("forgotPasswordBtn");
    if (forgotPasswordBtn && !forgotPasswordBtn.classList.contains("listener-attached")) {
        forgotPasswordBtn.classList.add("listener-attached");
        forgotPasswordBtn.addEventListener("click", forgotPassword);
    }
});

// Change Password Function
async function changePassword() {
    const adminId = document.getElementById("adminId").value;
    const oldPassword = document.getElementById("oldPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (newPassword !== confirmPassword) {
        alert("New password and confirm password do not match.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:5071/api/Admin/getadmin/${adminId}`);
        if (!response.ok) throw new Error("Error fetching admin data.");

        const data = await response.json();
        if (data.dataList && data.dataList.length > 0) {
            const adminData = data.dataList[0];
            if (adminData.password !== oldPassword) {
                alert("Old password is incorrect.");
                return;
            }

            adminData.password = newPassword;
            const updateResponse = await fetch("http://localhost:5071/api/Admin/updateadmin", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(adminData)
            });

            if (!updateResponse.ok) throw new Error("Failed to change password.");

            alert("Password changed successfully!");
            window.location.href = "http://localhost:5062/AdminPanel/Home/Admin";
        } else {
            alert("Admin not found. Please check the ID.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error: " + error.message);
    }
}

// Forgot Password Function with API Integration
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
