let currentPage = 1;
const itemsPerPage = 10;
let allWaitlist = [];

$(document).ready(function () {
    fetchWaitlist();
    setupSignalR(); // ✅ Set up real-time updates if necessary
});

// Function to fetch the waitlist data
function fetchWaitlist() {
    $.ajax({
        url: "http://localhost:5071/api/Waitlist/getallwaitlist",
        type: "GET",
        success: function (data) {
            console.log("API Response:", data); // ✅ Log full response

            if (Array.isArray(data)) {
                allWaitlist = data;
            } else if (data && typeof data === "object") {
                allWaitlist = data.waitlist || data.list || Object.values(data)[0];
            }

            if (!Array.isArray(allWaitlist)) {
                console.error("Expected an array but received:", data);
                alert("Invalid response format from API.");
                return;
            }

            console.log("Extracted Waitlist Data:", allWaitlist); // ✅ Log extracted data
            allWaitlist.forEach(person => console.log("Person:", person.fullName)); // ✅ Log full name

            setupPagination();
            displayPage(currentPage);
        },
        error: function (xhr, status, error) {
            console.error("Error fetching waitlist:", xhr.status, error);
            alert("Failed to load waitlist. Check API URL.");
        }
    });
}

function setupPagination() {
    const totalPages = Math.ceil(allWaitlist.length / itemsPerPage);
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
    if (page < 1 || page > Math.ceil(allWaitlist.length / itemsPerPage)) return;
    currentPage = page;
    displayPage(currentPage);
    setupPagination();
}

function displayPage(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageWaitlist = allWaitlist.slice(startIndex, endIndex);
    populateWaitlistTable(pageWaitlist);
}

// Function to delete a person from the waitlist
function deleteFromWaitlist(waitlistID) {
    if (!confirm("Are you sure you want to remove this person from the waitlist?")) return;

    $.ajax({
        url: `http://localhost:5071/api/Waitlist/deletewaitlist/${waitlistID}`,
        type: "DELETE",
        success: function () {
            alert("Person removed from waitlist successfully!");
            fetchWaitlist();
            notifyWaitlistUpdate();
        },
        error: function (xhr, status, error) {
            console.error("Error:", xhr.status, error);
            alert("Failed to remove person. Please try again.");
        }
    });
}

function editWaitlist(waitlistID) {
    window.location.href = `/AdminPanel/Home/UpdateWaitlist?id=${waitlistID}`;
}

function populateWaitlistTable(waitlist) {
    let tableBody = $("#waitlistTableBody");
    tableBody.empty();

    waitlist.forEach((person) => {
        let row = `<tr>
            <td>${person.id}</td>
            <td>${person.fullName}</td>
            <td>${person.email}</td>
            <td>${person.phoneNumber}</td>
            <td>${person.preferredDoctor}</td>
            <td>${person.preferredTimeframe}</td>
            <td>
                <button class="buttondanger" onclick="deleteFromWaitlist(${person.id})">REMOVE</button>
            </td>
        </tr>`;
        tableBody.append(row);
    });
}

function notifyWaitlistUpdate() {
    fetch("http://localhost:5071/api/Waitlist/notify", { method: "POST" })
        .catch(error => console.error("Error notifying frontend:", error));
}