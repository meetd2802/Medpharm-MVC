 $(document).ready(function () {
    fetchTestimonials();
});

    function fetchTestimonials() {
    $.ajax({
        url: "http://localhost:5071/api/Testimonial/getalltestimonials", // Replace with your actual endpoint
        type: "GET",
        success: function (response) {
            console.log("Testimonials Response:", response);

            let testimonials = [];

            if (Array.isArray(response)) {
                testimonials = response;
            } else if (response && typeof response === "object") {
                testimonials = response.dataList || response.testimonials || Object.values(response)[0];
            }

            if (!Array.isArray(testimonials) || testimonials.length === 0) {
                console.warn("No testimonials found.");
                return;
            }

            populateTestimonials(testimonials);
        },
        error: function (xhr, status, error) {
            console.error("Error fetching testimonials:", xhr.status, error);
            alert("Failed to load testimonials. Check API URL.");
        }
    });
}

    function populateTestimonials(testimonials) {
    let carouselInner = document.querySelector("#testimonialCarousel .carousel-inner");
    carouselInner.innerHTML = "";

    const chunkSize = 3;

    for (let i = 0; i < testimonials.length; i += chunkSize) {
    const chunk = testimonials.slice(i, i + chunkSize);
    const isActive = i === 0 ? "active" : "";

    let rowHtml = `<div class="carousel-item ${isActive}">
                          <div class="row d-flex justify-content-center">`;

    chunk.forEach(t => {
    const fullStars = Math.floor(t.rating || 0);
    const halfStar = t.rating % 1 >= 0.5;
    let starsHtml = "";

    for (let s = 0; s < fullStars; s++) {
    starsHtml += `<i class="fas fa-star"></i>`;
}

    if (halfStar) {
    starsHtml += `<i class="fas fa-star-half-alt"></i>`;
}

    while (starsHtml.split("i").length - 1 < 5) {
    starsHtml += `<i class="far fa-star"></i>`;
}

    rowHtml += `
                <div class="col-md-4">
                    <div class="card testimonial-card">
                        <div class="card-body">
                            <h5 class="mb-0">${t.name || "Anonymous"}</h5>
                            <div class="text-warning">${starsHtml}</div>
                            <p class="card-text">"${t.content || "No comment provided."}"</p>
                        </div>
                    </div>
                </div>
            `;
});

    rowHtml += `</div></div>`;
    carouselInner.innerHTML += rowHtml;
}
}