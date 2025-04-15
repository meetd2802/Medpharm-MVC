using Medphram.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Medphram.Areas.Models;

namespace Medpharm.Controllers
{
    [Area("AdminPanel")]
    public class AdminloginController : Controller
    {
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public IActionResult StoreSession([FromBody] Admin admin)
        {
            if (admin == null)
            {
                return BadRequest(new { success = false, message = "Invalid admin data." });
            }

            HttpContext.Session.SetString("AdminId", admin.Id.ToString());
            HttpContext.Session.SetString("AdminUsername", admin.UserName);
            HttpContext.Session.SetString("AdminRole", admin.Role ?? "User");

            // ✅ Log session storage
            Console.WriteLine($"Session Stored - AdminId: {admin.Id}, AdminUsername: {admin.UserName}");

            return Json(new { success = true, message = "Session stored successfully." });
        }

        
        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://localhost:5071/");
                var response = await client.PostAsync("api/Admin/logout", null);

                if (!response.IsSuccessStatusCode)
                {
                    return StatusCode(500, new { message = "API logout failed." });
                }
            }

            // ✅ Clear MVC session
            HttpContext.Session.Clear();
            return RedirectToAction("Login", "Admin");
        }

        [HttpGet]
        public IActionResult GetLoggedInAdminId()
        {
            var adminId = HttpContext.Session.GetString("AdminId");
            if (string.IsNullOrEmpty(adminId))
            {
                return Json(new { success = false, message = "Admin not logged in" });
            }

            return Json(new { success = true, adminId = adminId });
        }
    }
}
