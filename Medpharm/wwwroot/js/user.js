let currentPage = 1;
const itemsPerPage = 10;
let allUsers = [];

// Function to load users (admins with role "User")
async function loadUsers() {
    try {
        const response = await fetch('http://localhost:5071/api/Admin/getalladmins');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (data && Array.isArray(data.dataList)) {
            // Filter admins with role "User"
            allUsers = data.dataList.filter(admin => admin.role === "User");
            
            setupPagination();
            displayPage(currentPage);
        } else {
            showAlert('Failed to load users', 'danger');
        }
    } catch (error) {
        console.error('Error loading users:', error);
        showAlert('Error loading users', 'danger');
    }
}

function setupPagination() {
    const totalPages = Math.ceil(allUsers.length / itemsPerPage);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    // Previous button
    pagination.innerHTML += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage - 1})" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
    `;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
            </li>
        `;
    }

    // Next button
    pagination.innerHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage + 1})" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    `;
}

function changePage(page) {
    if (page < 1 || page > Math.ceil(allUsers.length / itemsPerPage)) return;
    currentPage = page;
    displayPage(currentPage);
    setupPagination();
}

function displayPage(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageUsers = allUsers.slice(startIndex, endIndex);
    
    const userTableBody = document.getElementById('userTableBody');
    userTableBody.innerHTML = ''; // Clear existing content
    
    pageUsers.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.fullName}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>
                <div class="button-container">
                    <button class="buttondanger" onclick="deleteUser(${user.id})">
                        <i class="fas fa-trash me-1"></i>Delete
                    </button>
                </div>
            </td>
        `;
        userTableBody.appendChild(row);
    });
}

// Function to delete a user
async function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        try {
            const response = await fetch(`http://localhost:5071/api/Admin/deleteadmin/${userId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            showAlert('User deleted successfully', 'success');
            loadUsers(); // Reload the table
        } catch (error) {
            console.error('Error deleting user:', error);
            showAlert('Error deleting user', 'danger');
        }
    }
}

// Function to show alerts
function showAlert(message, type) {
    const alertDiv = document.getElementById('actionAlert');
    const alertMessage = document.getElementById('alertMessage');
    
    alertMessage.textContent = message;
    alertDiv.classList.remove('d-none', 'alert-success', 'alert-danger');
    alertDiv.classList.add(`alert-${type}`);
    
    // Auto-hide alert after 3 seconds
    setTimeout(() => {
        alertDiv.classList.add('d-none');
    }, 3000);
}

// Load users when the page loads
document.addEventListener('DOMContentLoaded', loadUsers); 