$(document).ready(function() {
    fetchAppointments();
    
    // Add event listeners for search functionality
    $('#searchButton').click(function() {
        searchPayments();
    });
    
    $('#clearSearch').click(function() {
        $('#searchInput').val('');
        fetchAppointments(); // Reset to show all appointments
    });
    
    // Allow pressing Enter to search
    $('#searchInput').keypress(function(e) {
        if (e.which === 13) { // Enter key
            searchPayments();
        }
    });
});

let allAppointments = []; // Store all appointments for searching

function fetchAppointments() {
    $.ajax({
        url: 'http://localhost:5071/api/Appointment/getallappointments',
        type: 'GET',
        success: function(response) {
            if (response && Array.isArray(response)) {
                allAppointments = response; // Store all appointments
                populatePaymentsTable(response);
                calculateTotalRevenue(response);
            } else if (response && response.dataList) {
                allAppointments = response.dataList; // Store all appointments
                populatePaymentsTable(response.dataList);
                calculateTotalRevenue(response.dataList);
            } else {
                console.error('Unexpected response format:', response);
                alert('Error: Unexpected response format from the server.');
            }
        },
        error: function(xhr, status, error) {
            console.error('Error fetching appointments:', error);
            alert('Error fetching appointments. Please try again.');
        }
    });
}

function searchPayments() {
    const searchTerm = $('#searchInput').val().toLowerCase().trim();
    
    if (!searchTerm) {
        // If search term is empty, show all appointments
        populatePaymentsTable(allAppointments);
        calculateTotalRevenue(allAppointments);
        return;
    }
    
    // Filter appointments based on search term
    const filteredAppointments = allAppointments.filter(appointment => {
        return (
            (appointment.appointmentId && appointment.appointmentId.toString().includes(searchTerm)) ||
            (appointment.name && appointment.name.toLowerCase().includes(searchTerm)) ||
            (appointment.doctor && appointment.doctor.toLowerCase().includes(searchTerm)) ||
            (appointment.phone && appointment.phone.toString().includes(searchTerm))
        );
    });
    
    // Update table with filtered results
    populatePaymentsTable(filteredAppointments);
    calculateTotalRevenue(filteredAppointments);
}

function populatePaymentsTable(appointments) {
    const tableBody = $('#paymentsTableBody');
    tableBody.empty();

    if (appointments.length === 0) {
        // Show "No results found" message if no appointments match the search
        const noResultsRow = `
            <tr>
                <td colspan="6" class="text-center">No payment records found matching your search criteria.</td>
            </tr>
        `;
        tableBody.append(noResultsRow);
        return;
    }

    appointments.forEach(appointment => {
        const row = `
            <tr>
                <td>${appointment.appointmentId}</td>
                <td>${appointment.name}</td>
                <td>${appointment.doctor}</td>
                <td>${new Date(appointment.appointmentTime).toLocaleString()}</td>
                <td>₹500.00</td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="downloadReceipt(${appointment.appointmentId}, '${appointment.name}', '${appointment.doctor}', '${appointment.appointmentTime}')">
                        <i class="fas fa-download me-1"></i>Download Receipt
                    </button>
                </td>
            </tr>
        `;
        tableBody.append(row);
    });
}

function calculateTotalRevenue(appointments) {
    const totalRevenue = appointments.length * 500;
    $('#totalRevenue').text(totalRevenue.toFixed(2));
}

function downloadReceipt(appointmentId, patientName, doctor, appointmentTime) {
    // Populate receipt template
    $('#receiptId').text(appointmentId);
    $('#receiptDate').text(new Date().toLocaleDateString());
    $('#receiptPatientName').text(patientName);
    $('#receiptDoctor').text(doctor);

    // Get the receipt content
    const receiptContent = $('#receiptTemplate').html();

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>Payment Receipt - ${appointmentId}</title>
                <style>
                    @media print {
                        body { margin: 0; }
                        .receipt-container { 
                            padding: 20px;
                            max-width: 800px;
                            margin: 0 auto;
                            font-family: Arial, sans-serif;
                        }
                        .receipt-header {
                            text-align: center;
                            border-bottom: 2px solid #333;
                            padding-bottom: 20px;
                            margin-bottom: 20px;
                        }
                        .receipt-logo {
                        width: 100px;
                            max-width: 200px;
                            margin-bottom: 10px;
                        }
                        .receipt-body {
                            margin-bottom: 20px;
                        }
                        .receipt-row {
                            display: flex;
                            justify-content: space-between;
                            margin-bottom: 10px;
                        }
                        .receipt-details table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        .receipt-details th, .receipt-details td {
                            padding: 10px;
                            text-align: left;
                        }
                        .receipt-details tr {
                            border-bottom: 1px solid #ddd;
                        }
                        .receipt-total {
                            text-align: right;
                            margin-top: 20px;
                        }
                        .receipt-footer {
                            text-align: center;
                            border-top: 2px solid #333;
                            padding-top: 20px;
                            margin-top: 20px;
                        }
                    }
                </style>
            </head>
            <body>
                ${receiptContent}
                <script>
                    window.onload = function() {
                        window.print();
                        window.onafterprint = function() {
                            window.close();
                        };
                    };
                </script>
            </body>
        </html>
    `);
    printWindow.document.close();
} 