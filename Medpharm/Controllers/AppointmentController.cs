using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

public class AppointmentController : Controller
{
    private readonly HttpClient _httpClient;

    public AppointmentController(IHttpClientFactory httpClientFactory) // ✅ Use IHttpClientFactory
    {
        _httpClient = httpClientFactory.CreateClient();
    }

   [HttpPost]
public async Task<IActionResult> BookAppointment(AppointmentModel model)
{
    if (model == null)
    {
        return BadRequest(new { message = "Invalid appointment data: Request body is missing." });
    }

    try
    {
        if (model.LabReport != null)
        {
            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads");
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var filePath = Path.Combine(uploadsFolder, model.LabReport.FileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await model.LabReport.CopyToAsync(stream);
            }
        }

        var apiUrl = "http://localhost:5071/api/Appointment/createappointment"; 
        var httpClient = new HttpClient();

        var jsonContent = JsonConvert.SerializeObject(new
        {
            model.Name,
            model.Phone,
            model.Diseases,
            model.History,
            model.Medicine,
            model.Doctor,
            model.AppointmentTime,
            LabReportPath = model.LabReport?.FileName
        });

        var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");
        var response = await httpClient.PostAsync(apiUrl, content);

        var responseContent = await response.Content.ReadAsStringAsync(); // Capture API response

        if (response.IsSuccessStatusCode)
        {
            return Json(new { success = true, message = "Appointment booked successfully!" });
        }
        else
        {
            Console.WriteLine($"API Error: {responseContent}"); // Log API response for debugging
            return Json(new { success = false, message = "Error booking appointment.", error = responseContent });
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Exception: {ex.Message}");
        return StatusCode(500, new { message = "An error occurred while booking the appointment.", error = ex.Message });
    }
}

}
