namespace Medphram.Areas.Models
{
    using System;
    using Microsoft.AspNetCore.Http;

    public class Doctor
    {
        public int Id { get; set; } // Unique identifier for the doctor
        public string Name { get; set; }
        public string Speciality { get; set; } 
        public IFormFile? Image { get; set; } // Optional file upload for the doctor's image
    }
}