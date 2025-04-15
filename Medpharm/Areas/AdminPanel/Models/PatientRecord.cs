namespace Medphram.Areas.Models
{
    using System;
    using Microsoft.AspNetCore.Http;

    public class PatientRecord
    {
        public int AppointmentId { get; set; } // Optional, used for updates if needed
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Diseases { get; set; }
        public string History { get; set; }
        public string Medicine { get; set; }
        public string Doctor { get; set; }
        public DateTime AppointmentTime { get; set; }
        public IFormFile? LabReport { get; set; } // Optional file upload
    }
}