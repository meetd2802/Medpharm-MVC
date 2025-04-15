using System;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Medphram.Areas.Models; // Correct namespace for your model

namespace Medphram.Areas.AdminPanel.Controllers
{
    [Area("AdminPanel")]
    public class AdminController : Controller
    {
        private readonly HttpClient _httpClient;

        public AdminController(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();
        }

        // POST: AdminPanel/Admin/Create
        [HttpPost]
        public async Task<IActionResult> CreateAdmin(Admin model)
        {
            if (model == null)
            {
                return BadRequest(new { message = "Invalid admin data: Request body is missing." });
            }

            try
            {
                // Construct the API URL (make sure it matches your API endpoint for creating admins)
                var apiUrl = "http://localhost:5071/api/Admin/createadmin"; 

                var jsonContent = JsonConvert.SerializeObject(new
                {
                    model.FullName,
                    model.UserName,
                    model.Email,
                    model.Role,
                    model.Phone,
                    model.Password
                });

                var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");
                var response = await _httpClient.PostAsync(apiUrl, content);
                var responseContent = await response.Content.ReadAsStringAsync(); // Capture API response

                if (response.IsSuccessStatusCode)
                {
                    return Json(new { success = true, message = "Admin created successfully!" });
                }
                else
                {
                    Console.WriteLine($"API Error: {responseContent}"); // Log API response for debugging
                    return Json(new { success = false, message = "Error creating admin.", error = responseContent });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                return StatusCode(500, new { message = "An error occurred while creating the admin.", error = ex.Message });
            }
        }
    }
}
