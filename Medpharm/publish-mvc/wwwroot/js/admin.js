$(document).ready(function () {
    fetchAdmins();
});

function fetchAdmins() {
    $.ajax({
        url: "http://localhost:5071/api/Admin/getalladmins",  // Ensure this URL is correct
        type: "GET",
        success: function (response) {
            console.log("API Response:", response);

            let admins = [];

            if (response && Array.isArray(response.dataList)) {
                admins = response.dataList;
            } else {
                console.error("Expected an array but received:", response);
                alert("Invalid response format from API.");
                return;
            }

            console.log("Extracted Admin Records:", admins);
            populateAdminTable(admins);
        },
        error: function (xhr, status, error) {
            console.error("Error fetching admin data:", xhr.status, error);
            alert("Failed to load admin data. Check API URL.");
        }
    });
}

function deleteAdmin(adminId) {
    if (!confirm("Are you sure you want to delete this admin?")) return;

    $.ajax({
        url: `http://localhost:5071/api/Admin/deleteadmin/${adminId}`,
        type: "DELETE",
        success: function () {
            alert("Admin deleted successfully!");
            fetchAdmins();
        },
        error: function () {
            alert("Failed to delete admin. Please try again.");
        }
    });
}

function editAdmin(adminId) {
    window.location.href = `/AdminPanel/Home/UpdateAdmin?id=${adminId}`;
}

function addAdmin() {
    window.location.href = `/AdminPanel/Home/AddAdmin`;
}

function populateAdminTable(admins) {
    let tableBody = $("#adminTableBody");
    tableBody.empty();

    admins.forEach((admin) => {
        let row = `
            <tr>
                <td>${admin.id}</td>
                <td>${admin.fullName}</td>
                <td>${admin.username}</td>
                <td>${admin.email}</td>
                <td>${admin.role}</td>
                <td>${admin.phone}</td>
                <td>
                    <div class="button-container">
                        <button class="buttongreen" onclick="editAdmin(${admin.id})">UPDATE</button>
                        <button class="buttondanger" onclick="deleteAdmin(${admin.id})">DELETE</button>
                        <button class="button-change-password" onclick="changePassword(${admin.id})">Change Password</button>
                    </div>
                </td>
            </tr>
        `;

        tableBody.append(row);
    });
}

// Redirect to the Change Password page with admin ID
function changePassword(adminId) {
    window.location.href = `/AdminPanel/Home/ChangePassword?id=${adminId}`;
}
