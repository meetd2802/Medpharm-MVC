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

            let waitlist = [];

            if (Array.isArray(data)) {
                waitlist = data;
            } else if (data && typeof data === "object") {
                waitlist = data.waitlist || data.list || Object.values(data)[0];
            }

            if (!Array.isArray(waitlist)) {
                console.error("Expected an array but received:", data);
                alert("Invalid response format from API.");
                return;
            }

            console.log("Extracted Waitlist Data:", waitlist); // ✅ Log extracted data
            waitlist.forEach(person => console.log("Person:", person.fullName)); // ✅ Log full name

            populateWaitlistTable(waitlist);
        },
        error: function (xhr, status, error) {
            console.error("Error fetching waitlist:", xhr.status, error);
            alert("Failed to load waitlist. Check API URL.");
        }
    });
}

// Function to delete a person from the waitlist
function deleteFromWaitlist(waitlistID) {
    if (!confirm("Are you sure you want to remove this person from the waitlist?")) return;

    $.ajax({
        url: `http://localhost:5071/api/Waitlist/deletewaitlist/${waitlistID}`,  // Updated URL
        type: "DELETE",
        success: function () {
            alert("Person removed from waitlist successfully!");
            fetchWaitlist(); // Refresh the table after deletion
            notifyWaitlistUpdate(); // Notify frontend to update if needed
        },
        error: function (xhr, status, error) {
            console.error("Error:", xhr.status, error);
            alert("Failed to remove person. Please try again.");
        }
    });
}


// Function to edit a person on the waitlist (optional, based on your use case)
function editWaitlist(waitlistID) {
    window.location.href = `/AdminPanel/Home/UpdateWaitlist?id=${waitlistID}`;
}

// Populate the waitlist table with data
function populateWaitlistTable(waitlist) {
    let tableBody = $("#waitlistTableBody");
    tableBody.empty();

    waitlist.forEach((person) => {
        let row = `<tr>
            <td>${person.id}</td> <!-- Use 'id' field from the API -->
            <td>${person.fullName}</td>
            <td>${person.email}</td>
            <td>${person.phoneNumber}</td> <!-- Use 'phoneNumber' field from the API -->
            <td>${person.preferredDoctor}</td>
            <td>${person.preferredTimeframe}</td>
            <td>
                <button class="buttondanger" onclick="deleteFromWaitlist(${person.id})">REMOVE</button> <!-- Use 'id' here -->
            </td>
        </tr>`;
        tableBody.append(row);
    });
}

// ✅ Function to notify frontend about waitlist updates
function notifyWaitlistUpdate() {
    fetch("http://localhost:5071/api/Waitlist/notify", { method: "POST" })
        .catch(error => console.error("Error notifying frontend:", error));
}
