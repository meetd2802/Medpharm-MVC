$(document).ready(function () {
    fetchServices();
    setupSignalR(); // ✅ Set up real-time updates
});

function fetchServices() {
    $.ajax({
        url: "http://localhost:5071/api/Service/getallservices",
        type: "GET",
        success: function (data) {
            console.log("API Response:", data); // ✅ Log full response

            let services = [];

            if (Array.isArray(data)) {
                services = data;
            } else if (data && typeof data === "object") {
                services = data.services || data.list || Object.values(data)[0];
            }

            if (!Array.isArray(services)) {
                console.error("Expected an array but received:", data);
                alert("Invalid response format from API.");
                return;
            }

            console.log("Extracted Services List:", services); // ✅ Log extracted data
            services.forEach(service => console.log("Service Image Path:", service.imagePath)); // ✅ Log image paths

            populateServiceTable(services);
        },
        error: function (xhr, status, error) {
            console.error("Error fetching services:", xhr.status, error);
            alert("Failed to load services. Check API URL.");
        }
    });
}

function deleteService(serviceID) {
    if (!confirm("Are you sure you want to delete this service?")) return;

    $.ajax({
        url: `http://localhost:5071/api/Service/deleteservice/${serviceID}`,
        type: "DELETE",
        success: function () {
            alert("Service deleted successfully!");
            fetchServices(); // Refresh table after deletion
            notifyServiceUpdate(); // ✅ Notify frontend to update
        },
        error: function () {
            alert("Failed to delete service. Please try again.");
        }
    });
}

function editService(serviceID) {
    window.location.href = `/AdminPanel/Home/UpdateServices?id=${serviceID}`;
}

function addService() {
    window.location.href = `/AdminPanel/Home/AddService`;
}

function populateServiceTable(services) {
    let tableBody = $("#servicesTable");
    tableBody.empty();

    services.forEach((service) => {
        let imageUrl = service.imagePath
            ? `http://localhost:5071${service.imagePath.startsWith('/') ? service.imagePath : '/' + service.imagePath}`
            : "http://localhost:5071/Images/default.png";

        console.log(`Image URL: ${imageUrl}`); // ✅ Debugging
        console.log(`Rendering Image: ${imageUrl}`); // ✅ Debugging Image URL

        let row = `<tr>
            <td>${service.serviceID}</td>
            <td><img src="${imageUrl}" onerror="this.onerror=null;this.src='/Images/default.png';" class="card-img-top" alt="${service.name}" style="width:50px;height:50px;"></td>
            <td>${service.serviceName}</td>
            <td>${service.description}</td>
            <td>
                <!-- Use service.serviceID instead of service.id -->
                <button class="buttondanger" onclick="deleteService(${service.serviceID})">DELETE</button>
                <button class="button" onclick="editService(${service.serviceID})">Update</button>
            </td>
        </tr>`;
        tableBody.append(row);
    });
}

// ✅ Function to notify frontend about service updates
function notifyServiceUpdate() {
    fetch("http://localhost:5071/api/Service/notify", { method: "POST" })
        .catch(error => console.error("Error notifying frontend:", error));
}
