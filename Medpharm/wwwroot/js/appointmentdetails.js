$(document).ready(function () {
    const phone = sessionStorage.getItem("phone");

    if (!phone) {
        $("#profileAlert")
            .removeClass("d-none alert-info")
            .addClass("alert-danger")
            .text("⚠️ No phone number found in session. Please log in again.");
        return;
    }

    console.log("📞 Phone from sessionStorage:", phone); // Debug

    // Show loading state
    const container = document.getElementById('appointmentsContainer');
    container.innerHTML = '<div class="col-12 text-center"><div class="spinner-border text-primary" role="status"></div></div>';

    $.ajax({
        url: `http://localhost:5071/api/Appointment/getappointmentsbyphone/${phone}`,
        method: "GET",
        success: function (response) {
            console.log("✅ Raw API Response:", response); // Log the raw response

            // Check if response has dataList property
            if (!response.dataList || !Array.isArray(response.dataList)) {
                console.error("❌ Invalid response format:", response);
                container.innerHTML = '<div class="col-12"><div class="alert alert-danger">Invalid response format from server</div></div>';
                return;
            }

            const appointments = response.dataList;
            console.log("📋 Processed appointments:", appointments); // Log processed appointments

            if (appointments.length === 0) {
                container.innerHTML = '<div class="col-12"><div class="alert alert-info">No appointment details found.</div></div>';
                return;
            }

            // Create cards for all appointments
            container.innerHTML = appointments.map(appointment => {
                console.log("🎯 Processing appointment:", appointment); // Log each appointment
                return `<div class="col-12">${createAppointmentCard(appointment)}</div>`;
            }).join('');
        },
        error: function (xhr, status, error) {
            console.error("❌ Error details:", {
                status: xhr.status,
                statusText: xhr.statusText,
                responseText: xhr.responseText,
                error: error
            });
            container.innerHTML = '<div class="col-12"><div class="alert alert-danger">❌ Error fetching appointment details: ' + xhr.status + ' ' + xhr.statusText + '</div></div>';
        }
    });
});

function createAppointmentCard(appointment) {
    console.log("🎨 Creating card for appointment:", appointment); // Log appointment data

    const statusClass = getStatusClass(appointment.status || 'pending');
    const formattedDate = appointment.appointmentTime ? 
        new Date(appointment.appointmentTime).toLocaleString() : 'N/A';
    
    return `
        <div class="card appointment-card shadow mb-4">
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Appointment #${appointment.appointmentId}</h6>
                <span class="appointment-status ${statusClass}">${appointment.status || 'Pending'}</span>
            </div>
            <div class="card-body">
                <div class="row mb-4">
                    <div class="col-md-4">
                        <div class="profile-field">
                            <div class="profile-field-label">Full Name</div>
                            <div class="profile-field-value">${appointment.name || 'N/A'}</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="profile-field">
                            <div class="profile-field-label">Phone</div>
                            <div class="profile-field-value">${appointment.phone || 'N/A'}</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="profile-field">
                            <div class="profile-field-label">Appointment Time</div>
                            <div class="profile-field-value">${formattedDate}</div>
                        </div>
                    </div>
                </div>

                <div class="row mb-4">
                    <div class="col-md-4">
                        <div class="profile-field">
                            <div class="profile-field-label">Diseases</div>
                            <div class="profile-field-value">${appointment.diseases || 'N/A'}</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="profile-field">
                            <div class="profile-field-label">Medicine</div>
                            <div class="profile-field-value">${appointment.medicine || 'N/A'}</div>
                        </div>
                    </div>
                </div>

                <div class="row mb-4">
                    <div class="col-md-4">
                        <div class="profile-field">
                            <div class="profile-field-label">Doctor</div>
                            <div class="profile-field-value">${appointment.doctor || 'N/A'}</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="profile-field">
                            <div class="profile-field-label">Payment ID</div>
                            <div class="profile-field-value">${appointment.paymentId || 'N/A'}</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="profile-field">
                            <div class="profile-field-label">Order ID</div>
                            <div class="profile-field-value">${appointment.orderId || 'N/A'}</div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    `;
}

function getStatusClass(status) {
    switch (status?.toLowerCase()) {
        case 'pending':
            return 'status-pending';
        case 'confirmed':
            return 'status-confirmed';
        case 'cancelled':
            return 'status-cancelled';
        default:
            return 'status-pending';
    }
}
