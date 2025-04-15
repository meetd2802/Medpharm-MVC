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
    public class AddMedicalUpdateController : Controller
    {
        private readonly HttpClient _httpClient;

        public AddMedicalUpdateController(IHttpClientFactory httpClientFactory) // ✅ Using IHttpClientFactory
        {
            _httpClient = httpClientFactory.CreateClient();
        }

        [HttpPost]
        public async Task<IActionResult> SubmitMedicalUpdate(MedicalUpdate model)
        {
            if (model == null || model.ImageFile == null)
            {
                return BadRequest(new { message = "Invalid medical update data: Request body is missing or image is null." });
            }

            try
            {
                var apiUrl = "http://localhost:5071/api/MedicalUpdate/createmedicalupdate";

                using (var formData = new MultipartFormDataContent())
                {
                    formData.Add(new StringContent(model.Name ?? ""), "Name");
                    formData.Add(new StringContent(model.Description ?? ""), "Description");

                    if (model.ImageFile != null && model.ImageFile.Length > 0)
                    {
                        var fileStream = model.ImageFile.OpenReadStream();
                        formData.Add(new StreamContent(fileStream), "ImageFile", model.ImageFile.FileName);
                    }

                    var response = await _httpClient.PostAsync(apiUrl, formData);
                    var responseContent = await response.Content.ReadAsStringAsync();

                    if (response.IsSuccessStatusCode)
                    {
                        return Json(new { success = true, message = "Medical update added successfully!" });
                    }
                    else
                    {
                        Console.WriteLine($"API Error: {responseContent}");
                        return Json(new { success = false, message = "Error adding medical update.", error = responseContent });
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                return StatusCode(500, new { message = "An error occurred while adding the medical update.", error = ex.Message });
            }
        }
    }
}
 