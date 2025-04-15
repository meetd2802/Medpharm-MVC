public class AppointmentModel
{
    public string Name { get; set; }
    public string Phone { get; set; }
    public string Diseases { get; set; }
    public string History { get; set; }
    public string Medicine { get; set; }
    public IFormFile LabReport { get; set; } // ✅ For file uploads
    public string Doctor { get; set; }
    public DateTime AppointmentTime { get; set; }
}