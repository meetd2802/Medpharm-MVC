let currentPage = 1;
const itemsPerPage = 10;
let allTestimonials = [];

$(document).ready(function () {
    fetchTestimonials();
});

// Function to fetch the testimonials data
function fetchTestimonials() {
    $.ajax({
        url: "http://localhost:5071/api/Testimonial/getalltestimonials",
        type: "GET",
        success: function (data) {
            console.log("API Response:", data);

            if (Array.isArray(data)) {
                allTestimonials = data;
            } else if (data && typeof data === "object") {
                allTestimonials = data.testimonials || data.list || Object.values(data)[0];
            }

            if (!Array.isArray(allTestimonials)) {
                console.error("Expected an array but received:", data);
                alert("Invalid response format from API.");
                return;
            }

            console.log("Extracted Testimonials Data:", allTestimonials);
            setupPagination();
            displayPage(currentPage);
        },
        error: function (xhr, status, error) {
            console.error("Error fetching testimonials:", xhr.status, error);
            alert("Failed to load testimonials. Check API URL.");
        }
    });
}

function setupPagination() {
    const totalPages = Math.ceil(allTestimonials.length / itemsPerPage);
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
    if (page < 1 || page > Math.ceil(allTestimonials.length / itemsPerPage)) return;
    currentPage = page;
    displayPage(currentPage);
    setupPagination();
}

function displayPage(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageTestimonials = allTestimonials.slice(startIndex, endIndex);
    populateTestimonialsTable(pageTestimonials);
}

function populateTestimonialsTable(testimonials) {
    const tableBody = $("#testimonialTableBody");
    tableBody.empty();

    testimonials.forEach((testimonial) => {
        const stars = generateStars(testimonial.rating);
        const formattedDate = new Date(testimonial.date).toLocaleDateString();
        
        const row = `
            <tr>
                <td>${testimonial.id}</td>
                <td>${testimonial.name}</td>
                <td class="text-warning">${stars}</td>
                <td>${testimonial.content}</td>
                <td>${testimonial.createdAt}</td>
                <td>
                    <button class="buttonupdate" onclick="updateTestimonial(${testimonial.id})">UPDATE</button>
                    <button class="buttondanger" onclick="deleteTestimonial(${testimonial.id})">DELETE</button>
                </td>
            </tr>
        `;
        tableBody.append(row);
    });
}

function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i - 0.5 <= rating) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

function deleteTestimonial(testimonialId) {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    $.ajax({
        url: `http://localhost:5071/api/Testimonial/deletetestimonial/${testimonialId}`,
        type: "DELETE",
        success: function () {
            alert("Testimonial deleted successfully!");
            fetchTestimonials();
        },
        error: function (xhr, status, error) {
            console.error("Error:", xhr.status, error);
            alert("Failed to delete testimonial. Please try again.");
        }
    });
}

function updateTestimonial(testimonialId) {
    window.location.href = `/AdminPanel/Home/UpdateTestimonial?id=${testimonialId}`;
} 