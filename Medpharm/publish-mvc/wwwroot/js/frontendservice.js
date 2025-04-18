$(document).ready(function () {
    fetchServices();
});

function fetchServices() {
    $.ajax({
        url: "http://localhost:5071/api/Service/getallservices", // Update with your actual API URL
        type: "GET",
        success: function (response) {
            console.log("API Response:", response);

            let services = [];

            if (Array.isArray(response)) {
                services = response;
            } else if (response && typeof response === "object") {
                services = response.dataList || response.services || Object.values(response)[0];
            }

            if (!Array.isArray(services) || services.length === 0) {
                console.warn("No services found.");
                $("#servicesContainer").html("<p>No services available.</p>");
                return;
            }

            console.log("Extracted Services List:", services);
            populateServices(services);
        },
        error: function (xhr, status, error) {
            console.error("Error fetching services:", xhr.status, error);
            alert("Failed to load services. Check API URL.");
        }
    });
}

function populateServices(services) {
    let container = document.getElementById("servicesContainer");
    container.innerHTML = "";

    services.forEach(service => {
        let imageUrl = service.imagePath
            ? `http://localhost:5071${service.imagePath.startsWith('/') ? service.imagePath : '/' + service.imagePath}`
            : "http://localhost:5071/Images/default.png";

        let serviceCard = `
            <div class="col-md-4 mb-4">
                <div class="card h-100 service-card">
                    <img src="${imageUrl}" onerror="this.onerror=null;this.src='/Images/default.png';" class="card-img-top" alt="${service.name}">
                    <div class="card-body">
                        <h4 class="card-title">${service.serviceName}</h4>
                        <p class="card-text">${service.description || "No details available."}</p>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML += serviceCard;
    });
}

fetchServices();
