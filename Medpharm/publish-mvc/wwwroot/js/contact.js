$(document).ready(function () {
    fetchContacts();
});

// Function to fetch contact messages
to
function fetchContacts() {
    $.ajax({
        url: "http://localhost:5071/api/ContactForm/getallcontactforms",
        type: "GET",
        success: function (data) {
            console.log("API Response:", data);

            let contacts = [];

            if (Array.isArray(data)) {
                contacts = data;
            } else if (data && typeof data === "object") {
                contacts = data.contacts || data.list || Object.values(data)[0];
            }

            if (!Array.isArray(contacts)) {
                console.error("Expected an array but received:", data);
                alert("Invalid response format from API.");
                return;
            }

            console.log("Extracted Contact Data:", contacts);
            populateContactTable(contacts);
        },
        error: function (xhr, status, error) {
            console.error("Error fetching contacts:", xhr.status, error);
            alert("Failed to load contacts. Check API URL.");
        }
    });
}

// Function to delete a contact message
function deleteContact(contactID) {
    if (!confirm("Are you sure you want to delete this contact message?")) return;

    $.ajax({
        url: `http://localhost:5071/api/ContactForm/deletecontactform/${contactID}`,
        type: "DELETE",
        success: function () {
            alert("Contact message deleted successfully!");
            fetchContacts(); // Refresh table after deletion
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