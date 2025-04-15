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

    $.ajax({
        url: `http://localhost:5071/api/Appointment/getappointmentsbyphone/${phone}`,
        method: "GET",
        success: function (response) {
            console.log("✅ API Response:", response);

            const appointment = response.dataList?.[0]; // Safe access

            if (!appointment) {
                $("#profileAlert")
                    .removeClass("d-none alert-info")
                    .addClass("alert-warning")
                    .text("No appointment details found.");
                return;
            }

            // ✅ Populate fields
            $("#name").text(appointment.name || "N/A");
            $("#phone").text(appointment.phone || "N/A");
            $("#appointmentTime").text(new Date(appointment.appointmentTime).toLocaleString());
            $("#diseases").text(appointment.diseases || "N/A");
            $("#doctor").text(appointment.doctor || "N/A");
            $("#paymentId").text(appointment.paymentId || "N/A");
            $("#orderId").text(appointment.orderId || "N/A");
            $("#signature").text(appointment.signature || "N/A");
        },
        error: function (xhr, status, error) {
            console.error("❌ Error:", xhr.responseText);
            $("#profileAlert")
                .removeClass("d-none alert-info")
                .addClass("alert-danger")
                .text(`❌ Error fetching appointment details: ${xhr.status} ${xhr.statusText}`);
        }
    });
});
