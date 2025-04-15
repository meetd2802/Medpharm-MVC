namespace Medphram.Areas.Models
{
    using System;
    using Microsoft.AspNetCore.Http;

    public class MedicalUpdate
    {
        public int Id { get; set; } // Unique identifier for the medical update
        public string Name { get; set; } // Title of the medical update
        public string Description { get; set; } // Detailed description
        public IFormFile? ImageFile { get; set; } // Optional file upload for the medical update image
    }
}