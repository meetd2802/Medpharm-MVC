using Medphram.Areas.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace Medpharm.Areas.AdminPanel.Controllers
{
    [Area("AdminPanel")]
    public class AdminController : Controller
    {
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public IActionResult StoreSession([FromBody] Admin admin)
        {
            if (admin == null || string.IsNullOrEmpty(admin.Id.ToString()) || string.IsNullOrEmpty(admin.UserName))
            {
                return BadRequest(new { success = false, message = "Invalid admin data." });
            }

            // ✅ Store session in MVC securely
            HttpContext.Session.SetString("AdminId", admin.Id.ToString());
            HttpContext.Session.SetString("AdminUsername", admin.UserName);
            HttpContext.Session.SetString("AdminRole", admin.Role ?? "User");

            return Json(new { success = true, message = "Session stored successfully in MVC." });
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
