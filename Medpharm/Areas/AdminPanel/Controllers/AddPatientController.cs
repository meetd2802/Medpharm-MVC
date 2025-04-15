using System;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Medphram.Areas.Models; // ✅ Correct namespace for your model

namespace Medphram.Areas.AdminPanel.Controllers
{
    [Area("AdminPanel")]
    public class PatientController : Controller
    {
        private readonly HttpClient _httpClient;

        public PatientController(IHttpClientFactory httpClientFactory) // ✅ Using IHttpClientFactory
        {
            _httpClient = httpClientFactory.CreateClient();
        }

        [HttpPost]
        public async Task<IActionResult> AddPatient(Patient model)
        {
            if (model == null)
            {
                return BadRequest(new { message = "Invalid patient data: Request body is missing." });
            }

            try
            {
                string labReportPath = null;

                // ✅ Handle file upload if a LabReport is provided
                if (!string.IsNullOrEmpty(model.LabReport))
                {
                    var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads");
                    if (!Directory.Exists(uploadsFolder))
                        Directory.CreateDirectory(uploadsFolder);

                    labReportPath = Path.Combine("uploads", model.LabReport);
                }

                var apiUrl = "http://localhost:5071/api/Patient/createpatient"; 
                
                var jsonContent = JsonConvert.SerializeObject(new
                {
                    model.Name,
                    model.Phone,
                    model.Diseases,
                    model.History,
                    model.Medicine,
                    LabReportPath = labReportPath, // ✅ Sending file path instead of the file itself
                    model.Surgery,
                    model.Gender,
                    model.Weight,
                    model.Prescription,
                    model.Reports,
                    model.CreatedAt
                });

                var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");
                var response = await _httpClient.PostAsync(apiUrl, content);
                var responseContent = await response.Content.ReadAsStringAsync(); // Capture API response

                if (response.IsSuccessStatusCode)
                {
                    return Json(new { success = true, message = "Patient data added successfully!" });
                }
                else
                {
                    Console.WriteLine($"API Error: {responseContent}"); // Log API response for debugging
                    return Json(new { success = false, message = "Error adding patient data.", error = responseContent });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                return StatusCode(500, new { message = "An error occurred while adding patient data.", error = ex.Message });
            }
        }
    }
}