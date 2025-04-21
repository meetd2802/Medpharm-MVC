let currentPage = 1;
const itemsPerPage = 10;
let allContacts = [];

$(document).ready(function () {
    fetchContacts();
});

// Function to fetch contact messages
function fetchContacts() {
    $.ajax({
        url: "http://localhost:5071/api/ContactForm/getallcontactforms",
        type: "GET",
        success: function (data) {
            console.log("API Response:", data);

            if (Array.isArray(data)) {
                allContacts = data;
            } else if (data && typeof data === "object") {
                allContacts = data.contacts || data.list || Object.values(data)[0];
            }

            if (!Array.isArray(allContacts)) {
                console.error("Expected an array but received:", data);
                alert("Invalid response format from API.");
                return;
            }

            setupPagination();
            displayPage(currentPage);
        },
        error: function (xhr, status, error) {
            console.error("Error fetching contacts:", xhr.status, error);
            alert("Failed to load contacts. Check API URL.");
        }
    });
}

function setupPagination() {
    const totalPages = Math.ceil(allContacts.length / itemsPerPage);
    const pagination = $("#pagination");
    pagination.empty();

    // Previous button
    pagination.append(`
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage - 1})" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
    `);

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        pagination.append(`
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
            </li>
        `);
    }

    // Next button
    pagination.append(`
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage + 1})" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    `);
}

function changePage(page) {
    if (page < 1 || page > Math.ceil(allContacts.length / itemsPerPage)) return;
    currentPage = page;
    displayPage(currentPage);
    setupPagination();
}

function displayPage(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageContacts = allContacts.slice(startIndex, endIndex);
    populateContactTable(pageContacts);
}

// Function to delete a contact message
function deleteContact(contactID) {
    if (!confirm("Are you sure you want to delete this contact message?")) return;

    $.ajax({
        url: `http://localhost:5071/api/ContactForm/deletecontactform/${contactID}`,
        type: "DELETE",
        success: function () {
            alert("Contact message deleted successfully!");
            fetchContacts();
        },
        error: function (xhr, status, error) {
            console.error("Error:", xhr.status, error);
            alert("Failed to delete contact message. Please try again.");
        }
    });
}

// Function to populate the contact table with data
function populateContactTable(contacts) {
    let tableBody = $("#contactTableBody");
    tableBody.empty();

    contacts.forEach((contact) => {
        let row = `<tr>
            <td>${contact.id}</td>
            <td>${contact.fullName}</td>
            <td>${contact.email}</td>
            <td>${contact.subject}</td>
            <td>${contact.message}</td>
            <td>
                <button class="buttondanger" onclick="deleteContact(${contact.id})">DELETE</button>
            </td>
        </tr>`;
        tableBody.append(row);
    });
}