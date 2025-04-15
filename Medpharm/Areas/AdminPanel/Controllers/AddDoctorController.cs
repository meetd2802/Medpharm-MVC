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
    public class AddDoctorController : Controller
    {
        private readonly HttpClient _httpClient;

        public AddDoctorController(IHttpClientFactory httpClientFactory) // ✅ Using IHttpClientFactory
        {
            _httpClient = httpClientFactory.CreateClient();
        }

        [HttpPost]
        public async Task<IActionResult> SubmitDoctor(Doctor model)
        {
            if (model == null || model.Image == null)
            {
                return BadRequest(new { message = "Invalid doctor data: Request body is missing or image is null." });
            }

            try
            {
                var apiUrl = "http://localhost:5071/api/Doctor/createdoctor";

                using (var formData = new MultipartFormDataContent())
                {
                    formData.Add(new StringContent(model.Name ?? ""), "DoctorName");
                    formData.Add(new StringContent(model.Speciality ?? ""), "Speciality");

                    if (model.Image != null && model.Image.Length > 0)
                    {
                        var fileStream = model.Image.OpenReadStream();
                        formData.Add(new StreamContent(fileStream), "DoctorImage", model.Image.FileName);
                    }

                    var response = await _httpClient.PostAsync(apiUrl, formData);
                    var responseContent = await response.Content.ReadAsStringAsync();

                    if (response.IsSuccessStatusCode)
                    {
                        return Json(new { success = true, message = "Doctor added successfully!" });
                    }
                    else
                    {
                        Console.WriteLine($"API Error: {responseContent}");
                        return Json(new { success = false, message = "Error adding doctor.", error = responseContent });
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                return StatusCode(500, new { message = "An error occurred while adding the doctor.", error = ex.Message });
            }
        }
    }
}
