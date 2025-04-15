$(document).ready(function () {
    fetchHealthTips();
});

function fetchHealthTips() {
    $.ajax({
        url: "http://localhost:5071/api/HealthTip/getallhealthtips", // Ensure this URL is correct
        type: "GET",
        success: function (response) {
            console.log("API Response:", response); // Debug API Response

            let healthTips = [];

            if (Array.isArray(response)) {
                healthTips = response;
            } else if (response && typeof response === "object") {
                healthTips = response.dataList || response.healthTips || Object.values(response)[0];
            }

            if (!Array.isArray(healthTips) || healthTips.length === 0) {
                console.warn("No health tips found.");
                $("#healthTipsContainer").html("<p>No health tips available.</p>");
                return;
            }

            console.log("Extracted Health Tips List:", healthTips);
            populateHealthTips(healthTips);
        },
        error: function (xhr, status, error) {
            console.error("Error fetching health tips:", xhr.status, error);
            alert("Failed to load health tips. Check API URL.");
        }
    });
}

function populateHealthTips(healthTips) {
    let container = document.getElementById("healthTipsContainer");
    container.innerHTML = ""; // Clear previous content

    healthTips.forEach(tip => {
        // ✅ Use "imageUrl" instead of "imagePath"
        let imageUrl = tip.imageUrl
            ? `http://localhost:5071/${tip.imageUrl.replace(/^\/+/, '')}?v=${new Date().getTime()}`
            : "http://localhost:5071/Images/default.png";

        console.log(`Image Path from API: ${tip.imageUrl}`); // ✅ Debugging
        console.log(`Final Image URL: ${imageUrl}`); // ✅ Debugging

        let healthTipCard = `
            <div class="col-md-4 mb-4">
                <div class="card h-100 health-tip-card">
                    <img src="${imageUrl}" 
                        onerror="this.onerror=null;this.src='http://localhost:5071/Images/default.png';" 
                        class="card-img-top" 
                        alt="${tip.title}">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="badge bg-primary text-white">${tip.category || "General"}</span>
                        </div>
                        <h5 class="card-title">${tip.title}</h5>
                        <p class="card-text">${tip.description || "No details available."}</p>
                    </div>
                    <div class="card-footer bg-white border-top-0">
                        <div class="d-flex align-items-center">
                            <small class="text-muted">By ${tip.author || "Unknown"} | ${tip.datePosted || "N/A"}</small>
                        </div>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML += healthTipCard;
    });
}

// Fetch health tips when the page loads
fetchHealthTips();
