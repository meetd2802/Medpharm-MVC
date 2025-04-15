$(document).ready(function () {
    fetchPatients();
});

function fetchPatients() {
    $.ajax({
        url: "http://localhost:5071/api/Patient/getallpatients",
        type: "GET",
        success: function (response) {
            console.log("API Response:", response);

            let patients = [];

            if (response && Array.isArray(response.dataList)) {
                patients = response.dataList;
            } else {
                console.error("Expected an array but received:", response);
                alert("Invalid response format from API.");
                return;
            }

            console.log("Extracted Patient Records:", patients);
            populatePatientsContainer(patients);
        },
        error: function (xhr, status, error) {
            console.error("Error fetching patient data:", xhr.status, error);
            alert("Failed to load patient data. Check API URL.");
        }
    });
}

function deletePatient(patientId) {
    if (!confirm("Are you sure you want to delete this patient?")) return;

    $.ajax({
        url: `http://localhost:5071/api/Patient/deletepatient/${patientId}`,
        type: "DELETE",
        success: function () {
            alert("Patient deleted successfully!");
            fetchPatients();
        },
        error: function () {
            alert("Failed to delete patient. Please try again.");
        }
    });
}

function editPatient(patientId) {
    window.location.href = `/AdminPanel/Home/UpdatePatient?id=${patientId}`;
}

function addPatient() {
    window.location.href = `/AdminPanel/Home/AddPatient`;
}

// Print Function - FIXED Implementation
function printPatientDetails(patient) {
    const printWindow = window.open('', '', 'width=800,height=600');

    // Create table rows for prescription
    const formattedPrescriptionRows = (patient.prescription || 'N/A')
        .split(/\r?\n/)
        .filter(line => line.trim() !== '')
        .map((med, index) => `<tr><td>${index + 1}</td><td>${med}</td></tr>`)
        .join('');

    const formattedReports = (patient.reports || 'N/A').replace(/\r?\n/g, '<br>');

    const downloadScript = `
        function downloadPDF(patientName) {
            if (typeof jspdf === 'undefined' || typeof html2canvas === 'undefined') {
                alert("PDF libraries not loaded. Please try again.");
                return;
            }

            const { jsPDF } = jspdf;
            const reportContent = document.getElementById('report-content');
            if (!reportContent) {
                alert("Failed to find report content. Try again.");
                return;
            }

            const buttonsDiv = reportContent.querySelector('.buttons');
            const originalDisplay = buttonsDiv.style.display;
            buttonsDiv.style.display = 'none';

            html2canvas(reportContent, {
                scale: 2,
                allowTaint: true,
                useCORS: true
            }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                const imgWidth = 210;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                pdf.save(patientName + "_Report.pdf");

                buttonsDiv.style.display = originalDisplay;
            }).catch(err => {
                console.error('Error generating PDF:', err);
                alert('Error generating PDF. Please try again.');
                buttonsDiv.style.display = originalDisplay;
            });
        }
    `;

    printWindow.document.write(`
        <html>
        <head>
            <title>Patient Report</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 40px; background: url('Images/bg.jpeg') no-repeat center center fixed; background-size: cover; color: #000; }
                .container { background: rgba(255, 255, 255, 0.9); padding: 20px; border-radius: 10px; max-width: 700px; margin: auto; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); }
                .header { text-align: center; margin-bottom: 20px; }
                .header img { width: 600px; }
                .header h2 { margin: 5px 0; }
                .details { margin-bottom: 15px; font-size: 16px; }
                .footer { text-align: center; font-size: 12px; margin-top: 30px; }
                .signature { margin-top: 40px; text-align: left; }
                .line { border-top: 1px solid #000; margin-top: 10px; }
                .buttons { text-align: center; margin-top: 20px; }
                .buttons button { padding: 10px 15px; margin: 5px; border: none; cursor: pointer; border-radius: 5px; font-size: 14px; }
                .print-btn { background-color: #28a745; color: white; }
                .download-btn { background-color: #007bff; color: white; }
                table { font-size: 14px; }
            </style>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
            <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
            <script>${downloadScript}</script>
        </head>
        <body>
            <div id="report-content" class="container">
                <div class="header">
                    <h2>Patient Report</h2>
                </div>

                <div class="details"><strong>Name:</strong> ${patient.name}</div>
                <div class="details"><strong>Phone:</strong> ${patient.phone}</div>
                <div class="details"><strong>Gender:</strong> ${patient.gender}</div>
                <div class="details"><strong>Weight:</strong> ${patient.weight} kg</div>
                <div class="details"><strong>Diseases:</strong> ${patient.diseases || 'N/A'}</div>
                <div class="details"><strong>Medical History:</strong> ${patient.history || 'N/A'}</div>
                <div class="details"><strong>Surgery:</strong> ${patient.surgery || 'N/A'}</div>

                <div class="details">
                    <strong>Prescription:</strong>
                    <table border="1" cellspacing="0" cellpadding="5" style="width:100%; margin-top: 10px; border-collapse: collapse;">
                        <thead>
                            <tr style="background-color: #f2f2f2;">
                                <th>#</th>
                                <th>Medicine Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${formattedPrescriptionRows || '<tr><td colspan="2">N/A</td></tr>'}
                        </tbody>
                    </table>
                </div>

                <div class="details"><strong>Lab Reports:</strong> ${formattedReports}</div>

                <div class="signature">
                    <p>Doctor's Signature: __________________</p>
                </div>

                <div class="line"></div>
                <div class="footer">
                    <p>MedPharm Healthcare</p>
                    <p>Opp. Vakil Shaheb Bridge, Pralhadnagar, Ahmedabad 380058</p>
                    <p>Phone: 9898070000 | Email: medpharm123@gmail.com | Website: www.medpharm.com</p>

                <div class="buttons">
                    <button class="print-btn" onclick="window.print()">Print</button>
                    <button class="download-btn" onclick="downloadPDF('${patient.name}')">Download PDF</button>     
                </div>
            </div>
        </body>
        </html>
    `);

    printWindow.document.close();
}

// Populate Patient Cards
function populatePatientsContainer(patients) {
    let container = $("#patientsContainer");
    container.empty();

    patients.forEach((patient, index) => {
        let patientBox = `
            <div class="patient-container">
                <div class="name">Patient: ${index + 1}</div>
                <div class="description">
                    <p><strong>Name:</strong> ${patient.name}</p>
                    <p><strong>Phone:</strong> ${patient.phone}</p>
                    <p><strong>Diseases:</strong> ${patient.diseases || 'N/A'}</p>
                    <p><strong>Gender:</strong> ${patient.gender}</p>
                    <div class="button-group">
                        <button class="buttongreen" onclick="editPatient(${patient.id})">VIEW/ UPDATE</button>
                        <button class="buttondanger" onclick="deletePatient(${patient.id})">DELETE</button>
                        <button class="btn btn-info" onclick='printPatientDetails(${JSON.stringify(patient)})'>PRINT</button>
                    </div>
                </div>
            </div>
        `;
        container.append(patientBox);
    });
}